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
const rollup = require("rollup");
const nodeResolve = require("rollup-plugin-node-resolve");
const sourcemaps = require("rollup-plugin-sourcemaps");
const commonJs = require("rollup-plugin-commonjs");
const path = require("path");
const log = require("../util/log");
const external_module_id_strategy_1 = require("./external-module-id-strategy");
const umd_module_id_strategy_1 = require("./umd-module-id-strategy");
const fs_extra_1 = require("fs-extra");
/** Runs rollup over the given entry file, writes a bundle file. */
function rollupBundleFile(opts) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug(`rollup (v${rollup.VERSION}) ${opts.entry} to ${opts.dest} (${opts.format})`);
        const externalModuleIdStrategy = new external_module_id_strategy_1.ExternalModuleIdStrategy(opts.format, opts.dependencyList);
        // Create the bundle
        const bundle = yield rollup.rollup({
            context: 'this',
            external: moduleId => externalModuleIdStrategy.isExternalDependency(moduleId),
            input: opts.entry,
            plugins: [nodeResolve(), commonJs(), sourcemaps(), { transform: opts.transform }],
            onwarn: warning => {
                if (typeof warning === 'string') {
                    log.warn(warning);
                }
                else {
                    if (warning.code === 'THIS_IS_UNDEFINED') {
                        return;
                    }
                    log.warn(warning.message);
                }
            },
            preserveSymlinks: true
        });
        // Output the bundle to disk
        const sourcemapFullFile = `${opts.dest}.map`;
        const sourcemapFile = path.basename(sourcemapFullFile);
        const result = yield bundle.generate({
            name: opts.moduleName,
            format: opts.format,
            amd: opts.amd,
            file: opts.dest,
            banner: '',
            globals: moduleId => umd_module_id_strategy_1.umdModuleIdStrategy(moduleId, opts.umdModuleIds || {}),
            sourcemap: true,
            sourcemapFile
        });
        // relocate sourcemaps
        result.map.sources = result.map.sources.map(sourcePath => {
            if (!sourcePath) {
                return sourcePath;
            }
            // the replace here is because during the compilation one of the `/` gets lost sometimes
            const mapRootUrl = opts.sourceRoot.replace('//', '/');
            if (sourcePath.indexOf(mapRootUrl) > 0) {
                return `${opts.sourceRoot}${sourcePath.substr(sourcePath.indexOf(mapRootUrl) + mapRootUrl.length)}`;
            }
            else if (sourcePath.indexOf(opts.sourceRoot) > 0) {
                return sourcePath.substr(sourcePath.indexOf(mapRootUrl));
            }
        });
        // rollup doesn't add a sourceMappingURL
        // https://github.com/rollup/rollup/issues/121
        result.code = `${result.code}\n//# sourceMappingURL=${result.map.toUrl()}`;
        return Promise.all([fs_extra_1.outputJson(sourcemapFullFile, result.map), fs_extra_1.outputFile(opts.dest, result.code)]);
    });
}
exports.rollupBundleFile = rollupBundleFile;
//# sourceMappingURL=rollup.js.map