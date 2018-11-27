/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="tsickle/src/externs" />
import { AnnotatorHost } from './jsdoc_transformer';
import * as ts from './typescript';
/**
 * Concatenate all generated externs definitions together into a string, including a file comment
 * header.
 *
 * @param rootDir Project root.  Emitted comments will reference paths relative to this root.
 *    This param is effectively required, but made optional here until Angular is fixed.
 */
export declare function getGeneratedExterns(externs: {
    [fileName: string]: string;
}, rootDir?: string): string;
/**
 * Returns a mangled version of the module name (resolved file name) for source file.
 *
 * The mangled name is safe to use as a JavaScript identifier. It is used as a globally unique
 * prefix to scope symbols in externs file (see code below).
 */
export declare function moduleNameAsIdentifier(host: AnnotatorHost, fileName: string): string;
/**
 * generateExterns generates extern definitions for all ambient declarations in the given source
 * file. It returns a string representation of the Closure JavaScript, not including the initial
 * comment with \@fileoverview and \@externs (see above for that).
 */
export declare function generateExterns(typeChecker: ts.TypeChecker, sourceFile: ts.SourceFile, host: AnnotatorHost, moduleResolutionHost: ts.ModuleResolutionHost, options: ts.CompilerOptions): {
    output: string;
    diagnostics: ts.Diagnostic[];
};
