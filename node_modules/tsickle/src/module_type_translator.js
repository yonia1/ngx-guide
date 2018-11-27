/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/module_type_translator", ["require", "exports", "tsickle/src/googmodule", "tsickle/src/jsdoc", "tsickle/src/transformer_util", "tsickle/src/type_translator", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @fileoverview module_type_translator builds on top of type_translator, adding functionality to
     * translate types within the scope of a single module. The main entry point is
     * ModuleTypeTranslator.
     */
    var googmodule = require("tsickle/src/googmodule");
    var jsdoc = require("tsickle/src/jsdoc");
    var transformer_util_1 = require("tsickle/src/transformer_util");
    var typeTranslator = require("tsickle/src/type_translator");
    var ts = require("tsickle/src/typescript");
    /**
     * MutableJSDoc encapsulates a (potential) JSDoc comment on a specific node, and allows code to
     * modify (including delete) it.
     */
    var MutableJSDoc = /** @class */ (function () {
        function MutableJSDoc(node, sourceComment, tags) {
            this.node = node;
            this.sourceComment = sourceComment;
            this.tags = tags;
        }
        MutableJSDoc.prototype.updateComment = function (escapeExtraTags) {
            var text = jsdoc.toStringWithoutStartEnd(this.tags, escapeExtraTags);
            if (this.sourceComment) {
                if (!text) {
                    // Delete the (now empty) comment.
                    var comments_1 = ts.getSyntheticLeadingComments(this.node);
                    var idx = comments_1.indexOf(this.sourceComment);
                    comments_1.splice(idx, 1);
                    this.sourceComment = null;
                    return;
                }
                this.sourceComment.text = text;
                return;
            }
            // Don't add an empty comment.
            if (!text)
                return;
            var comment = {
                kind: ts.SyntaxKind.MultiLineCommentTrivia,
                text: text,
                hasTrailingNewLine: true,
                pos: -1,
                end: -1,
            };
            var comments = ts.getSyntheticLeadingComments(this.node) || [];
            comments.push(comment);
            ts.setSyntheticLeadingComments(this.node, comments);
        };
        return MutableJSDoc;
    }());
    exports.MutableJSDoc = MutableJSDoc;
    /** Returns the Closure name of a function parameter, special-casing destructuring. */
    function getParameterName(param, index) {
        switch (param.name.kind) {
            case ts.SyntaxKind.Identifier:
                var name_1 = transformer_util_1.getIdentifierText(param.name);
                // TypeScript allows parameters named "arguments", but Closure
                // disallows this, even in externs.
                if (name_1 === 'arguments')
                    name_1 = 'tsickle_arguments';
                return name_1;
            case ts.SyntaxKind.ArrayBindingPattern:
            case ts.SyntaxKind.ObjectBindingPattern:
                // Closure crashes if you put a binding pattern in the externs.
                // Avoid this by just generating an unused name; the name is
                // ignored anyway.
                return "__" + index;
            default:
                // The above list of kinds is exhaustive.  param.name is 'never' at this point.
                var paramName = param.name;
                throw new Error("unhandled function parameter kind: " + ts.SyntaxKind[paramName.kind]);
        }
    }
    /**
     * ModuleTypeTranslator encapsulates knowledge and helper functions to translate types in the scope
     * of a specific module. This includes managing Closure forward declare statements and any symbol
     * aliases in scope for a whole file.
     */
    var ModuleTypeTranslator = /** @class */ (function () {
        function ModuleTypeTranslator(sourceFile, typeChecker, host, diagnostics, isForExterns) {
            this.sourceFile = sourceFile;
            this.typeChecker = typeChecker;
            this.host = host;
            this.diagnostics = diagnostics;
            this.isForExterns = isForExterns;
            /**
             * A mapping of aliases for symbols in the current file, used when emitting types. TypeScript
             * emits imported symbols with unpredictable prefixes. To generate correct type annotations,
             * tsickle creates its own aliases for types, and registers them in this map (see
             * `emitImportDeclaration` and `forwardDeclare()` below). The aliases are then used when emitting
             * types.
             */
            this.symbolsToAliasedNames = new Map();
            /**
             * The set of module symbols forward declared in the local namespace (with goog.forwarDeclare).
             *
             * Symbols not imported must be declared, which is done by adding forward declares to
             * `extraImports` below.
             */
            this.forwardDeclaredModules = new Set();
            /**
             * The list of generated goog.forwardDeclare statements for this module. These are inserted into
             * the module's body statements after translation.
             */
            this.forwardDeclares = [];
            /** A counter to generate unique names for goog.forwardDeclare variables. */
            this.forwardDeclareCounter = 0;
        }
        ModuleTypeTranslator.prototype.debugWarn = function (context, messageText) {
            transformer_util_1.reportDebugWarning(this.host, context, messageText);
        };
        ModuleTypeTranslator.prototype.error = function (node, messageText) {
            transformer_util_1.reportDiagnostic(this.diagnostics, node, messageText);
        };
        /**
         * Convert a TypeScript ts.Type into the equivalent Closure type.
         *
         * @param context The ts.Node containing the type reference; used for resolving symbols
         *     in context.
         * @param type The type to translate; if not provided, the Node's type will be used.
         * @param resolveAlias If true, do not emit aliases as their symbol, but rather as the resolved
         *     type underlying the alias. This should be true only when emitting the typedef itself.
         */
        ModuleTypeTranslator.prototype.typeToClosure = function (context, type) {
            if (this.host.untyped) {
                return '?';
            }
            var typeChecker = this.typeChecker;
            if (!type) {
                type = typeChecker.getTypeAtLocation(context);
            }
            return this.newTypeTranslator(context).translate(type);
        };
        ModuleTypeTranslator.prototype.newTypeTranslator = function (context) {
            var _this = this;
            // In externs, there is no local scope, so all types must be relative to the file level scope.
            var translationContext = this.isForExterns ? this.sourceFile : context;
            var translator = new typeTranslator.TypeTranslator(this.host, this.typeChecker, translationContext, this.host.typeBlackListPaths, this.symbolsToAliasedNames, function (sym) { return _this.ensureSymbolDeclared(sym); });
            translator.isForExterns = this.isForExterns;
            translator.warn = function (msg) { return _this.debugWarn(context, msg); };
            return translator;
        };
        ModuleTypeTranslator.prototype.isBlackListed = function (context) {
            var type = this.typeChecker.getTypeAtLocation(context);
            var sym = type.symbol;
            if (!sym)
                return false;
            if (sym.flags & ts.SymbolFlags.Alias) {
                sym = this.typeChecker.getAliasedSymbol(sym);
            }
            return this.newTypeTranslator(context).isBlackListed(sym);
        };
        /**
         * Get the ts.Symbol at a location or throw.
         * The TypeScript API can return undefined when fetching a symbol, but in many contexts we know it
         * won't (e.g. our input is already type-checked).
         */
        ModuleTypeTranslator.prototype.mustGetSymbolAtLocation = function (node) {
            var sym = this.typeChecker.getSymbolAtLocation(node);
            if (!sym)
                throw new Error('no symbol');
            return sym;
        };
        /** Finds an exported (i.e. not global) declaration for the given symbol. */
        ModuleTypeTranslator.prototype.findExportedDeclaration = function (sym) {
            var _this = this;
            // TODO(martinprobst): it's unclear when a symbol wouldn't have a declaration, maybe just for
            // some builtins (e.g. Symbol)?
            if (!sym.declarations || sym.declarations.length === 0)
                return undefined;
            // A symbol declared in this file does not need to be imported.
            if (sym.declarations.some(function (d) { return d.getSourceFile() === _this.sourceFile; }))
                return undefined;
            // Find an exported declaration.
            // Because tsickle runs with the --declaration flag, all types referenced from exported types
            // must be exported, too, so there must either be some declaration that is exported, or the
            // symbol is actually a global declaration (declared in a script file, not a module).
            var decl = sym.declarations.find(function (d) {
                // Check for Export | Default (default being a default export).
                if (!transformer_util_1.hasModifierFlag(d, ts.ModifierFlags.ExportDefault))
                    return false;
                // Exclude symbols declared in `declare global {...}` blocks, they are global and don't need
                // imports.
                var current = d;
                while (current) {
                    if (current.flags & ts.NodeFlags.GlobalAugmentation)
                        return false;
                    current = current.parent;
                }
                return true;
            });
            return decl;
        };
        /**
         * Returns the `const x = goog.forwardDeclare...` text for an import of the given `importPath`.
         * This also registers aliases for symbols from the module that map to this forward declare.
         */
        ModuleTypeTranslator.prototype.forwardDeclare = function (importPath, moduleSymbol, isExplicitImport, isDefaultImport) {
            var _this = this;
            if (isDefaultImport === void 0) { isDefaultImport = false; }
            var e_1, _a;
            if (this.host.untyped)
                return;
            // Already imported? Do not emit a duplicate forward declare.
            if (this.forwardDeclaredModules.has(moduleSymbol))
                return;
            if (this.host.typeBlackListPaths && this.host.typeBlackListPaths.has(importPath)) {
                return; // Do not emit goog.forwardDeclare or goog.require for blacklisted paths.
            }
            var nsImport = googmodule.extractGoogNamespaceImport(importPath);
            var forwardDeclarePrefix = "tsickle_forward_declare_" + ++this.forwardDeclareCounter;
            var moduleNamespace = nsImport !== null ?
                nsImport :
                this.host.pathToModuleName(this.sourceFile.fileName, importPath);
            // In TypeScript, importing a module for use in a type annotation does not cause a runtime load.
            // In Closure Compiler, goog.require'ing a module causes a runtime load, so emitting requires
            // here would cause a change in load order, which is observable (and can lead to errors).
            // Instead, goog.forwardDeclare types, which allows using them in type annotations without
            // causing a load. See below for the exception to the rule.
            // const forwardDeclarePrefix = goog.forwardDeclare(moduleNamespace)
            this.forwardDeclares.push(ts.createVariableStatement(undefined, ts.createVariableDeclarationList([ts.createVariableDeclaration(forwardDeclarePrefix, undefined, ts.createCall(ts.createPropertyAccess(ts.createIdentifier('goog'), 'forwardDeclare'), undefined, [ts.createLiteral(moduleNamespace)]))], ts.NodeFlags.Const)));
            this.forwardDeclaredModules.add(moduleSymbol);
            var exports = this.typeChecker.getExportsOfModule(moduleSymbol).map(function (e) {
                if (e.flags & ts.SymbolFlags.Alias) {
                    e = _this.typeChecker.getAliasedSymbol(e);
                }
                return e;
            });
            var hasValues = exports.some(function (e) {
                var isValue = (e.flags & ts.SymbolFlags.Value) !== 0;
                var isConstEnum = (e.flags & ts.SymbolFlags.ConstEnum) !== 0;
                // const enums are inlined by TypeScript (if preserveConstEnums=false), so there is never a
                // value import generated for them. That means for the purpose of force-importing modules,
                // they do not count as values. If preserveConstEnums=true, this shouldn't hurt.
                return isValue && !isConstEnum;
            });
            if (isExplicitImport && !hasValues) {
                // Closure Compiler's toolchain will drop files that are never goog.require'd *before* type
                // checking (e.g. when using --closure_entry_point or similar tools). This causes errors
                // complaining about values not matching 'NoResolvedType', or modules not having a certain
                // member.
                // To fix, explicitly goog.require() modules that only export types. This should usually not
                // cause breakages due to load order (as no symbols are accessible from the module - though
                // contrived code could observe changes in side effects).
                // This is a heuristic - if the module exports some values, but those are never imported,
                // the file will still end up not being imported. Hopefully modules that export values are
                // imported for their value in some place.
                // goog.require("${moduleNamespace}");
                var hardRequire = ts.createStatement(ts.createCall(ts.createPropertyAccess(ts.createIdentifier('goog'), 'require'), undefined, [transformer_util_1.createSingleQuoteStringLiteral(moduleNamespace)]));
                var comment = {
                    kind: ts.SyntaxKind.SingleLineCommentTrivia,
                    text: ' force type-only module to be loaded',
                    hasTrailingNewLine: true,
                    pos: -1,
                    end: -1,
                };
                ts.setSyntheticTrailingComments(hardRequire, [comment]);
                this.forwardDeclares.push(hardRequire);
            }
            try {
                for (var exports_1 = __values(exports), exports_1_1 = exports_1.next(); !exports_1_1.done; exports_1_1 = exports_1.next()) {
                    var sym = exports_1_1.value;
                    // goog: imports don't actually use the .default property that TS thinks they have.
                    var qualifiedName = nsImport && isDefaultImport ? forwardDeclarePrefix :
                        forwardDeclarePrefix + '.' + sym.name;
                    this.symbolsToAliasedNames.set(sym, qualifiedName);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (exports_1_1 && !exports_1_1.done && (_a = exports_1.return)) _a.call(exports_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
        };
        ModuleTypeTranslator.prototype.ensureSymbolDeclared = function (sym) {
            var decl = this.findExportedDeclaration(sym);
            if (!decl)
                return;
            if (this.isForExterns) {
                this.error(decl, "declaration from module used in ambient type: " + sym.name);
                return;
            }
            // Actually import the symbol.
            var sourceFile = decl.getSourceFile();
            if (sourceFile === ts.getOriginalNode(this.sourceFile))
                return;
            var moduleSymbol = this.typeChecker.getSymbolAtLocation(sourceFile);
            // A source file might not have a symbol if it's not a module (no ES6 im/exports).
            if (!moduleSymbol)
                return;
            // TODO(martinprobst): this should possibly use fileNameToModuleId.
            this.forwardDeclare(sourceFile.fileName, moduleSymbol, false);
        };
        ModuleTypeTranslator.prototype.insertForwardDeclares = function (sourceFile) {
            var insertion = 0;
            // Skip over a leading file comment holder.
            if (sourceFile.statements.length &&
                sourceFile.statements[0].kind === ts.SyntaxKind.NotEmittedStatement) {
                insertion++;
            }
            return ts.updateSourceFileNode(sourceFile, __spread(sourceFile.statements.slice(0, insertion), this.forwardDeclares, sourceFile.statements.slice(insertion)));
        };
        /**
         * Parses and synthesizes comments on node, and returns the JSDoc from it, if any.
         * @param reportWarnings if true, will report warnings from parsing the JSDoc. Set to false if
         *     this is not the "main" location dealing with a node to avoid duplicated warnings.
         */
        ModuleTypeTranslator.prototype.getJSDoc = function (node, reportWarnings) {
            var _a = __read(this.parseJSDoc(node, reportWarnings), 1), tags = _a[0];
            return tags;
        };
        ModuleTypeTranslator.prototype.getMutableJSDoc = function (node) {
            var _a = __read(this.parseJSDoc(node, /* reportWarnings */ true), 2), tags = _a[0], comment = _a[1];
            return new MutableJSDoc(node, comment, tags);
        };
        ModuleTypeTranslator.prototype.parseJSDoc = function (node, reportWarnings) {
            // synthesizeLeadingComments below changes text locations for node, so extract the location here
            // in case it is needed later to report diagnostics.
            var start = node.getFullStart();
            var length = node.getLeadingTriviaWidth(this.sourceFile);
            var comments = jsdoc.synthesizeLeadingComments(node);
            if (!comments || comments.length === 0)
                return [[], null];
            for (var i = comments.length - 1; i >= 0; i--) {
                var comment = comments[i];
                var parsed = jsdoc.parse(comment);
                if (parsed) {
                    if (reportWarnings && parsed.warnings) {
                        var range = comment.originalRange || { pos: start, end: start + length };
                        transformer_util_1.reportDiagnostic(this.diagnostics, node, parsed.warnings.join('\n'), range, ts.DiagnosticCategory.Warning);
                    }
                    return [parsed.tags, comment];
                }
            }
            return [[], null];
        };
        ModuleTypeTranslator.prototype.blacklistTypeParameters = function (context, decls) {
            this.newTypeTranslator(context).blacklistTypeParameters(this.symbolsToAliasedNames, decls);
        };
        /**
         * Creates the jsdoc for methods, including overloads.
         * If overloaded, merges the signatures in the list of SignatureDeclarations into a single jsdoc.
         * - Total number of parameters will be the maximum count found across all variants.
         * - Different names at the same parameter index will be joined with "_or_"
         * - Variable args (...type[] in TypeScript) will be output as "...type",
         *    except if found at the same index as another argument.
         * @param fnDecls Pass > 1 declaration for overloads of same name
         * @return The list of parameter names that should be used to emit the actual
         *    function statement; for overloads, name will have been merged.
         */
        ModuleTypeTranslator.prototype.getFunctionTypeJSDoc = function (fnDecls, extraTags) {
            if (extraTags === void 0) { extraTags = []; }
            var e_2, _a, e_3, _b, e_4, _c, e_5, _d, e_6, _e, e_7, _f;
            var typeChecker = this.typeChecker;
            // De-duplicate tags and docs found for the fnDecls.
            var tagsByName = new Map();
            function addTag(tag) {
                var existing = tagsByName.get(tag.tagName);
                tagsByName.set(tag.tagName, existing ? jsdoc.merge([existing, tag]) : tag);
            }
            try {
                for (var extraTags_1 = __values(extraTags), extraTags_1_1 = extraTags_1.next(); !extraTags_1_1.done; extraTags_1_1 = extraTags_1.next()) {
                    var extraTag = extraTags_1_1.value;
                    addTag(extraTag);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (extraTags_1_1 && !extraTags_1_1.done && (_a = extraTags_1.return)) _a.call(extraTags_1);
                }
                finally { if (e_2) throw e_2.error; }
            }
            var lens = fnDecls.map(function (fnDecl) { return fnDecl.parameters.length; });
            var minArgsCount = Math.min.apply(Math, __spread(lens));
            var maxArgsCount = Math.max.apply(Math, __spread(lens));
            var isConstructor = fnDecls.find(function (d) { return d.kind === ts.SyntaxKind.Constructor; }) !== undefined;
            // For each parameter index i, paramTags[i] is an array of parameters
            // that can be found at index i.  E.g.
            //    function foo(x: string)
            //    function foo(y: number, z: string)
            // then paramTags[0] = [info about x, info about y].
            var paramTags = [];
            var returnTags = [];
            var typeParameterNames = new Set();
            var thisReturnType = null;
            try {
                for (var fnDecls_1 = __values(fnDecls), fnDecls_1_1 = fnDecls_1.next(); !fnDecls_1_1.done; fnDecls_1_1 = fnDecls_1.next()) {
                    var fnDecl = fnDecls_1_1.value;
                    // Construct the JSDoc comment by reading the existing JSDoc, if
                    // any, and merging it with the known types of the function
                    // parameters and return type.
                    var tags = this.getJSDoc(fnDecl, /* reportWarnings */ false);
                    try {
                        // Copy all the tags other than @param/@return into the new
                        // JSDoc without any change; @param/@return are handled specially.
                        // TODO: there may be problems if an annotation doesn't apply to all overloads;
                        // is it worth checking for this and erroring?
                        for (var tags_1 = __values(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
                            var tag = tags_1_1.value;
                            if (tag.tagName === 'param' || tag.tagName === 'return')
                                continue;
                            addTag(tag);
                        }
                    }
                    catch (e_4_1) { e_4 = { error: e_4_1 }; }
                    finally {
                        try {
                            if (tags_1_1 && !tags_1_1.done && (_c = tags_1.return)) _c.call(tags_1);
                        }
                        finally { if (e_4) throw e_4.error; }
                    }
                    // Add @abstract on "abstract" declarations.
                    if (transformer_util_1.hasModifierFlag(fnDecl, ts.ModifierFlags.Abstract)) {
                        addTag({ tagName: 'abstract' });
                    }
                    // Add any @template tags.
                    // Multiple declarations with the same template variable names should work:
                    // the declarations get turned into union types, and Closure Compiler will need
                    // to find a union where all type arguments are satisfied.
                    if (fnDecl.typeParameters) {
                        try {
                            for (var _g = __values(fnDecl.typeParameters), _h = _g.next(); !_h.done; _h = _g.next()) {
                                var tp = _h.value;
                                typeParameterNames.add(transformer_util_1.getIdentifierText(tp.name));
                            }
                        }
                        catch (e_5_1) { e_5 = { error: e_5_1 }; }
                        finally {
                            try {
                                if (_h && !_h.done && (_d = _g.return)) _d.call(_g);
                            }
                            finally { if (e_5) throw e_5.error; }
                        }
                    }
                    // Merge the parameters into a single list of merged names and list of types
                    var sig = typeChecker.getSignatureFromDeclaration(fnDecl);
                    if (!sig || !sig.declaration)
                        throw new Error("invalid signature " + fnDecl.name);
                    if (sig.declaration.kind === ts.SyntaxKindJSDocSignature) {
                        throw new Error("JSDoc signature " + fnDecl.name);
                    }
                    for (var i = 0; i < sig.declaration.parameters.length; i++) {
                        var paramNode = sig.declaration.parameters[i];
                        var name_2 = getParameterName(paramNode, i);
                        var isThisParam = name_2 === 'this';
                        var newTag = {
                            tagName: isThisParam ? 'this' : 'param',
                            optional: paramNode.initializer !== undefined || paramNode.questionToken !== undefined,
                            parameterName: isThisParam ? undefined : name_2,
                        };
                        var type = typeChecker.getTypeAtLocation(paramNode);
                        if (paramNode.dotDotDotToken !== undefined) {
                            newTag.restParam = true;
                            // In TypeScript you write "...x: number[]", but in Closure
                            // you don't write the array: "@param {...number} x".  Unwrap
                            // the Array<> wrapper.
                            var typeRef = type;
                            if (!typeRef.typeArguments)
                                throw new Error('invalid rest param');
                            type = typeRef.typeArguments[0];
                        }
                        newTag.type = this.typeToClosure(fnDecl, type);
                        try {
                            for (var tags_2 = __values(tags), tags_2_1 = tags_2.next(); !tags_2_1.done; tags_2_1 = tags_2.next()) {
                                var _j = tags_2_1.value, tagName = _j.tagName, parameterName = _j.parameterName, text = _j.text;
                                if (tagName === 'param' && parameterName === newTag.parameterName) {
                                    newTag.text = text;
                                    break;
                                }
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (tags_2_1 && !tags_2_1.done && (_e = tags_2.return)) _e.call(tags_2);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                        if (!paramTags[i])
                            paramTags.push([]);
                        paramTags[i].push(newTag);
                    }
                    // Return type.
                    if (!isConstructor) {
                        var returnTag = {
                            tagName: 'return',
                        };
                        var retType = typeChecker.getReturnTypeOfSignature(sig);
                        // tslint:disable-next-line:no-any accessing TS internal field.
                        if (retType.isThisType) {
                            // foo(): this
                            thisReturnType = retType;
                            addTag({ tagName: 'template', text: 'THIS' });
                            addTag({ tagName: 'this', type: 'THIS' });
                            returnTag.type = 'THIS';
                        }
                        else {
                            returnTag.type = this.typeToClosure(fnDecl, retType);
                            try {
                                for (var tags_3 = __values(tags), tags_3_1 = tags_3.next(); !tags_3_1.done; tags_3_1 = tags_3.next()) {
                                    var _k = tags_3_1.value, tagName = _k.tagName, text = _k.text;
                                    if (tagName === 'return') {
                                        returnTag.text = text;
                                        break;
                                    }
                                }
                            }
                            catch (e_7_1) { e_7 = { error: e_7_1 }; }
                            finally {
                                try {
                                    if (tags_3_1 && !tags_3_1.done && (_f = tags_3.return)) _f.call(tags_3);
                                }
                                finally { if (e_7) throw e_7.error; }
                            }
                        }
                        returnTags.push(returnTag);
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (fnDecls_1_1 && !fnDecls_1_1.done && (_b = fnDecls_1.return)) _b.call(fnDecls_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            if (typeParameterNames.size > 0) {
                addTag({ tagName: 'template', text: Array.from(typeParameterNames.values()).join(', ') });
            }
            var newDoc = Array.from(tagsByName.values());
            // Merge the JSDoc tags for each overloaded parameter.
            // Ensure each parameter has a unique name; the merging process can otherwise
            // accidentally generate the same parameter name twice.
            var paramNames = new Set();
            var foundOptional = false;
            for (var i = 0; i < maxArgsCount; i++) {
                var paramTag = jsdoc.merge(paramTags[i]);
                if (paramNames.has(paramTag.parameterName)) {
                    paramTag.parameterName += i.toString();
                }
                paramNames.add(paramTag.parameterName);
                // If the tag is optional, mark parameters following optional as optional,
                // even if they are not, since Closure restricts this, see
                // https://github.com/google/closure-compiler/issues/2314
                if (!paramTag.restParam && (paramTag.optional || foundOptional || i >= minArgsCount)) {
                    foundOptional = true;
                    paramTag.optional = true;
                }
                newDoc.push(paramTag);
                if (paramTag.restParam) {
                    // Cannot have any parameters after a rest param.
                    // Just dump the remaining parameters.
                    break;
                }
            }
            // Merge the JSDoc tags for each overloaded return.
            if (!isConstructor) {
                newDoc.push(jsdoc.merge(returnTags));
            }
            return {
                tags: newDoc,
                parameterNames: newDoc.filter(function (t) { return t.tagName === 'param'; }).map(function (t) { return t.parameterName; }),
                thisReturnType: thisReturnType,
            };
        };
        return ModuleTypeTranslator;
    }());
    exports.ModuleTypeTranslator = ModuleTypeTranslator;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlX3R5cGVfdHJhbnNsYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVfdHlwZV90cmFuc2xhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUg7Ozs7T0FJRztJQUVILG1EQUEyQztJQUMzQyx5Q0FBaUM7SUFFakMsaUVBQTRJO0lBQzVJLDREQUFvRDtJQUNwRCwyQ0FBbUM7SUFFbkM7OztPQUdHO0lBQ0g7UUFDRSxzQkFDWSxJQUFhLEVBQVUsYUFBeUMsRUFDakUsSUFBaUI7WUFEaEIsU0FBSSxHQUFKLElBQUksQ0FBUztZQUFVLGtCQUFhLEdBQWIsYUFBYSxDQUE0QjtZQUNqRSxTQUFJLEdBQUosSUFBSSxDQUFhO1FBQUcsQ0FBQztRQUVoQyxvQ0FBYSxHQUFiLFVBQWMsZUFBNkI7WUFDekMsSUFBTSxJQUFJLEdBQUcsS0FBSyxDQUFDLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxDQUFDLENBQUM7WUFDdkUsSUFBSSxJQUFJLENBQUMsYUFBYSxFQUFFO2dCQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNULGtDQUFrQztvQkFDbEMsSUFBTSxVQUFRLEdBQUcsRUFBRSxDQUFDLDJCQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUUsQ0FBQztvQkFDNUQsSUFBTSxHQUFHLEdBQUcsVUFBUSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7b0JBQ2pELFVBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUN4QixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztvQkFDMUIsT0FBTztpQkFDUjtnQkFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7Z0JBQy9CLE9BQU87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SSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzthQUN0QztZQUVELE9BQU87Z0JBQ0wsSUFBSSxFQUFFLE1BQU07Z0JBQ1osY0FBYyxFQUFFLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsT0FBTyxLQUFLLE9BQU8sRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxhQUFjLEVBQWhCLENBQWdCLENBQUM7Z0JBQ3BGLGNBQWMsZ0JBQUE7YUFDZixDQUFDO1FBQ0osQ0FBQztRQUNILDJCQUFDO0lBQUQsQ0FBQyxBQXhjRCxJQXdjQztJQXhjWSxvREFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBtb2R1bGVfdHlwZV90cmFuc2xhdG9yIGJ1aWxkcyBvbiB0b3Agb2YgdHlwZV90cmFuc2xhdG9yLCBhZGRpbmcgZnVuY3Rpb25hbGl0eSB0b1xuICogdHJhbnNsYXRlIHR5cGVzIHdpdGhpbiB0aGUgc2NvcGUgb2YgYSBzaW5nbGUgbW9kdWxlLiBUaGUgbWFpbiBlbnRyeSBwb2ludCBpc1xuICogTW9kdWxlVHlwZVRyYW5zbGF0b3IuXG4gKi9cblxuaW1wb3J0ICogYXMgZ29vZ21vZHVsZSBmcm9tICcuL2dvb2dtb2R1bGUnO1xuaW1wb3J0ICogYXMganNkb2MgZnJvbSAnLi9qc2RvYyc7XG5pbXBvcnQge0Fubm90YXRvckhvc3QsIGlzQW1iaWVudH0gZnJvbSAnLi9qc2RvY190cmFuc2Zvcm1lcic7XG5pbXBvcnQge2NyZWF0ZVNpbmdsZVF1b3RlU3RyaW5nTGl0ZXJhbCwgZ2V0SWRlbnRpZmllclRleHQsIGhhc01vZGlmaWVyRmxhZywgcmVwb3J0RGVidWdXYXJuaW5nLCByZXBvcnREaWFnbm9zdGljfSBmcm9tICcuL3RyYW5zZm9ybWVyX3V0aWwnO1xuaW1wb3J0ICogYXMgdHlwZVRyYW5zbGF0b3IgZnJvbSAnLi90eXBlX3RyYW5zbGF0b3InO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAnLi90eXBlc2NyaXB0JztcblxuLyoqXG4gKiBNdXRhYmxlSlNEb2MgZW5jYXBzdWxhdGVzIGEgKHBvdGVudGlhbCkgSlNEb2MgY29tbWVudCBvbiBhIHNwZWNpZmljIG5vZGUsIGFuZCBhbGxvd3MgY29kZSB0b1xuICogbW9kaWZ5IChpbmNsdWRpbmcgZGVsZXRlKSBpdC5cbiAqL1xuZXhwb3J0IGNsYXNzIE11dGFibGVKU0RvYyB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBub2RlOiB0cy5Ob2RlLCBwcml2YXRlIHNvdXJjZUNvbW1lbnQ6IHRzLlN5bnRoZXNpemVkQ29tbWVudHxudWxsLFxuICAgICAgcHVibGljIHRhZ3M6IGpzZG9jLlRhZ1tdKSB7fVxuXG4gIHVwZGF0ZUNvbW1lbnQoZXNjYXBlRXh0cmFUYWdzPzogU2V0PHN0cmluZz4pIHtcbiAgICBjb25zdCB0ZXh0ID0ganNkb2MudG9TdHJpbmdXaXRob3V0U3RhcnRFbmQodGhpcy50YWdzLCBlc2NhcGVFeHRyYVRhZ3MpO1xuICAgIGlmICh0aGlzLnNvdXJjZUNvbW1lbnQpIHtcbiAgICAgIGlmICghdGV4dCkge1xuICAgICAgICAvLyBEZWxldGUgdGhlIChub3cgZW1wdHkpIGNvbW1lbnQuXG4gICAgICAgIGNvbnN0IGNvbW1lbnRzID0gdHMuZ2V0U3ludGhldGljTGVhZGluZ0NvbW1lbnRzKHRoaXMubm9kZSkhO1xuICAgICAgICBjb25zdCBpZHggPSBjb21tZW50cy5pbmRleE9mKHRoaXMuc291cmNlQ29tbWVudCk7XG4gICAgICAgIGNvbW1lbnRzLnNwbGljZShpZHgsIDEpO1xuICAgICAgICB0aGlzLnNvdXJjZUNvbW1lbnQgPSBudWxsO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnNvdXJjZUNvbW1lbnQudGV4dCA9IHRleHQ7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gRG9uJ3QgYWRkIGFuIGVtcHR5IGNvbW1lbnQuXG4gICAgaWYgKCF0ZXh0KSByZXR1cm47XG5cbiAgICBjb25zdCBjb21tZW50OiB0cy5TeW50aGVzaXplZENvbW1lbnQgPSB7XG4gICAgICBraW5kOiB0cy5TeW50YXhLaW5kLk11bHRpTGluZUNvbW1lbnRUcml2aWEsXG4gICAgICB0ZXh0LFxuICAgICAgaGFzVHJhaWxpbmdOZXdMaW5lOiB0cnVlLFxuICAgICAgcG9zOiAtMSxcbiAgICAgIGVuZDogLTEsXG4gICAgfTtcbiAgICBjb25zdCBjb21tZW50cyA9IHRzLmdldFN5bnRoZXRpY0xlYWRpbmdDb21tZW50cyh0aGlzLm5vZGUpIHx8IFtdO1xuICAgIGNvbW1lbnRzLnB1c2goY29tbWVudCk7XG4gICAgdHMuc2V0U3ludGhldGljTGVhZGluZ0NvbW1lbnRzKHRoaXMubm9kZSwgY29tbWVudHMpO1xuICB9XG59XG5cbi8qKiBSZXR1cm5zIHRoZSBDbG9zdXJlIG5hbWUgb2YgYSBmdW5jdGlvbiBwYXJhbWV0ZXIsIHNwZWNpYWwtY2FzaW5nIGRlc3RydWN0dXJpbmcuICovXG5mdW5jdGlvbiBnZXRQYXJhbWV0ZXJOYW1lKHBhcmFtOiB0cy5QYXJhbWV0ZXJEZWNsYXJhdGlvbiwgaW5kZXg6IG51bWJlcik6IHN0cmluZyB7XG4gIHN3aXRjaCAocGFyYW0ubmFtZS5raW5kKSB7XG4gICAgY2FzZSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXI6XG4gICAgICBsZXQgbmFtZSA9IGdldElkZW50aWZpZXJUZXh0KHBhcmFtLm5hbWUgYXMgdHMuSWRlbnRpZmllcik7XG4gICAgICAvLyBUeXBlU2NyaXB0IGFsbG93cyBwYXJhbWV0ZXJzIG5hbWVkIFwiYXJndW1lbnRzXCIsIGJ1dCBDbG9zdXJlXG4gICAgICAvLyBkaXNhbGxvd3MgdGhpcywgZXZlbiBpbiBleHRlcm5zLlxuICAgICAgaWYgKG5hbWUgPT09ICdhcmd1bWVudHMnKSBuYW1lID0gJ3RzaWNrbGVfYXJndW1lbnRzJztcbiAgICAgIHJldHVybiBuYW1lO1xuICAgIGNhc2UgdHMuU3ludGF4S2luZC5BcnJheUJpbmRpbmdQYXR0ZXJuOlxuICAgIGNhc2UgdHMuU3ludGF4S2luZC5PYmplY3RCaW5kaW5nUGF0dGVybjpcbiAgICAgIC8vIENsb3N1cmUgY3Jhc2hlcyBpZiB5b3UgcHV0IGEgYmluZGluZyBwYXR0ZXJuIGluIHRoZSBleHRlcm5zLlxuICAgICAgLy8gQXZvaWQgdGhpcyBieSBqdXN0IGdlbmVyYXRpbmcgYW4gdW51c2VkIG5hbWU7IHRoZSBuYW1lIGlzXG4gICAgICAvLyBpZ25vcmVkIGFueXdheS5cbiAgICAgIHJldHVybiBgX18ke2luZGV4fWA7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vIFRoZSBhYm92ZSBsaXN0IG9mIGtpbmRzIGlzIGV4aGF1c3RpdmUuICBwYXJhbS5uYW1lIGlzICduZXZlcicgYXQgdGhpcyBwb2ludC5cbiAgICAgIGNvbnN0IHBhcmFtTmFtZSA9IHBhcmFtLm5hbWUgYXMgdHMuTm9kZTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgdW5oYW5kbGVkIGZ1bmN0aW9uIHBhcmFtZXRlciBraW5kOiAke3RzLlN5bnRheEtpbmRbcGFyYW1OYW1lLmtpbmRdfWApO1xuICB9XG59XG5cbi8qKlxuICogTW9kdWxlVHlwZVRyYW5zbGF0b3IgZW5jYXBzdWxhdGVzIGtub3dsZWRnZSBhbmQgaGVscGVyIGZ1bmN0aW9ucyB0byB0cmFuc2xhdGUgdHlwZXMgaW4gdGhlIHNjb3BlXG4gKiBvZiBhIHNwZWNpZmljIG1vZHVsZS4gVGhpcyBpbmNsdWRlcyBtYW5hZ2luZyBDbG9zdXJlIGZvcndhcmQgZGVjbGFyZSBzdGF0ZW1lbnRzIGFuZCBhbnkgc3ltYm9sXG4gKiBhbGlhc2VzIGluIHNjb3BlIGZvciBhIHdob2xlIGZpbGUuXG4gKi9cbmV4cG9ydCBjbGFzcyBNb2R1bGVUeXBlVHJhbnNsYXRvciB7XG4gIC8qKlxuICAgKiBBIG1hcHBpbmcgb2YgYWxpYXNlcyBmb3Igc3ltYm9scyBpbiB0aGUgY3VycmVudCBmaWxlLCB1c2VkIHdoZW4gZW1pdHRpbmcgdHlwZXMuIFR5cGVTY3JpcHRcbiAgICogZW1pdHMgaW1wb3J0ZWQgc3ltYm9scyB3aXRoIHVucHJlZGljdGFibGUgcHJlZml4ZXMuIFRvIGdlbmVyYXRlIGNvcnJlY3QgdHlwZSBhbm5vdGF0aW9ucyxcbiAgICogdHNpY2tsZSBjcmVhdGVzIGl0cyBvd24gYWxpYXNlcyBmb3IgdHlwZXMsIGFuZCByZWdpc3RlcnMgdGhlbSBpbiB0aGlzIG1hcCAoc2VlXG4gICAqIGBlbWl0SW1wb3J0RGVjbGFyYXRpb25gIGFuZCBgZm9yd2FyZERlY2xhcmUoKWAgYmVsb3cpLiBUaGUgYWxpYXNlcyBhcmUgdGhlbiB1c2VkIHdoZW4gZW1pdHRpbmdcbiAgICogdHlwZXMuXG4gICAqL1xuICBzeW1ib2xzVG9BbGlhc2VkTmFtZXMgPSBuZXcgTWFwPHRzLlN5bWJvbCwgc3RyaW5nPigpO1xuXG4gIC8qKlxuICAgKiBUaGUgc2V0IG9mIG1vZHVsZSBzeW1ib2xzIGZvcndhcmQgZGVjbGFyZWQgaW4gdGhlIGxvY2FsIG5hbWVzcGFjZSAod2l0aCBnb29nLmZvcndhckRlY2xhcmUpLlxuICAgKlxuICAgKiBTeW1ib2xzIG5vdCBpbXBvcnRlZCBtdXN0IGJlIGRlY2xhcmVkLCB3aGljaCBpcyBkb25lIGJ5IGFkZGluZyBmb3J3YXJkIGRlY2xhcmVzIHRvXG4gICAqIGBleHRyYUltcG9ydHNgIGJlbG93LlxuICAgKi9cbiAgcHJpdmF0ZSBmb3J3YXJkRGVjbGFyZWRNb2R1bGVzID0gbmV3IFNldDx0cy5TeW1ib2w+KCk7XG4gIC8qKlxuICAgKiBUaGUgbGlzdCBvZiBnZW5lcmF0ZWQgZ29vZy5mb3J3YXJkRGVjbGFyZSBzdGF0ZW1lbnRzIGZvciB0aGlzIG1vZHVsZS4gVGhlc2UgYXJlIGluc2VydGVkIGludG9cbiAgICogdGhlIG1vZHVsZSdzIGJvZHkgc3RhdGVtZW50cyBhZnRlciB0cmFuc2xhdGlvbi5cbiAgICovXG4gIHByaXZhdGUgZm9yd2FyZERlY2xhcmVzOiB0cy5TdGF0ZW1lbnRbXSA9IFtdO1xuICAvKiogQSBjb3VudGVyIHRvIGdlbmVyYXRlIHVuaXF1ZSBuYW1lcyBmb3IgZ29vZy5mb3J3YXJkRGVjbGFyZSB2YXJpYWJsZXMuICovXG4gIHByaXZhdGUgZm9yd2FyZERlY2xhcmVDb3VudGVyID0gMDtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHB1YmxpYyBzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlLFxuICAgICAgcHVibGljIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcixcbiAgICAgIHByaXZhdGUgaG9zdDogQW5ub3RhdG9ySG9zdCxcbiAgICAgIHByaXZhdGUgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSxcbiAgICAgIHByaXZhdGUgaXNGb3JFeHRlcm5zOiBib29sZWFuLFxuICApIHt9XG5cbiAgZGVidWdXYXJuKGNvbnRleHQ6IHRzLk5vZGUsIG1lc3NhZ2VUZXh0OiBzdHJpbmcpIHtcbiAgICByZXBvcnREZWJ1Z1dhcm5pbmcodGhpcy5ob3N0LCBjb250ZXh0LCBtZXNzYWdlVGV4dCk7XG4gIH1cblxuICBlcnJvcihub2RlOiB0cy5Ob2RlLCBtZXNzYWdlVGV4dDogc3RyaW5nKSB7XG4gICAgcmVwb3J0RGlhZ25vc3RpYyh0aGlzLmRpYWdub3N0aWNzLCBub2RlLCBtZXNzYWdlVGV4dCk7XG4gIH1cblxuICAvKipcbiAgICogQ29udmVydCBhIFR5cGVTY3JpcHQgdHMuVHlwZSBpbnRvIHRoZSBlcXVpdmFsZW50IENsb3N1cmUgdHlwZS5cbiAgICpcbiAgICogQHBhcmFtIGNvbnRleHQgVGhlIHRzLk5vZGUgY29udGFpbmluZyB0aGUgdHlwZSByZWZlcmVuY2U7IHVzZWQgZm9yIHJlc29sdmluZyBzeW1ib2xzXG4gICAqICAgICBpbiBjb250ZXh0LlxuICAgKiBAcGFyYW0gdHlwZSBUaGUgdHlwZSB0byB0cmFuc2xhdGU7IGlmIG5vdCBwcm92aWRlZCwgdGhlIE5vZGUncyB0eXBlIHdpbGwgYmUgdXNlZC5cbiAgICogQHBhcmFtIHJlc29sdmVBbGlhcyBJZiB0cnVlLCBkbyBub3QgZW1pdCBhbGlhc2VzIGFzIHRoZWlyIHN5bWJvbCwgYnV0IHJhdGhlciBhcyB0aGUgcmVzb2x2ZWRcbiAgICogICAgIHR5cGUgdW5kZXJseWluZyB0aGUgYWxpYXMuIFRoaXMgc2hvdWxkIGJlIHRydWUgb25seSB3aGVuIGVtaXR0aW5nIHRoZSB0eXBlZGVmIGl0c2VsZi5cbiAgICovXG4gIHR5cGVUb0Nsb3N1cmUoY29udGV4dDogdHMuTm9kZSwgdHlwZT86IHRzLlR5cGUpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLmhvc3QudW50eXBlZCkge1xuICAgICAgcmV0dXJuICc/JztcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlQ2hlY2tlciA9IHRoaXMudHlwZUNoZWNrZXI7XG4gICAgaWYgKCF0eXBlKSB7XG4gICAgICB0eXBlID0gdHlwZUNoZWNrZXIuZ2V0VHlwZUF0TG9jYXRpb24oY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5ld1R5cGVUcmFuc2xhdG9yKGNvbnRleHQpLnRyYW5zbGF0ZSh0eXBlKTtcbiAgfVxuXG4gIG5ld1R5cGVUcmFuc2xhdG9yKGNvbnRleHQ6IHRzLk5vZGUpIHtcbiAgICAvLyBJbiBleHRlcm5zLCB0aGVyZSBpcyBubyBsb2NhbCBzY29wZSwgc28gYWxsIHR5cGVzIG11c3QgYmUgcmVsYXRpdmUgdG8gdGhlIGZpbGUgbGV2ZWwgc2NvcGUuXG4gICAgY29uc3QgdHJhbnNsYXRpb25Db250ZXh0ID0gdGhpcy5pc0ZvckV4dGVybnMgPyB0aGlzLnNvdXJjZUZpbGUgOiBjb250ZXh0O1xuXG4gICAgY29uc3QgdHJhbnNsYXRvciA9IG5ldyB0eXBlVHJhbnNsYXRvci5UeXBlVHJhbnNsYXRvcihcbiAgICAgICAgdGhpcy5ob3N0LCB0aGlzLnR5cGVDaGVja2VyLCB0cmFuc2xhdGlvbkNvbnRleHQsIHRoaXMuaG9zdC50eXBlQmxhY2tMaXN0UGF0aHMsXG4gICAgICAgIHRoaXMuc3ltYm9sc1RvQWxpYXNlZE5hbWVzLCAoc3ltOiB0cy5TeW1ib2wpID0+IHRoaXMuZW5zdXJlU3ltYm9sRGVjbGFyZWQoc3ltKSk7XG4gICAgdHJhbnNsYXRvci5pc0ZvckV4dGVybnMgPSB0aGlzLmlzRm9yRXh0ZXJucztcbiAgICB0cmFuc2xhdG9yLndhcm4gPSBtc2cgPT4gdGhpcy5kZWJ1Z1dhcm4oY29udGV4dCwgbXNnKTtcbiAgICByZXR1cm4gdHJhbnNsYXRvcjtcbiAgfVxuXG4gIGlzQmxhY2tMaXN0ZWQoY29udGV4dDogdHMuTm9kZSkge1xuICAgIGNvbnN0IHR5cGUgPSB0aGlzLnR5cGVDaGVja2VyLmdldFR5cGVBdExvY2F0aW9uKGNvbnRleHQpO1xuICAgIGxldCBzeW0gPSB0eXBlLnN5bWJvbDtcbiAgICBpZiAoIXN5bSkgcmV0dXJuIGZhbHNlO1xuICAgIGlmIChzeW0uZmxhZ3MgJiB0cy5TeW1ib2xGbGFncy5BbGlhcykge1xuICAgICAgc3ltID0gdGhpcy50eXBlQ2hlY2tlci5nZXRBbGlhc2VkU3ltYm9sKHN5bSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLm5ld1R5cGVUcmFuc2xhdG9yKGNvbnRleHQpLmlzQmxhY2tMaXN0ZWQoc3ltKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRzLlN5bWJvbCBhdCBhIGxvY2F0aW9uIG9yIHRocm93LlxuICAgKiBUaGUgVHlwZVNjcmlwdCBBUEkgY2FuIHJldHVybiB1bmRlZmluZWQgd2hlbiBmZXRjaGluZyBhIHN5bWJvbCwgYnV0IGluIG1hbnkgY29udGV4dHMgd2Uga25vdyBpdFxuICAgKiB3b24ndCAoZS5nLiBvdXIgaW5wdXQgaXMgYWxyZWFkeSB0eXBlLWNoZWNrZWQpLlxuICAgKi9cbiAgbXVzdEdldFN5bWJvbEF0TG9jYXRpb24obm9kZTogdHMuTm9kZSk6IHRzLlN5bWJvbCB7XG4gICAgY29uc3Qgc3ltID0gdGhpcy50eXBlQ2hlY2tlci5nZXRTeW1ib2xBdExvY2F0aW9uKG5vZGUpO1xuICAgIGlmICghc3ltKSB0aHJvdyBuZXcgRXJyb3IoJ25vIHN5bWJvbCcpO1xuICAgIHJldHVybiBzeW07XG4gIH1cblxuICAvKiogRmluZHMgYW4gZXhwb3J0ZWQgKGkuZS4gbm90IGdsb2JhbCkgZGVjbGFyYXRpb24gZm9yIHRoZSBnaXZlbiBzeW1ib2wuICovXG4gIHByb3RlY3RlZCBmaW5kRXhwb3J0ZWREZWNsYXJhdGlvbihzeW06IHRzLlN5bWJvbCk6IHRzLkRlY2xhcmF0aW9ufHVuZGVmaW5lZCB7XG4gICAgLy8gVE9ETyhtYXJ0aW5wcm9ic3QpOiBpdCdzIHVuY2xlYXIgd2hlbiBhIHN5bWJvbCB3b3VsZG4ndCBoYXZlIGEgZGVjbGFyYXRpb24sIG1heWJlIGp1c3QgZm9yXG4gICAgLy8gc29tZSBidWlsdGlucyAoZS5nLiBTeW1ib2wpP1xuICAgIGlmICghc3ltLmRlY2xhcmF0aW9ucyB8fCBzeW0uZGVjbGFyYXRpb25zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAvLyBBIHN5bWJvbCBkZWNsYXJlZCBpbiB0aGlzIGZpbGUgZG9lcyBub3QgbmVlZCB0byBiZSBpbXBvcnRlZC5cbiAgICBpZiAoc3ltLmRlY2xhcmF0aW9ucy5zb21lKGQgPT4gZC5nZXRTb3VyY2VGaWxlKCkgPT09IHRoaXMuc291cmNlRmlsZSkpIHJldHVybiB1bmRlZmluZWQ7XG5cbiAgICAvLyBGaW5kIGFuIGV4cG9ydGVkIGRlY2xhcmF0aW9uLlxuICAgIC8vIEJlY2F1c2UgdHNpY2tsZSBydW5zIHdpdGggdGhlIC0tZGVjbGFyYXRpb24gZmxhZywgYWxsIHR5cGVzIHJlZmVyZW5jZWQgZnJvbSBleHBvcnRlZCB0eXBlc1xuICAgIC8vIG11c3QgYmUgZXhwb3J0ZWQsIHRvbywgc28gdGhlcmUgbXVzdCBlaXRoZXIgYmUgc29tZSBkZWNsYXJhdGlvbiB0aGF0IGlzIGV4cG9ydGVkLCBvciB0aGVcbiAgICAvLyBzeW1ib2wgaXMgYWN0dWFsbHkgYSBnbG9iYWwgZGVjbGFyYXRpb24gKGRlY2xhcmVkIGluIGEgc2NyaXB0IGZpbGUsIG5vdCBhIG1vZHVsZSkuXG4gICAgY29uc3QgZGVjbCA9IHN5bS5kZWNsYXJhdGlvbnMuZmluZChkID0+IHtcbiAgICAgIC8vIENoZWNrIGZvciBFeHBvcnQgfCBEZWZhdWx0IChkZWZhdWx0IGJlaW5nIGEgZGVmYXVsdCBleHBvcnQpLlxuICAgICAgaWYgKCFoYXNNb2RpZmllckZsYWcoZCwgdHMuTW9kaWZpZXJGbGFncy5FeHBvcnREZWZhdWx0KSkgcmV0dXJuIGZhbHNlO1xuICAgICAgLy8gRXhjbHVkZSBzeW1ib2xzIGRlY2xhcmVkIGluIGBkZWNsYXJlIGdsb2JhbCB7Li4ufWAgYmxvY2tzLCB0aGV5IGFyZSBnbG9iYWwgYW5kIGRvbid0IG5lZWRcbiAgICAgIC8vIGltcG9ydHMuXG4gICAgICBsZXQgY3VycmVudDogdHMuTm9kZXx1bmRlZmluZWQgPSBkO1xuICAgICAgd2hpbGUgKGN1cnJlbnQpIHtcbiAgICAgICAgaWYgKGN1cnJlbnQuZmxhZ3MgJiB0cy5Ob2RlRmxhZ3MuR2xvYmFsQXVnbWVudGF0aW9uKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGN1cnJlbnQgPSBjdXJyZW50LnBhcmVudDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuICAgIHJldHVybiBkZWNsO1xuICB9XG5cbiAgLyoqXG4gICAqIFJldHVybnMgdGhlIGBjb25zdCB4ID0gZ29vZy5mb3J3YXJkRGVjbGFyZS4uLmAgdGV4dCBmb3IgYW4gaW1wb3J0IG9mIHRoZSBnaXZlbiBgaW1wb3J0UGF0aGAuXG4gICAqIFRoaXMgYWxzbyByZWdpc3RlcnMgYWxpYXNlcyBmb3Igc3ltYm9scyBmcm9tIHRoZSBtb2R1bGUgdGhhdCBtYXAgdG8gdGhpcyBmb3J3YXJkIGRlY2xhcmUuXG4gICAqL1xuICBmb3J3YXJkRGVjbGFyZShcbiAgICAgIGltcG9ydFBhdGg6IHN0cmluZywgbW9kdWxlU3ltYm9sOiB0cy5TeW1ib2wsIGlzRXhwbGljaXRJbXBvcnQ6IGJvb2xlYW4sXG4gICAgICBpc0RlZmF1bHRJbXBvcnQgPSBmYWxzZSkge1xuICAgIGlmICh0aGlzLmhvc3QudW50eXBlZCkgcmV0dXJuO1xuICAgIC8vIEFscmVhZHkgaW1wb3J0ZWQ/IERvIG5vdCBlbWl0IGEgZHVwbGljYXRlIGZvcndhcmQgZGVjbGFyZS5cbiAgICBpZiAodGhpcy5mb3J3YXJkRGVjbGFyZWRNb2R1bGVzLmhhcyhtb2R1bGVTeW1ib2wpKSByZXR1cm47XG4gICAgaWYgKHRoaXMuaG9zdC50eXBlQmxhY2tMaXN0UGF0aHMgJiYgdGhpcy5ob3N0LnR5cGVCbGFja0xpc3RQYXRocy5oYXMoaW1wb3J0UGF0aCkpIHtcbiAgICAgIHJldHVybjsgIC8vIERvIG5vdCBlbWl0IGdvb2cuZm9yd2FyZERlY2xhcmUgb3IgZ29vZy5yZXF1aXJlIGZvciBibGFja2xpc3RlZCBwYXRocy5cbiAgICB9XG4gICAgY29uc3QgbnNJbXBvcnQgPSBnb29nbW9kdWxlLmV4dHJhY3RHb29nTmFtZXNwYWNlSW1wb3J0KGltcG9ydFBhdGgpO1xuICAgIGNvbnN0IGZvcndhcmREZWNsYXJlUHJlZml4ID0gYHRzaWNrbGVfZm9yd2FyZF9kZWNsYXJlXyR7Kyt0aGlzLmZvcndhcmREZWNsYXJlQ291bnRlcn1gO1xuICAgIGNvbnN0IG1vZHVsZU5hbWVzcGFjZSA9IG5zSW1wb3J0ICE9PSBudWxsID9cbiAgICAgICAgbnNJbXBvcnQgOlxuICAgICAgICB0aGlzLmhvc3QucGF0aFRvTW9kdWxlTmFtZSh0aGlzLnNvdXJjZUZpbGUuZmlsZU5hbWUsIGltcG9ydFBhdGgpO1xuXG4gICAgLy8gSW4gVHlwZVNjcmlwdCwgaW1wb3J0aW5nIGEgbW9kdWxlIGZvciB1c2UgaW4gYSB0eXBlIGFubm90YXRpb24gZG9lcyBub3QgY2F1c2UgYSBydW50aW1lIGxvYWQuXG4gICAgLy8gSW4gQ2xvc3VyZSBDb21waWxlciwgZ29vZy5yZXF1aXJlJ2luZyBhIG1vZHVsZSBjYXVzZXMgYSBydW50aW1lIGxvYWQsIHNvIGVtaXR0aW5nIHJlcXVpcmVzXG4gICAgLy8gaGVyZSB3b3VsZCBjYXVzZSBhIGNoYW5nZSBpbiBsb2FkIG9yZGVyLCB3aGljaCBpcyBvYnNlcnZhYmxlIChhbmQgY2FuIGxlYWQgdG8gZXJyb3JzKS5cbiAgICAvLyBJbnN0ZWFkLCBnb29nLmZvcndhcmREZWNsYXJlIHR5cGVzLCB3aGljaCBhbGxvd3MgdXNpbmcgdGhlbSBpbiB0eXBlIGFubm90YXRpb25zIHdpdGhvdXRcbiAgICAvLyBjYXVzaW5nIGEgbG9hZC4gU2VlIGJlbG93IGZvciB0aGUgZXhjZXB0aW9uIHRvIHRoZSBydWxlLlxuICAgIC8vIGNvbnN0IGZvcndhcmREZWNsYXJlUHJlZml4ID0gZ29vZy5mb3J3YXJkRGVjbGFyZShtb2R1bGVOYW1lc3BhY2UpXG4gICAgdGhpcy5mb3J3YXJkRGVjbGFyZXMucHVzaCh0cy5jcmVhdGVWYXJpYWJsZVN0YXRlbWVudChcbiAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICB0cy5jcmVhdGVWYXJpYWJsZURlY2xhcmF0aW9uTGlzdChcbiAgICAgICAgICAgIFt0cy5jcmVhdGVWYXJpYWJsZURlY2xhcmF0aW9uKFxuICAgICAgICAgICAgICAgIGZvcndhcmREZWNsYXJlUHJlZml4LCB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdHMuY3JlYXRlQ2FsbChcbiAgICAgICAgICAgICAgICAgICAgdHMuY3JlYXRlUHJvcGVydHlBY2Nlc3ModHMuY3JlYXRlSWRlbnRpZmllcignZ29vZycpLCAnZm9yd2FyZERlY2xhcmUnKSxcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkLCBbdHMuY3JlYXRlTGl0ZXJhbChtb2R1bGVOYW1lc3BhY2UpXSkpXSxcbiAgICAgICAgICAgIHRzLk5vZGVGbGFncy5Db25zdCkpKTtcbiAgICB0aGlzLmZvcndhcmREZWNsYXJlZE1vZHVsZXMuYWRkKG1vZHVsZVN5bWJvbCk7XG4gICAgY29uc3QgZXhwb3J0cyA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0RXhwb3J0c09mTW9kdWxlKG1vZHVsZVN5bWJvbCkubWFwKGUgPT4ge1xuICAgICAgaWYgKGUuZmxhZ3MgJiB0cy5TeW1ib2xGbGFncy5BbGlhcykge1xuICAgICAgICBlID0gdGhpcy50eXBlQ2hlY2tlci5nZXRBbGlhc2VkU3ltYm9sKGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGU7XG4gICAgfSk7XG4gICAgY29uc3QgaGFzVmFsdWVzID0gZXhwb3J0cy5zb21lKGUgPT4ge1xuICAgICAgY29uc3QgaXNWYWx1ZSA9IChlLmZsYWdzICYgdHMuU3ltYm9sRmxhZ3MuVmFsdWUpICE9PSAwO1xuICAgICAgY29uc3QgaXNDb25zdEVudW0gPSAoZS5mbGFncyAmIHRzLlN5bWJvbEZsYWdzLkNvbnN0RW51bSkgIT09IDA7XG4gICAgICAvLyBjb25zdCBlbnVtcyBhcmUgaW5saW5lZCBieSBUeXBlU2NyaXB0IChpZiBwcmVzZXJ2ZUNvbnN0RW51bXM9ZmFsc2UpLCBzbyB0aGVyZSBpcyBuZXZlciBhXG4gICAgICAvLyB2YWx1ZSBpbXBvcnQgZ2VuZXJhdGVkIGZvciB0aGVtLiBUaGF0IG1lYW5zIGZvciB0aGUgcHVycG9zZSBvZiBmb3JjZS1pbXBvcnRpbmcgbW9kdWxlcyxcbiAgICAgIC8vIHRoZXkgZG8gbm90IGNvdW50IGFzIHZhbHVlcy4gSWYgcHJlc2VydmVDb25zdEVudW1zPXRydWUsIHRoaXMgc2hvdWxkbid0IGh1cnQuXG4gICAgICByZXR1cm4gaXNWYWx1ZSAmJiAhaXNDb25zdEVudW07XG4gICAgfSk7XG4gICAgaWYgKGlzRXhwbGljaXRJbXBvcnQgJiYgIWhhc1ZhbHVlcykge1xuICAgICAgLy8gQ2xvc3VyZSBDb21waWxlcidzIHRvb2xjaGFpbiB3aWxsIGRyb3AgZmlsZXMgdGhhdCBhcmUgbmV2ZXIgZ29vZy5yZXF1aXJlJ2QgKmJlZm9yZSogdHlwZVxuICAgICAgLy8gY2hlY2tpbmcgKGUuZy4gd2hlbiB1c2luZyAtLWNsb3N1cmVfZW50cnlfcG9pbnQgb3Igc2ltaWxhciB0b29scykuIFRoaXMgY2F1c2VzIGVycm9yc1xuICAgICAgLy8gY29tcGxhaW5pbmcgYWJvdXQgdmFsdWVzIG5vdCBtYXRjaGluZyAnTm9SZXNvbHZlZFR5cGUnLCBvciBtb2R1bGVzIG5vdCBoYXZpbmcgYSBjZXJ0YWluXG4gICAgICAvLyBtZW1iZXIuXG4gICAgICAvLyBUbyBmaXgsIGV4cGxpY2l0bHkgZ29vZy5yZXF1aXJlKCkgbW9kdWxlcyB0aGF0IG9ubHkgZXhwb3J0IHR5cGVzLiBUaGlzIHNob3VsZCB1c3VhbGx5IG5vdFxuICAgICAgLy8gY2F1c2UgYnJlYWthZ2VzIGR1ZSB0byBsb2FkIG9yZGVyIChhcyBubyBzeW1ib2xzIGFyZSBhY2Nlc3NpYmxlIGZyb20gdGhlIG1vZHVsZSAtIHRob3VnaFxuICAgICAgLy8gY29udHJpdmVkIGNvZGUgY291bGQgb2JzZXJ2ZSBjaGFuZ2VzIGluIHNpZGUgZWZmZWN0cykuXG4gICAgICAvLyBUaGlzIGlzIGEgaGV1cmlzdGljIC0gaWYgdGhlIG1vZHVsZSBleHBvcnRzIHNvbWUgdmFsdWVzLCBidXQgdGhvc2UgYXJlIG5ldmVyIGltcG9ydGVkLFxuICAgICAgLy8gdGhlIGZpbGUgd2lsbCBzdGlsbCBlbmQgdXAgbm90IGJlaW5nIGltcG9ydGVkLiBIb3BlZnVsbHkgbW9kdWxlcyB0aGF0IGV4cG9ydCB2YWx1ZXMgYXJlXG4gICAgICAvLyBpbXBvcnRlZCBmb3IgdGhlaXIgdmFsdWUgaW4gc29tZSBwbGFjZS5cbiAgICAgIC8vIGdvb2cucmVxdWlyZShcIiR7bW9kdWxlTmFtZXNwYWNlfVwiKTtcbiAgICAgIGNvbnN0IGhhcmRSZXF1aXJlID0gdHMuY3JlYXRlU3RhdGVtZW50KHRzLmNyZWF0ZUNhbGwoXG4gICAgICAgICAgdHMuY3JlYXRlUHJvcGVydHlBY2Nlc3ModHMuY3JlYXRlSWRlbnRpZmllcignZ29vZycpLCAncmVxdWlyZScpLCB1bmRlZmluZWQsXG4gICAgICAgICAgW2NyZWF0ZVNpbmdsZVF1b3RlU3RyaW5nTGl0ZXJhbChtb2R1bGVOYW1lc3BhY2UpXSkpO1xuICAgICAgY29uc3QgY29tbWVudDogdHMuU3ludGhlc2l6ZWRDb21tZW50ID0ge1xuICAgICAgICBraW5kOiB0cy5TeW50YXhLaW5kLlNpbmdsZUxpbmVDb21tZW50VHJpdmlhLFxuICAgICAgICB0ZXh0OiAnIGZvcmNlIHR5cGUtb25seSBtb2R1bGUgdG8gYmUgbG9hZGVkJyxcbiAgICAgICAgaGFzVHJhaWxpbmdOZXdMaW5lOiB0cnVlLFxuICAgICAgICBwb3M6IC0xLFxuICAgICAgICBlbmQ6IC0xLFxuICAgICAgfTtcbiAgICAgIHRzLnNldFN5bnRoZXRpY1RyYWlsaW5nQ29tbWVudHMoaGFyZFJlcXVpcmUsIFtjb21tZW50XSk7XG4gICAgICB0aGlzLmZvcndhcmREZWNsYXJlcy5wdXNoKGhhcmRSZXF1aXJlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBzeW0gb2YgZXhwb3J0cykge1xuICAgICAgLy8gZ29vZzogaW1wb3J0cyBkb24ndCBhY3R1YWxseSB1c2UgdGhlIC5kZWZhdWx0IHByb3BlcnR5IHRoYXQgVFMgdGhpbmtzIHRoZXkgaGF2ZS5cbiAgICAgIGNvbnN0IHF1YWxpZmllZE5hbWUgPSBuc0ltcG9ydCAmJiBpc0RlZmF1bHRJbXBvcnQgPyBmb3J3YXJkRGVjbGFyZVByZWZpeCA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yd2FyZERlY2xhcmVQcmVmaXggKyAnLicgKyBzeW0ubmFtZTtcbiAgICAgIHRoaXMuc3ltYm9sc1RvQWxpYXNlZE5hbWVzLnNldChzeW0sIHF1YWxpZmllZE5hbWUpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBlbnN1cmVTeW1ib2xEZWNsYXJlZChzeW06IHRzLlN5bWJvbCkge1xuICAgIGNvbnN0IGRlY2wgPSB0aGlzLmZpbmRFeHBvcnRlZERlY2xhcmF0aW9uKHN5bSk7XG4gICAgaWYgKCFkZWNsKSByZXR1cm47XG4gICAgaWYgKHRoaXMuaXNGb3JFeHRlcm5zKSB7XG4gICAgICB0aGlzLmVycm9yKGRlY2wsIGBkZWNsYXJhdGlvbiBmcm9tIG1vZHVsZSB1c2VkIGluIGFtYmllbnQgdHlwZTogJHtzeW0ubmFtZX1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgLy8gQWN0dWFsbHkgaW1wb3J0IHRoZSBzeW1ib2wuXG4gICAgY29uc3Qgc291cmNlRmlsZSA9IGRlY2wuZ2V0U291cmNlRmlsZSgpO1xuICAgIGlmIChzb3VyY2VGaWxlID09PSB0cy5nZXRPcmlnaW5hbE5vZGUodGhpcy5zb3VyY2VGaWxlKSkgcmV0dXJuO1xuICAgIGNvbnN0IG1vZHVsZVN5bWJvbCA9IHRoaXMudHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihzb3VyY2VGaWxlKTtcbiAgICAvLyBBIHNvdXJjZSBmaWxlIG1pZ2h0IG5vdCBoYXZlIGEgc3ltYm9sIGlmIGl0J3Mgbm90IGEgbW9kdWxlIChubyBFUzYgaW0vZXhwb3J0cykuXG4gICAgaWYgKCFtb2R1bGVTeW1ib2wpIHJldHVybjtcbiAgICAvLyBUT0RPKG1hcnRpbnByb2JzdCk6IHRoaXMgc2hvdWxkIHBvc3NpYmx5IHVzZSBmaWxlTmFtZVRvTW9kdWxlSWQuXG4gICAgdGhpcy5mb3J3YXJkRGVjbGFyZShzb3VyY2VGaWxlLmZpbGVOYW1lLCBtb2R1bGVTeW1ib2wsIGZhbHNlKTtcbiAgfVxuXG4gIGluc2VydEZvcndhcmREZWNsYXJlcyhzb3VyY2VGaWxlOiB0cy5Tb3VyY2VGaWxlKSB7XG4gICAgbGV0IGluc2VydGlvbiA9IDA7XG4gICAgLy8gU2tpcCBvdmVyIGEgbGVhZGluZyBmaWxlIGNvbW1lbnQgaG9sZGVyLlxuICAgIGlmIChzb3VyY2VGaWxlLnN0YXRlbWVudHMubGVuZ3RoICYmXG4gICAgICAgIHNvdXJjZUZpbGUuc3RhdGVtZW50c1swXS5raW5kID09PSB0cy5TeW50YXhLaW5kLk5vdEVtaXR0ZWRTdGF0ZW1lbnQpIHtcbiAgICAgIGluc2VydGlvbisrO1xuICAgIH1cbiAgICByZXR1cm4gdHMudXBkYXRlU291cmNlRmlsZU5vZGUoc291cmNlRmlsZSwgW1xuICAgICAgLi4uc291cmNlRmlsZS5zdGF0ZW1lbnRzLnNsaWNlKDAsIGluc2VydGlvbiksXG4gICAgICAuLi50aGlzLmZvcndhcmREZWNsYXJlcyxcbiAgICAgIC4uLnNvdXJjZUZpbGUuc3RhdGVtZW50cy5zbGljZShpbnNlcnRpb24pLFxuICAgIF0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBhcnNlcyBhbmQgc3ludGhlc2l6ZXMgY29tbWVudHMgb24gbm9kZSwgYW5kIHJldHVybnMgdGhlIEpTRG9jIGZyb20gaXQsIGlmIGFueS5cbiAgICogQHBhcmFtIHJlcG9ydFdhcm5pbmdzIGlmIHRydWUsIHdpbGwgcmVwb3J0IHdhcm5pbmdzIGZyb20gcGFyc2luZyB0aGUgSlNEb2MuIFNldCB0byBmYWxzZSBpZlxuICAgKiAgICAgdGhpcyBpcyBub3QgdGhlIFwibWFpblwiIGxvY2F0aW9uIGRlYWxpbmcgd2l0aCBhIG5vZGUgdG8gYXZvaWQgZHVwbGljYXRlZCB3YXJuaW5ncy5cbiAgICovXG4gIGdldEpTRG9jKG5vZGU6IHRzLk5vZGUsIHJlcG9ydFdhcm5pbmdzOiBib29sZWFuKToganNkb2MuVGFnW10ge1xuICAgIGNvbnN0IFt0YWdzLCBdID0gdGhpcy5wYXJzZUpTRG9jKG5vZGUsIHJlcG9ydFdhcm5pbmdzKTtcbiAgICByZXR1cm4gdGFncztcbiAgfVxuXG4gIGdldE11dGFibGVKU0RvYyhub2RlOiB0cy5Ob2RlKTogTXV0YWJsZUpTRG9jIHtcbiAgICBjb25zdCBbdGFncywgY29tbWVudF0gPSB0aGlzLnBhcnNlSlNEb2Mobm9kZSwgLyogcmVwb3J0V2FybmluZ3MgKi8gdHJ1ZSk7XG4gICAgcmV0dXJuIG5ldyBNdXRhYmxlSlNEb2Mobm9kZSwgY29tbWVudCwgdGFncyk7XG4gIH1cblxuICBwcml2YXRlIHBhcnNlSlNEb2Mobm9kZTogdHMuTm9kZSwgcmVwb3J0V2FybmluZ3M6IGJvb2xlYW4pOlxuICAgICAgW2pzZG9jLlRhZ1tdLCB0cy5TeW50aGVzaXplZENvbW1lbnR8bnVsbF0ge1xuICAgIC8vIHN5bnRoZXNpemVMZWFkaW5nQ29tbWVudHMgYmVsb3cgY2hhbmdlcyB0ZXh0IGxvY2F0aW9ucyBmb3Igbm9kZSwgc28gZXh0cmFjdCB0aGUgbG9jYXRpb24gaGVyZVxuICAgIC8vIGluIGNhc2UgaXQgaXMgbmVlZGVkIGxhdGVyIHRvIHJlcG9ydCBkaWFnbm9zdGljcy5cbiAgICBjb25zdCBzdGFydCA9IG5vZGUuZ2V0RnVsbFN0YXJ0KCk7XG4gICAgY29uc3QgbGVuZ3RoID0gbm9kZS5nZXRMZWFkaW5nVHJpdmlhV2lkdGgodGhpcy5zb3VyY2VGaWxlKTtcblxuICAgIGNvbnN0IGNvbW1lbnRzID0ganNkb2Muc3ludGhlc2l6ZUxlYWRpbmdDb21tZW50cyhub2RlKTtcbiAgICBpZiAoIWNvbW1lbnRzIHx8IGNvbW1lbnRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtbXSwgbnVsbF07XG5cbiAgICBmb3IgKGxldCBpID0gY29tbWVudHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGNvbnN0IGNvbW1lbnQgPSBjb21tZW50c1tpXTtcbiAgICAgIGNvbnN0IHBhcnNlZCA9IGpzZG9jLnBhcnNlKGNvbW1lbnQpO1xuICAgICAgaWYgKHBhcnNlZCkge1xuICAgICAgICBpZiAocmVwb3J0V2FybmluZ3MgJiYgcGFyc2VkLndhcm5pbmdzKSB7XG4gICAgICAgICAgY29uc3QgcmFuZ2UgPSBjb21tZW50Lm9yaWdpbmFsUmFuZ2UgfHwge3Bvczogc3RhcnQsIGVuZDogc3RhcnQgKyBsZW5ndGh9O1xuICAgICAgICAgIHJlcG9ydERpYWdub3N0aWMoXG4gICAgICAgICAgICAgIHRoaXMuZGlhZ25vc3RpY3MsIG5vZGUsIHBhcnNlZC53YXJuaW5ncy5qb2luKCdcXG4nKSwgcmFuZ2UsXG4gICAgICAgICAgICAgIHRzLkRpYWdub3N0aWNDYXRlZ29yeS5XYXJuaW5nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW3BhcnNlZC50YWdzLCBjb21tZW50XTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIFtbXSwgbnVsbF07XG4gIH1cblxuICBibGFja2xpc3RUeXBlUGFyYW1ldGVycyhcbiAgICAgIGNvbnRleHQ6IHRzLk5vZGUsIGRlY2xzOiBSZWFkb25seUFycmF5PHRzLlR5cGVQYXJhbWV0ZXJEZWNsYXJhdGlvbj58dW5kZWZpbmVkKSB7XG4gICAgdGhpcy5uZXdUeXBlVHJhbnNsYXRvcihjb250ZXh0KS5ibGFja2xpc3RUeXBlUGFyYW1ldGVycyh0aGlzLnN5bWJvbHNUb0FsaWFzZWROYW1lcywgZGVjbHMpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZXMgdGhlIGpzZG9jIGZvciBtZXRob2RzLCBpbmNsdWRpbmcgb3ZlcmxvYWRzLlxuICAgKiBJZiBvdmVybG9hZGVkLCBtZXJnZXMgdGhlIHNpZ25hdHVyZXMgaW4gdGhlIGxpc3Qgb2YgU2lnbmF0dXJlRGVjbGFyYXRpb25zIGludG8gYSBzaW5nbGUganNkb2MuXG4gICAqIC0gVG90YWwgbnVtYmVyIG9mIHBhcmFtZXRlcnMgd2lsbCBiZSB0aGUgbWF4aW11bSBjb3VudCBmb3VuZCBhY3Jvc3MgYWxsIHZhcmlhbnRzLlxuICAgKiAtIERpZmZlcmVudCBuYW1lcyBhdCB0aGUgc2FtZSBwYXJhbWV0ZXIgaW5kZXggd2lsbCBiZSBqb2luZWQgd2l0aCBcIl9vcl9cIlxuICAgKiAtIFZhcmlhYmxlIGFyZ3MgKC4uLnR5cGVbXSBpbiBUeXBlU2NyaXB0KSB3aWxsIGJlIG91dHB1dCBhcyBcIi4uLnR5cGVcIixcbiAgICogICAgZXhjZXB0IGlmIGZvdW5kIGF0IHRoZSBzYW1lIGluZGV4IGFzIGFub3RoZXIgYXJndW1lbnQuXG4gICAqIEBwYXJhbSBmbkRlY2xzIFBhc3MgPiAxIGRlY2xhcmF0aW9uIGZvciBvdmVybG9hZHMgb2Ygc2FtZSBuYW1lXG4gICAqIEByZXR1cm4gVGhlIGxpc3Qgb2YgcGFyYW1ldGVyIG5hbWVzIHRoYXQgc2hvdWxkIGJlIHVzZWQgdG8gZW1pdCB0aGUgYWN0dWFsXG4gICAqICAgIGZ1bmN0aW9uIHN0YXRlbWVudDsgZm9yIG92ZXJsb2FkcywgbmFtZSB3aWxsIGhhdmUgYmVlbiBtZXJnZWQuXG4gICAqL1xuICBnZXRGdW5jdGlvblR5cGVKU0RvYyhmbkRlY2xzOiB0cy5TaWduYXR1cmVEZWNsYXJhdGlvbltdLCBleHRyYVRhZ3M6IGpzZG9jLlRhZ1tdID0gW10pOlxuICAgICAge3RhZ3M6IGpzZG9jLlRhZ1tdLCBwYXJhbWV0ZXJOYW1lczogc3RyaW5nW10sIHRoaXNSZXR1cm5UeXBlOiB0cy5UeXBlfG51bGx9IHtcbiAgICBjb25zdCB0eXBlQ2hlY2tlciA9IHRoaXMudHlwZUNoZWNrZXI7XG5cbiAgICAvLyBEZS1kdXBsaWNhdGUgdGFncyBhbmQgZG9jcyBmb3VuZCBmb3IgdGhlIGZuRGVjbHMuXG4gICAgY29uc3QgdGFnc0J5TmFtZSA9IG5ldyBNYXA8c3RyaW5nLCBqc2RvYy5UYWc+KCk7XG4gICAgZnVuY3Rpb24gYWRkVGFnKHRhZzoganNkb2MuVGFnKSB7XG4gICAgICBjb25zdCBleGlzdGluZyA9IHRhZ3NCeU5hbWUuZ2V0KHRhZy50YWdOYW1lKTtcbiAgICAgIHRhZ3NCeU5hbWUuc2V0KHRhZy50YWdOYW1lLCBleGlzdGluZyA/IGpzZG9jLm1lcmdlKFtleGlzdGluZywgdGFnXSkgOiB0YWcpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGV4dHJhVGFnIG9mIGV4dHJhVGFncykgYWRkVGFnKGV4dHJhVGFnKTtcblxuICAgIGNvbnN0IGxlbnMgPSBmbkRlY2xzLm1hcChmbkRlY2wgPT4gZm5EZWNsLnBhcmFtZXRlcnMubGVuZ3RoKTtcbiAgICBjb25zdCBtaW5BcmdzQ291bnQgPSBNYXRoLm1pbiguLi5sZW5zKTtcbiAgICBjb25zdCBtYXhBcmdzQ291bnQgPSBNYXRoLm1heCguLi5sZW5zKTtcbiAgICBjb25zdCBpc0NvbnN0cnVjdG9yID0gZm5EZWNscy5maW5kKGQgPT4gZC5raW5kID09PSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yKSAhPT0gdW5kZWZpbmVkO1xuICAgIC8vIEZvciBlYWNoIHBhcmFtZXRlciBpbmRleCBpLCBwYXJhbVRhZ3NbaV0gaXMgYW4gYXJyYXkgb2YgcGFyYW1ldGVyc1xuICAgIC8vIHRoYXQgY2FuIGJlIGZvdW5kIGF0IGluZGV4IGkuICBFLmcuXG4gICAgLy8gICAgZnVuY3Rpb24gZm9vKHg6IHN0cmluZylcbiAgICAvLyAgICBmdW5jdGlvbiBmb28oeTogbnVtYmVyLCB6OiBzdHJpbmcpXG4gICAgLy8gdGhlbiBwYXJhbVRhZ3NbMF0gPSBbaW5mbyBhYm91dCB4LCBpbmZvIGFib3V0IHldLlxuICAgIGNvbnN0IHBhcmFtVGFnczoganNkb2MuVGFnW11bXSA9IFtdO1xuICAgIGNvbnN0IHJldHVyblRhZ3M6IGpzZG9jLlRhZ1tdID0gW107XG4gICAgY29uc3QgdHlwZVBhcmFtZXRlck5hbWVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgICBsZXQgdGhpc1JldHVyblR5cGU6IHRzLlR5cGV8bnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBmbkRlY2wgb2YgZm5EZWNscykge1xuICAgICAgLy8gQ29uc3RydWN0IHRoZSBKU0RvYyBjb21tZW50IGJ5IHJlYWRpbmcgdGhlIGV4aXN0aW5nIEpTRG9jLCBpZlxuICAgICAgLy8gYW55LCBhbmQgbWVyZ2luZyBpdCB3aXRoIHRoZSBrbm93biB0eXBlcyBvZiB0aGUgZnVuY3Rpb25cbiAgICAgIC8vIHBhcmFtZXRlcnMgYW5kIHJldHVybiB0eXBlLlxuICAgICAgY29uc3QgdGFncyA9IHRoaXMuZ2V0SlNEb2MoZm5EZWNsLCAvKiByZXBvcnRXYXJuaW5ncyAqLyBmYWxzZSk7XG5cbiAgICAgIC8vIENvcHkgYWxsIHRoZSB0YWdzIG90aGVyIHRoYW4gQHBhcmFtL0ByZXR1cm4gaW50byB0aGUgbmV3XG4gICAgICAvLyBKU0RvYyB3aXRob3V0IGFueSBjaGFuZ2U7IEBwYXJhbS9AcmV0dXJuIGFyZSBoYW5kbGVkIHNwZWNpYWxseS5cbiAgICAgIC8vIFRPRE86IHRoZXJlIG1heSBiZSBwcm9ibGVtcyBpZiBhbiBhbm5vdGF0aW9uIGRvZXNuJ3QgYXBwbHkgdG8gYWxsIG92ZXJsb2FkcztcbiAgICAgIC8vIGlzIGl0IHdvcnRoIGNoZWNraW5nIGZvciB0aGlzIGFuZCBlcnJvcmluZz9cbiAgICAgIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcbiAgICAgICAgaWYgKHRhZy50YWdOYW1lID09PSAncGFyYW0nIHx8IHRhZy50YWdOYW1lID09PSAncmV0dXJuJykgY29udGludWU7XG4gICAgICAgIGFkZFRhZyh0YWcpO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgQGFic3RyYWN0IG9uIFwiYWJzdHJhY3RcIiBkZWNsYXJhdGlvbnMuXG4gICAgICBpZiAoaGFzTW9kaWZpZXJGbGFnKGZuRGVjbCwgdHMuTW9kaWZpZXJGbGFncy5BYnN0cmFjdCkpIHtcbiAgICAgICAgYWRkVGFnKHt0YWdOYW1lOiAnYWJzdHJhY3QnfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCBhbnkgQHRlbXBsYXRlIHRhZ3MuXG4gICAgICAvLyBNdWx0aXBsZSBkZWNsYXJhdGlvbnMgd2l0aCB0aGUgc2FtZSB0ZW1wbGF0ZSB2YXJpYWJsZSBuYW1lcyBzaG91bGQgd29yazpcbiAgICAgIC8vIHRoZSBkZWNsYXJhdGlvbnMgZ2V0IHR1cm5lZCBpbnRvIHVuaW9uIHR5cGVzLCBhbmQgQ2xvc3VyZSBDb21waWxlciB3aWxsIG5lZWRcbiAgICAgIC8vIHRvIGZpbmQgYSB1bmlvbiB3aGVyZSBhbGwgdHlwZSBhcmd1bWVudHMgYXJlIHNhdGlzZmllZC5cbiAgICAgIGlmIChmbkRlY2wudHlwZVBhcmFtZXRlcnMpIHtcbiAgICAgICAgZm9yIChjb25zdCB0cCBvZiBmbkRlY2wudHlwZVBhcmFtZXRlcnMpIHtcbiAgICAgICAgICB0eXBlUGFyYW1ldGVyTmFtZXMuYWRkKGdldElkZW50aWZpZXJUZXh0KHRwLm5hbWUpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLy8gTWVyZ2UgdGhlIHBhcmFtZXRlcnMgaW50byBhIHNpbmdsZSBsaXN0IG9mIG1lcmdlZCBuYW1lcyBhbmQgbGlzdCBvZiB0eXBlc1xuICAgICAgY29uc3Qgc2lnID0gdHlwZUNoZWNrZXIuZ2V0U2lnbmF0dXJlRnJvbURlY2xhcmF0aW9uKGZuRGVjbCk7XG4gICAgICBpZiAoIXNpZyB8fCAhc2lnLmRlY2xhcmF0aW9uKSB0aHJvdyBuZXcgRXJyb3IoYGludmFsaWQgc2lnbmF0dXJlICR7Zm5EZWNsLm5hbWV9YCk7XG4gICAgICBpZiAoc2lnLmRlY2xhcmF0aW9uLmtpbmQgPT09IHRzLlN5bnRheEtpbmRKU0RvY1NpZ25hdHVyZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYEpTRG9jIHNpZ25hdHVyZSAke2ZuRGVjbC5uYW1lfWApO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaWcuZGVjbGFyYXRpb24ucGFyYW1ldGVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBwYXJhbU5vZGUgPSBzaWcuZGVjbGFyYXRpb24ucGFyYW1ldGVyc1tpXTtcblxuICAgICAgICBjb25zdCBuYW1lID0gZ2V0UGFyYW1ldGVyTmFtZShwYXJhbU5vZGUsIGkpO1xuICAgICAgICBjb25zdCBpc1RoaXNQYXJhbSA9IG5hbWUgPT09ICd0aGlzJztcblxuICAgICAgICBjb25zdCBuZXdUYWc6IGpzZG9jLlRhZyA9IHtcbiAgICAgICAgICB0YWdOYW1lOiBpc1RoaXNQYXJhbSA/ICd0aGlzJyA6ICdwYXJhbScsXG4gICAgICAgICAgb3B0aW9uYWw6IHBhcmFtTm9kZS5pbml0aWFsaXplciAhPT0gdW5kZWZpbmVkIHx8IHBhcmFtTm9kZS5xdWVzdGlvblRva2VuICE9PSB1bmRlZmluZWQsXG4gICAgICAgICAgcGFyYW1ldGVyTmFtZTogaXNUaGlzUGFyYW0gPyB1bmRlZmluZWQgOiBuYW1lLFxuICAgICAgICB9O1xuXG4gICAgICAgIGxldCB0eXBlID0gdHlwZUNoZWNrZXIuZ2V0VHlwZUF0TG9jYXRpb24ocGFyYW1Ob2RlKTtcbiAgICAgICAgaWYgKHBhcmFtTm9kZS5kb3REb3REb3RUb2tlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbmV3VGFnLnJlc3RQYXJhbSA9IHRydWU7XG4gICAgICAgICAgLy8gSW4gVHlwZVNjcmlwdCB5b3Ugd3JpdGUgXCIuLi54OiBudW1iZXJbXVwiLCBidXQgaW4gQ2xvc3VyZVxuICAgICAgICAgIC8vIHlvdSBkb24ndCB3cml0ZSB0aGUgYXJyYXk6IFwiQHBhcmFtIHsuLi5udW1iZXJ9IHhcIi4gIFVud3JhcFxuICAgICAgICAgIC8vIHRoZSBBcnJheTw+IHdyYXBwZXIuXG4gICAgICAgICAgY29uc3QgdHlwZVJlZiA9IHR5cGUgYXMgdHMuVHlwZVJlZmVyZW5jZTtcbiAgICAgICAgICBpZiAoIXR5cGVSZWYudHlwZUFyZ3VtZW50cykgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHJlc3QgcGFyYW0nKTtcbiAgICAgICAgICB0eXBlID0gdHlwZVJlZi50eXBlQXJndW1lbnRzIVswXTtcbiAgICAgICAgfVxuICAgICAgICBuZXdUYWcudHlwZSA9IHRoaXMudHlwZVRvQ2xvc3VyZShmbkRlY2wsIHR5cGUpO1xuXG4gICAgICAgIGZvciAoY29uc3Qge3RhZ05hbWUsIHBhcmFtZXRlck5hbWUsIHRleHR9IG9mIHRhZ3MpIHtcbiAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ3BhcmFtJyAmJiBwYXJhbWV0ZXJOYW1lID09PSBuZXdUYWcucGFyYW1ldGVyTmFtZSkge1xuICAgICAgICAgICAgbmV3VGFnLnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghcGFyYW1UYWdzW2ldKSBwYXJhbVRhZ3MucHVzaChbXSk7XG4gICAgICAgIHBhcmFtVGFnc1tpXS5wdXNoKG5ld1RhZyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiB0eXBlLlxuICAgICAgaWYgKCFpc0NvbnN0cnVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHJldHVyblRhZzoganNkb2MuVGFnID0ge1xuICAgICAgICAgIHRhZ05hbWU6ICdyZXR1cm4nLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXRUeXBlID0gdHlwZUNoZWNrZXIuZ2V0UmV0dXJuVHlwZU9mU2lnbmF0dXJlKHNpZyk7XG4gICAgICAgIC8vIHRzbGludDpkaXNhYmxlLW5leHQtbGluZTpuby1hbnkgYWNjZXNzaW5nIFRTIGludGVybmFsIGZpZWxkLlxuICAgICAgICBpZiAoKHJldFR5cGUgYXMgYW55KS5pc1RoaXNUeXBlKSB7XG4gICAgICAgICAgLy8gZm9vKCk6IHRoaXNcbiAgICAgICAgICB0aGlzUmV0dXJuVHlwZSA9IHJldFR5cGU7XG4gICAgICAgICAgYWRkVGFnKHt0YWdOYW1lOiAndGVtcGxhdGUnLCB0ZXh0OiAnVEhJUyd9KTtcbiAgICAgICAgICBhZGRUYWcoe3RhZ05hbWU6ICd0aGlzJywgdHlwZTogJ1RISVMnfSk7XG4gICAgICAgICAgcmV0dXJuVGFnLnR5cGUgPSAnVEhJUyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuVGFnLnR5cGUgPSB0aGlzLnR5cGVUb0Nsb3N1cmUoZm5EZWNsLCByZXRUeXBlKTtcbiAgICAgICAgICBmb3IgKGNvbnN0IHt0YWdOYW1lLCB0ZXh0fSBvZiB0YWdzKSB7XG4gICAgICAgICAgICBpZiAodGFnTmFtZSA9PT0gJ3JldHVybicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuVGFnLnRleHQgPSB0ZXh0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuVGFncy5wdXNoKHJldHVyblRhZyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVQYXJhbWV0ZXJOYW1lcy5zaXplID4gMCkge1xuICAgICAgYWRkVGFnKHt0YWdOYW1lOiAndGVtcGxhdGUnLCB0ZXh0OiBBcnJheS5mcm9tKHR5cGVQYXJhbWV0ZXJOYW1lcy52YWx1ZXMoKSkuam9pbignLCAnKX0pO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0RvYyA9IEFycmF5LmZyb20odGFnc0J5TmFtZS52YWx1ZXMoKSk7XG5cbiAgICAvLyBNZXJnZSB0aGUgSlNEb2MgdGFncyBmb3IgZWFjaCBvdmVybG9hZGVkIHBhcmFtZXRlci5cbiAgICAvLyBFbnN1cmUgZWFjaCBwYXJhbWV0ZXIgaGFzIGEgdW5pcXVlIG5hbWU7IHRoZSBtZXJnaW5nIHByb2Nlc3MgY2FuIG90aGVyd2lzZVxuICAgIC8vIGFjY2lkZW50YWxseSBnZW5lcmF0ZSB0aGUgc2FtZSBwYXJhbWV0ZXIgbmFtZSB0d2ljZS5cbiAgICBjb25zdCBwYXJhbU5hbWVzID0gbmV3IFNldCgpO1xuICAgIGxldCBmb3VuZE9wdGlvbmFsID0gZmFsc2U7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXhBcmdzQ291bnQ7IGkrKykge1xuICAgICAgY29uc3QgcGFyYW1UYWcgPSBqc2RvYy5tZXJnZShwYXJhbVRhZ3NbaV0pO1xuICAgICAgaWYgKHBhcmFtTmFtZXMuaGFzKHBhcmFtVGFnLnBhcmFtZXRlck5hbWUpKSB7XG4gICAgICAgIHBhcmFtVGFnLnBhcmFtZXRlck5hbWUgKz0gaS50b1N0cmluZygpO1xuICAgICAgfVxuICAgICAgcGFyYW1OYW1lcy5hZGQocGFyYW1UYWcucGFyYW1ldGVyTmFtZSk7XG4gICAgICAvLyBJZiB0aGUgdGFnIGlzIG9wdGlvbmFsLCBtYXJrIHBhcmFtZXRlcnMgZm9sbG93aW5nIG9wdGlvbmFsIGFzIG9wdGlvbmFsLFxuICAgICAgLy8gZXZlbiBpZiB0aGV5IGFyZSBub3QsIHNpbmNlIENsb3N1cmUgcmVzdHJpY3RzIHRoaXMsIHNlZVxuICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2dvb2dsZS9jbG9zdXJlLWNvbXBpbGVyL2lzc3Vlcy8yMzE0XG4gICAgICBpZiAoIXBhcmFtVGFnLnJlc3RQYXJhbSAmJiAocGFyYW1UYWcub3B0aW9uYWwgfHwgZm91bmRPcHRpb25hbCB8fCBpID49IG1pbkFyZ3NDb3VudCkpIHtcbiAgICAgICAgZm91bmRPcHRpb25hbCA9IHRydWU7XG4gICAgICAgIHBhcmFtVGFnLm9wdGlvbmFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIG5ld0RvYy5wdXNoKHBhcmFtVGFnKTtcbiAgICAgIGlmIChwYXJhbVRhZy5yZXN0UGFyYW0pIHtcbiAgICAgICAgLy8gQ2Fubm90IGhhdmUgYW55IHBhcmFtZXRlcnMgYWZ0ZXIgYSByZXN0IHBhcmFtLlxuICAgICAgICAvLyBKdXN0IGR1bXAgdGhlIHJlbWFpbmluZyBwYXJhbWV0ZXJzLlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBNZXJnZSB0aGUgSlNEb2MgdGFncyBmb3IgZWFjaCBvdmVybG9hZGVkIHJldHVybi5cbiAgICBpZiAoIWlzQ29uc3RydWN0b3IpIHtcbiAgICAgIG5ld0RvYy5wdXNoKGpzZG9jLm1lcmdlKHJldHVyblRhZ3MpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgdGFnczogbmV3RG9jLFxuICAgICAgcGFyYW1ldGVyTmFtZXM6IG5ld0RvYy5maWx0ZXIodCA9PiB0LnRhZ05hbWUgPT09ICdwYXJhbScpLm1hcCh0ID0+IHQucGFyYW1ldGVyTmFtZSEpLFxuICAgICAgdGhpc1JldHVyblR5cGUsXG4gICAgfTtcbiAgfVxufVxuIl19