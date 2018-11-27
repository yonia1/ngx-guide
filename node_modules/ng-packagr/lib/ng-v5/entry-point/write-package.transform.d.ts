import { Transform } from '../../brocc/transform';
import { NgEntryPoint } from '../../ng-package-format/entry-point';
import { NgPackage } from '../../ng-package-format/package';
export declare const writePackageTransform: Transform;
/**
 * Creates and writes a `package.json` file of the entry point used by the `node_module`
 * resolution strategies.
 *
 * #### Example
 *
 * A consumer of the enty point depends on it by `import {..} from '@my/module/id';`.
 * The module id `@my/module/id` will be resolved to the `package.json` file that is written by
 * this build step.
 * The proprties `main`, `module`, `typings` (and so on) in the `package.json` point to the
 * flattened JavaScript bundles, type definitions, (...).
 *
 * @param entryPoint An entry point of an Angular package / library
 * @param additionalProperties Additional properties, e.g. binary artefacts (bundle files), to merge into `package.json`
 */
export declare function writePackageJson(entryPoint: NgEntryPoint, pkg: NgPackage, additionalProperties: {
    [key: string]: string | boolean | string[];
}): Promise<void>;
