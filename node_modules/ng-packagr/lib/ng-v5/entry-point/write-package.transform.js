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
const path = require("path");
const transform_1 = require("../../brocc/transform");
const path_1 = require("../../util/path");
const rimraf_1 = require("../../util/rimraf");
const log = require("../../util/log");
const glob_1 = require("../../util/glob");
const nodes_1 = require("../nodes");
const copy_1 = require("../../util/copy");
exports.writePackageTransform = transform_1.transformFromPromise((graph) => __awaiter(this, void 0, void 0, function* () {
    const entryPoint = graph.find(nodes_1.isEntryPointInProgress());
    const ngEntryPoint = entryPoint.data.entryPoint;
    const ngPackage = graph.find(node => node.type === 'application/ng-package').data;
    const { destinationFiles } = entryPoint.data;
    // 5. COPY SOURCE FILES TO DESTINATION
    log.info('Copying declaration files');
    // we don't want to copy `dist` and 'node_modules' declaration files but only files in source
    const declarationFiles = yield glob_1.globFiles(`${path.dirname(ngEntryPoint.entryFilePath)}/**/*.d.ts`, {
        ignore: ['**/node_modules/**', `${ngPackage.dest}/**`]
    });
    if (declarationFiles.length) {
        yield Promise.all(declarationFiles.map(value => {
            const relativePath = path.relative(ngEntryPoint.entryFilePath, value);
            const destination = path.resolve(destinationFiles.declarations, relativePath);
            return copy_1.copyFile(value, destination);
        }));
    }
    // 6. WRITE PACKAGE.JSON
    log.info('Writing package metadata');
    const relativeUnixFromDestPath = (filePath) => path_1.ensureUnixPath(path.relative(ngEntryPoint.destinationPath, filePath));
    yield writePackageJson(ngEntryPoint, ngPackage, {
        main: relativeUnixFromDestPath(destinationFiles.umd),
        module: relativeUnixFromDestPath(destinationFiles.fesm5),
        es2015: relativeUnixFromDestPath(destinationFiles.fesm2015),
        esm5: relativeUnixFromDestPath(destinationFiles.esm5),
        esm2015: relativeUnixFromDestPath(destinationFiles.esm2015),
        fesm5: relativeUnixFromDestPath(destinationFiles.fesm5),
        fesm2015: relativeUnixFromDestPath(destinationFiles.fesm2015),
        typings: relativeUnixFromDestPath(destinationFiles.declarations),
        // XX 'metadata' property in 'package.json' is non-standard. Keep it anyway?
        metadata: relativeUnixFromDestPath(destinationFiles.metadata),
        // webpack v4+ specific flag to enable advanced optimizations and code splitting
        sideEffects: ngEntryPoint.sideEffects
    });
    log.success(`Built ${ngEntryPoint.moduleId}`);
    return graph;
}));
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
function writePackageJson(entryPoint, pkg, additionalProperties) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug('Writing package.json');
        // set additional properties
        const packageJson = Object.assign({}, entryPoint.packageJson, additionalProperties);
        // read tslib version from `@angular/compiler` so that our tslib
        // version at least matches that of angular if we use require('tslib').version
        // it will get what installed and not the minimum version nor if it is a `~` or `^`
        // this is only required for primary
        if (!entryPoint.isSecondaryEntryPoint && !(packageJson.dependencies && packageJson.dependencies.tslib)) {
            const { dependencies: angularDependencies = {} } = require('@angular/compiler/package.json');
            const tsLibVersion = angularDependencies.tslib;
            if (tsLibVersion) {
                packageJson.dependencies = Object.assign({}, packageJson.dependencies, { tslib: tsLibVersion });
            }
        }
        // Verify non-peerDependencies as they can easily lead to duplicated installs or version conflicts
        // in the node_modules folder of an application
        const whitelist = pkg.whitelistedNonPeerDependencies.map(value => new RegExp(value));
        try {
            checkNonPeerDependencies(packageJson, 'dependencies', whitelist);
        }
        catch (e) {
            yield rimraf_1.rimraf(entryPoint.destinationPath);
            throw e;
        }
        // Removes scripts from package.json after build
        if (pkg.keepLifecycleScripts !== true) {
            log.info(`Removing scripts section in package.json as it's considered a potential security vulnerability.`);
            delete packageJson.scripts;
        }
        else {
            log.warn(`You enabled keepLifecycleScripts explicitly. The scripts section in package.json will be published to npm.`);
        }
        // keep the dist package.json clean
        // this will not throw if ngPackage field does not exist
        delete packageJson.ngPackage;
        packageJson.name = entryPoint.moduleId;
        // `outputJson()` creates intermediate directories, if they do not exist
        // -- https://github.com/jprichardson/node-fs-extra/blob/master/docs/outputJson.md
        yield fs.outputJson(path.join(entryPoint.destinationPath, 'package.json'), packageJson, { spaces: 2 });
    });
}
exports.writePackageJson = writePackageJson;
function checkNonPeerDependencies(packageJson, property, whitelist) {
    if (packageJson[property]) {
        Object.keys(packageJson[property]).forEach(dep => {
            if (whitelist.find(regex => regex.test(dep))) {
                log.debug(`Dependency ${dep} is whitelisted in '${property}'`);
            }
            else {
                log.warn(`Distributing npm packages with '${property}' is not recommended. Please consider adding ${dep} to 'peerDependencies' or remove it from '${property}'.`);
                throw new Error(`Dependency ${dep} must be explicitly whitelisted.`);
            }
        });
    }
}
//# sourceMappingURL=write-package.transform.js.map