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
        define("tsickle/src/tsickle", ["require", "exports", "tsickle/src/cli_support", "tsickle/src/decorator_downlevel_transformer", "tsickle/src/enum_transformer", "tsickle/src/externs", "tsickle/src/fileoverview_comment_transformer", "tsickle/src/googmodule", "tsickle/src/jsdoc_transformer", "tsickle/src/modules_manifest", "tsickle/src/quoting_transformer", "tsickle/src/transformer_util", "tsickle/src/typescript", "tsickle/src/externs", "tsickle/src/modules_manifest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var cli_support_1 = require("tsickle/src/cli_support");
    var decorator_downlevel_transformer_1 = require("tsickle/src/decorator_downlevel_transformer");
    var enum_transformer_1 = require("tsickle/src/enum_transformer");
    var externs_1 = require("tsickle/src/externs");
    var fileoverview_comment_transformer_1 = require("tsickle/src/fileoverview_comment_transformer");
    var googmodule = require("tsickle/src/googmodule");
    var jsdoc_transformer_1 = require("tsickle/src/jsdoc_transformer");
    var modules_manifest_1 = require("tsickle/src/modules_manifest");
    var quoting_transformer_1 = require("tsickle/src/quoting_transformer");
    var transformer_util_1 = require("tsickle/src/transformer_util");
    var ts = require("tsickle/src/typescript");
    // Retained here for API compatibility.
    var externs_2 = require("tsickle/src/externs");
    exports.getGeneratedExterns = externs_2.getGeneratedExterns;
    var modules_manifest_2 = require("tsickle/src/modules_manifest");
    exports.ModulesManifest = modules_manifest_2.ModulesManifest;
    function mergeEmitResults(emitResults) {
        var e_1, _a;
        var diagnostics = [];
        var emitSkipped = true;
        var emittedFiles = [];
        var externs = {};
        var modulesManifest = new modules_manifest_1.ModulesManifest();
        try {
            for (var emitResults_1 = __values(emitResults), emitResults_1_1 = emitResults_1.next(); !emitResults_1_1.done; emitResults_1_1 = emitResults_1.next()) {
                var er = emitResults_1_1.value;
                diagnostics.push.apply(diagnostics, __spread(er.diagnostics));
                emitSkipped = emitSkipped || er.emitSkipped;
                emittedFiles.push.apply(emittedFiles, __spread(er.emittedFiles));
                Object.assign(externs, er.externs);
                modulesManifest.addManifest(er.modulesManifest);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (emitResults_1_1 && !emitResults_1_1.done && (_a = emitResults_1.return)) _a.call(emitResults_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return { diagnostics: diagnostics, emitSkipped: emitSkipped, emittedFiles: emittedFiles, externs: externs, modulesManifest: modulesManifest };
    }
    exports.mergeEmitResults = mergeEmitResults;
    function emitWithTsickle(program, host, tsHost, tsOptions, targetSourceFile, writeFile, cancellationToken, emitOnlyDtsFiles, customTransformers) {
        if (customTransformers === void 0) { customTransformers = {}; }
        var e_2, _a, e_3, _b;
        try {
            for (var _c = __values(program.getSourceFiles()), _d = _c.next(); !_d.done; _d = _c.next()) {
                var sf = _d.value;
                cli_support_1.assertAbsolute(sf.fileName);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_2) throw e_2.error; }
        }
        var tsickleDiagnostics = [];
        var typeChecker = program.getTypeChecker();
        var tsickleSourceTransformers = [];
        if (host.transformTypesToClosure) {
            // Only add @suppress {checkTypes} comments when also adding type annotations.
            tsickleSourceTransformers.push(fileoverview_comment_transformer_1.transformFileoverviewCommentFactory(tsickleDiagnostics));
            tsickleSourceTransformers.push(jsdoc_transformer_1.jsdocTransformer(host, tsOptions, tsHost, typeChecker, tsickleDiagnostics));
            if (host.enableAutoQuoting) {
                tsickleSourceTransformers.push(quoting_transformer_1.quotingTransformer(host, typeChecker, tsickleDiagnostics));
            }
            tsickleSourceTransformers.push(enum_transformer_1.enumTransformer(typeChecker, tsickleDiagnostics));
            tsickleSourceTransformers.push(decorator_downlevel_transformer_1.decoratorDownlevelTransformer(typeChecker, tsickleDiagnostics));
        }
        else if (host.transformDecorators) {
            tsickleSourceTransformers.push(decorator_downlevel_transformer_1.decoratorDownlevelTransformer(typeChecker, tsickleDiagnostics));
        }
        var modulesManifest = new modules_manifest_1.ModulesManifest();
        var tsickleTransformers = { before: tsickleSourceTransformers };
        var tsTransformers = {
            before: __spread((customTransformers.beforeTsickle || []), (tsickleTransformers.before || []).map(function (tf) { return skipTransformForSourceFileIfNeeded(host, tf); }), (customTransformers.beforeTs || [])),
            after: __spread((customTransformers.afterTs || []), (tsickleTransformers.after || []).map(function (tf) { return skipTransformForSourceFileIfNeeded(host, tf); })),
            afterDeclarations: customTransformers.afterDeclarations,
        };
        if (host.transformTypesToClosure) {
            // See comment on remoteTypeAssertions.
            tsTransformers.before.push(jsdoc_transformer_1.removeTypeAssertions());
        }
        if (host.googmodule) {
            tsTransformers.after.push(googmodule.commonJsToGoogmoduleTransformer(host, modulesManifest, typeChecker, tsickleDiagnostics));
        }
        var writeFileDelegate = writeFile || tsHost.writeFile.bind(tsHost);
        var writeFileImpl = function (fileName, content, writeByteOrderMark, onError, sourceFiles) {
            cli_support_1.assertAbsolute(fileName);
            if (host.addDtsClutzAliases && transformer_util_1.isDtsFileName(fileName) && sourceFiles) {
                // Only bundle emits pass more than one source file for .d.ts writes. Bundle emits however
                // are not supported by tsickle, as we cannot annotate them for Closure in any meaningful
                // way anyway.
                if (!sourceFiles || sourceFiles.length > 1) {
                    throw new Error("expected exactly one source file for .d.ts emit, got " + sourceFiles.map(function (sf) { return sf.fileName; }));
                }
                var originalSource = sourceFiles[0];
                content = addClutzAliases(fileName, content, originalSource, typeChecker, host);
            }
            writeFileDelegate(fileName, content, writeByteOrderMark, onError, sourceFiles);
        };
        var _e = program.emit(targetSourceFile, writeFileImpl, cancellationToken, emitOnlyDtsFiles, tsTransformers), tsDiagnostics = _e.diagnostics, emitSkipped = _e.emitSkipped, emittedFiles = _e.emittedFiles;
        var externs = {};
        if (host.transformTypesToClosure) {
            var sourceFiles = targetSourceFile ? [targetSourceFile] : program.getSourceFiles();
            try {
                for (var sourceFiles_1 = __values(sourceFiles), sourceFiles_1_1 = sourceFiles_1.next(); !sourceFiles_1_1.done; sourceFiles_1_1 = sourceFiles_1.next()) {
                    var sourceFile = sourceFiles_1_1.value;
                    var isDts = transformer_util_1.isDtsFileName(sourceFile.fileName);
                    if (isDts && host.shouldSkipTsickleProcessing(sourceFile.fileName)) {
                        continue;
                    }
                    var _f = externs_1.generateExterns(typeChecker, sourceFile, host, /* moduleResolutionHost */ host.host, tsOptions), output = _f.output, diagnostics = _f.diagnostics;
                    if (output) {
                        externs[sourceFile.fileName] = output;
                    }
                    if (diagnostics) {
                        tsickleDiagnostics.push.apply(tsickleDiagnostics, __spread(diagnostics));
                    }
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (sourceFiles_1_1 && !sourceFiles_1_1.done && (_b = sourceFiles_1.return)) _b.call(sourceFiles_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
        }
        // All diagnostics (including warnings) are treated as errors.
        // If the host decides to ignore warnings, just discard them.
        // Warnings include stuff like "don't use @type in your jsdoc"; tsickle
        // warns and then fixes up the code to be Closure-compatible anyway.
        tsickleDiagnostics = tsickleDiagnostics.filter(function (d) { return d.category === ts.DiagnosticCategory.Error ||
            !host.shouldIgnoreWarningsForPath(d.file.fileName); });
        return {
            modulesManifest: modulesManifest,
            emitSkipped: emitSkipped,
            emittedFiles: emittedFiles || [],
            diagnostics: __spread(tsDiagnostics, tsickleDiagnostics),
            externs: externs
        };
    }
    exports.emitWithTsickle = emitWithTsickle;
    /** Compares two strings and returns a number suitable for use in sort(). */
    function stringCompare(a, b) {
        if (a < b)
            return -1;
        if (a > b)
            return 1;
        return 0;
    }
    /**
     * A tsickle produced declaration file might be consumed be referenced by Clutz
     * produced .d.ts files, which use symbol names based on Closure's internal
     * naming conventions, so we need to provide aliases for all the exported symbols
     * in the Clutz naming convention.
     */
    function addClutzAliases(fileName, dtsFileContent, sourceFile, typeChecker, host) {
        var e_4, _a;
        var moduleSymbol = typeChecker.getSymbolAtLocation(sourceFile);
        var moduleExports = moduleSymbol && typeChecker.getExportsOfModule(moduleSymbol);
        if (!moduleExports)
            return dtsFileContent;
        // .d.ts files can be transformed, too, so we need to compare the original node below.
        var origSourceFile = ts.getOriginalNode(sourceFile);
        // The module exports might be re-exports, and in the case of "export *" might not even be
        // available in the module scope, which makes them difficult to export. Avoid the problem by
        // filtering out symbols who do not have a declaration in the local module.
        var localExports = moduleExports.filter(function (e) {
            // If there are no declarations, be conservative and emit the aliases.
            if (!e.declarations)
                return true;
            // Skip default exports, they are not currently supported.
            // default is a keyword in typescript, so the name of the export being default means that it's a
            // default export.
            if (e.name === 'default')
                return false;
            // Otherwise check that some declaration is from the local module.
            return e.declarations.some(function (d) { return d.getSourceFile() === origSourceFile; });
        });
        if (!localExports.length)
            return dtsFileContent;
        // TypeScript 2.8 and TypeScript 2.9 differ on the order in which the
        // module symbols come out, so sort here to make the tests stable.
        localExports.sort(function (a, b) { return stringCompare(a.name, b.name); });
        var moduleName = host.pathToModuleName('', sourceFile.fileName);
        var clutzModuleName = moduleName.replace(/\./g, '$');
        // Clutz might refer to the name in two different forms (stemming from goog.provide and
        // goog.module respectively).
        // 1) global in clutz:   ಠ_ಠ.clutz.module$contents$path$to$module_Symbol...
        // 2) local in a module: ಠ_ಠ.clutz.module$exports$path$to$module.Symbol ..
        // See examples at:
        // https://github.com/angular/clutz/tree/master/src/test/java/com/google/javascript/clutz
        // Case (1) from above.
        var globalSymbols = '';
        // Case (2) from above.
        var nestedSymbols = '';
        try {
            for (var localExports_1 = __values(localExports), localExports_1_1 = localExports_1.next(); !localExports_1_1.done; localExports_1_1 = localExports_1.next()) {
                var symbol = localExports_1_1.value;
                globalSymbols +=
                    "\t\texport {" + symbol.name + " as module$contents$" + clutzModuleName + "_" + symbol.name + "}\n";
                nestedSymbols +=
                    "\t\texport {module$contents$" + clutzModuleName + "_" + symbol.name + " as " + symbol.name + "}\n";
                if (symbol.flags & ts.SymbolFlags.Class) {
                    globalSymbols += "\t\texport {" + symbol.name + " as module$contents$" + clutzModuleName + "_" + symbol.name + "_Instance}\n";
                    nestedSymbols += "\t\texport {module$contents$" + clutzModuleName + "_" + symbol.name + " as " + symbol.name + "_Instance}\n";
                }
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (localExports_1_1 && !localExports_1_1.done && (_a = localExports_1.return)) _a.call(localExports_1);
            }
            finally { if (e_4) throw e_4.error; }
        }
        dtsFileContent += 'declare global {\n';
        dtsFileContent += "\tnamespace \u0CA0_\u0CA0.clutz {\n";
        dtsFileContent += globalSymbols;
        dtsFileContent += "\t}\n";
        dtsFileContent += "\tnamespace \u0CA0_\u0CA0.clutz.module$exports$" + clutzModuleName + " {\n";
        dtsFileContent += nestedSymbols;
        dtsFileContent += "\t}\n";
        dtsFileContent += '}\n';
        return dtsFileContent;
    }
    function skipTransformForSourceFileIfNeeded(host, delegateFactory) {
        return function (context) {
            var delegate = delegateFactory(context);
            return function (sourceFile) {
                if (host.shouldSkipTsickleProcessing(sourceFile.fileName)) {
                    return sourceFile;
                }
                return delegate(sourceFile);
            };
        };
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHNpY2tsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90c2lja2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSUgsdURBQTZDO0lBQzdDLCtGQUFnRjtJQUNoRixpRUFBbUQ7SUFDbkQsK0NBQTBDO0lBQzFDLGlHQUF1RjtJQUN2RixtREFBMkM7SUFDM0MsbUVBQTBGO0lBQzFGLGlFQUFtRDtJQUNuRCx1RUFBeUQ7SUFDekQsaUVBQWlEO0lBQ2pELDJDQUFtQztJQUVuQyx1Q0FBdUM7SUFDdkMsK0NBQThDO0lBQXRDLHdDQUFBLG1CQUFtQixDQUFBO0lBQzNCLGlFQUE0RDtJQUEzQyw2Q0FBQSxlQUFlLENBQUE7SUE4QmhDLDBCQUFpQyxXQUF5Qjs7UUFDeEQsSUFBTSxXQUFXLEdBQW9CLEVBQUUsQ0FBQztRQUN4QyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUM7UUFDdkIsSUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO1FBQ2xDLElBQU0sT0FBTyxHQUFpQyxFQUFFLENBQUM7UUFDakQsSUFBTSxlQUFlLEdBQUcsSUFBSSxrQ0FBZSxFQUFFLENBQUM7O1lBQzlDLEtBQWlCLElBQUEsZ0JBQUEsU0FBQSxXQUFXLENBQUEsd0NBQUEsaUVBQUU7Z0JBQXpCLElBQU0sRUFBRSx3QkFBQTtnQkFDWCxXQUFXLENBQUMsSUFBSSxPQUFoQixXQUFXLFdBQVMsRUFBRSxDQUFDLFdBQVcsR0FBRTtnQkFDcEMsV0FBVyxHQUFHLFdBQVcsSUFBSSxFQUFFLENBQUMsV0FBVyxDQUFDO2dCQUM1QyxZQUFZLENBQUMsSUFBSSxPQUFqQixZQUFZLFdBQVMsRUFBRSxDQUFDLFlBQVksR0FBRTtnQkFDdEMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuQyxlQUFlLENBQUMs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Q0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7b0JBQ3ZDLGFBQWEsSUFBSSxpQkFBZSxNQUFNLENBQUMsSUFBSSw0QkFBdUIsZUFBZSxTQUM3RSxNQUFNLENBQUMsSUFBSSxpQkFBYyxDQUFDO29CQUM5QixhQUFhLElBQUksaUNBQStCLGVBQWUsU0FBSSxNQUFNLENBQUMsSUFBSSxZQUMxRSxNQUFNLENBQUMsSUFBSSxpQkFBYyxDQUFDO2lCQUMvQjthQUNGOzs7Ozs7Ozs7UUFFRCxjQUFjLElBQUksb0JBQW9CLENBQUM7UUFDdkMsY0FBYyxJQUFJLHFDQUEyQixDQUFDO1FBQzlDLGNBQWMsSUFBSSxhQUFhLENBQUM7UUFDaEMsY0FBYyxJQUFJLE9BQU8sQ0FBQztRQUMxQixjQUFjLElBQUksb0RBQXdDLGVBQWUsU0FBTSxDQUFDO1FBQ2hGLGNBQWMsSUFBSSxhQUFhLENBQUM7UUFDaEMsY0FBYyxJQUFJLE9BQU8sQ0FBQztRQUMxQixjQUFjLElBQUksS0FBSyxDQUFDO1FBRXhCLE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRCw0Q0FDSSxJQUFpQixFQUNqQixlQUFxRDtRQUN2RCxPQUFPLFVBQUMsT0FBaUM7WUFDdkMsSUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzFDLE9BQU8sVUFBQyxVQUF5QjtnQkFDL0IsSUFBSSxJQUFJLENBQUMsMkJBQTJCLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN6RCxPQUFPLFVBQVUsQ0FBQztpQkFDbkI7Z0JBQ0QsT0FBTyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDOUIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHthc3NlcnRBYnNvbHV0ZX0gZnJvbSAnLi9jbGlfc3VwcG9ydCc7XG5pbXBvcnQge2RlY29yYXRvckRvd25sZXZlbFRyYW5zZm9ybWVyfSBmcm9tICcuL2RlY29yYXRvcl9kb3dubGV2ZWxfdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtlbnVtVHJhbnNmb3JtZXJ9IGZyb20gJy4vZW51bV90cmFuc2Zvcm1lcic7XG5pbXBvcnQge2dlbmVyYXRlRXh0ZXJuc30gZnJvbSAnLi9leHRlcm5zJztcbmltcG9ydCB7dHJhbnNmb3JtRmlsZW92ZXJ2aWV3Q29tbWVudEZhY3Rvcnl9IGZyb20gJy4vZmlsZW92ZXJ2aWV3X2NvbW1lbnRfdHJhbnNmb3JtZXInO1xuaW1wb3J0ICogYXMgZ29vZ21vZHVsZSBmcm9tICcuL2dvb2dtb2R1bGUnO1xuaW1wb3J0IHtBbm5vdGF0b3JIb3N0LCBqc2RvY1RyYW5zZm9ybWVyLCByZW1vdmVUeXBlQXNzZXJ0aW9uc30gZnJvbSAnLi9qc2RvY190cmFuc2Zvcm1lcic7XG5pbXBvcnQge01vZHVsZXNNYW5pZmVzdH0gZnJvbSAnLi9tb2R1bGVzX21hbmlmZXN0JztcbmltcG9ydCB7cXVvdGluZ1RyYW5zZm9ybWVyfSBmcm9tICcuL3F1b3RpbmdfdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtpc0R0c0ZpbGVOYW1lfSBmcm9tICcuL3RyYW5zZm9ybWVyX3V0aWwnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAnLi90eXBlc2NyaXB0JztcblxuLy8gUmV0YWluZWQgaGVyZSBmb3IgQVBJIGNvbXBhdGliaWxpdHkuXG5leHBvcnQge2dldEdlbmVyYXRlZEV4dGVybnN9IGZyb20gJy4vZXh0ZXJucyc7XG5leHBvcnQge0ZpbGVNYXAsIE1vZHVsZXNNYW5pZmVzdH0gZnJvbSAnLi9tb2R1bGVzX21hbmlmZXN0JztcblxuZXhwb3J0IGludGVyZmFjZSBUc2lja2xlSG9zdCBleHRlbmRzIGdvb2dtb2R1bGUuR29vZ01vZHVsZVByb2Nlc3Nvckhvc3QsIEFubm90YXRvckhvc3Qge1xuICAvKipcbiAgICogV2hldGhlciB0byBkb3dubGV2ZWwgZGVjb3JhdG9yc1xuICAgKi9cbiAgdHJhbnNmb3JtRGVjb3JhdG9ycz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBXaGV0aGVyIHRvIGNvbnZlcnMgdHlwZXMgdG8gY2xvc3VyZVxuICAgKi9cbiAgdHJhbnNmb3JtVHlwZXNUb0Nsb3N1cmU/OiBib29sZWFuO1xuICAvKipcbiAgICogV2hldGhlciB0byBhZGQgYWxpYXNlcyB0byB0aGUgLmQudHMgZmlsZXMgdG8gYWRkIHRoZSBleHBvcnRzIHRvIHRoZVxuICAgKiDgsqBf4LKgLmNsdXR6IG5hbWVzcGFjZS5cbiAgICovXG4gIGFkZER0c0NsdXR6QWxpYXNlcz86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBJZiB0cnVlLCB0c2lja2xlIGFuZCBkZWNvcmF0b3IgZG93bmxldmVsIHByb2Nlc3Npbmcgd2lsbCBiZSBza2lwcGVkIGZvclxuICAgKiB0aGF0IGZpbGUuXG4gICAqL1xuICBzaG91bGRTa2lwVHNpY2tsZVByb2Nlc3NpbmcoZmlsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW47XG4gIC8qKlxuICAgKiBUc2lja2xlIHRyZWF0cyB3YXJuaW5ncyBhcyBlcnJvcnMsIGlmIHRydWUsIGlnbm9yZSB3YXJuaW5ncy4gIFRoaXMgbWlnaHQgYmVcbiAgICogdXNlZnVsIGZvciBlLmcuIHRoaXJkIHBhcnR5IGNvZGUuXG4gICAqL1xuICBzaG91bGRJZ25vcmVXYXJuaW5nc0ZvclBhdGgoZmlsZVBhdGg6IHN0cmluZyk6IGJvb2xlYW47XG4gIC8qKiBXaGV0aGVyIHRvIGNvbnZlcnQgQ29tbW9uSlMgcmVxdWlyZSgpIGltcG9ydHMgdG8gZ29vZy5tb2R1bGUoKSBhbmQgZ29vZy5yZXF1aXJlKCkgY2FsbHMuICovXG4gIGdvb2dtb2R1bGU6IGJvb2xlYW47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZUVtaXRSZXN1bHRzKGVtaXRSZXN1bHRzOiBFbWl0UmVzdWx0W10pOiBFbWl0UmVzdWx0IHtcbiAgY29uc3QgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSA9IFtdO1xuICBsZXQgZW1pdFNraXBwZWQgPSB0cnVlO1xuICBjb25zdCBlbWl0dGVkRmlsZXM6IHN0cmluZ1tdID0gW107XG4gIGNvbnN0IGV4dGVybnM6IHtbZmlsZU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgY29uc3QgbW9kdWxlc01hbmlmZXN0ID0gbmV3IE1vZHVsZXNNYW5pZmVzdCgpO1xuICBmb3IgKGNvbnN0IGVyIG9mIGVtaXRSZXN1bHRzKSB7XG4gICAgZGlhZ25vc3RpY3MucHVzaCguLi5lci5kaWFnbm9zdGljcyk7XG4gICAgZW1pdFNraXBwZWQgPSBlbWl0U2tpcHBlZCB8fCBlci5lbWl0U2tpcHBlZDtcbiAgICBlbWl0dGVkRmlsZXMucHVzaCguLi5lci5lbWl0dGVkRmlsZXMpO1xuICAgIE9iamVjdC5hc3NpZ24oZXh0ZXJucywgZXIuZXh0ZXJucyk7XG4gICAgbW9kdWxlc01hbmlmZXN0LmFkZE1hbmlmZXN0KGVyLm1vZHVsZXNNYW5pZmVzdCk7XG4gIH1cbiAgcmV0dXJuIHtkaWFnbm9zdGljcywgZW1pdFNraXBwZWQsIGVtaXR0ZWRGaWxlcywgZXh0ZXJucywgbW9kdWxlc01hbmlmZXN0fTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbWl0UmVzdWx0IGV4dGVuZHMgdHMuRW1pdFJlc3VsdCB7XG4gIC8vIFRoZSBtYW5pZmVzdCBvZiBKUyBtb2R1bGVzIG91dHB1dCBieSB0aGUgY29tcGlsZXIuXG4gIG1vZHVsZXNNYW5pZmVzdDogTW9kdWxlc01hbmlmZXN0O1xuICAvKipcbiAgICogZXh0ZXJucy5qcyBmaWxlcyBwcm9kdWNlZCBieSB0c2lja2xlLCBpZiBhbnkuIG1vZHVsZSBJRHMgYXJlIHJlbGF0aXZlIHBhdGhzIGZyb21cbiAgICogZmlsZU5hbWVUb01vZHVsZUlkLlxuICAgKi9cbiAgZXh0ZXJuczoge1ttb2R1bGVJZDogc3RyaW5nXTogc3RyaW5nfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBFbWl0VHJhbnNmb3JtZXJzIHtcbiAgLyoqIEN1c3RvbSB0cmFuc2Zvcm1lcnMgdG8gZXZhbHVhdGUgYmVmb3JlIFRzaWNrbGUgLmpzIHRyYW5zZm9ybWF0aW9ucy4gKi9cbiAgYmVmb3JlVHNpY2tsZT86IEFycmF5PHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPj47XG4gIC8qKiBDdXN0b20gdHJhbnNmb3JtZXJzIHRvIGV2YWx1YXRlIGJlZm9yZSBidWlsdC1pbiAuanMgdHJhbnNmb3JtYXRpb25zLiAqL1xuICBiZWZvcmVUcz86IEFycmF5PHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPj47XG4gIC8qKiBDdXN0b20gdHJhbnNmb3JtZXJzIHRvIGV2YWx1YXRlIGFmdGVyIGJ1aWx0LWluIC5qcyB0cmFuc2Zvcm1hdGlvbnMuICovXG4gIGFmdGVyVHM/OiBBcnJheTx0cy5UcmFuc2Zvcm1lckZhY3Rvcnk8dHMuU291cmNlRmlsZT4+O1xuICAvKiogQ3VzdG9tIHRyYW5zZm9ybWVycyB0byBldmFsdWF0ZSBhZnRlciBidWlsdC1pbiAuZC50cyB0cmFuc2Zvcm1hdGlvbnMuICovXG4gIGFmdGVyRGVjbGFyYXRpb25zPzogQXJyYXk8dHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLkJ1bmRsZXx0cy5Tb3VyY2VGaWxlPj47XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBlbWl0V2l0aFRzaWNrbGUoXG4gICAgcHJvZ3JhbTogdHMuUHJvZ3JhbSwgaG9zdDogVHNpY2tsZUhvc3QsIHRzSG9zdDogdHMuQ29tcGlsZXJIb3N0LCB0c09wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucyxcbiAgICB0YXJnZXRTb3VyY2VGaWxlPzogdHMuU291cmNlRmlsZSwgd3JpdGVGaWxlPzogdHMuV3JpdGVGaWxlQ2FsbGJhY2ssXG4gICAgY2FuY2VsbGF0aW9uVG9rZW4/OiB0cy5DYW5jZWxsYXRpb25Ub2tlbiwgZW1pdE9ubHlEdHNGaWxlcz86IGJvb2xlYW4sXG4gICAgY3VzdG9tVHJhbnNmb3JtZXJzOiBFbWl0VHJhbnNmb3JtZXJzID0ge30pOiBFbWl0UmVzdWx0IHtcbiAgZm9yIChjb25zdCBzZiBvZiBwcm9ncmFtLmdldFNvdXJjZUZpbGVzKCkpIHtcbiAgICBhc3NlcnRBYnNvbHV0ZShzZi5maWxlTmFtZSk7XG4gIH1cblxuICBsZXQgdHNpY2tsZURpYWdub3N0aWNzOiB0cy5EaWFnbm9zdGljW10gPSBbXTtcbiAgY29uc3QgdHlwZUNoZWNrZXIgPSBwcm9ncmFtLmdldFR5cGVDaGVja2VyKCk7XG4gIGNvbnN0IHRzaWNrbGVTb3VyY2VUcmFuc2Zvcm1lcnM6IEFycmF5PHRzLlRyYW5zZm9ybWVyRmFjdG9yeTx0cy5Tb3VyY2VGaWxlPj4gPSBbXTtcbiAgaWYgKGhvc3QudHJhbnNmb3JtVHlwZXNUb0Nsb3N1cmUpIHtcbiAgICAvLyBPbmx5IGFkZCBAc3VwcHJlc3Mge2NoZWNrVHlwZXN9IGNvbW1lbnRzIHdoZW4gYWxzbyBhZGRpbmcgdHlwZSBhbm5vdGF0aW9ucy5cbiAgICB0c2lja2xlU291cmNlVHJhbnNmb3JtZXJzLnB1c2godHJhbnNmb3JtRmlsZW92ZXJ2aWV3Q29tbWVudEZhY3RvcnkodHNpY2tsZURpYWdub3N0aWNzKSk7XG4gICAgdHNpY2tsZVNvdXJjZVRyYW5zZm9ybWVycy5wdXNoKFxuICAgICAgICBqc2RvY1RyYW5zZm9ybWVyKGhvc3QsIHRzT3B0aW9ucywgdHNIb3N0LCB0eXBlQ2hlY2tlciwgdHNpY2tsZURpYWdub3N0aWNzKSk7XG4gICAgaWYgKGhvc3QuZW5hYmxlQXV0b1F1b3RpbmcpIHtcbiAgICAgIHRzaWNrbGVTb3VyY2VUcmFuc2Zvcm1lcnMucHVzaChxdW90aW5nVHJhbnNmb3JtZXIoaG9zdCwgdHlwZUNoZWNrZXIsIHRzaWNrbGVEaWFnbm9zdGljcykpO1xuICAgIH1cbiAgICB0c2lja2xlU291cmNlVHJhbnNmb3JtZXJzLnB1c2goZW51bVRyYW5zZm9ybWVyKHR5cGVDaGVja2VyLCB0c2lja2xlRGlhZ25vc3RpY3MpKTtcbiAgICB0c2lja2xlU291cmNlVHJhbnNmb3JtZXJzLnB1c2goZGVjb3JhdG9yRG93bmxldmVsVHJhbnNmb3JtZXIodHlwZUNoZWNrZXIsIHRzaWNrbGVEaWFnbm9zdGljcykpO1xuICB9IGVsc2UgaWYgKGhvc3QudHJhbnNmb3JtRGVjb3JhdG9ycykge1xuICAgIHRzaWNrbGVTb3VyY2VUcmFuc2Zvcm1lcnMucHVzaChkZWNvcmF0b3JEb3dubGV2ZWxUcmFuc2Zvcm1lcih0eXBlQ2hlY2tlciwgdHNpY2tsZURpYWdub3N0aWNzKSk7XG4gIH1cbiAgY29uc3QgbW9kdWxlc01hbmlmZXN0ID0gbmV3IE1vZHVsZXNNYW5pZmVzdCgpO1xuICBjb25zdCB0c2lja2xlVHJhbnNmb3JtZXJzOiB0cy5DdXN0b21UcmFuc2Zvcm1lcnMgPSB7YmVmb3JlOiB0c2lja2xlU291cmNlVHJhbnNmb3JtZXJzfTtcbiAgY29uc3QgdHNUcmFuc2Zvcm1lcnM6IHRzLkN1c3RvbVRyYW5zZm9ybWVycyA9IHtcbiAgICBiZWZvcmU6IFtcbiAgICAgIC4uLihjdXN0b21UcmFuc2Zvcm1lcnMuYmVmb3JlVHNpY2tsZSB8fCBbXSksXG4gICAgICAuLi4odHNpY2tsZVRyYW5zZm9ybWVycy5iZWZvcmUgfHwgW10pLm1hcCh0ZiA9PiBza2lwVHJhbnNmb3JtRm9yU291cmNlRmlsZUlmTmVlZGVkKGhvc3QsIHRmKSksXG4gICAgICAuLi4oY3VzdG9tVHJhbnNmb3JtZXJzLmJlZm9yZVRzIHx8IFtdKSxcbiAgICBdLFxuICAgIGFmdGVyOiBbXG4gICAgICAuLi4oY3VzdG9tVHJhbnNmb3JtZXJzLmFmdGVyVHMgfHwgW10pLFxuICAgICAgLi4uKHRzaWNrbGVUcmFuc2Zvcm1lcnMuYWZ0ZXIgfHwgW10pLm1hcCh0ZiA9PiBza2lwVHJhbnNmb3JtRm9yU291cmNlRmlsZUlmTmVlZGVkKGhvc3QsIHRmKSksXG4gICAgXSxcbiAgICBhZnRlckRlY2xhcmF0aW9uczogY3VzdG9tVHJhbnNmb3JtZXJzLmFmdGVyRGVjbGFyYXRpb25zLFxuICB9O1xuICBpZiAoaG9zdC50cmFuc2Zvcm1UeXBlc1RvQ2xvc3VyZSkge1xuICAgIC8vIFNlZSBjb21tZW50IG9uIHJlbW90ZVR5cGVBc3NlcnRpb25zLlxuICAgIHRzVHJhbnNmb3JtZXJzLmJlZm9yZSEucHVzaChyZW1vdmVUeXBlQXNzZXJ0aW9ucygpKTtcbiAgfVxuICBpZiAoaG9zdC5nb29nbW9kdWxlKSB7XG4gICAgdHNUcmFuc2Zvcm1lcnMuYWZ0ZXIhLnB1c2goZ29vZ21vZHVsZS5jb21tb25Kc1RvR29vZ21vZHVsZVRyYW5zZm9ybWVyKFxuICAgICAgICBob3N0LCBtb2R1bGVzTWFuaWZlc3QsIHR5cGVDaGVja2VyLCB0c2lja2xlRGlhZ25vc3RpY3MpKTtcbiAgfVxuXG4gIGNvbnN0IHdyaXRlRmlsZURlbGVnYXRlOiB0cy5Xcml0ZUZpbGVDYWxsYmFjayA9IHdyaXRlRmlsZSB8fCB0c0hvc3Qud3JpdGVGaWxlLmJpbmQodHNIb3N0KTtcbiAgY29uc3Qgd3JpdGVGaWxlSW1wbCA9XG4gICAgICAoZmlsZU5hbWU6IHN0cmluZywgY29udGVudDogc3RyaW5nLCB3cml0ZUJ5dGVPcmRlck1hcms6IGJvb2xlYW4sXG4gICAgICAgb25FcnJvcjogKChtZXNzYWdlOiBzdHJpbmcpID0+IHZvaWQpfHVuZGVmaW5lZCxcbiAgICAgICBzb3VyY2VGaWxlczogUmVhZG9ubHlBcnJheTx0cy5Tb3VyY2VGaWxlPikgPT4ge1xuICAgICAgICBhc3NlcnRBYnNvbHV0ZShmaWxlTmFtZSk7XG4gICAgICAgIGlmIChob3N0LmFkZER0c0NsdXR6QWxpYXNlcyAmJiBpc0R0c0ZpbGVOYW1lKGZpbGVOYW1lKSAmJiBzb3VyY2VGaWxlcykge1xuICAgICAgICAgIC8vIE9ubHkgYnVuZGxlIGVtaXRzIHBhc3MgbW9yZSB0aGFuIG9uZSBzb3VyY2UgZmlsZSBmb3IgLmQudHMgd3JpdGVzLiBCdW5kbGUgZW1pdHMgaG93ZXZlclxuICAgICAgICAgIC8vIGFyZSBub3Qgc3VwcG9ydGVkIGJ5IHRzaWNrbGUsIGFzIHdlIGNhbm5vdCBhbm5vdGF0ZSB0aGVtIGZvciBDbG9zdXJlIGluIGFueSBtZWFuaW5nZnVsXG4gICAgICAgICAgLy8gd2F5IGFueXdheS5cbiAgICAgICAgICBpZiAoIXNvdXJjZUZpbGVzIHx8IHNvdXJjZUZpbGVzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgZXhwZWN0ZWQgZXhhY3RseSBvbmUgc291cmNlIGZpbGUgZm9yIC5kLnRzIGVtaXQsIGdvdCAke1xuICAgICAgICAgICAgICAgIHNvdXJjZUZpbGVzLm1hcChzZiA9PiBzZi5maWxlTmFtZSl9YCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IG9yaWdpbmFsU291cmNlID0gc291cmNlRmlsZXNbMF07XG4gICAgICAgICAgY29udGVudCA9IGFkZENsdXR6QWxpYXNlcyhmaWxlTmFtZSwgY29udGVudCwgb3JpZ2luYWxTb3VyY2UsIHR5cGVDaGVja2VyLCBob3N0KTtcbiAgICAgICAgfVxuICAgICAgICB3cml0ZUZpbGVEZWxlZ2F0ZShmaWxlTmFtZSwgY29udGVudCwgd3JpdGVCeXRlT3JkZXJNYXJrLCBvbkVycm9yLCBzb3VyY2VGaWxlcyk7XG4gICAgICB9O1xuXG4gIGNvbnN0IHtkaWFnbm9zdGljczogdHNEaWFnbm9zdGljcywgZW1pdFNraXBwZWQsIGVtaXR0ZWRGaWxlc30gPSBwcm9ncmFtLmVtaXQoXG4gICAgICB0YXJnZXRTb3VyY2VGaWxlLCB3cml0ZUZpbGVJbXBsLCBjYW5jZWxsYXRpb25Ub2tlbiwgZW1pdE9ubHlEdHNGaWxlcywgdHNUcmFuc2Zvcm1lcnMpO1xuXG4gIGNvbnN0IGV4dGVybnM6IHtbZmlsZU5hbWU6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgaWYgKGhvc3QudHJhbnNmb3JtVHlwZXNUb0Nsb3N1cmUpIHtcbiAgICBjb25zdCBzb3VyY2VGaWxlcyA9IHRhcmdldFNvdXJjZUZpbGUgPyBbdGFyZ2V0U291cmNlRmlsZV0gOiBwcm9ncmFtLmdldFNvdXJjZUZpbGVzKCk7XG4gICAgZm9yIChjb25zdCBzb3VyY2VGaWxlIG9mIHNvdXJjZUZpbGVzKSB7XG4gICAgICBjb25zdCBpc0R0cyA9IGlzRHRzRmlsZU5hbWUoc291cmNlRmlsZS5maWxlTmFtZSk7XG4gICAgICBpZiAoaXNEdHMgJiYgaG9zdC5zaG91bGRTa2lwVHNpY2tsZVByb2Nlc3Npbmcoc291cmNlRmlsZS5maWxlTmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCB7b3V0cHV0LCBkaWFnbm9zdGljc30gPSBnZW5lcmF0ZUV4dGVybnMoXG4gICAgICAgICAgdHlwZUNoZWNrZXIsIHNvdXJjZUZpbGUsIGhvc3QsIC8qIG1vZHVsZVJlc29sdXRpb25Ib3N0ICovIGhvc3QuaG9zdCwgdHNPcHRpb25zKTtcbiAgICAgIGlmIChvdXRwdXQpIHtcbiAgICAgICAgZXh0ZXJuc1tzb3VyY2VGaWxlLmZpbGVOYW1lXSA9IG91dHB1dDtcbiAgICAgIH1cbiAgICAgIGlmIChkaWFnbm9zdGljcykge1xuICAgICAgICB0c2lja2xlRGlhZ25vc3RpY3MucHVzaCguLi5kaWFnbm9zdGljcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIEFsbCBkaWFnbm9zdGljcyAoaW5jbHVkaW5nIHdhcm5pbmdzKSBhcmUgdHJlYXRlZCBhcyBlcnJvcnMuXG4gIC8vIElmIHRoZSBob3N0IGRlY2lkZXMgdG8gaWdub3JlIHdhcm5pbmdzLCBqdXN0IGRpc2NhcmQgdGhlbS5cbiAgLy8gV2FybmluZ3MgaW5jbHVkZSBzdHVmZiBsaWtlIFwiZG9uJ3QgdXNlIEB0eXBlIGluIHlvdXIganNkb2NcIjsgdHNpY2tsZVxuICAvLyB3YXJucyBhbmQgdGhlbiBmaXhlcyB1cCB0aGUgY29kZSB0byBiZSBDbG9zdXJlLWNvbXBhdGlibGUgYW55d2F5LlxuICB0c2lja2xlRGlhZ25vc3RpY3MgPSB0c2lja2xlRGlhZ25vc3RpY3MuZmlsdGVyKFxuICAgICAgZCA9PiBkLmNhdGVnb3J5ID09PSB0cy5EaWFnbm9zdGljQ2F0ZWdvcnkuRXJyb3IgfHxcbiAgICAgICAgICAhaG9zdC5zaG91bGRJZ25vcmVXYXJuaW5nc0ZvclBhdGgoZC5maWxlIS5maWxlTmFtZSkpO1xuXG4gIHJldHVybiB7XG4gICAgbW9kdWxlc01hbmlmZXN0LFxuICAgIGVtaXRTa2lwcGVkLFxuICAgIGVtaXR0ZWRGaWxlczogZW1pdHRlZEZpbGVzIHx8IFtdLFxuICAgIGRpYWdub3N0aWNzOiBbLi4udHNEaWFnbm9zdGljcywgLi4udHNpY2tsZURpYWdub3N0aWNzXSxcbiAgICBleHRlcm5zXG4gIH07XG59XG5cbi8qKiBDb21wYXJlcyB0d28gc3RyaW5ncyBhbmQgcmV0dXJucyBhIG51bWJlciBzdWl0YWJsZSBmb3IgdXNlIGluIHNvcnQoKS4gKi9cbmZ1bmN0aW9uIHN0cmluZ0NvbXBhcmUoYTogc3RyaW5nLCBiOiBzdHJpbmcpOiBudW1iZXIge1xuICBpZiAoYSA8IGIpIHJldHVybiAtMTtcbiAgaWYgKGEgPiBiKSByZXR1cm4gMTtcbiAgcmV0dXJuIDA7XG59XG5cbi8qKlxuICogQSB0c2lja2xlIHByb2R1Y2VkIGRlY2xhcmF0aW9uIGZpbGUgbWlnaHQgYmUgY29uc3VtZWQgYmUgcmVmZXJlbmNlZCBieSBDbHV0elxuICogcHJvZHVjZWQgLmQudHMgZmlsZXMsIHdoaWNoIHVzZSBzeW1ib2wgbmFtZXMgYmFzZWQgb24gQ2xvc3VyZSdzIGludGVybmFsXG4gKiBuYW1pbmcgY29udmVudGlvbnMsIHNvIHdlIG5lZWQgdG8gcHJvdmlkZSBhbGlhc2VzIGZvciBhbGwgdGhlIGV4cG9ydGVkIHN5bWJvbHNcbiAqIGluIHRoZSBDbHV0eiBuYW1pbmcgY29udmVudGlvbi5cbiAqL1xuZnVuY3Rpb24gYWRkQ2x1dHpBbGlhc2VzKFxuICAgIGZpbGVOYW1lOiBzdHJpbmcsIGR0c0ZpbGVDb250ZW50OiBzdHJpbmcsIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsXG4gICAgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyLCBob3N0OiBUc2lja2xlSG9zdCk6IHN0cmluZyB7XG4gIGNvbnN0IG1vZHVsZVN5bWJvbCA9IHR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24oc291cmNlRmlsZSk7XG4gIGNvbnN0IG1vZHVsZUV4cG9ydHMgPSBtb2R1bGVTeW1ib2wgJiYgdHlwZUNoZWNrZXIuZ2V0RXhwb3J0c09mTW9kdWxlKG1vZHVsZVN5bWJvbCk7XG4gIGlmICghbW9kdWxlRXhwb3J0cykgcmV0dXJuIGR0c0ZpbGVDb250ZW50O1xuXG4gIC8vIC5kLnRzIGZpbGVzIGNhbiBiZSB0cmFuc2Zvcm1lZCwgdG9vLCBzbyB3ZSBuZWVkIHRvIGNvbXBhcmUgdGhlIG9yaWdpbmFsIG5vZGUgYmVsb3cuXG4gIGNvbnN0IG9yaWdTb3VyY2VGaWxlID0gdHMuZ2V0T3JpZ2luYWxOb2RlKHNvdXJjZUZpbGUpO1xuICAvLyBUaGUgbW9kdWxlIGV4cG9ydHMgbWlnaHQgYmUgcmUtZXhwb3J0cywgYW5kIGluIHRoZSBjYXNlIG9mIFwiZXhwb3J0ICpcIiBtaWdodCBub3QgZXZlbiBiZVxuICAvLyBhdmFpbGFibGUgaW4gdGhlIG1vZHVsZSBzY29wZSwgd2hpY2ggbWFrZXMgdGhlbSBkaWZmaWN1bHQgdG8gZXhwb3J0LiBBdm9pZCB0aGUgcHJvYmxlbSBieVxuICAvLyBmaWx0ZXJpbmcgb3V0IHN5bWJvbHMgd2hvIGRvIG5vdCBoYXZlIGEgZGVjbGFyYXRpb24gaW4gdGhlIGxvY2FsIG1vZHVsZS5cbiAgY29uc3QgbG9jYWxFeHBvcnRzID0gbW9kdWxlRXhwb3J0cy5maWx0ZXIoZSA9PiB7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIGRlY2xhcmF0aW9ucywgYmUgY29uc2VydmF0aXZlIGFuZCBlbWl0IHRoZSBhbGlhc2VzLlxuICAgIGlmICghZS5kZWNsYXJhdGlvbnMpIHJldHVybiB0cnVlO1xuICAgIC8vIFNraXAgZGVmYXVsdCBleHBvcnRzLCB0aGV5IGFyZSBub3QgY3VycmVudGx5IHN1cHBvcnRlZC5cbiAgICAvLyBkZWZhdWx0IGlzIGEga2V5d29yZCBpbiB0eXBlc2NyaXB0LCBzbyB0aGUgbmFtZSBvZiB0aGUgZXhwb3J0IGJlaW5nIGRlZmF1bHQgbWVhbnMgdGhhdCBpdCdzIGFcbiAgICAvLyBkZWZhdWx0IGV4cG9ydC5cbiAgICBpZiAoZS5uYW1lID09PSAnZGVmYXVsdCcpIHJldHVybiBmYWxzZTtcbiAgICAvLyBPdGhlcndpc2UgY2hlY2sgdGhhdCBzb21lIGRlY2xhcmF0aW9uIGlzIGZyb20gdGhlIGxvY2FsIG1vZHVsZS5cbiAgICByZXR1cm4gZS5kZWNsYXJhdGlvbnMuc29tZShkID0+IGQuZ2V0U291cmNlRmlsZSgpID09PSBvcmlnU291cmNlRmlsZSk7XG4gIH0pO1xuICBpZiAoIWxvY2FsRXhwb3J0cy5sZW5ndGgpIHJldHVybiBkdHNGaWxlQ29udGVudDtcblxuICAvLyBUeXBlU2NyaXB0IDIuOCBhbmQgVHlwZVNjcmlwdCAyLjkgZGlmZmVyIG9uIHRoZSBvcmRlciBpbiB3aGljaCB0aGVcbiAgLy8gbW9kdWxlIHN5bWJvbHMgY29tZSBvdXQsIHNvIHNvcnQgaGVyZSB0byBtYWtlIHRoZSB0ZXN0cyBzdGFibGUuXG4gIGxvY2FsRXhwb3J0cy5zb3J0KChhLCBiKSA9PiBzdHJpbmdDb21wYXJlKGEubmFtZSwgYi5uYW1lKSk7XG5cbiAgY29uc3QgbW9kdWxlTmFtZSA9IGhvc3QucGF0aFRvTW9kdWxlTmFtZSgnJywgc291cmNlRmlsZS5maWxlTmFtZSk7XG4gIGNvbnN0IGNsdXR6TW9kdWxlTmFtZSA9IG1vZHVsZU5hbWUucmVwbGFjZSgvXFwuL2csICckJyk7XG5cbiAgLy8gQ2x1dHogbWlnaHQgcmVmZXIgdG8gdGhlIG5hbWUgaW4gdHdvIGRpZmZlcmVudCBmb3JtcyAoc3RlbW1pbmcgZnJvbSBnb29nLnByb3ZpZGUgYW5kXG4gIC8vIGdvb2cubW9kdWxlIHJlc3BlY3RpdmVseSkuXG4gIC8vIDEpIGdsb2JhbCBpbiBjbHV0ejogICDgsqBf4LKgLmNsdXR6Lm1vZHVsZSRjb250ZW50cyRwYXRoJHRvJG1vZHVsZV9TeW1ib2wuLi5cbiAgLy8gMikgbG9jYWwgaW4gYSBtb2R1bGU6IOCyoF/gsqAuY2x1dHoubW9kdWxlJGV4cG9ydHMkcGF0aCR0byRtb2R1bGUuU3ltYm9sIC4uXG4gIC8vIFNlZSBleGFtcGxlcyBhdDpcbiAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2FuZ3VsYXIvY2x1dHovdHJlZS9tYXN0ZXIvc3JjL3Rlc3QvamF2YS9jb20vZ29vZ2xlL2phdmFzY3JpcHQvY2x1dHpcblxuICAvLyBDYXNlICgxKSBmcm9tIGFib3ZlLlxuICBsZXQgZ2xvYmFsU3ltYm9scyA9ICcnO1xuICAvLyBDYXNlICgyKSBmcm9tIGFib3ZlLlxuICBsZXQgbmVzdGVkU3ltYm9scyA9ICcnO1xuICBmb3IgKGNvbnN0IHN5bWJvbCBvZiBsb2NhbEV4cG9ydHMpIHtcbiAgICBnbG9iYWxTeW1ib2xzICs9XG4gICAgICAgIGBcXHRcXHRleHBvcnQgeyR7c3ltYm9sLm5hbWV9IGFzIG1vZHVsZSRjb250ZW50cyQke2NsdXR6TW9kdWxlTmFtZX1fJHtzeW1ib2wubmFtZX19XFxuYDtcbiAgICBuZXN0ZWRTeW1ib2xzICs9XG4gICAgICAgIGBcXHRcXHRleHBvcnQge21vZHVsZSRjb250ZW50cyQke2NsdXR6TW9kdWxlTmFtZX1fJHtzeW1ib2wubmFtZX0gYXMgJHtzeW1ib2wubmFtZX19XFxuYDtcbiAgICBpZiAoc3ltYm9sLmZsYWdzICYgdHMuU3ltYm9sRmxhZ3MuQ2xhc3MpIHtcbiAgICAgIGdsb2JhbFN5bWJvbHMgKz0gYFxcdFxcdGV4cG9ydCB7JHtzeW1ib2wubmFtZX0gYXMgbW9kdWxlJGNvbnRlbnRzJCR7Y2x1dHpNb2R1bGVOYW1lfV8ke1xuICAgICAgICAgIHN5bWJvbC5uYW1lfV9JbnN0YW5jZX1cXG5gO1xuICAgICAgbmVzdGVkU3ltYm9scyArPSBgXFx0XFx0ZXhwb3J0IHttb2R1bGUkY29udGVudHMkJHtjbHV0ek1vZHVsZU5hbWV9XyR7c3ltYm9sLm5hbWV9IGFzICR7XG4gICAgICAgICAgc3ltYm9sLm5hbWV9X0luc3RhbmNlfVxcbmA7XG4gICAgfVxuICB9XG5cbiAgZHRzRmlsZUNvbnRlbnQgKz0gJ2RlY2xhcmUgZ2xvYmFsIHtcXG4nO1xuICBkdHNGaWxlQ29udGVudCArPSBgXFx0bmFtZXNwYWNlIOCyoF/gsqAuY2x1dHoge1xcbmA7XG4gIGR0c0ZpbGVDb250ZW50ICs9IGdsb2JhbFN5bWJvbHM7XG4gIGR0c0ZpbGVDb250ZW50ICs9IGBcXHR9XFxuYDtcbiAgZHRzRmlsZUNvbnRlbnQgKz0gYFxcdG5hbWVzcGFjZSDgsqBf4LKgLmNsdXR6Lm1vZHVsZSRleHBvcnRzJCR7Y2x1dHpNb2R1bGVOYW1lfSB7XFxuYDtcbiAgZHRzRmlsZUNvbnRlbnQgKz0gbmVzdGVkU3ltYm9scztcbiAgZHRzRmlsZUNvbnRlbnQgKz0gYFxcdH1cXG5gO1xuICBkdHNGaWxlQ29udGVudCArPSAnfVxcbic7XG5cbiAgcmV0dXJuIGR0c0ZpbGVDb250ZW50O1xufVxuXG5mdW5jdGlvbiBza2lwVHJhbnNmb3JtRm9yU291cmNlRmlsZUlmTmVlZGVkKFxuICAgIGhvc3Q6IFRzaWNrbGVIb3N0LFxuICAgIGRlbGVnYXRlRmFjdG9yeTogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+KTogdHMuVHJhbnNmb3JtZXJGYWN0b3J5PHRzLlNvdXJjZUZpbGU+IHtcbiAgcmV0dXJuIChjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpID0+IHtcbiAgICBjb25zdCBkZWxlZ2F0ZSA9IGRlbGVnYXRlRmFjdG9yeShjb250ZXh0KTtcbiAgICByZXR1cm4gKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpID0+IHtcbiAgICAgIGlmIChob3N0LnNob3VsZFNraXBUc2lja2xlUHJvY2Vzc2luZyhzb3VyY2VGaWxlLmZpbGVOYW1lKSkge1xuICAgICAgICByZXR1cm4gc291cmNlRmlsZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZWxlZ2F0ZShzb3VyY2VGaWxlKTtcbiAgICB9O1xuICB9O1xufVxuIl19