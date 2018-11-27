"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs-extra");
const ng = require("@angular/compiler-cli/index");
const path = require("path");
const synthesized_compiler_host_1 = require("../ts/synthesized-compiler-host");
const log = require("../util/log");
const create_emit_callback_1 = require("./create-emit-callback");
const redirect_write_file_compiler_host_1 = require("../ts/redirect-write-file-compiler-host");
function compileSourceFiles(sourceFiles, tsConfig, extraOptions, declarationDir) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug(`ngc (v${ng.VERSION.full})`);
        const tsConfigOptions = Object.assign({}, tsConfig.options, extraOptions);
        // ts.CompilerHost
        let tsCompilerHost = synthesized_compiler_host_1.createCompilerHostForSynthesizedSourceFiles(sourceFiles, tsConfigOptions);
        if (declarationDir) {
            tsCompilerHost = redirect_write_file_compiler_host_1.redirectWriteFileCompilerHost(tsCompilerHost, tsConfigOptions.basePath, declarationDir);
        }
        // ng.CompilerHost
        const ngCompilerHost = ng.createCompilerHost({
            options: tsConfigOptions,
            tsHost: tsCompilerHost
        });
        // ngc
        const result = ng.performCompilation({
            rootNames: tsConfig.rootNames,
            options: tsConfigOptions,
            emitCallback: create_emit_callback_1.createEmitCallback(tsConfigOptions),
            emitFlags: tsConfig.emitFlags,
            host: ngCompilerHost
        });
        const flatModuleFile = tsConfigOptions.flatModuleOutFile;
        const flatModuleFileExtension = path.extname(flatModuleFile);
        // XX(hack): redirect the `*.metadata.json` to the correct outDir
        // @link https://github.com/angular/angular/pull/21787
        if (declarationDir) {
            const metadataBundleFile = flatModuleFile.replace(flatModuleFileExtension, '.metadata.json');
            const metadataSrc = path.resolve(tsConfigOptions.declarationDir, metadataBundleFile);
            const metadataDest = path.resolve(declarationDir, metadataBundleFile);
            if (metadataDest !== metadataSrc && fs.existsSync(metadataSrc)) {
                yield fs.move(metadataSrc, metadataDest, { overwrite: true });
            }
        }
        const exitCode = ng.exitCodeFromResult(result.diagnostics);
        return exitCode === 0 ? Promise.resolve() : Promise.reject(new Error(ng.formatDiagnostics(result.diagnostics)));
    });
}
exports.compileSourceFiles = compileSourceFiles;
//# sourceMappingURL=compile-source-files.js.map