/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/// <amd-module name="tsickle/src/jsdoc_transformer" />
import * as jsdoc from './jsdoc';
import { ModuleTypeTranslator } from './module_type_translator';
import * as ts from './typescript';
/** AnnotatorHost contains host properties for the JSDoc-annotation process. */
export interface AnnotatorHost {
    /**
     * If provided a function that logs an internal warning.
     * These warnings are not actionable by an end user and should be hidden
     * by default.
     */
    logWarning?: (warning: ts.Diagnostic) => void;
    pathToModuleName: (context: string, importPath: string) => string;
    /**
     * If true, convert every type to the Closure {?} type, which means
     * "don't check types".
     */
    untyped?: boolean;
    /** If provided, a set of paths whose types should always generate as {?}. */
    typeBlackListPaths?: Set<string>;
    /**
     * Convert shorthand "/index" imports to full path (include the "/index").
     * Annotation will be slower because every import must be resolved.
     */
    convertIndexImportShorthand?: boolean;
    /**
     * If true, modify quotes around property accessors to match the type declaration.
     */
    enableAutoQuoting?: boolean;
    /**
     * Whether tsickle should insert goog.provide() calls into the externs generated for `.d.ts` files
     * that are external modules.
     */
    provideExternalModuleDtsNamespace?: boolean;
    /** host allows resolving file names to modules. */
    host: ts.ModuleResolutionHost;
    /** Used together with the host for file name -> module name resolution. */
    options: ts.CompilerOptions;
}
/** @return true if node has the specified modifier flag set. */
export declare function isAmbient(node: ts.Node): boolean;
declare type HasTypeParameters = ts.InterfaceDeclaration | ts.ClassLikeDeclaration | ts.TypeAliasDeclaration | ts.SignatureDeclaration;
/** Adds an \@template clause to docTags if decl has type parameters. */
export declare function maybeAddTemplateClause(docTags: jsdoc.Tag[], decl: HasTypeParameters): void;
/**
 * Adds heritage clauses (\@extends, \@implements) to the given docTags for decl. Used by
 * jsdoc_transformer and externs generation.
 */
export declare function maybeAddHeritageClauses(docTags: jsdoc.Tag[], mtt: ModuleTypeTranslator, decl: ts.ClassLikeDeclaration | ts.InterfaceDeclaration): void;
/** Removes comment metacharacters from a string, to make it safe to embed in a comment. */
export declare function escapeForComment(str: string): string;
/**
 * Removes any type assertions and non-null expressions from the AST before TypeScript processing.
 *
 * Ideally, the code in jsdoc_transformer below should just remove the cast expression and
 * replace it with the Closure equivalent. However Angular's compiler is fragile to AST
 * nodes being removed or changing type, so the code must retain the type assertion
 * expression, see: https://github.com/angular/angular/issues/24895.
 *
 * tsickle also cannot just generate and keep a `(/.. @type {SomeType} ./ (expr as SomeType))`
 * because TypeScript removes the parenthesized expressions in that syntax, (reasonably) believing
 * they were only added for the TS cast.
 *
 * The final workaround is then to keep the TypeScript type assertions, and have a post-Angular
 * processing step that removes the assertions before TypeScript sees them.
 *
 * TODO(martinprobst): remove once the Angular issue is fixed.
 */
export declare function removeTypeAssertions(): ts.TransformerFactory<ts.SourceFile>;
/**
 * jsdocTransformer returns a transformer factory that converts TypeScript types into the equivalent
 * JSDoc annotations.
 */
export declare function jsdocTransformer(host: AnnotatorHost, tsOptions: ts.CompilerOptions, tsHost: ts.CompilerHost, typeChecker: ts.TypeChecker, diagnostics: ts.Diagnostic[]): (context: ts.TransformationContext) => ts.Transformer<ts.SourceFile>;
export {};
