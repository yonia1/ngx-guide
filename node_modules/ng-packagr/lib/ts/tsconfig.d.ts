import * as ng from '@angular/compiler-cli/src/perform_compile';
import { EntryPointNode } from '../ng-v5/nodes';
/**
 * TypeScript configuration used internally (marker typer).
 */
export declare type TsConfig = ng.ParsedConfiguration;
/**
 * Reads the default TypeScript configuration.
 */
export declare function readDefaultTsConfig(fileName?: string): TsConfig;
/**
 * Creates a parsed TypeScript configuration object.
 *
 * @param values File path or parsed configuration.
 */
export declare function createDefaultTsConfig(values?: TsConfig | string): TsConfig;
/**
 * Initializes TypeScript Compiler options and Angular Compiler options by overriding the
 * default config with entry point-specific values.
 */
export declare const initializeTsConfig: (defaultTsConfig: ng.ParsedConfiguration, entryPoints: EntryPointNode[]) => void;
