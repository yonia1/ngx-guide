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
const stripBom = require("strip-bom");
const transform_1 = require("../../../brocc/transform");
const log = require("../../../util/log");
const nodes_1 = require("../../nodes");
// CSS Tools
const autoprefixer = require("autoprefixer");
const browserslist = require("browserslist");
const sass = require("node-sass");
const nodeSassTildeImporter = require("node-sass-tilde-importer");
const postcss = require("postcss");
const postcssUrl = require("postcss-url");
const postcssClean = require("postcss-clean");
const less = require("less");
const stylus = require("stylus");
const shared_1 = require("../../../ng-package-format/shared");
exports.stylesheetTransform = transform_1.transformFromPromise((graph) => __awaiter(this, void 0, void 0, function* () {
    log.info(`Rendering Stylesheets`);
    // Fetch current entry point from graph
    const entryPoint = graph.find(nodes_1.isEntryPointInProgress());
    // Fetch stylesheet nodes from the graph
    const stylesheetNodes = graph.from(entryPoint).filter(node => node.type === nodes_1.TYPE_STYLESHEET && node.state !== 'done');
    // Determine base path from NgPackage
    const ngPkg = graph.find(nodes_1.isPackage);
    const postCssProcessor = createPostCssProcessor(ngPkg.data.basePath, entryPoint.data.entryPoint.cssUrl);
    for (let stylesheetNode of stylesheetNodes) {
        const filePath = nodes_1.fileUrlPath(stylesheetNode.url);
        // Render pre-processor language (sass, styl, less)
        const renderedCss = yield renderPreProcessor(filePath, ngPkg.data.basePath, entryPoint.data.entryPoint);
        // Render postcss (autoprefixing and friends)
        const result = yield postCssProcessor.process(renderedCss, {
            from: filePath,
            to: filePath.replace(path.extname(filePath), '.css')
        });
        // Escape existing backslashes for the final output into a string literal, which would otherwise escape the character after it
        const resultCss = result.css.replace(/\\/g, '\\\\');
        // Log warnings from postcss
        result.warnings().forEach(msg => {
            log.warn(msg.toString());
        });
        // Update node in the graph
        stylesheetNode.data = Object.assign({}, stylesheetNode.data, { content: resultCss });
    }
    return graph;
}));
function createPostCssProcessor(basePath, cssUrl) {
    log.debug(`determine browserslist for ${basePath}`);
    const browsers = browserslist(undefined, { path: basePath });
    const postCssPlugins = [];
    if (cssUrl !== shared_1.CssUrl.none) {
        log.debug(`postcssUrl: ${cssUrl}`);
        postCssPlugins.push(postcssUrl({ url: cssUrl }));
    }
    // this is important to be executed post running `postcssUrl`
    postCssPlugins.push(autoprefixer({ browsers }), postcssClean({
        level: {
            2: {
                specialComments: false
            }
        }
    }));
    return postcss(postCssPlugins);
}
function renderPreProcessor(filePath, basePath, entryPoint) {
    return __awaiter(this, void 0, void 0, function* () {
        log.debug(`Render styles for ${filePath}`);
        switch (path.extname(filePath)) {
            case '.scss':
            case '.sass':
                log.debug(`rendering sass from ${filePath}`);
                return renderSass({
                    file: filePath,
                    importer: nodeSassTildeImporter,
                    includePaths: entryPoint.styleIncludePaths
                });
            case '.less':
                log.debug(`rendering less from ${filePath}`);
                return renderLess({
                    filename: filePath,
                    paths: entryPoint.styleIncludePaths
                });
            case '.styl':
            case '.stylus':
                log.debug(`rendering styl from ${filePath}`);
                return renderStylus({
                    filename: filePath,
                    root: basePath,
                    paths: entryPoint.styleIncludePaths
                });
            case '.css':
            default:
                log.debug(`reading css from ${filePath}`);
                return fs.readFile(filePath).then(buffer => stripBom(buffer.toString()));
        }
    });
}
const renderSass = (sassOpts) => {
    return new Promise((resolve, reject) => {
        sass.render(sassOpts, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.css.toString());
            }
        });
    });
};
const renderLess = (lessOpts) => {
    return fs
        .readFile(lessOpts.filename)
        .then(buffer => stripBom(buffer.toString()))
        .then((lessData) => new Promise((resolve, reject) => {
        less.render(lessData || '', lessOpts, (err, result) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(result.css.toString());
            }
        });
    }));
};
/**
 * filename - absolute path to file
 * root - root folder of project (where ng-package.json is located)
 */
const renderStylus = ({ filename, root, paths }) => {
    return fs
        .readFile(filename)
        .then(buffer => stripBom(buffer.toString()))
        .then((stylusData) => new Promise((resolve, reject) => {
        stylus(stylusData)
            .set('paths', [root, '.', ...paths, 'node_modules'])
            .set('filename', filename)
            .set('resolve url', true)
            .define('url', stylus.resolver())
            .render((err, css) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(css);
            }
        });
    }));
};
//# sourceMappingURL=stylesheet.transform.js.map