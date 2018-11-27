"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const depth_1 = require("../brocc/depth");
const node_1 = require("../brocc/node");
const log = require("../util/log");
const rimraf_1 = require("../util/rimraf");
const nodes_1 = require("./nodes");
const discover_packages_1 = require("./discover-packages");
const copy_1 = require("../util/copy");
/**
 * A transformation for building an npm package:
 *
 *  - discoverPackages
 *  - initTsConfig
 *  - analyzeTsSources (thereby extracting template and stylesheet files)
 *  - for each entry point
 *    - run the entryPontTransform
 *  - writeNpmPackage
 *
 * @param project Project token, reference to `ng-package.json`
 * @param initTsConfigTransform Transformation initializing the tsconfig of each entry point.
 * @param analyseSourcesTransform Transformation analyzing the typescript source files of each entry point.
 * @param entryPointTransform Transformation for asset rendering and compilation of a single entry point.
 */
exports.packageTransformFactory = (project, initTsConfigTransform, analyseSourcesTransform, entryPointTransform) => (source$) => {
    const pkgUri = nodes_1.ngUrl(project);
    return source$.pipe(operators_1.tap(() => {
        log.info(`Building Angular Package`);
    }), 
    // Discover packages and entry points
    operators_1.switchMap(graph => {
        const pkg = discover_packages_1.discoverPackages({ project });
        return rxjs_1.from(pkg).pipe(operators_1.map(value => {
            const ngPkg = new nodes_1.PackageNode(pkgUri);
            ngPkg.data = value;
            return graph.put(ngPkg);
        }));
    }), 
    // Clean the primary dest folder (should clean all secondary sub-directory, as well)
    operators_1.switchMap(graph => {
        const { dest, deleteDestPath } = graph.get(pkgUri).data;
        return rxjs_1.from(deleteDestPath ? rimraf_1.rimraf(dest) : Promise.resolve());
    }, (graph, _) => graph), 
    // Add entry points to graph
    operators_1.map(graph => {
        const ngPkg = graph.get(pkgUri);
        const entryPoints = [ngPkg.data.primary, ...ngPkg.data.secondaries].map(entryPoint => {
            const { destinationFiles, moduleId } = entryPoint;
            const node = new nodes_1.EntryPointNode(nodes_1.ngUrl(moduleId));
            node.data = { entryPoint, destinationFiles };
            node.state = 'dirty';
            ngPkg.dependsOn(node);
            return node;
        });
        return graph.put(entryPoints);
    }), 
    // Initialize the tsconfig for each entry point
    initTsConfigTransform, 
    // Analyse dependencies and external resources for each entry point
    analyseSourcesTransform, 
    // Next, run through the entry point transformation (assets rendering, code compilation)
    scheduleEntryPoints(entryPointTransform), 
    // Write npm package to dest folder
    writeNpmPackage(pkgUri), operators_1.tap(graph => {
        const ngPkg = graph.get(pkgUri);
        log.success(`Built Angular Package!
- from: ${ngPkg.data.src}
- to:   ${ngPkg.data.dest}`);
    }));
};
const writeNpmPackage = (pkgUri) => rxjs_1.pipe(operators_1.switchMap(graph => {
    const { data } = graph.get(pkgUri);
    const filesToCopy = Promise.all([`${data.src}/LICENSE`, `${data.src}/README.md`].map(src => copy_1.copyFile(src, path.join(data.dest, path.basename(src)))));
    return rxjs_1.from(filesToCopy).pipe(operators_1.map(() => graph));
}));
const scheduleEntryPoints = (epTransform) => rxjs_1.pipe(operators_1.concatMap(graph => {
    // Calculate node/dependency depth and determine build order
    const depthBuilder = new depth_1.DepthBuilder();
    const entryPoints = graph.filter(nodes_1.isEntryPoint);
    entryPoints.forEach(entryPoint => {
        const deps = entryPoint.filter(nodes_1.isEntryPoint).map(ep => ep.url);
        depthBuilder.add(entryPoint.url, deps);
    });
    // The array index is the depth.
    const groups = depthBuilder.build();
    const flattenedGroups = groups.reduce((prev, current) => prev.concat(current), []);
    let currentIndex = 0;
    // Build entry points with lower depth values first.
    const eps$ = flattenedGroups.map(() => rxjs_1.of(graph).pipe(operators_1.tap(() => {
        // Find current entry point in progress
        const epUrl = flattenedGroups[currentIndex];
        const entryPoint = graph.find(nodes_1.byEntryPoint().and(ep => ep.url === epUrl));
        // Mark the entry point as 'in-progress'
        entryPoint.state = node_1.STATE_IN_PROGESS;
    }), epTransform, operators_1.tap(() => {
        currentIndex += 1;
    })));
    // Build all entry points, then continue
    return rxjs_1.concat(...eps$).pipe(operators_1.takeLast(1));
}));
//# sourceMappingURL=package.transform.js.map