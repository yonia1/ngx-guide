#!/usr/bin/env node
/// <amd-module name="tsickle/src/main" />
import * as ts from './typescript';
import * as tsickle from './tsickle';
/** Tsickle settings passed on the command line. */
export interface Settings {
    /** If provided, modify quoting of property accesses to match the type declaration. */
    enableAutoQuoting?: boolean;
    /** If provided, path to save externs to. */
    externsPath?: string;
    /** If provided, attempt to provide types rather than {?}. */
    isTyped?: boolean;
    /** If true, log internal debug warnings to the console. */
    verbose?: boolean;
}
/**
 * Determine the lowest-level common parent directory of the given list of files.
 */
export declare function getCommonParentDirectory(fileNames: string[]): string;
/**
 * Compiles TypeScript code into Closure-compiler-ready JS.
 */
export declare function toClosureJS(options: ts.CompilerOptions, fileNames: string[], settings: Settings, writeFile?: ts.WriteFileCallback): tsickle.EmitResult;
