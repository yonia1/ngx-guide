#!/usr/bin/env node
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
        define("tsickle/src/main", ["require", "exports", "fs", "minimist", "mkdirp", "path", "tsickle/src/typescript", "tsickle/src/cli_support", "tsickle/src/tsickle", "tsickle/src/tsickle"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var fs = require("fs");
    var minimist = require("minimist");
    var mkdirp = require("mkdirp");
    var path = require("path");
    var ts = require("tsickle/src/typescript");
    var cliSupport = require("tsickle/src/cli_support");
    var tsickle = require("tsickle/src/tsickle");
    var tsickle_1 = require("tsickle/src/tsickle");
    function usage() {
        console.error("usage: tsickle [tsickle options] -- [tsc options]\n\nexample:\n  tsickle --externs=foo/externs.js -- -p src --noImplicitAny\n\ntsickle flags are:\n  --externs=PATH        save generated Closure externs.js to PATH\n  --typed               [experimental] attempt to provide Closure types instead of {?}\n  --enableAutoQuoting   automatically apply quotes to property accesses\n");
    }
    /**
     * Parses the command-line arguments, extracting the tsickle settings and
     * the arguments to pass on to tsc.
     */
    function loadSettingsFromArgs(args) {
        var e_1, _a;
        var settings = {};
        var parsedArgs = minimist(args);
        try {
            for (var _b = __values(Object.keys(parsedArgs)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var flag = _c.value;
                switch (flag) {
                    case 'h':
                    case 'help':
                        usage();
                        process.exit(0);
                        break;
                    case 'externs':
                        settings.externsPath = parsedArgs[flag];
                        break;
                    case 'typed':
                        settings.isTyped = true;
                        break;
                    case 'verbose':
                        settings.verbose = true;
                        break;
                    case 'enableAutoQuoting':
                        settings.enableAutoQuoting = true;
                        break;
                    case '_':
                        // This is part of the minimist API, and holds args after the '--'.
                        break;
                    default:
                        console.error("unknown flag '--" + flag + "'");
                        usage();
                        process.exit(1);
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        // Arguments after the '--' arg are arguments to tsc.
        var tscArgs = parsedArgs['_'];
        return { settings: settings, tscArgs: tscArgs };
    }
    /**
     * Determine the lowest-level common parent directory of the given list of files.
     */
    function getCommonParentDirectory(fileNames) {
        var pathSplitter = /[\/\\]+/;
        var commonParent = fileNames[0].split(pathSplitter);
        for (var i = 1; i < fileNames.length; i++) {
            var thisPath = fileNames[i].split(pathSplitter);
            var j = 0;
            while (thisPath[j] === commonParent[j]) {
                j++;
            }
            commonParent.length = j; // Truncate without copying the array
        }
        if (commonParent.length === 0) {
            return '/';
        }
        else {
            return commonParent.join(path.sep);
        }
    }
    exports.getCommonParentDirectory = getCommonParentDirectory;
    /**
     * Loads the tsconfig.json from a directory.
     *
     * TODO(martinprobst): use ts.findConfigFile to match tsc behaviour.
     *
     * @param args tsc command-line arguments.
     */
    function loadTscConfig(args) {
        var _a;
        // Gather tsc options/input files from command line.
        var _b = ts.parseCommandLine(args), options = _b.options, fileNames = _b.fileNames, errors = _b.errors;
        if (errors.length > 0) {
            return { options: {}, fileNames: [], errors: errors };
        }
        // Store file arguments
        var tsFileArguments = fileNames;
        // Read further settings from tsconfig.json.
        var projectDir = options.project || '.';
        var configFileName = path.join(projectDir, 'tsconfig.json');
        var _c = ts.readConfigFile(configFileName, function (path) { return fs.readFileSync(path, 'utf-8'); }), json = _c.config, error = _c.error;
        if (error) {
            return { options: {}, fileNames: [], errors: [error] };
        }
        (_a = ts.parseJsonConfigFileContent(json, ts.sys, projectDir, options, configFileName), options = _a.options, fileNames = _a.fileNames, errors = _a.errors);
        if (errors.length > 0) {
            return { options: {}, fileNames: [], errors: errors };
        }
        // if file arguments were given to the typescript transpiler then transpile only those files
        fileNames = tsFileArguments.length > 0 ? tsFileArguments : fileNames;
        return { options: options, fileNames: fileNames, errors: [] };
    }
    /**
     * Compiles TypeScript code into Closure-compiler-ready JS.
     */
    function toClosureJS(options, fileNames, settings, writeFile) {
        // Use absolute paths to determine what files to process since files may be imported using
        // relative or absolute paths
        var absoluteFileNames = fileNames.map(function (i) { return path.resolve(i); });
        var compilerHost = ts.createCompilerHost(options);
        var program = ts.createProgram(absoluteFileNames, options, compilerHost);
        var filesToProcess = new Set(absoluteFileNames);
        var rootModulePath = options.rootDir || getCommonParentDirectory(absoluteFileNames);
        var transformerHost = {
            shouldSkipTsickleProcessing: function (fileName) {
                return !filesToProcess.has(path.resolve(fileName));
            },
            shouldIgnoreWarningsForPath: function (fileName) { return false; },
            pathToModuleName: function (context, fileName) {
                return cliSupport.pathToModuleName(rootModulePath, context, fileName);
            },
            fileNameToModuleId: function (fileName) { return path.relative(rootModulePath, fileName); },
            es5Mode: true,
            googmodule: true,
            transformDecorators: true,
            transformTypesToClosure: true,
            typeBlackListPaths: new Set(),
            enableAutoQuoting: settings.enableAutoQuoting,
            untyped: false,
            logWarning: function (warning) { return console.error(ts.formatDiagnostics([warning], compilerHost)); },
            options: options,
            host: compilerHost,
        };
        var diagnostics = ts.getPreEmitDiagnostics(program);
        if (diagnostics.length > 0) {
            return {
                diagnostics: diagnostics,
                modulesManifest: new tsickle_1.ModulesManifest(),
                externs: {},
                emitSkipped: true,
                emittedFiles: [],
            };
        }
        return tsickle.emitWithTsickle(program, transformerHost, compilerHost, options, undefined, writeFile);
    }
    exports.toClosureJS = toClosureJS;
    function main(args) {
        var _a = loadSettingsFromArgs(args), settings = _a.settings, tscArgs = _a.tscArgs;
        var config = loadTscConfig(tscArgs);
        if (config.errors.length) {
            console.error(ts.formatDiagnostics(config.errors, ts.createCompilerHost(config.options)));
            return 1;
        }
        if (config.options.module !== ts.ModuleKind.CommonJS) {
            // This is not an upstream TypeScript diagnostic, therefore it does not go
            // through the diagnostics array mechanism.
            console.error('tsickle converts TypeScript modules to Closure modules via CommonJS internally. ' +
                'Set tsconfig.js "module": "commonjs"');
            return 1;
        }
        // Run tsickle+TSC to convert inputs to Closure JS files.
        var result = toClosureJS(config.options, config.fileNames, settings, function (filePath, contents) {
            mkdirp.sync(path.dirname(filePath));
            fs.writeFileSync(filePath, contents, { encoding: 'utf-8' });
        });
        if (result.diagnostics.length) {
            console.error(ts.formatDiagnostics(result.diagnostics, ts.createCompilerHost(config.options)));
            return 1;
        }
        if (settings.externsPath) {
            mkdirp.sync(path.dirname(settings.externsPath));
            fs.writeFileSync(settings.externsPath, tsickle.getGeneratedExterns(result.externs, config.options.rootDir || ''));
        }
        return 0;
    }
    // CLI entry point
    if (require.main === module) {
        process.exit(main(process.argv.splice(2)));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFVQSx1QkFBeUI7SUFDekIsbUNBQXFDO0lBQ3JDLCtCQUFpQztJQUNqQywyQkFBNkI7SUFDN0IsMkNBQW1DO0lBRW5DLG9EQUE0QztJQUM1Qyw2Q0FBcUM7SUFDckMsK0NBQTBDO0lBaUIxQztRQUNFLE9BQU8sQ0FBQyxLQUFLLENBQUMseVhBU2YsQ0FBQyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILDhCQUE4QixJQUFjOztRQUMxQyxJQUFNLFFBQVEsR0FBYSxFQUFFLENBQUM7UUFDOUIsSUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOztZQUNsQyxLQUFtQixJQUFBLEtBQUEsU0FBQSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLGdCQUFBLDRCQUFFO2dCQUF2QyxJQUFNLElBQUksV0FBQTtnQkFDYixRQUFRLElBQUksRUFBRTtvQkFDWixLQUFLLEdBQUcsQ0FBQztvQkFDVCxLQUFLLE1BQU07d0JBQ1QsS0FBSyxFQUFFLENBQUM7d0JBQ1IsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEIsTUFBTTtvQkFDUixLQUFLLFNBQVM7d0JBQ1osUUFBUSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ3hDLE1BQU07b0JBQ1IsS0FBSyxPQUFPO3dCQUNWLFFBQVEsQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUN4QixNQUFNO29CQUNSLEtBQUssU0FBUzt3QkFDWixRQUFRLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDeEIsTUFBTTtvQkFDUixLQUFLLG1CQUFtQjt3QkFDdEIsUUFBUSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQzt3QkFDbEMsTUFB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V0FBVyxFQUNwQixPQUFPLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2hGO1FBQ0QsT0FBTyxDQUFDLENBQUM7SUFDWCxDQUFDO0lBRUQsa0JBQWtCO0lBQ2xCLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDM0IsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVDIiwic291cmNlc0NvbnRlbnQiOlsiIyEvdXNyL2Jpbi9lbnYgbm9kZVxuXG4vKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCAqIGFzIG1pbmltaXN0IGZyb20gJ21pbmltaXN0JztcbmltcG9ydCAqIGFzIG1rZGlycCBmcm9tICdta2RpcnAnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJy4vdHlwZXNjcmlwdCc7XG5cbmltcG9ydCAqIGFzIGNsaVN1cHBvcnQgZnJvbSAnLi9jbGlfc3VwcG9ydCc7XG5pbXBvcnQgKiBhcyB0c2lja2xlIGZyb20gJy4vdHNpY2tsZSc7XG5pbXBvcnQge01vZHVsZXNNYW5pZmVzdH0gZnJvbSAnLi90c2lja2xlJztcblxuLyoqIFRzaWNrbGUgc2V0dGluZ3MgcGFzc2VkIG9uIHRoZSBjb21tYW5kIGxpbmUuICovXG5leHBvcnQgaW50ZXJmYWNlIFNldHRpbmdzIHtcbiAgLyoqIElmIHByb3ZpZGVkLCBtb2RpZnkgcXVvdGluZyBvZiBwcm9wZXJ0eSBhY2Nlc3NlcyB0byBtYXRjaCB0aGUgdHlwZSBkZWNsYXJhdGlvbi4gKi9cbiAgZW5hYmxlQXV0b1F1b3Rpbmc/OiBib29sZWFuO1xuXG4gIC8qKiBJZiBwcm92aWRlZCwgcGF0aCB0byBzYXZlIGV4dGVybnMgdG8uICovXG4gIGV4dGVybnNQYXRoPzogc3RyaW5nO1xuXG4gIC8qKiBJZiBwcm92aWRlZCwgYXR0ZW1wdCB0byBwcm92aWRlIHR5cGVzIHJhdGhlciB0aGFuIHs/fS4gKi9cbiAgaXNUeXBlZD86IGJvb2xlYW47XG5cbiAgLyoqIElmIHRydWUsIGxvZyBpbnRlcm5hbCBkZWJ1ZyB3YXJuaW5ncyB0byB0aGUgY29uc29sZS4gKi9cbiAgdmVyYm9zZT86IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIHVzYWdlKCkge1xuICBjb25zb2xlLmVycm9yKGB1c2FnZTogdHNpY2tsZSBbdHNpY2tsZSBvcHRpb25zXSAtLSBbdHNjIG9wdGlvbnNdXG5cbmV4YW1wbGU6XG4gIHRzaWNrbGUgLS1leHRlcm5zPWZvby9leHRlcm5zLmpzIC0tIC1wIHNyYyAtLW5vSW1wbGljaXRBbnlcblxudHNpY2tsZSBmbGFncyBhcmU6XG4gIC0tZXh0ZXJucz1QQVRIICAgICAgICBzYXZlIGdlbmVyYXRlZCBDbG9zdXJlIGV4dGVybnMuanMgdG8gUEFUSFxuICAtLXR5cGVkICAgICAgICAgICAgICAgW2V4cGVyaW1lbnRhbF0gYXR0ZW1wdCB0byBwcm92aWRlIENsb3N1cmUgdHlwZXMgaW5zdGVhZCBvZiB7P31cbiAgLS1lbmFibGVBdXRvUXVvdGluZyAgIGF1dG9tYXRpY2FsbHkgYXBwbHkgcXVvdGVzIHRvIHByb3BlcnR5IGFjY2Vzc2VzXG5gKTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgdGhlIGNvbW1hbmQtbGluZSBhcmd1bWVudHMsIGV4dHJhY3RpbmcgdGhlIHRzaWNrbGUgc2V0dGluZ3MgYW5kXG4gKiB0aGUgYXJndW1lbnRzIHRvIHBhc3Mgb24gdG8gdHNjLlxuICovXG5mdW5jdGlvbiBsb2FkU2V0dGluZ3NGcm9tQXJncyhhcmdzOiBzdHJpbmdbXSk6IHtzZXR0aW5nczogU2V0dGluZ3MsIHRzY0FyZ3M6IHN0cmluZ1tdfSB7XG4gIGNvbnN0IHNldHRpbmdzOiBTZXR0aW5ncyA9IHt9O1xuICBjb25zdCBwYXJzZWRBcmdzID0gbWluaW1pc3QoYXJncyk7XG4gIGZvciAoY29uc3QgZmxhZyBvZiBPYmplY3Qua2V5cyhwYXJzZWRBcmdzKSkge1xuICAgIHN3aXRjaCAoZmxhZykge1xuICAgICAgY2FzZSAnaCc6XG4gICAgICBjYXNlICdoZWxwJzpcbiAgICAgICAgdXNhZ2UoKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2V4dGVybnMnOlxuICAgICAgICBzZXR0aW5ncy5leHRlcm5zUGF0aCA9IHBhcnNlZEFyZ3NbZmxhZ107XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAndHlwZWQnOlxuICAgICAgICBzZXR0aW5ncy5pc1R5cGVkID0gdHJ1ZTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd2ZXJib3NlJzpcbiAgICAgICAgc2V0dGluZ3MudmVyYm9zZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZW5hYmxlQXV0b1F1b3RpbmcnOlxuICAgICAgICBzZXR0aW5ncy5lbmFibGVBdXRvUXVvdGluZyA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnXyc6XG4gICAgICAgIC8vIFRoaXMgaXMgcGFydCBvZiB0aGUgbWluaW1pc3QgQVBJLCBhbmQgaG9sZHMgYXJncyBhZnRlciB0aGUgJy0tJy5cbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBjb25zb2xlLmVycm9yKGB1bmtub3duIGZsYWcgJy0tJHtmbGFnfSdgKTtcbiAgICAgICAgdXNhZ2UoKTtcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgIH1cbiAgfVxuICAvLyBBcmd1bWVudHMgYWZ0ZXIgdGhlICctLScgYXJnIGFyZSBhcmd1bWVudHMgdG8gdHNjLlxuICBjb25zdCB0c2NBcmdzID0gcGFyc2VkQXJnc1snXyddO1xuICByZXR1cm4ge3NldHRpbmdzLCB0c2NBcmdzfTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgdGhlIGxvd2VzdC1sZXZlbCBjb21tb24gcGFyZW50IGRpcmVjdG9yeSBvZiB0aGUgZ2l2ZW4gbGlzdCBvZiBmaWxlcy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENvbW1vblBhcmVudERpcmVjdG9yeShmaWxlTmFtZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcbiAgY29uc3QgcGF0aFNwbGl0dGVyID0gL1tcXC9cXFxcXSsvO1xuICBjb25zdCBjb21tb25QYXJlbnQgPSBmaWxlTmFtZXNbMF0uc3BsaXQocGF0aFNwbGl0dGVyKTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBmaWxlTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCB0aGlzUGF0aCA9IGZpbGVOYW1lc1tpXS5zcGxpdChwYXRoU3BsaXR0ZXIpO1xuICAgIGxldCBqID0gMDtcbiAgICB3aGlsZSAodGhpc1BhdGhbal0gPT09IGNvbW1vblBhcmVudFtqXSkge1xuICAgICAgaisrO1xuICAgIH1cbiAgICBjb21tb25QYXJlbnQubGVuZ3RoID0gajsgIC8vIFRydW5jYXRlIHdpdGhvdXQgY29weWluZyB0aGUgYXJyYXlcbiAgfVxuICBpZiAoY29tbW9uUGFyZW50Lmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnLyc7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbW1vblBhcmVudC5qb2luKHBhdGguc2VwKTtcbiAgfVxufVxuXG4vKipcbiAqIExvYWRzIHRoZSB0c2NvbmZpZy5qc29uIGZyb20gYSBkaXJlY3RvcnkuXG4gKlxuICogVE9ETyhtYXJ0aW5wcm9ic3QpOiB1c2UgdHMuZmluZENvbmZpZ0ZpbGUgdG8gbWF0Y2ggdHNjIGJlaGF2aW91ci5cbiAqXG4gKiBAcGFyYW0gYXJncyB0c2MgY29tbWFuZC1saW5lIGFyZ3VtZW50cy5cbiAqL1xuZnVuY3Rpb24gbG9hZFRzY0NvbmZpZyhhcmdzOiBzdHJpbmdbXSk6XG4gICAge29wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucywgZmlsZU5hbWVzOiBzdHJpbmdbXSwgZXJyb3JzOiB0cy5EaWFnbm9zdGljW119IHtcbiAgLy8gR2F0aGVyIHRzYyBvcHRpb25zL2lucHV0IGZpbGVzIGZyb20gY29tbWFuZCBsaW5lLlxuICBsZXQge29wdGlvbnMsIGZpbGVOYW1lcywgZXJyb3JzfSA9IHRzLnBhcnNlQ29tbWFuZExpbmUoYXJncyk7XG4gIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB7b3B0aW9uczoge30sIGZpbGVOYW1lczogW10sIGVycm9yc307XG4gIH1cblxuICAvLyBTdG9yZSBmaWxlIGFyZ3VtZW50c1xuICBjb25zdCB0c0ZpbGVBcmd1bWVudHMgPSBmaWxlTmFtZXM7XG5cbiAgLy8gUmVhZCBmdXJ0aGVyIHNldHRpbmdzIGZyb20gdHNjb25maWcuanNvbi5cbiAgY29uc3QgcHJvamVjdERpciA9IG9wdGlvbnMucHJvamVjdCB8fCAnLic7XG4gIGNvbnN0IGNvbmZpZ0ZpbGVOYW1lID0gcGF0aC5qb2luKHByb2plY3REaXIsICd0c2NvbmZpZy5qc29uJyk7XG4gIGNvbnN0IHtjb25maWc6IGpzb24sIGVycm9yfSA9XG4gICAgICB0cy5yZWFkQ29uZmlnRmlsZShjb25maWdGaWxlTmFtZSwgcGF0aCA9PiBmcy5yZWFkRmlsZVN5bmMocGF0aCwgJ3V0Zi04JykpO1xuICBpZiAoZXJyb3IpIHtcbiAgICByZXR1cm4ge29wdGlvbnM6IHt9LCBmaWxlTmFtZXM6IFtdLCBlcnJvcnM6IFtlcnJvcl19O1xuICB9XG4gICh7b3B0aW9ucywgZmlsZU5hbWVzLCBlcnJvcnN9ID1cbiAgICAgICB0cy5wYXJzZUpzb25Db25maWdGaWxlQ29udGVudChqc29uLCB0cy5zeXMsIHByb2plY3REaXIsIG9wdGlvbnMsIGNvbmZpZ0ZpbGVOYW1lKSk7XG4gIGlmIChlcnJvcnMubGVuZ3RoID4gMCkge1xuICAgIHJldHVybiB7b3B0aW9uczoge30sIGZpbGVOYW1lczogW10sIGVycm9yc307XG4gIH1cblxuICAvLyBpZiBmaWxlIGFyZ3VtZW50cyB3ZXJlIGdpdmVuIHRvIHRoZSB0eXBlc2NyaXB0IHRyYW5zcGlsZXIgdGhlbiB0cmFuc3BpbGUgb25seSB0aG9zZSBmaWxlc1xuICBmaWxlTmFtZXMgPSB0c0ZpbGVBcmd1bWVudHMubGVuZ3RoID4gMCA/IHRzRmlsZUFyZ3VtZW50cyA6IGZpbGVOYW1lcztcblxuICByZXR1cm4ge29wdGlvbnMsIGZpbGVOYW1lcywgZXJyb3JzOiBbXX07XG59XG5cbi8qKlxuICogQ29tcGlsZXMgVHlwZVNjcmlwdCBjb2RlIGludG8gQ2xvc3VyZS1jb21waWxlci1yZWFkeSBKUy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHRvQ2xvc3VyZUpTKFxuICAgIG9wdGlvbnM6IHRzLkNvbXBpbGVyT3B0aW9ucywgZmlsZU5hbWVzOiBzdHJpbmdbXSwgc2V0dGluZ3M6IFNldHRpbmdzLFxuICAgIHdyaXRlRmlsZT86IHRzLldyaXRlRmlsZUNhbGxiYWNrKTogdHNpY2tsZS5FbWl0UmVzdWx0IHtcbiAgLy8gVXNlIGFic29sdXRlIHBhdGhzIHRvIGRldGVybWluZSB3aGF0IGZpbGVzIHRvIHByb2Nlc3Mgc2luY2UgZmlsZXMgbWF5IGJlIGltcG9ydGVkIHVzaW5nXG4gIC8vIHJlbGF0aXZlIG9yIGFic29sdXRlIHBhdGhzXG4gIGNvbnN0IGFic29sdXRlRmlsZU5hbWVzID0gZmlsZU5hbWVzLm1hcChpID0+IHBhdGgucmVzb2x2ZShpKSk7XG5cbiAgY29uc3QgY29tcGlsZXJIb3N0ID0gdHMuY3JlYXRlQ29tcGlsZXJIb3N0KG9wdGlvbnMpO1xuICBjb25zdCBwcm9ncmFtID0gdHMuY3JlYXRlUHJvZ3JhbShhYnNvbHV0ZUZpbGVOYW1lcywgb3B0aW9ucywgY29tcGlsZXJIb3N0KTtcbiAgY29uc3QgZmlsZXNUb1Byb2Nlc3MgPSBuZXcgU2V0KGFic29sdXRlRmlsZU5hbWVzKTtcbiAgY29uc3Qgcm9vdE1vZHVsZVBhdGggPSBvcHRpb25zLnJvb3REaXIgfHwgZ2V0Q29tbW9uUGFyZW50RGlyZWN0b3J5KGFic29sdXRlRmlsZU5hbWVzKTtcbiAgY29uc3QgdHJhbnNmb3JtZXJIb3N0OiB0c2lja2xlLlRzaWNrbGVIb3N0ID0ge1xuICAgIHNob3VsZFNraXBUc2lja2xlUHJvY2Vzc2luZzogKGZpbGVOYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgIHJldHVybiAhZmlsZXNUb1Byb2Nlc3MuaGFzKHBhdGgucmVzb2x2ZShmaWxlTmFtZSkpO1xuICAgIH0sXG4gICAgc2hvdWxkSWdub3JlV2FybmluZ3NGb3JQYXRoOiAoZmlsZU5hbWU6IHN0cmluZykgPT4gZmFsc2UsXG4gICAgcGF0aFRvTW9kdWxlTmFtZTogKGNvbnRleHQsIGZpbGVOYW1lKSA9PlxuICAgICAgICBjbGlTdXBwb3J0LnBhdGhUb01vZHVsZU5hbWUocm9vdE1vZHVsZVBhdGgsIGNvbnRleHQsIGZpbGVOYW1lKSxcbiAgICBmaWxlTmFtZVRvTW9kdWxlSWQ6IChmaWxlTmFtZSkgPT4gcGF0aC5yZWxhdGl2ZShyb290TW9kdWxlUGF0aCwgZmlsZU5hbWUpLFxuICAgIGVzNU1vZGU6IHRydWUsXG4gICAgZ29vZ21vZHVsZTogdHJ1ZSxcbiAgICB0cmFuc2Zvcm1EZWNvcmF0b3JzOiB0cnVlLFxuICAgIHRyYW5zZm9ybVR5cGVzVG9DbG9zdXJlOiB0cnVlLFxuICAgIHR5cGVCbGFja0xpc3RQYXRoczogbmV3IFNldCgpLFxuICAgIGVuYWJsZUF1dG9RdW90aW5nOiBzZXR0aW5ncy5lbmFibGVBdXRvUXVvdGluZyxcbiAgICB1bnR5cGVkOiBmYWxzZSxcbiAgICBsb2dXYXJuaW5nOiAod2FybmluZykgPT4gY29uc29sZS5lcnJvcih0cy5mb3JtYXREaWFnbm9zdGljcyhbd2FybmluZ10sIGNvbXBpbGVySG9zdCkpLFxuICAgIG9wdGlvbnMsXG4gICAgaG9zdDogY29tcGlsZXJIb3N0LFxuICB9O1xuICBjb25zdCBkaWFnbm9zdGljcyA9IHRzLmdldFByZUVtaXREaWFnbm9zdGljcyhwcm9ncmFtKTtcbiAgaWYgKGRpYWdub3N0aWNzLmxlbmd0aCA+IDApIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlhZ25vc3RpY3MsXG4gICAgICBtb2R1bGVzTWFuaWZlc3Q6IG5ldyBNb2R1bGVzTWFuaWZlc3QoKSxcbiAgICAgIGV4dGVybnM6IHt9LFxuICAgICAgZW1pdFNraXBwZWQ6IHRydWUsXG4gICAgICBlbWl0dGVkRmlsZXM6IFtdLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHRzaWNrbGUuZW1pdFdpdGhUc2lja2xlKFxuICAgICAgcHJvZ3JhbSwgdHJhbnNmb3JtZXJIb3N0LCBjb21waWxlckhvc3QsIG9wdGlvbnMsIHVuZGVmaW5lZCwgd3JpdGVGaWxlKTtcbn1cblxuZnVuY3Rpb24gbWFpbihhcmdzOiBzdHJpbmdbXSk6IG51bWJlciB7XG4gIGNvbnN0IHtzZXR0aW5ncywgdHNjQXJnc30gPSBsb2FkU2V0dGluZ3NGcm9tQXJncyhhcmdzKTtcbiAgY29uc3QgY29uZmlnID0gbG9hZFRzY0NvbmZpZyh0c2NBcmdzKTtcbiAgaWYgKGNvbmZpZy5lcnJvcnMubGVuZ3RoKSB7XG4gICAgY29uc29sZS5lcnJvcih0cy5mb3JtYXREaWFnbm9zdGljcyhjb25maWcuZXJyb3JzLCB0cy5jcmVhdGVDb21waWxlckhvc3QoY29uZmlnLm9wdGlvbnMpKSk7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICBpZiAoY29uZmlnLm9wdGlvbnMubW9kdWxlICE9PSB0cy5Nb2R1bGVLaW5kLkNvbW1vbkpTKSB7XG4gICAgLy8gVGhpcyBpcyBub3QgYW4gdXBzdHJlYW0gVHlwZVNjcmlwdCBkaWFnbm9zdGljLCB0aGVyZWZvcmUgaXQgZG9lcyBub3QgZ29cbiAgICAvLyB0aHJvdWdoIHRoZSBkaWFnbm9zdGljcyBhcnJheSBtZWNoYW5pc20uXG4gICAgY29uc29sZS5lcnJvcihcbiAgICAgICAgJ3RzaWNrbGUgY29udmVydHMgVHlwZVNjcmlwdCBtb2R1bGVzIHRvIENsb3N1cmUgbW9kdWxlcyB2aWEgQ29tbW9uSlMgaW50ZXJuYWxseS4gJyArXG4gICAgICAgICdTZXQgdHNjb25maWcuanMgXCJtb2R1bGVcIjogXCJjb21tb25qc1wiJyk7XG4gICAgcmV0dXJuIDE7XG4gIH1cblxuICAvLyBSdW4gdHNpY2tsZStUU0MgdG8gY29udmVydCBpbnB1dHMgdG8gQ2xvc3VyZSBKUyBmaWxlcy5cbiAgY29uc3QgcmVzdWx0ID0gdG9DbG9zdXJlSlMoXG4gICAgICBjb25maWcub3B0aW9ucywgY29uZmlnLmZpbGVOYW1lcywgc2V0dGluZ3MsIChmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKSA9PiB7XG4gICAgICAgIG1rZGlycC5zeW5jKHBhdGguZGlybmFtZShmaWxlUGF0aCkpO1xuICAgICAgICBmcy53cml0ZUZpbGVTeW5jKGZpbGVQYXRoLCBjb250ZW50cywge2VuY29kaW5nOiAndXRmLTgnfSk7XG4gICAgICB9KTtcbiAgaWYgKHJlc3VsdC5kaWFnbm9zdGljcy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmVycm9yKHRzLmZvcm1hdERpYWdub3N0aWNzKHJlc3VsdC5kaWFnbm9zdGljcywgdHMuY3JlYXRlQ29tcGlsZXJIb3N0KGNvbmZpZy5vcHRpb25zKSkpO1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgaWYgKHNldHRpbmdzLmV4dGVybnNQYXRoKSB7XG4gICAgbWtkaXJwLnN5bmMocGF0aC5kaXJuYW1lKHNldHRpbmdzLmV4dGVybnNQYXRoKSk7XG4gICAgZnMud3JpdGVGaWxlU3luYyhcbiAgICAgICAgc2V0dGluZ3MuZXh0ZXJuc1BhdGgsXG4gICAgICAgIHRzaWNrbGUuZ2V0R2VuZXJhdGVkRXh0ZXJucyhyZXN1bHQuZXh0ZXJucywgY29uZmlnLm9wdGlvbnMucm9vdERpciB8fCAnJykpO1xuICB9XG4gIHJldHVybiAwO1xufVxuXG4vLyBDTEkgZW50cnkgcG9pbnRcbmlmIChyZXF1aXJlLm1haW4gPT09IG1vZHVsZSkge1xuICBwcm9jZXNzLmV4aXQobWFpbihwcm9jZXNzLmFyZ3Yuc3BsaWNlKDIpKSk7XG59XG4iXX0=