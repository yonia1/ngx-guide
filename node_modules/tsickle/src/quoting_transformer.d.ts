/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="tsickle/src/quoting_transformer" />
import { AnnotatorHost } from './jsdoc_transformer';
import * as ts from './typescript';
/**
 * quotingTransformer warns on quoted accesses to declared properties, and converts dotted property
 * accesses on types with a string index type to element accesses (quoted accesses).
 */
export declare function quotingTransformer(host: AnnotatorHost, typeChecker: ts.TypeChecker, diagnostics: ts.Diagnostic[]): (context: ts.TransformationContext) => ts.Transformer<ts.SourceFile>;
