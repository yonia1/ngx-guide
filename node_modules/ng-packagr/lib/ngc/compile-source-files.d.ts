import * as ng from '@angular/compiler-cli';
import * as ts from 'typescript';
import { TsConfig } from '../ts/tsconfig';
export declare function compileSourceFiles(sourceFiles: ts.SourceFile[], tsConfig: TsConfig, extraOptions?: Partial<ng.CompilerOptions>, declarationDir?: string): Promise<void>;
