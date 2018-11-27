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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/externs", ["require", "exports", "path", "tsickle/src/enum_transformer", "tsickle/src/googmodule", "tsickle/src/jsdoc", "tsickle/src/jsdoc_transformer", "tsickle/src/module_type_translator", "tsickle/src/transformer_util", "tsickle/src/type_translator", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @fileoverview Externs creates Closure Compiler \@externs definitions from the
     * ambient declarations in a TypeScript file.
     *
     * For example, a declare interface Foo { bar: string; } Would generate a /..
     *   \@externs ./ /.. \@record ./ var Foo = function() {}; /.. \@type {string}
     *   ./ Foo.prototype.bar;
     *
     * The generated externs indicate to Closure Compiler that symbols are external
     * to the optimization process, i.e. they are provided by outside code. That
     * most importantly means they must not be renamed or removed.
     *
     * A major difficulty here is that TypeScript supports module-scoped external
     * symbols; `.d.ts` files can contain `export`s and `import` other files.
     * Closure Compiler does not have such a concept, so tsickle must emulate the
     * behaviour. It does so by following this scheme:
     *
     * 1. non-module .d.ts produces global symbols
     * 2. module .d.ts produce symbols namespaced to the module, by creating a
     *    mangled name matching the current file's path. tsickle expects outside
     *    code (e.g. build system integration or manually written code) to contain a
     *    goog.module/provide that references the mangled path.
     * 3. declarations in `.ts` files produce types that can be separately emitted
     *    in e.g. an `externs.js`, using `getGeneratedExterns` below.
     *    1. non-exported symbols produce global types, because that's what users
     *       expect and it matches TypeScripts emit, which just references `Foo` for
     *       a locally declared symbol `Foo` in a module. Arguably these should be
     *       wrapped in `declare global { ... }`.
     *    2. exported symbols are scoped to the `.ts` file by prefixing them with a
     *       mangled name. Exported types are re-exported from the JavaScript
     *       `goog.module`, allowing downstream code to reference them. This has the
     *       same problem regarding ambient values as above, it is unclear where the
     *       value symbol would be defined, so for the time being this is
     *       unsupported.
     *
     * The effect of this is that:
     * - symbols in a module (i.e. not globals) are generally scoped to the local
     *   module using a mangled name, preventing symbol collisions on the Closure
     *   side.
     * - importing code can unconditionally refer to and import any symbol defined
     *   in a module `X` as `path.to.module.X`, regardless of whether the defining
     *   location is a `.d.ts` file or a `.ts` file, and regardless whether the
     *   symbol is ambient (assuming there's an appropriate shim).
     * - if there is a shim present, tsickle avoids emitting the Closure namespace
     *   itself, expecting the shim to provide the namespace and initialize it to a
     *   symbol that provides the right value at runtime (i.e. the implementation of
     *   whatever third party library the .d.ts describes).
     */
    var path = require("path");
    var enum_transformer_1 = require("tsickle/src/enum_transformer");
    var googmodule_1 = require("tsickle/src/googmodule");
    var jsdoc = require("tsickle/src/jsdoc");
    var jsdoc_transformer_1 = require("tsickle/src/jsdoc_transformer");
    var module_type_translator_1 = require("tsickle/src/module_type_translator");
    var transformer_util_1 = require("tsickle/src/transformer_util");
    var type_translator_1 = require("tsickle/src/type_translator");
    var ts = require("tsickle/src/typescript");
    /**
     * Symbols that are already declared as externs in Closure, that should
     * be avoided by tsickle's "declare ..." => externs.js conversion.
     */
    var CLOSURE_EXTERNS_BLACKLIST = [
        'exports',
        'global',
        'module',
        // ErrorConstructor is the interface of the Error object itself.
        // tsickle detects that this is part of the TypeScript standard library
        // and assumes it's part of the Closure standard library, but this
        // assumption is wrong for ErrorConstructor.  To properly handle this
        // we'd somehow need to map methods defined on the ErrorConstructor
        // interface into properties on Closure's Error object, but for now it's
        // simpler to just blacklist it.
        'ErrorConstructor',
        'Symbol',
        'WorkerGlobalScope',
    ];
    /**
     * The header to be used in generated externs.  This is not included in the output of
     * generateExterns() because generateExterns() works one file at a time, and typically you create
     * one externs file from the entire compilation unit.
     *
     * Suppressions:
     * - duplicate: because externs might duplicate re-opened definitions from other JS files.
     * - checkTypes: Closure's type system does not match TS'.
     * - undefinedNames: code below tries to be careful not to overwrite previously emitted definitions,
     *   but on the flip side might accidentally miss definitions.
     */
    var EXTERNS_HEADER = "/**\n * @externs\n * @suppress {duplicate,checkTypes}\n */\n// NOTE: generated by tsickle, do not edit.\n";
    /**
     * Concatenate all generated externs definitions together into a string, including a file comment
     * header.
     *
     * @param rootDir Project root.  Emitted comments will reference paths relative to this root.
     *    This param is effectively required, but made optional here until Angular is fixed.
     */
    function getGeneratedExterns(externs, rootDir) {
        if (rootDir === void 0) { rootDir = ''; }
        var e_1, _a;
        var allExterns = EXTERNS_HEADER;
        try {
            for (var _b = __values(Object.keys(externs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var fileName = _c.value;
                allExterns += "// externs from " + path.relative(rootDir, fileName) + ":\n";
                allExterns += externs[fileName];
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return allExterns;
    }
    exports.getGeneratedExterns = getGeneratedExterns;
    /**
     * Returns a mangled version of the module name (resolved file name) for source file.
     *
     * The mangled name is safe to use as a JavaScript identifier. It is used as a globally unique
     * prefix to scope symbols in externs file (see code below).
     */
    function moduleNameAsIdentifier(host, fileName) {
        return host.pathToModuleName('', fileName).replace(/\./g, '$');
    }
    exports.moduleNameAsIdentifier = moduleNameAsIdentifier;
    /**
     * isInGlobalAugmentation returns true if declaration is the immediate child of a 'declare global'
     * block.
     */
    function isInGlobalAugmentation(declaration) {
        // declare global { ... } creates a ModuleDeclaration containing a ModuleBlock containing the
        // declaration, with the ModuleDeclaration having the GlobalAugmentation flag set.
        if (!declaration.parent || !declaration.parent.parent)
            return false;
        return (declaration.parent.parent.flags & ts.NodeFlags.GlobalAugmentation) !== 0;
    }
    /**
     * generateExterns generates extern definitions for all ambient declarations in the given source
     * file. It returns a string representation of the Closure JavaScript, not including the initial
     * comment with \@fileoverview and \@externs (see above for that).
     */
    function generateExterns(typeChecker, sourceFile, host, moduleResolutionHost, options) {
        var e_2, _a, e_3, _b;
        var output = '';
        var diagnostics = [];
        var isDts = transformer_util_1.isDtsFileName(sourceFile.fileName);
        var isExternalModule = ts.isExternalModule(sourceFile);
        var mtt = new module_type_translator_1.ModuleTypeTranslator(sourceFile, typeChecker, host, diagnostics, /*isForExterns*/ true);
        var rootNamespace = '';
        if (isExternalModule) {
            // .d.ts files that are modules do not declare global symbols - their symbols must be explicitly
            // imported to be used. However Closure Compiler has no concept of externs that are modules and
            // require imports. This code mangles the symbol names by wrapping them in a top level variable
            // that's unique to this file. That allows emitting them for Closure as global symbols while
            // avoiding collisions. This is necessary as symbols local to this module can (and will very
            // commonly) conflict with the namespace used in "export as namespace", e.g. "angular", and also
            // to avoid users accidentally using these symbols in .js files (and more collisions). The
            // symbols that are "hidden" like that can be made accessible through an "export as namespace"
            // declaration (see below).
            rootNamespace = moduleNameAsIdentifier(host, sourceFile.fileName);
        }
        try {
            for (var _c = __values(sourceFile.statements), _d = _c.next(); !_d.done; _d = _c.next()) {
                var stmt = _d.value;
                if (!isDts && !transformer_util_1.hasModifierFlag(stmt, ts.ModifierFlags.Ambient)) {
                    continue;
                }
                visitor(stmt, []);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        if (output && isExternalModule) {
            // If tsickle generated any externs and this is an external module, prepend the namespace
            // declaration for it.
            output = "/** @const */\nvar " + rootNamespace + " = {};\n" + output;
            // There can only be one export =.
            var exportAssignment = sourceFile.statements.find(ts.isExportAssignment);
            var exportedNamespace = rootNamespace;
            if (exportAssignment && exportAssignment.isExportEquals) {
                if (ts.isIdentifier(exportAssignment.expression) ||
                    ts.isQualifiedName(exportAssignment.expression)) {
                    // E.g. export = someName;
                    // If someName is "declare global { namespace someName {...} }", tsickle must not qualify
                    // access to it with module namespace as it is emitted in the global namespace.
                    var symbol = typeChecker.getSymbolAtLocation(exportAssignment.expression);
                    var isGlobalSymbol = symbol && symbol.declarations &&
                        symbol.declarations.some(function (d) { return isInGlobalAugmentation(d); });
                    var entityName = transformer_util_1.getEntityNameText(exportAssignment.expression);
                    if (isGlobalSymbol) {
                        exportedNamespace = entityName;
                    }
                    else {
                        exportedNamespace = rootNamespace + '.' + entityName;
                    }
                }
                else {
                    transformer_util_1.reportDiagnostic(diagnostics, exportAssignment.expression, "export = expression must be a qualified name, got " + ts.SyntaxKind[exportAssignment.expression.kind] + ".");
                }
            }
            if (isDts && host.provideExternalModuleDtsNamespace) {
                try {
                    // In a non-shimmed module, create a global namespace. This exists purely for backwards
                    // compatiblity, in the medium term all code using tsickle should always use `goog.module`s,
                    // so global names should not be neccessary.
                    for (var _e = __values(sourceFile.statements.filter(ts.isNamespaceExportDeclaration)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var nsExport = _f.value;
                        var namespaceName = transformer_util_1.getIdentifierText(nsExport.name);
                        emit("// export as namespace " + namespaceName + "\n");
                        writeVariableStatement(namespaceName, [], exportedNamespace);
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
            }
        }
        return { output: output, diagnostics: diagnostics };
        function emit(str) {
            output += str;
        }
        /**
         * isFirstDeclaration returns true if decl is the first declaration
         * of its symbol.  E.g. imagine
         *   interface Foo { x: number; }
         *   interface Foo { y: number; }
         * we only want to emit the "\@record" for Foo on the first one.
         *
         * The exception are variable declarations, which - in externs - do not assign a value:
         *   /.. \@type {...} ./
         *   var someVariable;
         *   /.. \@type {...} ./
         *   someNamespace.someVariable;
         * If a later declaration wants to add additional properties on someVariable, tsickle must still
         * emit an assignment into the object, as it's otherwise absent.
         */
        function isFirstValueDeclaration(decl) {
            if (!decl.name)
                return true;
            var sym = typeChecker.getSymbolAtLocation(decl.name);
            if (!sym.declarations || sym.declarations.length < 2)
                return true;
            var earlierDecls = sym.declarations.slice(0, sym.declarations.indexOf(decl));
            // Either there are no earlier declarations, or all of them are variables (see above). tsickle
            // emits a value for all other declaration kinds (function for functions, classes, interfaces,
            // {} object for namespaces).
            return earlierDecls.length === 0 || earlierDecls.every(ts.isVariableDeclaration);
        }
        /** Writes the actual variable statement of a Closure variable declaration. */
        function writeVariableStatement(name, namespace, value) {
            var qualifiedName = namespace.concat([name]).join('.');
            if (namespace.length === 0)
                emit("var ");
            emit(qualifiedName);
            if (value)
                emit(" = " + value);
            emit(';\n');
        }
        /**
         * Writes a Closure variable declaration, i.e. the variable statement with a leading JSDoc
         * comment making it a declaration.
         */
        function writeVariableDeclaration(decl, namespace) {
            if (decl.name.kind === ts.SyntaxKind.Identifier) {
                var name_1 = transformer_util_1.getIdentifierText(decl.name);
                if (CLOSURE_EXTERNS_BLACKLIST.indexOf(name_1) >= 0)
                    return;
                emit(jsdoc.toString([{ tagName: 'type', type: mtt.typeToClosure(decl) }]));
                emit('\n');
                writeVariableStatement(name_1, namespace);
            }
            else {
                errorUnimplementedKind(decl.name, 'externs for variable');
            }
        }
        /**
         * Emits a JSDoc declaration that merges the signatures of the given function declaration (for
         * overloads), and returns the parameter names chosen.
         */
        function emitFunctionType(decls, extraTags) {
            if (extraTags === void 0) { extraTags = []; }
            var _a = mtt.getFunctionTypeJSDoc(decls, extraTags), tags = _a.tags, parameterNames = _a.parameterNames;
            emit('\n');
            emit(jsdoc.toString(tags));
            return parameterNames;
        }
        function writeFunction(name, params, namespace) {
            var paramsStr = params.join(', ');
            if (namespace.length > 0) {
                var fqn = namespace.join('.');
                if (name.kind === ts.SyntaxKind.Identifier) {
                    fqn += '.'; // computed names include [ ] in their getText() representation.
                }
                fqn += name.getText();
                emit(fqn + " = function(" + paramsStr + ") {};\n");
            }
            else {
                if (name.kind !== ts.SyntaxKind.Identifier) {
                    transformer_util_1.reportDiagnostic(diagnostics, name, 'Non-namespaced computed name in externs');
                }
                emit("function " + name.getText() + "(" + paramsStr + ") {}\n");
            }
        }
        function writeEnum(decl, namespace) {
            var e_4, _a;
            // E.g. /** @enum {number} */ var COUNTRY = {US: 1, CA: 1};
            var name = transformer_util_1.getIdentifierText(decl.name);
            var members = '';
            var enumType = enum_transformer_1.getEnumType(typeChecker, decl);
            // Closure enums members must have a value of the correct type, but the actual value does not
            // matter in externs.
            var initializer = enumType === 'string' ? "''" : 1;
            try {
                for (var _b = __values(decl.members), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var member = _c.value;
                    var memberName = void 0;
                    switch (member.name.kind) {
                        case ts.SyntaxKind.Identifier:
                            memberName = transformer_util_1.getIdentifierText(member.name);
                            break;
                        case ts.SyntaxKind.StringLiteral:
                            var text = member.name.text;
                            if (type_translator_1.isValidClosurePropertyName(text))
                                memberName = text;
                            break;
                        default:
                            break;
                    }
                    if (!memberName) {
                        members += "  /* TODO: " + ts.SyntaxKind[member.name.kind] + ": " + jsdoc_transformer_1.escapeForComment(member.name.getText()) + " */\n";
                        continue;
                    }
                    members += "  " + memberName + ": " + initializer + ",\n";
                }
            }
            catch (e_4_1) { e_4 = { error: e_4_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_4) throw e_4.error; }
            }
            emit("\n/** @enum {" + enumType + "} */\n");
            writeVariableStatement(name, namespace, "{\n" + members + "}");
        }
        function writeTypeAlias(decl, namespace) {
            var typeStr = mtt.typeToClosure(decl, undefined);
            emit("\n/** @typedef {" + typeStr + "} */\n");
            writeVariableStatement(transformer_util_1.getIdentifierText(decl.name), namespace);
        }
        function writeType(decl, namespace) {
            var e_5, _a, e_6, _b;
            var name = decl.name;
            if (!name) {
                transformer_util_1.reportDiagnostic(diagnostics, decl, 'anonymous type in externs');
                return;
            }
            var typeName = namespace.concat([name.getText()]).join('.');
            if (CLOSURE_EXTERNS_BLACKLIST.indexOf(typeName) >= 0)
                return;
            if (isFirstValueDeclaration(decl)) {
                // Emit the 'function' that is actually the declaration of the interface
                // itself.  If it's a class, this function also must include the type
                // annotations of the constructor.
                var paramNames = [];
                var jsdocTags = [];
                var wroteJsDoc = false;
                jsdoc_transformer_1.maybeAddHeritageClauses(jsdocTags, mtt, decl);
                jsdoc_transformer_1.maybeAddTemplateClause(jsdocTags, decl);
                if (decl.kind === ts.SyntaxKind.ClassDeclaration) {
                    // TODO: it appears you can just write 'class Foo { ...' in externs.
                    // This code instead tries to translate it to a function.
                    jsdocTags.push({ tagName: 'constructor' }, { tagName: 'struct' });
                    var ctors = decl
                        .members.filter(function (m) { return m.kind === ts.SyntaxKind.Constructor; });
                    if (ctors.length) {
                        var firstCtor = ctors[0];
                        if (ctors.length > 1) {
                            paramNames = emitFunctionType(ctors, jsdocTags);
                        }
                        else {
                            paramNames = emitFunctionType([firstCtor], jsdocTags);
                        }
                        wroteJsDoc = true;
                    }
                }
                else {
                    // Otherwise it's an interface; tag it as structurally typed.
                    jsdocTags.push({ tagName: 'record' }, { tagName: 'struct' });
                }
                if (!wroteJsDoc)
                    emit(jsdoc.toString(jsdocTags));
                writeFunction(name, paramNames, namespace);
            }
            // Process everything except (MethodSignature|MethodDeclaration|Constructor)
            var methods = new Map();
            try {
                for (var _c = __values(decl.members), _d = _c.next(); !_d.done; _d = _c.next()) {
                    var member = _d.value;
                    switch (member.kind) {
                        case ts.SyntaxKind.PropertySignature:
                        case ts.SyntaxKind.PropertyDeclaration:
                            var prop = member;
                            if (prop.name.kind === ts.SyntaxKind.Identifier) {
                                var type = mtt.typeToClosure(prop);
                                if (prop.questionToken && type === '?') {
                                    // An optional 'any' type translates to '?|undefined' in Closure.
                                    type = '?|undefined';
                                }
                                emit(jsdoc.toString([{ tagName: 'type', type: type }]));
                                if (transformer_util_1.hasModifierFlag(prop, ts.ModifierFlags.Static)) {
                                    emit("\n" + typeName + "." + prop.name.getText() + ";\n");
                                }
                                else {
                                    emit("\n" + typeName + ".prototype." + prop.name.getText() + ";\n");
                                }
                                continue;
                            }
                            // TODO: For now property names other than Identifiers are not handled; e.g.
                            //    interface Foo { "123bar": number }
                            break;
                        case ts.SyntaxKind.MethodSignature:
                        case ts.SyntaxKind.MethodDeclaration:
                            var method = member;
                            var isStatic = transformer_util_1.hasModifierFlag(method, ts.ModifierFlags.Static);
                            var methodSignature = method.name.getText() + "$$$" + (isStatic ? 'static' : 'instance');
                            if (methods.has(methodSignature)) {
                                methods.get(methodSignature).push(method);
                            }
                            else {
                                methods.set(methodSignature, [method]);
                            }
                            continue;
                        case ts.SyntaxKind.Constructor:
                            continue; // Handled above.
                        default:
                            // Members can include things like index signatures, for e.g.
                            //   interface Foo { [key: string]: number; }
                            // For now, just skip it.
                            break;
                    }
                    // If we get here, the member wasn't handled in the switch statement.
                    var memberName = namespace;
                    if (member.name) {
                        memberName = memberName.concat([member.name.getText()]);
                    }
                    emit("\n/* TODO: " + ts.SyntaxKind[member.kind] + ": " + memberName.join('.') + " */\n");
                }
            }
            catch (e_5_1) { e_5 = { error: e_5_1 }; }
            finally {
                try {
                    if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                }
                finally { if (e_5) throw e_5.error; }
            }
            try {
                // Handle method declarations/signatures separately, since we need to deal with overloads.
                for (var _e = __values(Array.from(methods.values())), _f = _e.next(); !_f.done; _f = _e.next()) {
                    var methodVariants = _f.value;
                    var firstMethodVariant = methodVariants[0];
                    var parameterNames = void 0;
                    if (methodVariants.length > 1) {
                        parameterNames = emitFunctionType(methodVariants);
                    }
                    else {
                        parameterNames = emitFunctionType([firstMethodVariant]);
                    }
                    var methodNamespace = namespace.concat([name.getText()]);
                    // If the method is static, don't add the prototype.
                    if (!transformer_util_1.hasModifierFlag(firstMethodVariant, ts.ModifierFlags.Static)) {
                        methodNamespace.push('prototype');
                    }
                    writeFunction(firstMethodVariant.name, parameterNames, methodNamespace);
                }
            }
            catch (e_6_1) { e_6 = { error: e_6_1 }; }
            finally {
                try {
                    if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                }
                finally { if (e_6) throw e_6.error; }
            }
        }
        /**
         * Adds aliases for the symbols imported in the given declaration, so that their types get
         * printed as the fully qualified name, and not just as a reference to the local import alias.
         *
         * tsickle generates .js files that (at most) contain a `goog.provide`, but are not
         * `goog.module`s. These files cannot express an aliased import. However Closure Compiler allows
         * referencing types using fully qualified names in such files, so tsickle can resolve the
         * imported module URI and produce `path.to.module.Symbol` as an alias, and use that when
         * referencing the type.
         */
        function addImportAliases(decl) {
            var e_7, _a;
            var moduleUri;
            if (ts.isImportDeclaration(decl)) {
                moduleUri = decl.moduleSpecifier.text;
            }
            else if (ts.isExternalModuleReference(decl.moduleReference)) {
                // import foo = require('./bar');
                moduleUri = decl.moduleReference.expression.text;
            }
            else {
                // import foo = bar.baz.bam;
                // unsupported.
                return;
            }
            var googNamespace = googmodule_1.extractGoogNamespaceImport(moduleUri);
            var moduleName = googNamespace ||
                host.pathToModuleName(sourceFile.fileName, googmodule_1.resolveModuleName(host, sourceFile.fileName, moduleUri));
            if (ts.isImportEqualsDeclaration(decl)) {
                // import foo = require('./bar');
                addImportAlias(decl.name, moduleName, undefined);
                return;
            }
            // Side effect import 'path'; declares no local aliases.
            if (!decl.importClause)
                return;
            if (decl.importClause.name) {
                // import name from ... -> map to .default on the module.name.
                if (googNamespace) {
                    addImportAlias(decl.importClause.name, googNamespace, undefined);
                }
                else {
                    addImportAlias(decl.importClause.name, moduleName, 'default');
                }
            }
            var namedBindings = decl.importClause.namedBindings;
            if (!namedBindings)
                return;
            if (ts.isNamespaceImport(namedBindings)) {
                // import * as name -> map directly to the module.name.
                addImportAlias(namedBindings.name, moduleName, undefined);
            }
            if (ts.isNamedImports(namedBindings)) {
                try {
                    // import {A as B}, map to module.name.A
                    for (var _b = __values(namedBindings.elements), _c = _b.next(); !_c.done; _c = _b.next()) {
                        var namedBinding = _c.value;
                        addImportAlias(namedBinding.name, moduleName, namedBinding.name);
                    }
                }
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
            }
        }
        /**
         * Adds an import alias for the symbol defined at the given node. Creates an alias name based on
         * the given moduleName and (optionally) the name.
         */
        function addImportAlias(node, moduleName, name) {
            var symbol = typeChecker.getSymbolAtLocation(node);
            if (!symbol) {
                transformer_util_1.reportDiagnostic(diagnostics, node, "named import has no symbol");
                return;
            }
            var aliasName = moduleName;
            if (typeof name === 'string') {
                aliasName += '.' + name;
            }
            else if (name) {
                aliasName += '.' + transformer_util_1.getIdentifierText(name);
            }
            if (symbol.flags & ts.SymbolFlags.Alias) {
                symbol = typeChecker.getAliasedSymbol(symbol);
            }
            mtt.symbolsToAliasedNames.set(symbol, aliasName);
        }
        /**
         * Produces a compiler error that references the Node's kind. This is useful for the "else"
         * branch of code that is attempting to handle all possible input Node types, to ensure all cases
         * covered.
         */
        function errorUnimplementedKind(node, where) {
            transformer_util_1.reportDiagnostic(diagnostics, node, ts.SyntaxKind[node.kind] + " not implemented in " + where);
        }
        /**
         * getNamespaceForLocalDeclaration returns the namespace that should be used for the given
         * declaration, deciding whether to namespace the symbol to the file or whether to create a
         * global name.
         *
         * The function covers these cases:
         * 1) a declaration in a .d.ts
         * 1a) where the .d.ts is an external module     --> namespace
         * 1b) where the .d.ts is not an external module --> global
         * 2) a declaration in a .ts file (all are treated as modules)
         * 2a) that is exported                          --> namespace
         * 2b) that is unexported                        --> global
         *
         * For 1), all symbols in .d.ts should generally be namespaced to the file to avoid collisions.
         * However .d.ts files that are not external modules do declare global names (1b).
         *
         * For 2), ambient declarations in .ts files must be namespaced, for the same collision reasons.
         * The exception is 2b), where in TypeScript, an unexported local "declare const x: string;"
         * creates a symbol that, when used locally, is emitted as just "x". That is, it behaves
         * like a variable declared in a 'declare global' block. Closure Compiler would fail the build if
         * there is no declaration for "x", so tsickle must generate a global external symbol, i.e.
         * without the namespace wrapper.
         */
        function getNamespaceForTopLevelDeclaration(declaration, namespace) {
            // Only use rootNamespace for top level symbols, any other namespacing (global names, nested
            // namespaces) is always kept.
            if (namespace.length !== 0)
                return namespace;
            // All names in a module (external) .d.ts file can only be accessed locally, so they always get
            // namespace prefixed.
            if (isDts && isExternalModule)
                return [rootNamespace];
            // Same for exported declarations in regular .ts files.
            if (transformer_util_1.hasModifierFlag(declaration, ts.ModifierFlags.Export))
                return [rootNamespace];
            // But local declarations in .ts files or .d.ts files (1b, 2b) are global, too.
            return [];
        }
        function visitor(node, namespace) {
            var e_8, _a, e_9, _b;
            if (node.parent === sourceFile) {
                namespace = getNamespaceForTopLevelDeclaration(node, namespace);
            }
            switch (node.kind) {
                case ts.SyntaxKind.ModuleDeclaration:
                    var decl = node;
                    switch (decl.name.kind) {
                        case ts.SyntaxKind.Identifier:
                            if (decl.flags & ts.NodeFlags.GlobalAugmentation) {
                                // E.g. "declare global { ... }".  Reset to the outer namespace.
                                namespace = [];
                            }
                            else {
                                // E.g. "declare namespace foo {"
                                var name_2 = transformer_util_1.getIdentifierText(decl.name);
                                if (isFirstValueDeclaration(decl)) {
                                    emit('/** @const */\n');
                                    writeVariableStatement(name_2, namespace, '{}');
                                }
                                namespace = namespace.concat(name_2);
                            }
                            if (decl.body)
                                visitor(decl.body, namespace);
                            break;
                        case ts.SyntaxKind.StringLiteral:
                            // E.g. "declare module 'foo' {" (note the quotes).
                            // We still want to emit externs for this module, but Closure doesn't provide a
                            // mechanism for module-scoped externs. Instead, we emit in a mangled namespace.
                            // The mangled namespace (after resolving files) matches the emit for an original module
                            // file, so effectively this augments any existing module.
                            var importName = decl.name.text;
                            var importedModuleName = googmodule_1.resolveModuleName({ host: moduleResolutionHost, options: options }, sourceFile.fileName, importName);
                            var mangled = moduleNameAsIdentifier(host, importedModuleName);
                            emit("// Derived from: declare module \"" + importName + "\"\n");
                            namespace = [mangled];
                            // Declare "mangled$name" if it's not declared already elsewhere.
                            if (isFirstValueDeclaration(decl)) {
                                emit('/** @const */\n');
                                writeVariableStatement(mangled, [], '{}');
                            }
                            // Declare the contents inside the "mangled$name".
                            if (decl.body)
                                visitor(decl.body, [mangled]);
                            break;
                        default:
                            errorUnimplementedKind(decl.name, 'externs generation of namespace');
                            break;
                    }
                    break;
                case ts.SyntaxKind.ModuleBlock:
                    var block = node;
                    try {
                        for (var _c = __values(block.statements), _d = _c.next(); !_d.done; _d = _c.next()) {
                            var stmt = _d.value;
                            visitor(stmt, namespace);
                        }
                    }
                    catch (e_8_1) { e_8 = { error: e_8_1 }; }
                    finally {
                        try {
                            if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                        }
                        finally { if (e_8) throw e_8.error; }
                    }
                    break;
                case ts.SyntaxKind.ImportEqualsDeclaration:
                    var importEquals = node;
                    var localName = transformer_util_1.getIdentifierText(importEquals.name);
                    if (localName === 'ng') {
                        emit("\n/* Skipping problematic import ng = ...; */\n");
                        break;
                    }
                    if (importEquals.moduleReference.kind === ts.SyntaxKind.ExternalModuleReference) {
                        addImportAliases(importEquals);
                        break;
                    }
                    var qn = transformer_util_1.getEntityNameText(importEquals.moduleReference);
                    // @const so that Closure Compiler understands this is an alias.
                    if (namespace.length === 0)
                        emit('/** @const */\n');
                    writeVariableStatement(localName, namespace, qn);
                    break;
                case ts.SyntaxKind.ClassDeclaration:
                case ts.SyntaxKind.InterfaceDeclaration:
                    writeType(node, namespace);
                    break;
                case ts.SyntaxKind.FunctionDeclaration:
                    var fnDecl = node;
                    var name_3 = fnDecl.name;
                    if (!name_3) {
                        transformer_util_1.reportDiagnostic(diagnostics, fnDecl, 'anonymous function in externs');
                        break;
                    }
                    // Gather up all overloads of this function.
                    var sym = typeChecker.getSymbolAtLocation(name_3);
                    var decls = sym.declarations.filter(ts.isFunctionDeclaration);
                    // Only emit the first declaration of each overloaded function.
                    if (fnDecl !== decls[0])
                        break;
                    var params = emitFunctionType(decls);
                    writeFunction(name_3, params, namespace);
                    break;
                case ts.SyntaxKind.VariableStatement:
                    try {
                        for (var _e = __values(node.declarationList.declarations), _f = _e.next(); !_f.done; _f = _e.next()) {
                            var decl_1 = _f.value;
                            writeVariableDeclaration(decl_1, namespace);
                        }
                    }
                    catch (e_9_1) { e_9 = { error: e_9_1 }; }
                    finally {
                        try {
                            if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                        }
                        finally { if (e_9) throw e_9.error; }
                    }
                    break;
                case ts.SyntaxKind.EnumDeclaration:
                    writeEnum(node, namespace);
                    break;
                case ts.SyntaxKind.TypeAliasDeclaration:
                    writeTypeAlias(node, namespace);
                    break;
                case ts.SyntaxKind.ImportDeclaration:
                    addImportAliases(node);
                    break;
                case ts.SyntaxKind.NamespaceExportDeclaration:
                case ts.SyntaxKind.ExportAssignment:
                    // Handled on the file level.
                    break;
                default:
                    var locationStr = namespace.join('.') || path.basename(node.getSourceFile().fileName);
                    emit("\n// TODO(tsickle): " + ts.SyntaxKind[node.kind] + " in " + locationStr + "\n");
                    break;
            }
        }
    }
    exports.generateExterns = generateExterns;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZXJucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9leHRlcm5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVIOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQStDRztJQUVILDJCQUE2QjtJQUU3QixpRUFBK0M7SUFDL0MscURBQTJFO0lBQzNFLHlDQUFpQztJQUNqQyxtRUFBcUg7SUFDckgsNkVBQThEO0lBQzlELGlFQUEwSDtJQUMxSCwrREFBNkQ7SUFDN0QsMkNBQW1DO0lBRW5DOzs7T0FHRztJQUNILElBQU0seUJBQXlCLEdBQTBCO1FBQ3ZELFNBQVM7UUFDVCxRQUFRO1FBQ1IsUUFBUTtRQUNSLGdFQUFnRTtRQUNoRSx1RUFBdUU7UUFDdkUsa0VBQWtFO1FBQ2xFLHFFQUFxRTtRQUNyRSxtRUFBbUU7UUFDbkUsd0VBQXdFO1FBQ3hFLGdDQUFnQztRQUNoQyxrQkFBa0I7UUFDbEIsUUFBUTtRQUNSLG1CQUFtQjtLQUNwQixDQUFDO0lBR0Y7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQU0sY0FBYyxHQUFHLDJHQUt0QixDQUFDO0lBRUY7Ozs7OztPQU1HO0lBQ0gsNkJBQW9DLE9BQXFDLEVBQUUsT0FBWTtRQUFaLHdCQUFBLEVBQUEsWUFBWTs7UUFDckYsSUFBSSxVQUFVLEdBQUcsY0FBYyxDQUFDOztZQUNoQyxLQUF1QixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF4QyxJQUFNLFFBQVEsV0FBQTtnQkFDakIsVUFBVSxJQUFJLHFCQUFtQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsUUFBSyxDQUFDO2dCQUN2RSxVQUFVLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO2FBQ2pDOzs7Ozs7Ozs7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QzNELE1BQU07Z0JBQ1IsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGlCQUFpQjtvQkFDbEMsZ0JBQWdCLENBQUMsSUFBNEIsQ0FBQyxDQUFDO29CQUMvQyxNQUFNO2dCQUNSLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQywwQkFBMEIsQ0FBQztnQkFDOUMsS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGdCQUFnQjtvQkFDakMsNkJBQTZCO29CQUM3QixNQUFNO2dCQUNSO29CQUNFLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3hGLElBQUksQ0FBQyx5QkFBdUIsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQU8sV0FBVyxPQUFJLENBQUMsQ0FBQztvQkFDNUUsTUFBTTthQUNUO1FBQ0gsQ0FBQztJQUNILENBQUM7SUE5aUJELDBDQThpQkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBFeHRlcm5zIGNyZWF0ZXMgQ2xvc3VyZSBDb21waWxlciBcXEBleHRlcm5zIGRlZmluaXRpb25zIGZyb20gdGhlXG4gKiBhbWJpZW50IGRlY2xhcmF0aW9ucyBpbiBhIFR5cGVTY3JpcHQgZmlsZS5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgYSBkZWNsYXJlIGludGVyZmFjZSBGb28geyBiYXI6IHN0cmluZzsgfSBXb3VsZCBnZW5lcmF0ZSBhIC8uLlxuICogICBcXEBleHRlcm5zIC4vIC8uLiBcXEByZWNvcmQgLi8gdmFyIEZvbyA9IGZ1bmN0aW9uKCkge307IC8uLiBcXEB0eXBlIHtzdHJpbmd9XG4gKiAgIC4vIEZvby5wcm90b3R5cGUuYmFyO1xuICpcbiAqIFRoZSBnZW5lcmF0ZWQgZXh0ZXJucyBpbmRpY2F0ZSB0byBDbG9zdXJlIENvbXBpbGVyIHRoYXQgc3ltYm9scyBhcmUgZXh0ZXJuYWxcbiAqIHRvIHRoZSBvcHRpbWl6YXRpb24gcHJvY2VzcywgaS5lLiB0aGV5IGFyZSBwcm92aWRlZCBieSBvdXRzaWRlIGNvZGUuIFRoYXRcbiAqIG1vc3QgaW1wb3J0YW50bHkgbWVhbnMgdGhleSBtdXN0IG5vdCBiZSByZW5hbWVkIG9yIHJlbW92ZWQuXG4gKlxuICogQSBtYWpvciBkaWZmaWN1bHR5IGhlcmUgaXMgdGhhdCBUeXBlU2NyaXB0IHN1cHBvcnRzIG1vZHVsZS1zY29wZWQgZXh0ZXJuYWxcbiAqIHN5bWJvbHM7IGAuZC50c2AgZmlsZXMgY2FuIGNvbnRhaW4gYGV4cG9ydGBzIGFuZCBgaW1wb3J0YCBvdGhlciBmaWxlcy5cbiAqIENsb3N1cmUgQ29tcGlsZXIgZG9lcyBub3QgaGF2ZSBzdWNoIGEgY29uY2VwdCwgc28gdHNpY2tsZSBtdXN0IGVtdWxhdGUgdGhlXG4gKiBiZWhhdmlvdXIuIEl0IGRvZXMgc28gYnkgZm9sbG93aW5nIHRoaXMgc2NoZW1lOlxuICpcbiAqIDEuIG5vbi1tb2R1bGUgLmQudHMgcHJvZHVjZXMgZ2xvYmFsIHN5bWJvbHNcbiAqIDIuIG1vZHVsZSAuZC50cyBwcm9kdWNlIHN5bWJvbHMgbmFtZXNwYWNlZCB0byB0aGUgbW9kdWxlLCBieSBjcmVhdGluZyBhXG4gKiAgICBtYW5nbGVkIG5hbWUgbWF0Y2hpbmcgdGhlIGN1cnJlbnQgZmlsZSdzIHBhdGguIHRzaWNrbGUgZXhwZWN0cyBvdXRzaWRlXG4gKiAgICBjb2RlIChlLmcuIGJ1aWxkIHN5c3RlbSBpbnRlZ3JhdGlvbiBvciBtYW51YWxseSB3cml0dGVuIGNvZGUpIHRvIGNvbnRhaW4gYVxuICogICAgZ29vZy5tb2R1bGUvcHJvdmlkZSB0aGF0IHJlZmVyZW5jZXMgdGhlIG1hbmdsZWQgcGF0aC5cbiAqIDMuIGRlY2xhcmF0aW9ucyBpbiBgLnRzYCBmaWxlcyBwcm9kdWNlIHR5cGVzIHRoYXQgY2FuIGJlIHNlcGFyYXRlbHkgZW1pdHRlZFxuICogICAgaW4gZS5nLiBhbiBgZXh0ZXJucy5qc2AsIHVzaW5nIGBnZXRHZW5lcmF0ZWRFeHRlcm5zYCBiZWxvdy5cbiAqICAgIDEuIG5vbi1leHBvcnRlZCBzeW1ib2xzIHByb2R1Y2UgZ2xvYmFsIHR5cGVzLCBiZWNhdXNlIHRoYXQncyB3aGF0IHVzZXJzXG4gKiAgICAgICBleHBlY3QgYW5kIGl0IG1hdGNoZXMgVHlwZVNjcmlwdHMgZW1pdCwgd2hpY2gganVzdCByZWZlcmVuY2VzIGBGb29gIGZvclxuICogICAgICAgYSBsb2NhbGx5IGRlY2xhcmVkIHN5bWJvbCBgRm9vYCBpbiBhIG1vZHVsZS4gQXJndWFibHkgdGhlc2Ugc2hvdWxkIGJlXG4gKiAgICAgICB3cmFwcGVkIGluIGBkZWNsYXJlIGdsb2JhbCB7IC4uLiB9YC5cbiAqICAgIDIuIGV4cG9ydGVkIHN5bWJvbHMgYXJlIHNjb3BlZCB0byB0aGUgYC50c2AgZmlsZSBieSBwcmVmaXhpbmcgdGhlbSB3aXRoIGFcbiAqICAgICAgIG1hbmdsZWQgbmFtZS4gRXhwb3J0ZWQgdHlwZXMgYXJlIHJlLWV4cG9ydGVkIGZyb20gdGhlIEphdmFTY3JpcHRcbiAqICAgICAgIGBnb29nLm1vZHVsZWAsIGFsbG93aW5nIGRvd25zdHJlYW0gY29kZSB0byByZWZlcmVuY2UgdGhlbS4gVGhpcyBoYXMgdGhlXG4gKiAgICAgICBzYW1lIHByb2JsZW0gcmVnYXJkaW5nIGFtYmllbnQgdmFsdWVzIGFzIGFib3ZlLCBpdCBpcyB1bmNsZWFyIHdoZXJlIHRoZVxuICogICAgICAgdmFsdWUgc3ltYm9sIHdvdWxkIGJlIGRlZmluZWQsIHNvIGZvciB0aGUgdGltZSBiZWluZyB0aGlzIGlzXG4gKiAgICAgICB1bnN1cHBvcnRlZC5cbiAqXG4gKiBUaGUgZWZmZWN0IG9mIHRoaXMgaXMgdGhhdDpcbiAqIC0gc3ltYm9scyBpbiBhIG1vZHVsZSAoaS5lLiBub3QgZ2xvYmFscykgYXJlIGdlbmVyYWxseSBzY29wZWQgdG8gdGhlIGxvY2FsXG4gKiAgIG1vZHVsZSB1c2luZyBhIG1hbmdsZWQgbmFtZSwgcHJldmVudGluZyBzeW1ib2wgY29sbGlzaW9ucyBvbiB0aGUgQ2xvc3VyZVxuICogICBzaWRlLlxuICogLSBpbXBvcnRpbmcgY29kZSBjYW4gdW5jb25kaXRpb25hbGx5IHJlZmVyIHRvIGFuZCBpbXBvcnQgYW55IHN5bWJvbCBkZWZpbmVkXG4gKiAgIGluIGEgbW9kdWxlIGBYYCBhcyBgcGF0aC50by5tb2R1bGUuWGAsIHJlZ2FyZGxlc3Mgb2Ygd2hldGhlciB0aGUgZGVmaW5pbmdcbiAqICAgbG9jYXRpb24gaXMgYSBgLmQudHNgIGZpbGUgb3IgYSBgLnRzYCBmaWxlLCBhbmQgcmVnYXJkbGVzcyB3aGV0aGVyIHRoZVxuICogICBzeW1ib2wgaXMgYW1iaWVudCAoYXNzdW1pbmcgdGhlcmUncyBhbiBhcHByb3ByaWF0ZSBzaGltKS5cbiAqIC0gaWYgdGhlcmUgaXMgYSBzaGltIHByZXNlbnQsIHRzaWNrbGUgYXZvaWRzIGVtaXR0aW5nIHRoZSBDbG9zdXJlIG5hbWVzcGFjZVxuICogICBpdHNlbGYsIGV4cGVjdGluZyB0aGUgc2hpbSB0byBwcm92aWRlIHRoZSBuYW1lc3BhY2UgYW5kIGluaXRpYWxpemUgaXQgdG8gYVxuICogICBzeW1ib2wgdGhhdCBwcm92aWRlcyB0aGUgcmlnaHQgdmFsdWUgYXQgcnVudGltZSAoaS5lLiB0aGUgaW1wbGVtZW50YXRpb24gb2ZcbiAqICAgd2hhdGV2ZXIgdGhpcmQgcGFydHkgbGlicmFyeSB0aGUgLmQudHMgZGVzY3JpYmVzKS5cbiAqL1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQge2dldEVudW1UeXBlfSBmcm9tICcuL2VudW1fdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtleHRyYWN0R29vZ05hbWVzcGFjZUltcG9ydCwgcmVzb2x2ZU1vZHVsZU5hbWV9IGZyb20gJy4vZ29vZ21vZHVsZSc7XG5pbXBvcnQgKiBhcyBqc2RvYyBmcm9tICcuL2pzZG9jJztcbmltcG9ydCB7QW5ub3RhdG9ySG9zdCwgZXNjYXBlRm9yQ29tbWVudCwgbWF5YmVBZGRIZXJpdGFnZUNsYXVzZXMsIG1heWJlQWRkVGVtcGxhdGVDbGF1c2V9IGZyb20gJy4vanNkb2NfdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtNb2R1bGVUeXBlVHJhbnNsYXRvcn0gZnJvbSAnLi9tb2R1bGVfdHlwZV90cmFuc2xhdG9yJztcbmltcG9ydCB7Z2V0RW50aXR5TmFtZVRleHQsIGdldElkZW50aWZpZXJUZXh0LCBoYXNNb2RpZmllckZsYWcsIGlzRHRzRmlsZU5hbWUsIHJlcG9ydERpYWdub3N0aWN9IGZyb20gJy4vdHJhbnNmb3JtZXJfdXRpbCc7XG5pbXBvcnQge2lzVmFsaWRDbG9zdXJlUHJvcGVydHlOYW1lfSBmcm9tICcuL3R5cGVfdHJhbnNsYXRvcic7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICcuL3R5cGVzY3JpcHQnO1xuXG4vKipcbiAqIFN5bWJvbHMgdGhhdCBhcmUgYWxyZWFkeSBkZWNsYXJlZCBhcyBleHRlcm5zIGluIENsb3N1cmUsIHRoYXQgc2hvdWxkXG4gKiBiZSBhdm9pZGVkIGJ5IHRzaWNrbGUncyBcImRlY2xhcmUgLi4uXCIgPT4gZXh0ZXJucy5qcyBjb252ZXJzaW9uLlxuICovXG5jb25zdCBDTE9TVVJFX0VYVEVSTlNfQkxBQ0tMSVNUOiBSZWFkb25seUFycmF5PHN0cmluZz4gPSBbXG4gICdleHBvcnRzJyxcbiAgJ2dsb2JhbCcsXG4gICdtb2R1bGUnLFxuICAvLyBFcnJvckNvbnN0cnVjdG9yIGlzIHRoZSBpbnRlcmZhY2Ugb2YgdGhlIEVycm9yIG9iamVjdCBpdHNlbGYuXG4gIC8vIHRzaWNrbGUgZGV0ZWN0cyB0aGF0IHRoaXMgaXMgcGFydCBvZiB0aGUgVHlwZVNjcmlwdCBzdGFuZGFyZCBsaWJyYXJ5XG4gIC8vIGFuZCBhc3N1bWVzIGl0J3MgcGFydCBvZiB0aGUgQ2xvc3VyZSBzdGFuZGFyZCBsaWJyYXJ5LCBidXQgdGhpc1xuICAvLyBhc3N1bXB0aW9uIGlzIHdyb25nIGZvciBFcnJvckNvbnN0cnVjdG9yLiAgVG8gcHJvcGVybHkgaGFuZGxlIHRoaXNcbiAgLy8gd2UnZCBzb21laG93IG5lZWQgdG8gbWFwIG1ldGhvZHMgZGVmaW5lZCBvbiB0aGUgRXJyb3JDb25zdHJ1Y3RvclxuICAvLyBpbnRlcmZhY2UgaW50byBwcm9wZXJ0aWVzIG9uIENsb3N1cmUncyBFcnJvciBvYmplY3QsIGJ1dCBmb3Igbm93IGl0J3NcbiAgLy8gc2ltcGxlciB0byBqdXN0IGJsYWNrbGlzdCBpdC5cbiAgJ0Vycm9yQ29uc3RydWN0b3InLFxuICAnU3ltYm9sJyxcbiAgJ1dvcmtlckdsb2JhbFNjb3BlJyxcbl07XG5cblxuLyoqXG4gKiBUaGUgaGVhZGVyIHRvIGJlIHVzZWQgaW4gZ2VuZXJhdGVkIGV4dGVybnMuICBUaGlzIGlzIG5vdCBpbmNsdWRlZCBpbiB0aGUgb3V0cHV0IG9mXG4gKiBnZW5lcmF0ZUV4dGVybnMoKSBiZWNhdXNlIGdlbmVyYXRlRXh0ZXJucygpIHdvcmtzIG9uZSBmaWxlIGF0IGEgdGltZSwgYW5kIHR5cGljYWxseSB5b3UgY3JlYXRlXG4gKiBvbmUgZXh0ZXJucyBmaWxlIGZyb20gdGhlIGVudGlyZSBjb21waWxhdGlvbiB1bml0LlxuICpcbiAqIFN1cHByZXNzaW9uczpcbiAqIC0gZHVwbGljYXRlOiBiZWNhdXNlIGV4dGVybnMgbWlnaHQgZHVwbGljYXRlIHJlLW9wZW5lZCBkZWZpbml0aW9ucyBmcm9tIG90aGVyIEpTIGZpbGVzLlxuICogLSBjaGVja1R5cGVzOiBDbG9zdXJlJ3MgdHlwZSBzeXN0ZW0gZG9lcyBub3QgbWF0Y2ggVFMnLlxuICogLSB1bmRlZmluZWROYW1lczogY29kZSBiZWxvdyB0cmllcyB0byBiZSBjYXJlZnVsIG5vdCB0byBvdmVyd3JpdGUgcHJldmlvdXNseSBlbWl0dGVkIGRlZmluaXRpb25zLFxuICogICBidXQgb24gdGhlIGZsaXAgc2lkZSBtaWdodCBhY2NpZGVudGFsbHkgbWlzcyBkZWZpbml0aW9ucy5cbiAqL1xuY29uc3QgRVhURVJOU19IRUFERVIgPSBgLyoqXG4gKiBAZXh0ZXJuc1xuICogQHN1cHByZXNzIHtkdXBsaWNhdGUsY2hlY2tUeXBlc31cbiAqL1xuLy8gTk9URTogZ2VuZXJhdGVkIGJ5IHRzaWNrbGUsIGRvIG5vdCBlZGl0LlxuYDtcblxuLyoqXG4gKiBDb25jYXRlbmF0ZSBhbGwgZ2VuZXJhdGVkIGV4dGVybnMgZGVmaW5pdGlvbnMgdG9nZXRoZXIgaW50byBhIHN0cmluZywgaW5jbHVkaW5nIGEgZmlsZSBjb21tZW50XG4gKiBoZWFkZXIuXG4gKlxuICogQHBhcmFtIHJvb3REaXIgUHJvamVjdCByb290LiAgRW1pdHRlZCBjb21tZW50cyB3aWxsIHJlZmVyZW5jZSBwYXRocyByZWxhdGl2ZSB0byB0aGlzIHJvb3QuXG4gKiAgICBUaGlzIHBhcmFtIGlzIGVmZmVjdGl2ZWx5IHJlcXVpcmVkLCBidXQgbWFkZSBvcHRpb25hbCBoZXJlIHVudGlsIEFuZ3VsYXIgaXMgZml4ZWQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRHZW5lcmF0ZWRFeHRlcm5zKGV4dGVybnM6IHtbZmlsZU5hbWU6IHN0cmluZ106IHN0cmluZ30sIHJvb3REaXIgPSAnJyk6IHN0cmluZyB7XG4gIGxldCBhbGxFeHRlcm5zID0gRVhURVJOU19IRUFERVI7XG4gIGZvciAoY29uc3QgZmlsZU5hbWUgb2YgT2JqZWN0LmtleXMoZXh0ZXJucykpIHtcbiAgICBhbGxFeHRlcm5zICs9IGAvLyBleHRlcm5zIGZyb20gJHtwYXRoLnJlbGF0aXZlKHJvb3REaXIsIGZpbGVOYW1lKX06XFxuYDtcbiAgICBhbGxFeHRlcm5zICs9IGV4dGVybnNbZmlsZU5hbWVdO1xuICB9XG4gIHJldHVybiBhbGxFeHRlcm5zO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBtYW5nbGVkIHZlcnNpb24gb2YgdGhlIG1vZHVsZSBuYW1lIChyZXNvbHZlZCBmaWxlIG5hbWUpIGZvciBzb3VyY2UgZmlsZS5cbiAqXG4gKiBUaGUgbWFuZ2xlZCBuYW1lIGlzIHNhZmUgdG8gdXNlIGFzIGEgSmF2YVNjcmlwdCBpZGVudGlmaWVyLiBJdCBpcyB1c2VkIGFzIGEgZ2xvYmFsbHkgdW5pcXVlXG4gKiBwcmVmaXggdG8gc2NvcGUgc3ltYm9scyBpbiBleHRlcm5zIGZpbGUgKHNlZSBjb2RlIGJlbG93KS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIG1vZHVsZU5hbWVBc0lkZW50aWZpZXIoaG9zdDogQW5ub3RhdG9ySG9zdCwgZmlsZU5hbWU6IHN0cmluZyk6IHN0cmluZyB7XG4gIHJldHVybiBob3N0LnBhdGhUb01vZHVsZU5hbWUoJycsIGZpbGVOYW1lKS5yZXBsYWNlKC9cXC4vZywgJyQnKTtcbn1cblxuLyoqXG4gKiBpc0luR2xvYmFsQXVnbWVudGF0aW9uIHJldHVybnMgdHJ1ZSBpZiBkZWNsYXJhdGlvbiBpcyB0aGUgaW1tZWRpYXRlIGNoaWxkIG9mIGEgJ2RlY2xhcmUgZ2xvYmFsJ1xuICogYmxvY2suXG4gKi9cbmZ1bmN0aW9uIGlzSW5HbG9iYWxBdWdtZW50YXRpb24oZGVjbGFyYXRpb246IHRzLkRlY2xhcmF0aW9uKTogYm9vbGVhbiB7XG4gIC8vIGRlY2xhcmUgZ2xvYmFsIHsgLi4uIH0gY3JlYXRlcyBhIE1vZHVsZURlY2xhcmF0aW9uIGNvbnRhaW5pbmcgYSBNb2R1bGVCbG9jayBjb250YWluaW5nIHRoZVxuICAvLyBkZWNsYXJhdGlvbiwgd2l0aCB0aGUgTW9kdWxlRGVjbGFyYXRpb24gaGF2aW5nIHRoZSBHbG9iYWxBdWdtZW50YXRpb24gZmxhZyBzZXQuXG4gIGlmICghZGVjbGFyYXRpb24ucGFyZW50IHx8ICFkZWNsYXJhdGlvbi5wYXJlbnQucGFyZW50KSByZXR1cm4gZmFsc2U7XG4gIHJldHVybiAoZGVjbGFyYXRpb24ucGFyZW50LnBhcmVudC5mbGFncyAmIHRzLk5vZGVGbGFncy5HbG9iYWxBdWdtZW50YXRpb24pICE9PSAwO1xufVxuXG4vKipcbiAqIGdlbmVyYXRlRXh0ZXJucyBnZW5lcmF0ZXMgZXh0ZXJuIGRlZmluaXRpb25zIGZvciBhbGwgYW1iaWVudCBkZWNsYXJhdGlvbnMgaW4gdGhlIGdpdmVuIHNvdXJjZVxuICogZmlsZS4gSXQgcmV0dXJucyBhIHN0cmluZyByZXByZXNlbnRhdGlvbiBvZiB0aGUgQ2xvc3VyZSBKYXZhU2NyaXB0LCBub3QgaW5jbHVkaW5nIHRoZSBpbml0aWFsXG4gKiBjb21tZW50IHdpdGggXFxAZmlsZW92ZXJ2aWV3IGFuZCBcXEBleHRlcm5zIChzZWUgYWJvdmUgZm9yIHRoYXQpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2VuZXJhdGVFeHRlcm5zKFxuICAgIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlciwgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgaG9zdDogQW5ub3RhdG9ySG9zdCxcbiAgICBtb2R1bGVSZXNvbHV0aW9uSG9zdDogdHMuTW9kdWxlUmVzb2x1dGlvbkhvc3QsXG4gICAgb3B0aW9uczogdHMuQ29tcGlsZXJPcHRpb25zKToge291dHB1dDogc3RyaW5nLCBkaWFnbm9zdGljczogdHMuRGlhZ25vc3RpY1tdfSB7XG4gIGxldCBvdXRwdXQgPSAnJztcbiAgY29uc3QgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSA9IFtdO1xuICBjb25zdCBpc0R0cyA9IGlzRHRzRmlsZU5hbWUoc291cmNlRmlsZS5maWxlTmFtZSk7XG4gIGNvbnN0IGlzRXh0ZXJuYWxNb2R1bGUgPSB0cy5pc0V4dGVybmFsTW9kdWxlKHNvdXJjZUZpbGUpO1xuXG4gIGNvbnN0IG10dCA9XG4gICAgICBuZXcgTW9kdWxlVHlwZVRyYW5zbGF0b3Ioc291cmNlRmlsZSwgdHlwZUNoZWNrZXIsIGhvc3QsIGRpYWdub3N0aWNzLCAvKmlzRm9yRXh0ZXJucyovIHRydWUpO1xuXG4gIGxldCByb290TmFtZXNwYWNlID0gJyc7XG4gIGlmIChpc0V4dGVybmFsTW9kdWxlKSB7XG4gICAgLy8gLmQudHMgZmlsZXMgdGhhdCBhcmUgbW9kdWxlcyBkbyBub3QgZGVjbGFyZSBnbG9iYWwgc3ltYm9scyAtIHRoZWlyIHN5bWJvbHMgbXVzdCBiZSBleHBsaWNpdGx5XG4gICAgLy8gaW1wb3J0ZWQgdG8gYmUgdXNlZC4gSG93ZXZlciBDbG9zdXJlIENvbXBpbGVyIGhhcyBubyBjb25jZXB0IG9mIGV4dGVybnMgdGhhdCBhcmUgbW9kdWxlcyBhbmRcbiAgICAvLyByZXF1aXJlIGltcG9ydHMuIFRoaXMgY29kZSBtYW5nbGVzIHRoZSBzeW1ib2wgbmFtZXMgYnkgd3JhcHBpbmcgdGhlbSBpbiBhIHRvcCBsZXZlbCB2YXJpYWJsZVxuICAgIC8vIHRoYXQncyB1bmlxdWUgdG8gdGhpcyBmaWxlLiBUaGF0IGFsbG93cyBlbWl0dGluZyB0aGVtIGZvciBDbG9zdXJlIGFzIGdsb2JhbCBzeW1ib2xzIHdoaWxlXG4gICAgLy8gYXZvaWRpbmcgY29sbGlzaW9ucy4gVGhpcyBpcyBuZWNlc3NhcnkgYXMgc3ltYm9scyBsb2NhbCB0byB0aGlzIG1vZHVsZSBjYW4gKGFuZCB3aWxsIHZlcnlcbiAgICAvLyBjb21tb25seSkgY29uZmxpY3Qgd2l0aCB0aGUgbmFtZXNwYWNlIHVzZWQgaW4gXCJleHBvcnQgYXMgbmFtZXNwYWNlXCIsIGUuZy4gXCJhbmd1bGFyXCIsIGFuZCBhbHNvXG4gICAgLy8gdG8gYXZvaWQgdXNlcnMgYWNjaWRlbnRhbGx5IHVzaW5nIHRoZXNlIHN5bWJvbHMgaW4gLmpzIGZpbGVzIChhbmQgbW9yZSBjb2xsaXNpb25zKS4gVGhlXG4gICAgLy8gc3ltYm9scyB0aGF0IGFyZSBcImhpZGRlblwiIGxpa2UgdGhhdCBjYW4gYmUgbWFkZSBhY2Nlc3NpYmxlIHRocm91Z2ggYW4gXCJleHBvcnQgYXMgbmFtZXNwYWNlXCJcbiAgICAvLyBkZWNsYXJhdGlvbiAoc2VlIGJlbG93KS5cbiAgICByb290TmFtZXNwYWNlID0gbW9kdWxlTmFtZUFzSWRlbnRpZmllcihob3N0LCBzb3VyY2VGaWxlLmZpbGVOYW1lKTtcbiAgfVxuXG4gIGZvciAoY29uc3Qgc3RtdCBvZiBzb3VyY2VGaWxlLnN0YXRlbWVudHMpIHtcbiAgICBpZiAoIWlzRHRzICYmICFoYXNNb2RpZmllckZsYWcoc3RtdCBhcyB0cy5EZWNsYXJhdGlvblN0YXRlbWVudCwgdHMuTW9kaWZpZXJGbGFncy5BbWJpZW50KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIHZpc2l0b3Ioc3RtdCwgW10pO1xuICB9XG5cbiAgaWYgKG91dHB1dCAmJiBpc0V4dGVybmFsTW9kdWxlKSB7XG4gICAgLy8gSWYgdHNpY2tsZSBnZW5lcmF0ZWQgYW55IGV4dGVybnMgYW5kIHRoaXMgaXMgYW4gZXh0ZXJuYWwgbW9kdWxlLCBwcmVwZW5kIHRoZSBuYW1lc3BhY2VcbiAgICAvLyBkZWNsYXJhdGlvbiBmb3IgaXQuXG4gICAgb3V0cHV0ID0gYC8qKiBAY29uc3QgKi9cXG52YXIgJHtyb290TmFtZXNwYWNlfSA9IHt9O1xcbmAgKyBvdXRwdXQ7XG5cbiAgICAvLyBUaGVyZSBjYW4gb25seSBiZSBvbmUgZXhwb3J0ID0uXG4gICAgY29uc3QgZXhwb3J0QXNzaWdubWVudCA9IHNvdXJjZUZpbGUuc3RhdGVtZW50cy5maW5kKHRzLmlzRXhwb3J0QXNzaWdubWVudCk7XG4gICAgbGV0IGV4cG9ydGVkTmFtZXNwYWNlID0gcm9vdE5hbWVzcGFjZTtcbiAgICBpZiAoZXhwb3J0QXNzaWdubWVudCAmJiBleHBvcnRBc3NpZ25tZW50LmlzRXhwb3J0RXF1YWxzKSB7XG4gICAgICBpZiAodHMuaXNJZGVudGlmaWVyKGV4cG9ydEFzc2lnbm1lbnQuZXhwcmVzc2lvbikgfHxcbiAgICAgICAgICB0cy5pc1F1YWxpZmllZE5hbWUoZXhwb3J0QXNzaWdubWVudC5leHByZXNzaW9uKSkge1xuICAgICAgICAvLyBFLmcuIGV4cG9ydCA9IHNvbWVOYW1lO1xuICAgICAgICAvLyBJZiBzb21lTmFtZSBpcyBcImRlY2xhcmUgZ2xvYmFsIHsgbmFtZXNwYWNlIHNvbWVOYW1lIHsuLi59IH1cIiwgdHNpY2tsZSBtdXN0IG5vdCBxdWFsaWZ5XG4gICAgICAgIC8vIGFjY2VzcyB0byBpdCB3aXRoIG1vZHVsZSBuYW1lc3BhY2UgYXMgaXQgaXMgZW1pdHRlZCBpbiB0aGUgZ2xvYmFsIG5hbWVzcGFjZS5cbiAgICAgICAgY29uc3Qgc3ltYm9sID0gdHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihleHBvcnRBc3NpZ25tZW50LmV4cHJlc3Npb24pO1xuICAgICAgICBjb25zdCBpc0dsb2JhbFN5bWJvbCA9IHN5bWJvbCAmJiBzeW1ib2wuZGVjbGFyYXRpb25zICYmXG4gICAgICAgICAgICBzeW1ib2wuZGVjbGFyYXRpb25zLnNvbWUoZCA9PiBpc0luR2xvYmFsQXVnbWVudGF0aW9uKGQpKTtcbiAgICAgICAgY29uc3QgZW50aXR5TmFtZSA9IGdldEVudGl0eU5hbWVUZXh0KGV4cG9ydEFzc2lnbm1lbnQuZXhwcmVzc2lvbik7XG4gICAgICAgIGlmIChpc0dsb2JhbFN5bWJvbCkge1xuICAgICAgICAgIGV4cG9ydGVkTmFtZXNwYWNlID0gZW50aXR5TmFtZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleHBvcnRlZE5hbWVzcGFjZSA9IHJvb3ROYW1lc3BhY2UgKyAnLicgKyBlbnRpdHlOYW1lO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXBvcnREaWFnbm9zdGljKFxuICAgICAgICAgICAgZGlhZ25vc3RpY3MsIGV4cG9ydEFzc2lnbm1lbnQuZXhwcmVzc2lvbixcbiAgICAgICAgICAgIGBleHBvcnQgPSBleHByZXNzaW9uIG11c3QgYmUgYSBxdWFsaWZpZWQgbmFtZSwgZ290ICR7XG4gICAgICAgICAgICAgICAgdHMuU3ludGF4S2luZFtleHBvcnRBc3NpZ25tZW50LmV4cHJlc3Npb24ua2luZF19LmApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpc0R0cyAmJiBob3N0LnByb3ZpZGVFeHRlcm5hbE1vZHVsZUR0c05hbWVzcGFjZSkge1xuICAgICAgLy8gSW4gYSBub24tc2hpbW1lZCBtb2R1bGUsIGNyZWF0ZSBhIGdsb2JhbCBuYW1lc3BhY2UuIFRoaXMgZXhpc3RzIHB1cmVseSBmb3IgYmFja3dhcmRzXG4gICAgICAvLyBjb21wYXRpYmxpdHksIGluIHRoZSBtZWRpdW0gdGVybSBhbGwgY29kZSB1c2luZyB0c2lja2xlIHNob3VsZCBhbHdheXMgdXNlIGBnb29nLm1vZHVsZWBzLFxuICAgICAgLy8gc28gZ2xvYmFsIG5hbWVzIHNob3VsZCBub3QgYmUgbmVjY2Vzc2FyeS5cbiAgICAgIGZvciAoY29uc3QgbnNFeHBvcnQgb2Ygc291cmNlRmlsZS5zdGF0ZW1lbnRzLmZpbHRlcih0cy5pc05hbWVzcGFjZUV4cG9ydERlY2xhcmF0aW9uKSkge1xuICAgICAgICBjb25zdCBuYW1lc3BhY2VOYW1lID0gZ2V0SWRlbnRpZmllclRleHQobnNFeHBvcnQubmFtZSk7XG4gICAgICAgIGVtaXQoYC8vIGV4cG9ydCBhcyBuYW1lc3BhY2UgJHtuYW1lc3BhY2VOYW1lfVxcbmApO1xuICAgICAgICB3cml0ZVZhcmlhYmxlU3RhdGVtZW50KG5hbWVzcGFjZU5hbWUsIFtdLCBleHBvcnRlZE5hbWVzcGFjZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtvdXRwdXQsIGRpYWdub3N0aWNzfTtcblxuICBmdW5jdGlvbiBlbWl0KHN0cjogc3RyaW5nKSB7XG4gICAgb3V0cHV0ICs9IHN0cjtcbiAgfVxuXG4gIC8qKlxuICAgKiBpc0ZpcnN0RGVjbGFyYXRpb24gcmV0dXJucyB0cnVlIGlmIGRlY2wgaXMgdGhlIGZpcnN0IGRlY2xhcmF0aW9uXG4gICAqIG9mIGl0cyBzeW1ib2wuICBFLmcuIGltYWdpbmVcbiAgICogICBpbnRlcmZhY2UgRm9vIHsgeDogbnVtYmVyOyB9XG4gICAqICAgaW50ZXJmYWNlIEZvbyB7IHk6IG51bWJlcjsgfVxuICAgKiB3ZSBvbmx5IHdhbnQgdG8gZW1pdCB0aGUgXCJcXEByZWNvcmRcIiBmb3IgRm9vIG9uIHRoZSBmaXJzdCBvbmUuXG4gICAqXG4gICAqIFRoZSBleGNlcHRpb24gYXJlIHZhcmlhYmxlIGRlY2xhcmF0aW9ucywgd2hpY2ggLSBpbiBleHRlcm5zIC0gZG8gbm90IGFzc2lnbiBhIHZhbHVlOlxuICAgKiAgIC8uLiBcXEB0eXBlIHsuLi59IC4vXG4gICAqICAgdmFyIHNvbWVWYXJpYWJsZTtcbiAgICogICAvLi4gXFxAdHlwZSB7Li4ufSAuL1xuICAgKiAgIHNvbWVOYW1lc3BhY2Uuc29tZVZhcmlhYmxlO1xuICAgKiBJZiBhIGxhdGVyIGRlY2xhcmF0aW9uIHdhbnRzIHRvIGFkZCBhZGRpdGlvbmFsIHByb3BlcnRpZXMgb24gc29tZVZhcmlhYmxlLCB0c2lja2xlIG11c3Qgc3RpbGxcbiAgICogZW1pdCBhbiBhc3NpZ25tZW50IGludG8gdGhlIG9iamVjdCwgYXMgaXQncyBvdGhlcndpc2UgYWJzZW50LlxuICAgKi9cbiAgZnVuY3Rpb24gaXNGaXJzdFZhbHVlRGVjbGFyYXRpb24oZGVjbDogdHMuRGVjbGFyYXRpb25TdGF0ZW1lbnQpOiBib29sZWFuIHtcbiAgICBpZiAoIWRlY2wubmFtZSkgcmV0dXJuIHRydWU7XG4gICAgY29uc3Qgc3ltID0gdHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihkZWNsLm5hbWUpITtcbiAgICBpZiAoIXN5bS5kZWNsYXJhdGlvbnMgfHwgc3ltLmRlY2xhcmF0aW9ucy5sZW5ndGggPCAyKSByZXR1cm4gdHJ1ZTtcbiAgICBjb25zdCBlYXJsaWVyRGVjbHMgPSBzeW0uZGVjbGFyYXRpb25zLnNsaWNlKDAsIHN5bS5kZWNsYXJhdGlvbnMuaW5kZXhPZihkZWNsKSk7XG4gICAgLy8gRWl0aGVyIHRoZXJlIGFyZSBubyBlYXJsaWVyIGRlY2xhcmF0aW9ucywgb3IgYWxsIG9mIHRoZW0gYXJlIHZhcmlhYmxlcyAoc2VlIGFib3ZlKS4gdHNpY2tsZVxuICAgIC8vIGVtaXRzIGEgdmFsdWUgZm9yIGFsbCBvdGhlciBkZWNsYXJhdGlvbiBraW5kcyAoZnVuY3Rpb24gZm9yIGZ1bmN0aW9ucywgY2xhc3NlcywgaW50ZXJmYWNlcyxcbiAgICAvLyB7fSBvYmplY3QgZm9yIG5hbWVzcGFjZXMpLlxuICAgIHJldHVybiBlYXJsaWVyRGVjbHMubGVuZ3RoID09PSAwIHx8IGVhcmxpZXJEZWNscy5ldmVyeSh0cy5pc1ZhcmlhYmxlRGVjbGFyYXRpb24pO1xuICB9XG5cbiAgLyoqIFdyaXRlcyB0aGUgYWN0dWFsIHZhcmlhYmxlIHN0YXRlbWVudCBvZiBhIENsb3N1cmUgdmFyaWFibGUgZGVjbGFyYXRpb24uICovXG4gIGZ1bmN0aW9uIHdyaXRlVmFyaWFibGVTdGF0ZW1lbnQobmFtZTogc3RyaW5nLCBuYW1lc3BhY2U6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiwgdmFsdWU/OiBzdHJpbmcpIHtcbiAgICBjb25zdCBxdWFsaWZpZWROYW1lID0gbmFtZXNwYWNlLmNvbmNhdChbbmFtZV0pLmpvaW4oJy4nKTtcbiAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCA9PT0gMCkgZW1pdChgdmFyIGApO1xuICAgIGVtaXQocXVhbGlmaWVkTmFtZSk7XG4gICAgaWYgKHZhbHVlKSBlbWl0KGAgPSAke3ZhbHVlfWApO1xuICAgIGVtaXQoJztcXG4nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBXcml0ZXMgYSBDbG9zdXJlIHZhcmlhYmxlIGRlY2xhcmF0aW9uLCBpLmUuIHRoZSB2YXJpYWJsZSBzdGF0ZW1lbnQgd2l0aCBhIGxlYWRpbmcgSlNEb2NcbiAgICogY29tbWVudCBtYWtpbmcgaXQgYSBkZWNsYXJhdGlvbi5cbiAgICovXG4gIGZ1bmN0aW9uIHdyaXRlVmFyaWFibGVEZWNsYXJhdGlvbihcbiAgICAgIGRlY2w6IHRzLlZhcmlhYmxlRGVjbGFyYXRpb24sIG5hbWVzcGFjZTogUmVhZG9ubHlBcnJheTxzdHJpbmc+KSB7XG4gICAgaWYgKGRlY2wubmFtZS5raW5kID09PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgIGNvbnN0IG5hbWUgPSBnZXRJZGVudGlmaWVyVGV4dChkZWNsLm5hbWUgYXMgdHMuSWRlbnRpZmllcik7XG4gICAgICBpZiAoQ0xPU1VSRV9FWFRFUk5TX0JMQUNLTElTVC5pbmRleE9mKG5hbWUpID49IDApIHJldHVybjtcbiAgICAgIGVtaXQoanNkb2MudG9TdHJpbmcoW3t0YWdOYW1lOiAndHlwZScsIHR5cGU6IG10dC50eXBlVG9DbG9zdXJlKGRlY2wpfV0pKTtcbiAgICAgIGVtaXQoJ1xcbicpO1xuICAgICAgd3JpdGVWYXJpYWJsZVN0YXRlbWVudChuYW1lLCBuYW1lc3BhY2UpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlcnJvclVuaW1wbGVtZW50ZWRLaW5kKGRlY2wubmFtZSwgJ2V4dGVybnMgZm9yIHZhcmlhYmxlJyk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEVtaXRzIGEgSlNEb2MgZGVjbGFyYXRpb24gdGhhdCBtZXJnZXMgdGhlIHNpZ25hdHVyZXMgb2YgdGhlIGdpdmVuIGZ1bmN0aW9uIGRlY2xhcmF0aW9uIChmb3JcbiAgICogb3ZlcmxvYWRzKSwgYW5kIHJldHVybnMgdGhlIHBhcmFtZXRlciBuYW1lcyBjaG9zZW4uXG4gICAqL1xuICBmdW5jdGlvbiBlbWl0RnVuY3Rpb25UeXBlKGRlY2xzOiB0cy5GdW5jdGlvbkxpa2VEZWNsYXJhdGlvbltdLCBleHRyYVRhZ3M6IGpzZG9jLlRhZ1tdID0gW10pIHtcbiAgICBjb25zdCB7dGFncywgcGFyYW1ldGVyTmFtZXN9ID0gbXR0LmdldEZ1bmN0aW9uVHlwZUpTRG9jKGRlY2xzLCBleHRyYVRhZ3MpO1xuICAgIGVtaXQoJ1xcbicpO1xuICAgIGVtaXQoanNkb2MudG9TdHJpbmcodGFncykpO1xuICAgIHJldHVybiBwYXJhbWV0ZXJOYW1lcztcbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlRnVuY3Rpb24obmFtZTogdHMuTm9kZSwgcGFyYW1zOiBzdHJpbmdbXSwgbmFtZXNwYWNlOiBSZWFkb25seUFycmF5PHN0cmluZz4pIHtcbiAgICBjb25zdCBwYXJhbXNTdHIgPSBwYXJhbXMuam9pbignLCAnKTtcbiAgICBpZiAobmFtZXNwYWNlLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBmcW4gPSBuYW1lc3BhY2Uuam9pbignLicpO1xuICAgICAgaWYgKG5hbWUua2luZCA9PT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgIGZxbiArPSAnLic7ICAvLyBjb21wdXRlZCBuYW1lcyBpbmNsdWRlIFsgXSBpbiB0aGVpciBnZXRUZXh0KCkgcmVwcmVzZW50YXRpb24uXG4gICAgICB9XG4gICAgICBmcW4gKz0gbmFtZS5nZXRUZXh0KCk7XG4gICAgICBlbWl0KGAke2Zxbn0gPSBmdW5jdGlvbigke3BhcmFtc1N0cn0pIHt9O1xcbmApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAobmFtZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICAgICAgcmVwb3J0RGlhZ25vc3RpYyhkaWFnbm9zdGljcywgbmFtZSwgJ05vbi1uYW1lc3BhY2VkIGNvbXB1dGVkIG5hbWUgaW4gZXh0ZXJucycpO1xuICAgICAgfVxuICAgICAgZW1pdChgZnVuY3Rpb24gJHtuYW1lLmdldFRleHQoKX0oJHtwYXJhbXNTdHJ9KSB7fVxcbmApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHdyaXRlRW51bShkZWNsOiB0cy5FbnVtRGVjbGFyYXRpb24sIG5hbWVzcGFjZTogUmVhZG9ubHlBcnJheTxzdHJpbmc+KSB7XG4gICAgLy8gRS5nLiAvKiogQGVudW0ge251bWJlcn0gKi8gdmFyIENPVU5UUlkgPSB7VVM6IDEsIENBOiAxfTtcbiAgICBjb25zdCBuYW1lID0gZ2V0SWRlbnRpZmllclRleHQoZGVjbC5uYW1lKTtcbiAgICBsZXQgbWVtYmVycyA9ICcnO1xuICAgIGNvbnN0IGVudW1UeXBlID0gZ2V0RW51bVR5cGUodHlwZUNoZWNrZXIsIGRlY2wpO1xuICAgIC8vIENsb3N1cmUgZW51bXMgbWVtYmVycyBtdXN0IGhhdmUgYSB2YWx1ZSBvZiB0aGUgY29ycmVjdCB0eXBlLCBidXQgdGhlIGFjdHVhbCB2YWx1ZSBkb2VzIG5vdFxuICAgIC8vIG1hdHRlciBpbiBleHRlcm5zLlxuICAgIGNvbnN0IGluaXRpYWxpemVyID0gZW51bVR5cGUgPT09ICdzdHJpbmcnID8gYCcnYCA6IDE7XG4gICAgZm9yIChjb25zdCBtZW1iZXIgb2YgZGVjbC5tZW1iZXJzKSB7XG4gICAgICBsZXQgbWVtYmVyTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgICAgIHN3aXRjaCAobWVtYmVyLm5hbWUua2luZCkge1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSWRlbnRpZmllcjpcbiAgICAgICAgICBtZW1iZXJOYW1lID0gZ2V0SWRlbnRpZmllclRleHQobWVtYmVyLm5hbWUgYXMgdHMuSWRlbnRpZmllcik7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsOlxuICAgICAgICAgIGNvbnN0IHRleHQgPSAobWVtYmVyLm5hbWUgYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgICAgICAgICBpZiAoaXNWYWxpZENsb3N1cmVQcm9wZXJ0eU5hbWUodGV4dCkpIG1lbWJlck5hbWUgPSB0ZXh0O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgaWYgKCFtZW1iZXJOYW1lKSB7XG4gICAgICAgIG1lbWJlcnMgKz0gYCAgLyogVE9ETzogJHt0cy5TeW50YXhLaW5kW21lbWJlci5uYW1lLmtpbmRdfTogJHtcbiAgICAgICAgICAgIGVzY2FwZUZvckNvbW1lbnQobWVtYmVyLm5hbWUuZ2V0VGV4dCgpKX0gKi9cXG5gO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIG1lbWJlcnMgKz0gYCAgJHttZW1iZXJOYW1lfTogJHtpbml0aWFsaXplcn0sXFxuYDtcbiAgICB9XG5cbiAgICBlbWl0KGBcXG4vKiogQGVudW0geyR7ZW51bVR5cGV9fSAqL1xcbmApO1xuICAgIHdyaXRlVmFyaWFibGVTdGF0ZW1lbnQobmFtZSwgbmFtZXNwYWNlLCBge1xcbiR7bWVtYmVyc319YCk7XG4gIH1cblxuICBmdW5jdGlvbiB3cml0ZVR5cGVBbGlhcyhkZWNsOiB0cy5UeXBlQWxpYXNEZWNsYXJhdGlvbiwgbmFtZXNwYWNlOiBSZWFkb25seUFycmF5PHN0cmluZz4pIHtcbiAgICBjb25zdCB0eXBlU3RyID0gbXR0LnR5cGVUb0Nsb3N1cmUoZGVjbCwgdW5kZWZpbmVkKTtcbiAgICBlbWl0KGBcXG4vKiogQHR5cGVkZWYgeyR7dHlwZVN0cn19ICovXFxuYCk7XG4gICAgd3JpdGVWYXJpYWJsZVN0YXRlbWVudChnZXRJZGVudGlmaWVyVGV4dChkZWNsLm5hbWUpLCBuYW1lc3BhY2UpO1xuICB9XG5cbiAgZnVuY3Rpb24gd3JpdGVUeXBlKFxuICAgICAgZGVjbDogdHMuSW50ZXJmYWNlRGVjbGFyYXRpb258dHMuQ2xhc3NEZWNsYXJhdGlvbiwgbmFtZXNwYWNlOiBSZWFkb25seUFycmF5PHN0cmluZz4pIHtcbiAgICBjb25zdCBuYW1lID0gZGVjbC5uYW1lO1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmVwb3J0RGlhZ25vc3RpYyhkaWFnbm9zdGljcywgZGVjbCwgJ2Fub255bW91cyB0eXBlIGluIGV4dGVybnMnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHlwZU5hbWUgPSBuYW1lc3BhY2UuY29uY2F0KFtuYW1lLmdldFRleHQoKV0pLmpvaW4oJy4nKTtcbiAgICBpZiAoQ0xPU1VSRV9FWFRFUk5TX0JMQUNLTElTVC5pbmRleE9mKHR5cGVOYW1lKSA+PSAwKSByZXR1cm47XG5cbiAgICBpZiAoaXNGaXJzdFZhbHVlRGVjbGFyYXRpb24oZGVjbCkpIHtcbiAgICAgIC8vIEVtaXQgdGhlICdmdW5jdGlvbicgdGhhdCBpcyBhY3R1YWxseSB0aGUgZGVjbGFyYXRpb24gb2YgdGhlIGludGVyZmFjZVxuICAgICAgLy8gaXRzZWxmLiAgSWYgaXQncyBhIGNsYXNzLCB0aGlzIGZ1bmN0aW9uIGFsc28gbXVzdCBpbmNsdWRlIHRoZSB0eXBlXG4gICAgICAvLyBhbm5vdGF0aW9ucyBvZiB0aGUgY29uc3RydWN0b3IuXG4gICAgICBsZXQgcGFyYW1OYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICAgIGNvbnN0IGpzZG9jVGFnczoganNkb2MuVGFnW10gPSBbXTtcbiAgICAgIGxldCB3cm90ZUpzRG9jID0gZmFsc2U7XG4gICAgICBtYXliZUFkZEhlcml0YWdlQ2xhdXNlcyhqc2RvY1RhZ3MsIG10dCwgZGVjbCk7XG4gICAgICBtYXliZUFkZFRlbXBsYXRlQ2xhdXNlKGpzZG9jVGFncywgZGVjbCk7XG4gICAgICBpZiAoZGVjbC5raW5kID09PSB0cy5TeW50YXhLaW5kLkNsYXNzRGVjbGFyYXRpb24pIHtcbiAgICAgICAgLy8gVE9ETzogaXQgYXBwZWFycyB5b3UgY2FuIGp1c3Qgd3JpdGUgJ2NsYXNzIEZvbyB7IC4uLicgaW4gZXh0ZXJucy5cbiAgICAgICAgLy8gVGhpcyBjb2RlIGluc3RlYWQgdHJpZXMgdG8gdHJhbnNsYXRlIGl0IHRvIGEgZnVuY3Rpb24uXG4gICAgICAgIGpzZG9jVGFncy5wdXNoKHt0YWdOYW1lOiAnY29uc3RydWN0b3InfSwge3RhZ05hbWU6ICdzdHJ1Y3QnfSk7XG4gICAgICAgIGNvbnN0IGN0b3JzID0gKGRlY2wgYXMgdHMuQ2xhc3NEZWNsYXJhdGlvbilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLm1lbWJlcnMuZmlsdGVyKChtKSA9PiBtLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ29uc3RydWN0b3IpO1xuICAgICAgICBpZiAoY3RvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgY29uc3QgZmlyc3RDdG9yOiB0cy5Db25zdHJ1Y3RvckRlY2xhcmF0aW9uID0gY3RvcnNbMF0gYXMgdHMuQ29uc3RydWN0b3JEZWNsYXJhdGlvbjtcbiAgICAgICAgICBpZiAoY3RvcnMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgcGFyYW1OYW1lcyA9IGVtaXRGdW5jdGlvblR5cGUoY3RvcnMgYXMgdHMuQ29uc3RydWN0b3JEZWNsYXJhdGlvbltdLCBqc2RvY1RhZ3MpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXJhbU5hbWVzID0gZW1pdEZ1bmN0aW9uVHlwZShbZmlyc3RDdG9yXSwganNkb2NUYWdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgd3JvdGVKc0RvYyA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIE90aGVyd2lzZSBpdCdzIGFuIGludGVyZmFjZTsgdGFnIGl0IGFzIHN0cnVjdHVyYWxseSB0eXBlZC5cbiAgICAgICAganNkb2NUYWdzLnB1c2goe3RhZ05hbWU6ICdyZWNvcmQnfSwge3RhZ05hbWU6ICdzdHJ1Y3QnfSk7XG4gICAgICB9XG4gICAgICBpZiAoIXdyb3RlSnNEb2MpIGVtaXQoanNkb2MudG9TdHJpbmcoanNkb2NUYWdzKSk7XG4gICAgICB3cml0ZUZ1bmN0aW9uKG5hbWUsIHBhcmFtTmFtZXMsIG5hbWVzcGFjZSk7XG4gICAgfVxuXG4gICAgLy8gUHJvY2VzcyBldmVyeXRoaW5nIGV4Y2VwdCAoTWV0aG9kU2lnbmF0dXJlfE1ldGhvZERlY2xhcmF0aW9ufENvbnN0cnVjdG9yKVxuICAgIGNvbnN0IG1ldGhvZHMgPSBuZXcgTWFwPHN0cmluZywgdHMuTWV0aG9kRGVjbGFyYXRpb25bXT4oKTtcbiAgICBmb3IgKGNvbnN0IG1lbWJlciBvZiBkZWNsLm1lbWJlcnMpIHtcbiAgICAgIHN3aXRjaCAobWVtYmVyLmtpbmQpIHtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlByb3BlcnR5U2lnbmF0dXJlOlxuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuUHJvcGVydHlEZWNsYXJhdGlvbjpcbiAgICAgICAgICBjb25zdCBwcm9wID0gbWVtYmVyIGFzIHRzLlByb3BlcnR5U2lnbmF0dXJlO1xuICAgICAgICAgIGlmIChwcm9wLm5hbWUua2luZCA9PT0gdHMuU3ludGF4S2luZC5JZGVudGlmaWVyKSB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IG10dC50eXBlVG9DbG9zdXJlKHByb3ApO1xuICAgICAgICAgICAgaWYgKHByb3AucXVlc3Rpb25Ub2tlbiAmJiB0eXBlID09PSAnPycpIHtcbiAgICAgICAgICAgICAgLy8gQW4gb3B0aW9uYWwgJ2FueScgdHlwZSB0cmFuc2xhdGVzIHRvICc/fHVuZGVmaW5lZCcgaW4gQ2xvc3VyZS5cbiAgICAgICAgICAgICAgdHlwZSA9ICc/fHVuZGVmaW5lZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbWl0KGpzZG9jLnRvU3RyaW5nKFt7dGFnTmFtZTogJ3R5cGUnLCB0eXBlfV0pKTtcbiAgICAgICAgICAgIGlmIChoYXNNb2RpZmllckZsYWcocHJvcCwgdHMuTW9kaWZpZXJGbGFncy5TdGF0aWMpKSB7XG4gICAgICAgICAgICAgIGVtaXQoYFxcbiR7dHlwZU5hbWV9LiR7cHJvcC5uYW1lLmdldFRleHQoKX07XFxuYCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBlbWl0KGBcXG4ke3R5cGVOYW1lfS5wcm90b3R5cGUuJHtwcm9wLm5hbWUuZ2V0VGV4dCgpfTtcXG5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBUT0RPOiBGb3Igbm93IHByb3BlcnR5IG5hbWVzIG90aGVyIHRoYW4gSWRlbnRpZmllcnMgYXJlIG5vdCBoYW5kbGVkOyBlLmcuXG4gICAgICAgICAgLy8gICAgaW50ZXJmYWNlIEZvbyB7IFwiMTIzYmFyXCI6IG51bWJlciB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5NZXRob2RTaWduYXR1cmU6XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5NZXRob2REZWNsYXJhdGlvbjpcbiAgICAgICAgICBjb25zdCBtZXRob2QgPSBtZW1iZXIgYXMgdHMuTWV0aG9kRGVjbGFyYXRpb247XG4gICAgICAgICAgY29uc3QgaXNTdGF0aWMgPSBoYXNNb2RpZmllckZsYWcobWV0aG9kLCB0cy5Nb2RpZmllckZsYWdzLlN0YXRpYyk7XG4gICAgICAgICAgY29uc3QgbWV0aG9kU2lnbmF0dXJlID0gYCR7bWV0aG9kLm5hbWUuZ2V0VGV4dCgpfSQkJCR7aXNTdGF0aWMgPyAnc3RhdGljJyA6ICdpbnN0YW5jZSd9YDtcblxuICAgICAgICAgIGlmIChtZXRob2RzLmhhcyhtZXRob2RTaWduYXR1cmUpKSB7XG4gICAgICAgICAgICBtZXRob2RzLmdldChtZXRob2RTaWduYXR1cmUpIS5wdXNoKG1ldGhvZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1ldGhvZHMuc2V0KG1ldGhvZFNpZ25hdHVyZSwgW21ldGhvZF0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkNvbnN0cnVjdG9yOlxuICAgICAgICAgIGNvbnRpbnVlOyAgLy8gSGFuZGxlZCBhYm92ZS5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAvLyBNZW1iZXJzIGNhbiBpbmNsdWRlIHRoaW5ncyBsaWtlIGluZGV4IHNpZ25hdHVyZXMsIGZvciBlLmcuXG4gICAgICAgICAgLy8gICBpbnRlcmZhY2UgRm9vIHsgW2tleTogc3RyaW5nXTogbnVtYmVyOyB9XG4gICAgICAgICAgLy8gRm9yIG5vdywganVzdCBza2lwIGl0LlxuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgLy8gSWYgd2UgZ2V0IGhlcmUsIHRoZSBtZW1iZXIgd2Fzbid0IGhhbmRsZWQgaW4gdGhlIHN3aXRjaCBzdGF0ZW1lbnQuXG4gICAgICBsZXQgbWVtYmVyTmFtZSA9IG5hbWVzcGFjZTtcbiAgICAgIGlmIChtZW1iZXIubmFtZSkge1xuICAgICAgICBtZW1iZXJOYW1lID0gbWVtYmVyTmFtZS5jb25jYXQoW21lbWJlci5uYW1lLmdldFRleHQoKV0pO1xuICAgICAgfVxuICAgICAgZW1pdChgXFxuLyogVE9ETzogJHt0cy5TeW50YXhLaW5kW21lbWJlci5raW5kXX06ICR7bWVtYmVyTmFtZS5qb2luKCcuJyl9ICovXFxuYCk7XG4gICAgfVxuXG4gICAgLy8gSGFuZGxlIG1ldGhvZCBkZWNsYXJhdGlvbnMvc2lnbmF0dXJlcyBzZXBhcmF0ZWx5LCBzaW5jZSB3ZSBuZWVkIHRvIGRlYWwgd2l0aCBvdmVybG9hZHMuXG4gICAgZm9yIChjb25zdCBtZXRob2RWYXJpYW50cyBvZiBBcnJheS5mcm9tKG1ldGhvZHMudmFsdWVzKCkpKSB7XG4gICAgICBjb25zdCBmaXJzdE1ldGhvZFZhcmlhbnQgPSBtZXRob2RWYXJpYW50c1swXTtcbiAgICAgIGxldCBwYXJhbWV0ZXJOYW1lczogc3RyaW5nW107XG4gICAgICBpZiAobWV0aG9kVmFyaWFudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBwYXJhbWV0ZXJOYW1lcyA9IGVtaXRGdW5jdGlvblR5cGUobWV0aG9kVmFyaWFudHMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFyYW1ldGVyTmFtZXMgPSBlbWl0RnVuY3Rpb25UeXBlKFtmaXJzdE1ldGhvZFZhcmlhbnRdKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1ldGhvZE5hbWVzcGFjZSA9IG5hbWVzcGFjZS5jb25jYXQoW25hbWUuZ2V0VGV4dCgpXSk7XG4gICAgICAvLyBJZiB0aGUgbWV0aG9kIGlzIHN0YXRpYywgZG9uJ3QgYWRkIHRoZSBwcm90b3R5cGUuXG4gICAgICBpZiAoIWhhc01vZGlmaWVyRmxhZyhmaXJzdE1ldGhvZFZhcmlhbnQsIHRzLk1vZGlmaWVyRmxhZ3MuU3RhdGljKSkge1xuICAgICAgICBtZXRob2ROYW1lc3BhY2UucHVzaCgncHJvdG90eXBlJyk7XG4gICAgICB9XG4gICAgICB3cml0ZUZ1bmN0aW9uKGZpcnN0TWV0aG9kVmFyaWFudC5uYW1lLCBwYXJhbWV0ZXJOYW1lcywgbWV0aG9kTmFtZXNwYWNlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhbGlhc2VzIGZvciB0aGUgc3ltYm9scyBpbXBvcnRlZCBpbiB0aGUgZ2l2ZW4gZGVjbGFyYXRpb24sIHNvIHRoYXQgdGhlaXIgdHlwZXMgZ2V0XG4gICAqIHByaW50ZWQgYXMgdGhlIGZ1bGx5IHF1YWxpZmllZCBuYW1lLCBhbmQgbm90IGp1c3QgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGxvY2FsIGltcG9ydCBhbGlhcy5cbiAgICpcbiAgICogdHNpY2tsZSBnZW5lcmF0ZXMgLmpzIGZpbGVzIHRoYXQgKGF0IG1vc3QpIGNvbnRhaW4gYSBgZ29vZy5wcm92aWRlYCwgYnV0IGFyZSBub3RcbiAgICogYGdvb2cubW9kdWxlYHMuIFRoZXNlIGZpbGVzIGNhbm5vdCBleHByZXNzIGFuIGFsaWFzZWQgaW1wb3J0LiBIb3dldmVyIENsb3N1cmUgQ29tcGlsZXIgYWxsb3dzXG4gICAqIHJlZmVyZW5jaW5nIHR5cGVzIHVzaW5nIGZ1bGx5IHF1YWxpZmllZCBuYW1lcyBpbiBzdWNoIGZpbGVzLCBzbyB0c2lja2xlIGNhbiByZXNvbHZlIHRoZVxuICAgKiBpbXBvcnRlZCBtb2R1bGUgVVJJIGFuZCBwcm9kdWNlIGBwYXRoLnRvLm1vZHVsZS5TeW1ib2xgIGFzIGFuIGFsaWFzLCBhbmQgdXNlIHRoYXQgd2hlblxuICAgKiByZWZlcmVuY2luZyB0aGUgdHlwZS5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZEltcG9ydEFsaWFzZXMoZGVjbDogdHMuSW1wb3J0RGVjbGFyYXRpb258dHMuSW1wb3J0RXF1YWxzRGVjbGFyYXRpb24pIHtcbiAgICBsZXQgbW9kdWxlVXJpOiBzdHJpbmc7XG4gICAgaWYgKHRzLmlzSW1wb3J0RGVjbGFyYXRpb24oZGVjbCkpIHtcbiAgICAgIG1vZHVsZVVyaSA9IChkZWNsLm1vZHVsZVNwZWNpZmllciBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICAgIH0gZWxzZSBpZiAodHMuaXNFeHRlcm5hbE1vZHVsZVJlZmVyZW5jZShkZWNsLm1vZHVsZVJlZmVyZW5jZSkpIHtcbiAgICAgIC8vIGltcG9ydCBmb28gPSByZXF1aXJlKCcuL2JhcicpO1xuICAgICAgbW9kdWxlVXJpID0gKGRlY2wubW9kdWxlUmVmZXJlbmNlLmV4cHJlc3Npb24gYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaW1wb3J0IGZvbyA9IGJhci5iYXouYmFtO1xuICAgICAgLy8gdW5zdXBwb3J0ZWQuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZ29vZ05hbWVzcGFjZSA9IGV4dHJhY3RHb29nTmFtZXNwYWNlSW1wb3J0KG1vZHVsZVVyaSk7XG4gICAgY29uc3QgbW9kdWxlTmFtZSA9IGdvb2dOYW1lc3BhY2UgfHxcbiAgICAgICAgaG9zdC5wYXRoVG9Nb2R1bGVOYW1lKFxuICAgICAgICAgICAgc291cmNlRmlsZS5maWxlTmFtZSwgcmVzb2x2ZU1vZHVsZU5hbWUoaG9zdCwgc291cmNlRmlsZS5maWxlTmFtZSwgbW9kdWxlVXJpKSk7XG5cbiAgICBpZiAodHMuaXNJbXBvcnRFcXVhbHNEZWNsYXJhdGlvbihkZWNsKSkge1xuICAgICAgLy8gaW1wb3J0IGZvbyA9IHJlcXVpcmUoJy4vYmFyJyk7XG4gICAgICBhZGRJbXBvcnRBbGlhcyhkZWNsLm5hbWUsIG1vZHVsZU5hbWUsIHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2lkZSBlZmZlY3QgaW1wb3J0ICdwYXRoJzsgZGVjbGFyZXMgbm8gbG9jYWwgYWxpYXNlcy5cbiAgICBpZiAoIWRlY2wuaW1wb3J0Q2xhdXNlKSByZXR1cm47XG5cbiAgICBpZiAoZGVjbC5pbXBvcnRDbGF1c2UubmFtZSkge1xuICAgICAgLy8gaW1wb3J0IG5hbWUgZnJvbSAuLi4gLT4gbWFwIHRvIC5kZWZhdWx0IG9uIHRoZSBtb2R1bGUubmFtZS5cbiAgICAgIGlmIChnb29nTmFtZXNwYWNlKSB7XG4gICAgICAgIGFkZEltcG9ydEFsaWFzKGRlY2wuaW1wb3J0Q2xhdXNlLm5hbWUsIGdvb2dOYW1lc3BhY2UsIHVuZGVmaW5lZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhZGRJbXBvcnRBbGlhcyhkZWNsLmltcG9ydENsYXVzZS5uYW1lLCBtb2R1bGVOYW1lLCAnZGVmYXVsdCcpO1xuICAgICAgfVxuICAgIH1cbiAgICBjb25zdCBuYW1lZEJpbmRpbmdzID0gZGVjbC5pbXBvcnRDbGF1c2UubmFtZWRCaW5kaW5ncztcbiAgICBpZiAoIW5hbWVkQmluZGluZ3MpIHJldHVybjtcblxuICAgIGlmICh0cy5pc05hbWVzcGFjZUltcG9ydChuYW1lZEJpbmRpbmdzKSkge1xuICAgICAgLy8gaW1wb3J0ICogYXMgbmFtZSAtPiBtYXAgZGlyZWN0bHkgdG8gdGhlIG1vZHVsZS5uYW1lLlxuICAgICAgYWRkSW1wb3J0QWxpYXMobmFtZWRCaW5kaW5ncy5uYW1lLCBtb2R1bGVOYW1lLCB1bmRlZmluZWQpO1xuICAgIH1cblxuICAgIGlmICh0cy5pc05hbWVkSW1wb3J0cyhuYW1lZEJpbmRpbmdzKSkge1xuICAgICAgLy8gaW1wb3J0IHtBIGFzIEJ9LCBtYXAgdG8gbW9kdWxlLm5hbWUuQVxuICAgICAgZm9yIChjb25zdCBuYW1lZEJpbmRpbmcgb2YgbmFtZWRCaW5kaW5ncy5lbGVtZW50cykge1xuICAgICAgICBhZGRJbXBvcnRBbGlhcyhuYW1lZEJpbmRpbmcubmFtZSwgbW9kdWxlTmFtZSwgbmFtZWRCaW5kaW5nLm5hbWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBBZGRzIGFuIGltcG9ydCBhbGlhcyBmb3IgdGhlIHN5bWJvbCBkZWZpbmVkIGF0IHRoZSBnaXZlbiBub2RlLiBDcmVhdGVzIGFuIGFsaWFzIG5hbWUgYmFzZWQgb25cbiAgICogdGhlIGdpdmVuIG1vZHVsZU5hbWUgYW5kIChvcHRpb25hbGx5KSB0aGUgbmFtZS5cbiAgICovXG4gIGZ1bmN0aW9uIGFkZEltcG9ydEFsaWFzKG5vZGU6IHRzLk5vZGUsIG1vZHVsZU5hbWU6IHN0cmluZywgbmFtZTogdHMuSWRlbnRpZmllcnxzdHJpbmd8dW5kZWZpbmVkKSB7XG4gICAgbGV0IHN5bWJvbCA9IHR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24obm9kZSk7XG4gICAgaWYgKCFzeW1ib2wpIHtcbiAgICAgIHJlcG9ydERpYWdub3N0aWMoZGlhZ25vc3RpY3MsIG5vZGUsIGBuYW1lZCBpbXBvcnQgaGFzIG5vIHN5bWJvbGApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgYWxpYXNOYW1lID0gbW9kdWxlTmFtZTtcbiAgICBpZiAodHlwZW9mIG5hbWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICBhbGlhc05hbWUgKz0gJy4nICsgbmFtZTtcbiAgICB9IGVsc2UgaWYgKG5hbWUpIHtcbiAgICAgIGFsaWFzTmFtZSArPSAnLicgKyBnZXRJZGVudGlmaWVyVGV4dChuYW1lKTtcbiAgICB9XG4gICAgaWYgKHN5bWJvbC5mbGFncyAmIHRzLlN5bWJvbEZsYWdzLkFsaWFzKSB7XG4gICAgICBzeW1ib2wgPSB0eXBlQ2hlY2tlci5nZXRBbGlhc2VkU3ltYm9sKHN5bWJvbCk7XG4gICAgfVxuICAgIG10dC5zeW1ib2xzVG9BbGlhc2VkTmFtZXMuc2V0KHN5bWJvbCwgYWxpYXNOYW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQcm9kdWNlcyBhIGNvbXBpbGVyIGVycm9yIHRoYXQgcmVmZXJlbmNlcyB0aGUgTm9kZSdzIGtpbmQuIFRoaXMgaXMgdXNlZnVsIGZvciB0aGUgXCJlbHNlXCJcbiAgICogYnJhbmNoIG9mIGNvZGUgdGhhdCBpcyBhdHRlbXB0aW5nIHRvIGhhbmRsZSBhbGwgcG9zc2libGUgaW5wdXQgTm9kZSB0eXBlcywgdG8gZW5zdXJlIGFsbCBjYXNlc1xuICAgKiBjb3ZlcmVkLlxuICAgKi9cbiAgZnVuY3Rpb24gZXJyb3JVbmltcGxlbWVudGVkS2luZChub2RlOiB0cy5Ob2RlLCB3aGVyZTogc3RyaW5nKSB7XG4gICAgcmVwb3J0RGlhZ25vc3RpYyhkaWFnbm9zdGljcywgbm9kZSwgYCR7dHMuU3ludGF4S2luZFtub2RlLmtpbmRdfSBub3QgaW1wbGVtZW50ZWQgaW4gJHt3aGVyZX1gKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBnZXROYW1lc3BhY2VGb3JMb2NhbERlY2xhcmF0aW9uIHJldHVybnMgdGhlIG5hbWVzcGFjZSB0aGF0IHNob3VsZCBiZSB1c2VkIGZvciB0aGUgZ2l2ZW5cbiAgICogZGVjbGFyYXRpb24sIGRlY2lkaW5nIHdoZXRoZXIgdG8gbmFtZXNwYWNlIHRoZSBzeW1ib2wgdG8gdGhlIGZpbGUgb3Igd2hldGhlciB0byBjcmVhdGUgYVxuICAgKiBnbG9iYWwgbmFtZS5cbiAgICpcbiAgICogVGhlIGZ1bmN0aW9uIGNvdmVycyB0aGVzZSBjYXNlczpcbiAgICogMSkgYSBkZWNsYXJhdGlvbiBpbiBhIC5kLnRzXG4gICAqIDFhKSB3aGVyZSB0aGUgLmQudHMgaXMgYW4gZXh0ZXJuYWwgbW9kdWxlICAgICAtLT4gbmFtZXNwYWNlXG4gICAqIDFiKSB3aGVyZSB0aGUgLmQudHMgaXMgbm90IGFuIGV4dGVybmFsIG1vZHVsZSAtLT4gZ2xvYmFsXG4gICAqIDIpIGEgZGVjbGFyYXRpb24gaW4gYSAudHMgZmlsZSAoYWxsIGFyZSB0cmVhdGVkIGFzIG1vZHVsZXMpXG4gICAqIDJhKSB0aGF0IGlzIGV4cG9ydGVkICAgICAgICAgICAgICAgICAgICAgICAgICAtLT4gbmFtZXNwYWNlXG4gICAqIDJiKSB0aGF0IGlzIHVuZXhwb3J0ZWQgICAgICAgICAgICAgICAgICAgICAgICAtLT4gZ2xvYmFsXG4gICAqXG4gICAqIEZvciAxKSwgYWxsIHN5bWJvbHMgaW4gLmQudHMgc2hvdWxkIGdlbmVyYWxseSBiZSBuYW1lc3BhY2VkIHRvIHRoZSBmaWxlIHRvIGF2b2lkIGNvbGxpc2lvbnMuXG4gICAqIEhvd2V2ZXIgLmQudHMgZmlsZXMgdGhhdCBhcmUgbm90IGV4dGVybmFsIG1vZHVsZXMgZG8gZGVjbGFyZSBnbG9iYWwgbmFtZXMgKDFiKS5cbiAgICpcbiAgICogRm9yIDIpLCBhbWJpZW50IGRlY2xhcmF0aW9ucyBpbiAudHMgZmlsZXMgbXVzdCBiZSBuYW1lc3BhY2VkLCBmb3IgdGhlIHNhbWUgY29sbGlzaW9uIHJlYXNvbnMuXG4gICAqIFRoZSBleGNlcHRpb24gaXMgMmIpLCB3aGVyZSBpbiBUeXBlU2NyaXB0LCBhbiB1bmV4cG9ydGVkIGxvY2FsIFwiZGVjbGFyZSBjb25zdCB4OiBzdHJpbmc7XCJcbiAgICogY3JlYXRlcyBhIHN5bWJvbCB0aGF0LCB3aGVuIHVzZWQgbG9jYWxseSwgaXMgZW1pdHRlZCBhcyBqdXN0IFwieFwiLiBUaGF0IGlzLCBpdCBiZWhhdmVzXG4gICAqIGxpa2UgYSB2YXJpYWJsZSBkZWNsYXJlZCBpbiBhICdkZWNsYXJlIGdsb2JhbCcgYmxvY2suIENsb3N1cmUgQ29tcGlsZXIgd291bGQgZmFpbCB0aGUgYnVpbGQgaWZcbiAgICogdGhlcmUgaXMgbm8gZGVjbGFyYXRpb24gZm9yIFwieFwiLCBzbyB0c2lja2xlIG11c3QgZ2VuZXJhdGUgYSBnbG9iYWwgZXh0ZXJuYWwgc3ltYm9sLCBpLmUuXG4gICAqIHdpdGhvdXQgdGhlIG5hbWVzcGFjZSB3cmFwcGVyLlxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0TmFtZXNwYWNlRm9yVG9wTGV2ZWxEZWNsYXJhdGlvbihcbiAgICAgIGRlY2xhcmF0aW9uOiB0cy5EZWNsYXJhdGlvbiwgbmFtZXNwYWNlOiBSZWFkb25seUFycmF5PHN0cmluZz4pOiBSZWFkb25seUFycmF5PHN0cmluZz4ge1xuICAgIC8vIE9ubHkgdXNlIHJvb3ROYW1lc3BhY2UgZm9yIHRvcCBsZXZlbCBzeW1ib2xzLCBhbnkgb3RoZXIgbmFtZXNwYWNpbmcgKGdsb2JhbCBuYW1lcywgbmVzdGVkXG4gICAgLy8gbmFtZXNwYWNlcykgaXMgYWx3YXlzIGtlcHQuXG4gICAgaWYgKG5hbWVzcGFjZS5sZW5ndGggIT09IDApIHJldHVybiBuYW1lc3BhY2U7XG4gICAgLy8gQWxsIG5hbWVzIGluIGEgbW9kdWxlIChleHRlcm5hbCkgLmQudHMgZmlsZSBjYW4gb25seSBiZSBhY2Nlc3NlZCBsb2NhbGx5LCBzbyB0aGV5IGFsd2F5cyBnZXRcbiAgICAvLyBuYW1lc3BhY2UgcHJlZml4ZWQuXG4gICAgaWYgKGlzRHRzICYmIGlzRXh0ZXJuYWxNb2R1bGUpIHJldHVybiBbcm9vdE5hbWVzcGFjZV07XG4gICAgLy8gU2FtZSBmb3IgZXhwb3J0ZWQgZGVjbGFyYXRpb25zIGluIHJlZ3VsYXIgLnRzIGZpbGVzLlxuICAgIGlmIChoYXNNb2RpZmllckZsYWcoZGVjbGFyYXRpb24sIHRzLk1vZGlmaWVyRmxhZ3MuRXhwb3J0KSkgcmV0dXJuIFtyb290TmFtZXNwYWNlXTtcbiAgICAvLyBCdXQgbG9jYWwgZGVjbGFyYXRpb25zIGluIC50cyBmaWxlcyBvciAuZC50cyBmaWxlcyAoMWIsIDJiKSBhcmUgZ2xvYmFsLCB0b28uXG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgZnVuY3Rpb24gdmlzaXRvcihub2RlOiB0cy5Ob2RlLCBuYW1lc3BhY2U6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPikge1xuICAgIGlmIChub2RlLnBhcmVudCA9PT0gc291cmNlRmlsZSkge1xuICAgICAgbmFtZXNwYWNlID0gZ2V0TmFtZXNwYWNlRm9yVG9wTGV2ZWxEZWNsYXJhdGlvbihub2RlIGFzIHRzLkRlY2xhcmF0aW9uU3RhdGVtZW50LCBuYW1lc3BhY2UpO1xuICAgIH1cblxuICAgIHN3aXRjaCAobm9kZS5raW5kKSB7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTW9kdWxlRGVjbGFyYXRpb246XG4gICAgICAgIGNvbnN0IGRlY2wgPSBub2RlIGFzIHRzLk1vZHVsZURlY2xhcmF0aW9uO1xuICAgICAgICBzd2l0Y2ggKGRlY2wubmFtZS5raW5kKSB7XG4gICAgICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXI6XG4gICAgICAgICAgICBpZiAoZGVjbC5mbGFncyAmIHRzLk5vZGVGbGFncy5HbG9iYWxBdWdtZW50YXRpb24pIHtcbiAgICAgICAgICAgICAgLy8gRS5nLiBcImRlY2xhcmUgZ2xvYmFsIHsgLi4uIH1cIi4gIFJlc2V0IHRvIHRoZSBvdXRlciBuYW1lc3BhY2UuXG4gICAgICAgICAgICAgIG5hbWVzcGFjZSA9IFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgLy8gRS5nLiBcImRlY2xhcmUgbmFtZXNwYWNlIGZvbyB7XCJcbiAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGdldElkZW50aWZpZXJUZXh0KGRlY2wubmFtZSBhcyB0cy5JZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgaWYgKGlzRmlyc3RWYWx1ZURlY2xhcmF0aW9uKGRlY2wpKSB7XG4gICAgICAgICAgICAgICAgZW1pdCgnLyoqIEBjb25zdCAqL1xcbicpO1xuICAgICAgICAgICAgICAgIHdyaXRlVmFyaWFibGVTdGF0ZW1lbnQobmFtZSwgbmFtZXNwYWNlLCAne30nKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuYW1lc3BhY2UgPSBuYW1lc3BhY2UuY29uY2F0KG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGRlY2wuYm9keSkgdmlzaXRvcihkZWNsLmJvZHksIG5hbWVzcGFjZSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuU3RyaW5nTGl0ZXJhbDpcbiAgICAgICAgICAgIC8vIEUuZy4gXCJkZWNsYXJlIG1vZHVsZSAnZm9vJyB7XCIgKG5vdGUgdGhlIHF1b3RlcykuXG4gICAgICAgICAgICAvLyBXZSBzdGlsbCB3YW50IHRvIGVtaXQgZXh0ZXJucyBmb3IgdGhpcyBtb2R1bGUsIGJ1dCBDbG9zdXJlIGRvZXNuJ3QgcHJvdmlkZSBhXG4gICAgICAgICAgICAvLyBtZWNoYW5pc20gZm9yIG1vZHVsZS1zY29wZWQgZXh0ZXJucy4gSW5zdGVhZCwgd2UgZW1pdCBpbiBhIG1hbmdsZWQgbmFtZXNwYWNlLlxuICAgICAgICAgICAgLy8gVGhlIG1hbmdsZWQgbmFtZXNwYWNlIChhZnRlciByZXNvbHZpbmcgZmlsZXMpIG1hdGNoZXMgdGhlIGVtaXQgZm9yIGFuIG9yaWdpbmFsIG1vZHVsZVxuICAgICAgICAgICAgLy8gZmlsZSwgc28gZWZmZWN0aXZlbHkgdGhpcyBhdWdtZW50cyBhbnkgZXhpc3RpbmcgbW9kdWxlLlxuXG4gICAgICAgICAgICBjb25zdCBpbXBvcnROYW1lID0gKGRlY2wubmFtZSBhcyB0cy5TdHJpbmdMaXRlcmFsKS50ZXh0O1xuICAgICAgICAgICAgY29uc3QgaW1wb3J0ZWRNb2R1bGVOYW1lID0gcmVzb2x2ZU1vZHVsZU5hbWUoXG4gICAgICAgICAgICAgICAge2hvc3Q6IG1vZHVsZVJlc29sdXRpb25Ib3N0LCBvcHRpb25zfSwgc291cmNlRmlsZS5maWxlTmFtZSwgaW1wb3J0TmFtZSk7XG4gICAgICAgICAgICBjb25zdCBtYW5nbGVkID0gbW9kdWxlTmFtZUFzSWRlbnRpZmllcihob3N0LCBpbXBvcnRlZE1vZHVsZU5hbWUpO1xuICAgICAgICAgICAgZW1pdChgLy8gRGVyaXZlZCBmcm9tOiBkZWNsYXJlIG1vZHVsZSBcIiR7aW1wb3J0TmFtZX1cIlxcbmApO1xuICAgICAgICAgICAgbmFtZXNwYWNlID0gW21hbmdsZWRdO1xuXG4gICAgICAgICAgICAvLyBEZWNsYXJlIFwibWFuZ2xlZCRuYW1lXCIgaWYgaXQncyBub3QgZGVjbGFyZWQgYWxyZWFkeSBlbHNld2hlcmUuXG4gICAgICAgICAgICBpZiAoaXNGaXJzdFZhbHVlRGVjbGFyYXRpb24oZGVjbCkpIHtcbiAgICAgICAgICAgICAgZW1pdCgnLyoqIEBjb25zdCAqL1xcbicpO1xuICAgICAgICAgICAgICB3cml0ZVZhcmlhYmxlU3RhdGVtZW50KG1hbmdsZWQsIFtdLCAne30nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIERlY2xhcmUgdGhlIGNvbnRlbnRzIGluc2lkZSB0aGUgXCJtYW5nbGVkJG5hbWVcIi5cbiAgICAgICAgICAgIGlmIChkZWNsLmJvZHkpIHZpc2l0b3IoZGVjbC5ib2R5LCBbbWFuZ2xlZF0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGVycm9yVW5pbXBsZW1lbnRlZEtpbmQoZGVjbC5uYW1lLCAnZXh0ZXJucyBnZW5lcmF0aW9uIG9mIG5hbWVzcGFjZScpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuTW9kdWxlQmxvY2s6XG4gICAgICAgIGNvbnN0IGJsb2NrID0gbm9kZSBhcyB0cy5Nb2R1bGVCbG9jaztcbiAgICAgICAgZm9yIChjb25zdCBzdG10IG9mIGJsb2NrLnN0YXRlbWVudHMpIHtcbiAgICAgICAgICB2aXNpdG9yKHN0bXQsIG5hbWVzcGFjZSk7XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuSW1wb3J0RXF1YWxzRGVjbGFyYXRpb246XG4gICAgICAgIGNvbnN0IGltcG9ydEVxdWFscyA9IG5vZGUgYXMgdHMuSW1wb3J0RXF1YWxzRGVjbGFyYXRpb247XG4gICAgICAgIGNvbnN0IGxvY2FsTmFtZSA9IGdldElkZW50aWZpZXJUZXh0KGltcG9ydEVxdWFscy5uYW1lKTtcbiAgICAgICAgaWYgKGxvY2FsTmFtZSA9PT0gJ25nJykge1xuICAgICAgICAgIGVtaXQoYFxcbi8qIFNraXBwaW5nIHByb2JsZW1hdGljIGltcG9ydCBuZyA9IC4uLjsgKi9cXG5gKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW1wb3J0RXF1YWxzLm1vZHVsZVJlZmVyZW5jZS5raW5kID09PSB0cy5TeW50YXhLaW5kLkV4dGVybmFsTW9kdWxlUmVmZXJlbmNlKSB7XG4gICAgICAgICAgYWRkSW1wb3J0QWxpYXNlcyhpbXBvcnRFcXVhbHMpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHFuID0gZ2V0RW50aXR5TmFtZVRleHQoaW1wb3J0RXF1YWxzLm1vZHVsZVJlZmVyZW5jZSk7XG4gICAgICAgIC8vIEBjb25zdCBzbyB0aGF0IENsb3N1cmUgQ29tcGlsZXIgdW5kZXJzdGFuZHMgdGhpcyBpcyBhbiBhbGlhcy5cbiAgICAgICAgaWYgKG5hbWVzcGFjZS5sZW5ndGggPT09IDApIGVtaXQoJy8qKiBAY29uc3QgKi9cXG4nKTtcbiAgICAgICAgd3JpdGVWYXJpYWJsZVN0YXRlbWVudChsb2NhbE5hbWUsIG5hbWVzcGFjZSwgcW4pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5DbGFzc0RlY2xhcmF0aW9uOlxuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkludGVyZmFjZURlY2xhcmF0aW9uOlxuICAgICAgICB3cml0ZVR5cGUobm9kZSBhcyB0cy5JbnRlcmZhY2VEZWNsYXJhdGlvbiB8IHRzLkNsYXNzRGVjbGFyYXRpb24sIG5hbWVzcGFjZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkZ1bmN0aW9uRGVjbGFyYXRpb246XG4gICAgICAgIGNvbnN0IGZuRGVjbCA9IG5vZGUgYXMgdHMuRnVuY3Rpb25EZWNsYXJhdGlvbjtcbiAgICAgICAgY29uc3QgbmFtZSA9IGZuRGVjbC5uYW1lO1xuICAgICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgICByZXBvcnREaWFnbm9zdGljKGRpYWdub3N0aWNzLCBmbkRlY2wsICdhbm9ueW1vdXMgZnVuY3Rpb24gaW4gZXh0ZXJucycpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIC8vIEdhdGhlciB1cCBhbGwgb3ZlcmxvYWRzIG9mIHRoaXMgZnVuY3Rpb24uXG4gICAgICAgIGNvbnN0IHN5bSA9IHR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24obmFtZSkhO1xuICAgICAgICBjb25zdCBkZWNscyA9IHN5bS5kZWNsYXJhdGlvbnMhLmZpbHRlcih0cy5pc0Z1bmN0aW9uRGVjbGFyYXRpb24pO1xuICAgICAgICAvLyBPbmx5IGVtaXQgdGhlIGZpcnN0IGRlY2xhcmF0aW9uIG9mIGVhY2ggb3ZlcmxvYWRlZCBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGZuRGVjbCAhPT0gZGVjbHNbMF0pIGJyZWFrO1xuICAgICAgICBjb25zdCBwYXJhbXMgPSBlbWl0RnVuY3Rpb25UeXBlKGRlY2xzKTtcbiAgICAgICAgd3JpdGVGdW5jdGlvbihuYW1lLCBwYXJhbXMsIG5hbWVzcGFjZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLlZhcmlhYmxlU3RhdGVtZW50OlxuICAgICAgICBmb3IgKGNvbnN0IGRlY2wgb2YgKG5vZGUgYXMgdHMuVmFyaWFibGVTdGF0ZW1lbnQpLmRlY2xhcmF0aW9uTGlzdC5kZWNsYXJhdGlvbnMpIHtcbiAgICAgICAgICB3cml0ZVZhcmlhYmxlRGVjbGFyYXRpb24oZGVjbCwgbmFtZXNwYWNlKTtcbiAgICAgICAgfVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbnVtRGVjbGFyYXRpb246XG4gICAgICAgIHdyaXRlRW51bShub2RlIGFzIHRzLkVudW1EZWNsYXJhdGlvbiwgbmFtZXNwYWNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIHRzLlN5bnRheEtpbmQuVHlwZUFsaWFzRGVjbGFyYXRpb246XG4gICAgICAgIHdyaXRlVHlwZUFsaWFzKG5vZGUgYXMgdHMuVHlwZUFsaWFzRGVjbGFyYXRpb24sIG5hbWVzcGFjZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSB0cy5TeW50YXhLaW5kLkltcG9ydERlY2xhcmF0aW9uOlxuICAgICAgICBhZGRJbXBvcnRBbGlhc2VzKG5vZGUgYXMgdHMuSW1wb3J0RGVjbGFyYXRpb24pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5OYW1lc3BhY2VFeHBvcnREZWNsYXJhdGlvbjpcbiAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FeHBvcnRBc3NpZ25tZW50OlxuICAgICAgICAvLyBIYW5kbGVkIG9uIHRoZSBmaWxlIGxldmVsLlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGNvbnN0IGxvY2F0aW9uU3RyID0gbmFtZXNwYWNlLmpvaW4oJy4nKSB8fCBwYXRoLmJhc2VuYW1lKG5vZGUuZ2V0U291cmNlRmlsZSgpLmZpbGVOYW1lKTtcbiAgICAgICAgZW1pdChgXFxuLy8gVE9ETyh0c2lja2xlKTogJHt0cy5TeW50YXhLaW5kW25vZGUua2luZF19IGluICR7bG9jYXRpb25TdHJ9XFxuYCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxufVxuIl19