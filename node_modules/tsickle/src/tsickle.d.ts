/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="tsickle/src/tsickle" />
import * as googmodule from './googmodule';
import { AnnotatorHost } from './jsdoc_transformer';
import { ModulesManifest } from './modules_manifest';
import * as ts from './typescript';
export { getGeneratedExterns } from './externs';
export { FileMap, ModulesManifest } from './modules_manifest';
export interface TsickleHost extends googmodule.GoogModuleProcessorHost, AnnotatorHost {
    /**
     * Whether to downlevel decorators
     */
    transformDecorators?: boolean;
    /**
     * Whether to convers types to closure
     */
    transformTypesToClosure?: boolean;
    /**
     * Whether to add aliases to the .d.ts files to add the exports to the
     * ಠ_ಠ.clutz namespace.
     */
    addDtsClutzAliases?: boolean;
    /**
     * If true, tsickle and decorator downlevel processing will be skipped for
     * that file.
     */
    shouldSkipTsickleProcessing(fileName: string): boolean;
    /**
     * Tsickle treats warnings as errors, if true, ignore warnings.  This might be
     * useful for e.g. third party code.
     */
    shouldIgnoreWarningsForPath(filePath: string): boolean;
    /** Whether to convert CommonJS require() imports to goog.module() and goog.require() calls. */
    googmodule: boolean;
}
export declare function mergeEmitResults(emitResults: EmitResult[]): EmitResult;
export interface EmitResult extends ts.EmitResult {
    modulesManifest: ModulesManifest;
    /**
     * externs.js files produced by tsickle, if any. module IDs are relative paths from
     * fileNameToModuleId.
     */
    externs: {
        [moduleId: string]: string;
    };
}
export interface EmitTransformers {
    /** Custom transformers to evaluate before Tsickle .js transformations. */
    beforeTsickle?: Array<ts.TransformerFactory<ts.SourceFile>>;
    /** Custom transformers to evaluate before built-in .js transformations. */
    beforeTs?: Array<ts.TransformerFactory<ts.SourceFile>>;
    /** Custom transformers to evaluate after built-in .js transformations. */
    afterTs?: Array<ts.TransformerFactory<ts.SourceFile>>;
    /** Custom transformers to evaluate after built-in .d.ts transformations. */
    afterDeclarations?: Array<ts.TransformerFactory<ts.Bundle | ts.SourceFile>>;
}
export declare function emitWithTsickle(program: ts.Program, host: TsickleHost, tsHost: ts.CompilerHost, tsOptions: ts.CompilerOptions, targetSourceFile?: ts.SourceFile, writeFile?: ts.WriteFileCallback, cancellationToken?: ts.CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: EmitTransformers): EmitResult;
