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
const path = require("path");
const ts = require("typescript");
const transform_1 = require("../../../brocc/transform");
const compile_source_files_1 = require("../../../ngc/compile-source-files");
const log = require("../../../util/log");
const nodes_1 = require("../../nodes");
exports.compileNgcTransform = transform_1.transformFromPromise((graph) => __awaiter(this, void 0, void 0, function* () {
    log.info(`Compiling TypeScript sources through ngc`);
    const entryPoint = graph.find(nodes_1.isEntryPointInProgress());
    const tsSources = entryPoint.find(nodes_1.isTypeScriptSources);
    const tsConfig = entryPoint.data.tsConfig;
    // Compile TypeScript sources
    const { esm2015, esm5, declarations } = entryPoint.data.destinationFiles;
    const previousTransform = tsSources.data;
    yield Promise.all([
        compile_source_files_1.compileSourceFiles(tsSources.data.transformed, tsConfig, {
            outDir: path.dirname(esm2015),
            declaration: true,
            target: ts.ScriptTarget.ES2015
        }, path.dirname(declarations)),
        compile_source_files_1.compileSourceFiles(tsSources.data.transformed, tsConfig, {
            outDir: path.dirname(esm5),
            target: ts.ScriptTarget.ES5,
            downlevelIteration: true,
            // the options are here, to improve the build time
            declaration: false,
            declarationDir: undefined,
            skipMetadataEmit: true,
            skipTemplateCodegen: true,
            strictMetadataEmit: false
        })
    ]);
    previousTransform.dispose();
    // Clean up TypeScript compiler nodes. Releases TypeScript memory allocations to avoid memory
    // leaks with multiple secondary entry points.
    tsSources.data.dispose();
    tsSources.data = null;
    return graph;
}));
//# sourceMappingURL=compile-ngc.transform.js.map