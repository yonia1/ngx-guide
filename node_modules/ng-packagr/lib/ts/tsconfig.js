"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ng = require("@angular/compiler-cli/src/perform_compile");
const path = require("path");
const ts = require("typescript");
const log = require("../util/log");
/**
 * Reads the default TypeScript configuration.
 */
function readDefaultTsConfig(fileName) {
    if (!fileName) {
        fileName = path.resolve(__dirname, 'conf', 'tsconfig.ngc.json');
    }
    return ng.readConfiguration(fileName);
}
exports.readDefaultTsConfig = readDefaultTsConfig;
/**
 * Creates a parsed TypeScript configuration object.
 *
 * @param values File path or parsed configuration.
 */
function createDefaultTsConfig(values) {
    if (!values) {
        return readDefaultTsConfig();
    }
    else if (typeof values === 'string') {
        return readDefaultTsConfig(values);
    }
    else {
        return values;
    }
}
exports.createDefaultTsConfig = createDefaultTsConfig;
/**
 * Initializes TypeScript Compiler options and Angular Compiler options by overriding the
 * default config with entry point-specific values.
 */
exports.initializeTsConfig = (defaultTsConfig, entryPoints) => {
    entryPoints.forEach(currentEntryPoint => {
        const { entryPoint } = currentEntryPoint.data;
        log.debug(`Initializing tsconfig for ${entryPoint.moduleId}`);
        const basePath = path.dirname(entryPoint.entryFilePath);
        // Resolve defaults from DI token and create a deep copy of the defaults
        let tsConfig = JSON.parse(JSON.stringify(defaultTsConfig));
        // minimal compilerOptions needed in order to avoid errors, with their associated default values
        // some are not overrided in order to keep the default associated TS errors if the user choose to set incorrect values
        const requiredOptions = {
            emitDecoratorMetadata: true,
            experimentalDecorators: true,
            moduleResolution: ts.ModuleResolutionKind.NodeJs,
            target: ts.ScriptTarget.ES2015,
            declaration: true,
            lib: ['dom', 'es2015']
        };
        const overrideConfig = {
            rootNames: [entryPoint.entryFilePath],
            options: {
                flatModuleId: entryPoint.moduleId,
                flatModuleOutFile: `${entryPoint.flatModuleFile}.js`,
                basePath: basePath,
                rootDir: basePath,
                outDir: '',
                lib: entryPoint.languageLevel ? entryPoint.languageLevel.map(lib => `lib.${lib}.d.ts`) : tsConfig.options.lib,
                // setting this as basedir will rewire triple-slash references
                declarationDir: basePath,
                // required in order to avoid "ENOENT: no such file or directory, .../.ng_pkg_build/..." errors when using the programmatic API
                inlineSources: true,
                // setting the below here because these are a must have with these valus
                inlineSourceMap: true,
                sourceMap: false,
                sourceRoot: `ng://${entryPoint.moduleId}`
            }
        };
        tsConfig.rootNames = overrideConfig.rootNames;
        tsConfig.options = Object.assign({}, requiredOptions, tsConfig.options, overrideConfig.options);
        switch (entryPoint.jsxConfig) {
            case 'preserve':
                tsConfig.options.jsx = ts.JsxEmit.Preserve;
                break;
            case 'react':
                tsConfig.options.jsx = ts.JsxEmit.React;
                break;
            case 'react-native':
                tsConfig.options.jsx = ts.JsxEmit.ReactNative;
                break;
            default:
                break;
        }
        // Add paths mappings for dependencies
        const entryPointDeps = entryPoints.filter(x => x.data.entryPoint.moduleId !== entryPoint.moduleId);
        if (entryPointDeps.length > 0) {
            if (!tsConfig.options.paths) {
                tsConfig.options.paths = {};
            }
            for (let dep of entryPointDeps) {
                const { entryPoint, destinationFiles } = dep.data;
                const { moduleId, entryFilePath } = entryPoint;
                const mappedPath = [destinationFiles.declarations, entryFilePath];
                if (!tsConfig.options.paths[moduleId]) {
                    tsConfig.options.paths[moduleId] = mappedPath;
                }
                else {
                    tsConfig.options.paths[moduleId].concat(mappedPath);
                }
            }
        }
        currentEntryPoint.data.tsConfig = tsConfig;
    });
};
//# sourceMappingURL=tsconfig.js.map