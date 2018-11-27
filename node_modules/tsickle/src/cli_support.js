/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/cli_support", ["require", "exports", "assert", "path"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var assert = require("assert");
    var path = require("path");
    /**
     * asserts that the given fileName is an absolute path.
     *
     * The TypeScript API works in absolute paths, so we must be careful to resolve
     * paths before handing them over to TypeScript.
     */
    function assertAbsolute(fileName) {
        assert(path.isAbsolute(fileName), "expected " + JSON.stringify(fileName) + " to be absolute");
    }
    exports.assertAbsolute = assertAbsolute;
    /**
     * Takes a context (ts.SourceFile.fileName of the current file) and the import URL of an ES6
     * import and generates a googmodule module name for the imported module.
     */
    function pathToModuleName(rootModulePath, context, fileName) {
        fileName = fileName.replace(/(\.d)?\.[tj]s$/, '');
        if (fileName[0] === '.') {
            // './foo' or '../foo'.
            // Resolve the path against the dirname of the current module.
            fileName = path.join(path.dirname(context), fileName);
        }
        // TODO(evanm): various tests assume they can import relative paths like
        // 'foo/bar' and have them interpreted as root-relative; preserve that here.
        // Fix this by removing the next line.
        if (!path.isAbsolute(fileName))
            fileName = path.join(rootModulePath, fileName);
        // TODO(evanm): various tests assume they can pass in a 'fileName' like
        // 'goog:foo.bar' and have this function do something reasonable.
        // For correctness, the above must have produced an absolute path.
        // assertAbsolute(fileName);
        if (rootModulePath) {
            fileName = path.relative(rootModulePath, fileName);
        }
        // Replace characters not supported by goog.module.
        var moduleName = fileName.replace(/\/|\\/g, '.').replace(/^[^a-zA-Z_$]/, '_').replace(/[^a-zA-Z0-9._$]/g, '_');
        return moduleName;
    }
    exports.pathToModuleName = pathToModuleName;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpX3N1cHBvcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpX3N1cHBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7SUFFSCwrQkFBaUM7SUFDakMsMkJBQTZCO0lBRTdCOzs7OztPQUtHO0lBQ0gsd0JBQStCLFFBQWdCO1FBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFLGNBQVksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsb0JBQWlCLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRkQsd0NBRUM7SUFFRDs7O09BR0c7SUFDSCwwQkFDSSxjQUFzQixFQUFFLE9BQWUsRUFBRSxRQUFnQjtRQUMzRCxRQUFRLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVsRCxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7WUFDdkIsdUJBQXVCO1lBQ3ZCLDhEQUE4RDtZQUM5RCxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3ZEO1FBRUQsd0VBQXdFO1FBQ3hFLDRFQUE0RTtRQUM1RSxzQ0FBc0M7UUFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDO1lBQUUsUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRS9FLHVFQUF1RTtRQUN2RSxpRUFBaUU7UUFFakUsa0VBQWtFO1FBQ2xFLDRCQUE0QjtRQUU1QixJQUFJLGNBQWMsRUFBRTtZQUNsQixRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDcEQ7UUFFRCxtREFBbUQ7UUFDbkQsSUFBTSxVQUFVLEdBQ1osUUFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFFbEcsT0FBTyxVQUFVLENBQUM7SUFDcEIsQ0FBQztJQTlCRCw0Q0E4QkMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIGFzc2VydCBmcm9tICdhc3NlcnQnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcblxuLyoqXG4gKiBhc3NlcnRzIHRoYXQgdGhlIGdpdmVuIGZpbGVOYW1lIGlzIGFuIGFic29sdXRlIHBhdGguXG4gKlxuICogVGhlIFR5cGVTY3JpcHQgQVBJIHdvcmtzIGluIGFic29sdXRlIHBhdGhzLCBzbyB3ZSBtdXN0IGJlIGNhcmVmdWwgdG8gcmVzb2x2ZVxuICogcGF0aHMgYmVmb3JlIGhhbmRpbmcgdGhlbSBvdmVyIHRvIFR5cGVTY3JpcHQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhc3NlcnRBYnNvbHV0ZShmaWxlTmFtZTogc3RyaW5nKSB7XG4gIGFzc2VydChwYXRoLmlzQWJzb2x1dGUoZmlsZU5hbWUpLCBgZXhwZWN0ZWQgJHtKU09OLnN0cmluZ2lmeShmaWxlTmFtZSl9IHRvIGJlIGFic29sdXRlYCk7XG59XG5cbi8qKlxuICogVGFrZXMgYSBjb250ZXh0ICh0cy5Tb3VyY2VGaWxlLmZpbGVOYW1lIG9mIHRoZSBjdXJyZW50IGZpbGUpIGFuZCB0aGUgaW1wb3J0IFVSTCBvZiBhbiBFUzZcbiAqIGltcG9ydCBhbmQgZ2VuZXJhdGVzIGEgZ29vZ21vZHVsZSBtb2R1bGUgbmFtZSBmb3IgdGhlIGltcG9ydGVkIG1vZHVsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhdGhUb01vZHVsZU5hbWUoXG4gICAgcm9vdE1vZHVsZVBhdGg6IHN0cmluZywgY29udGV4dDogc3RyaW5nLCBmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgZmlsZU5hbWUgPSBmaWxlTmFtZS5yZXBsYWNlKC8oXFwuZCk/XFwuW3RqXXMkLywgJycpO1xuXG4gIGlmIChmaWxlTmFtZVswXSA9PT0gJy4nKSB7XG4gICAgLy8gJy4vZm9vJyBvciAnLi4vZm9vJy5cbiAgICAvLyBSZXNvbHZlIHRoZSBwYXRoIGFnYWluc3QgdGhlIGRpcm5hbWUgb2YgdGhlIGN1cnJlbnQgbW9kdWxlLlxuICAgIGZpbGVOYW1lID0gcGF0aC5qb2luKHBhdGguZGlybmFtZShjb250ZXh0KSwgZmlsZU5hbWUpO1xuICB9XG5cbiAgLy8gVE9ETyhldmFubSk6IHZhcmlvdXMgdGVzdHMgYXNzdW1lIHRoZXkgY2FuIGltcG9ydCByZWxhdGl2ZSBwYXRocyBsaWtlXG4gIC8vICdmb28vYmFyJyBhbmQgaGF2ZSB0aGVtIGludGVycHJldGVkIGFzIHJvb3QtcmVsYXRpdmU7IHByZXNlcnZlIHRoYXQgaGVyZS5cbiAgLy8gRml4IHRoaXMgYnkgcmVtb3ZpbmcgdGhlIG5leHQgbGluZS5cbiAgaWYgKCFwYXRoLmlzQWJzb2x1dGUoZmlsZU5hbWUpKSBmaWxlTmFtZSA9IHBhdGguam9pbihyb290TW9kdWxlUGF0aCwgZmlsZU5hbWUpO1xuXG4gIC8vIFRPRE8oZXZhbm0pOiB2YXJpb3VzIHRlc3RzIGFzc3VtZSB0aGV5IGNhbiBwYXNzIGluIGEgJ2ZpbGVOYW1lJyBsaWtlXG4gIC8vICdnb29nOmZvby5iYXInIGFuZCBoYXZlIHRoaXMgZnVuY3Rpb24gZG8gc29tZXRoaW5nIHJlYXNvbmFibGUuXG5cbiAgLy8gRm9yIGNvcnJlY3RuZXNzLCB0aGUgYWJvdmUgbXVzdCBoYXZlIHByb2R1Y2VkIGFuIGFic29sdXRlIHBhdGguXG4gIC8vIGFzc2VydEFic29sdXRlKGZpbGVOYW1lKTtcblxuICBpZiAocm9vdE1vZHVsZVBhdGgpIHtcbiAgICBmaWxlTmFtZSA9IHBhdGgucmVsYXRpdmUocm9vdE1vZHVsZVBhdGgsIGZpbGVOYW1lKTtcbiAgfVxuXG4gIC8vIFJlcGxhY2UgY2hhcmFjdGVycyBub3Qgc3VwcG9ydGVkIGJ5IGdvb2cubW9kdWxlLlxuICBjb25zdCBtb2R1bGVOYW1lID1cbiAgICAgIGZpbGVOYW1lLnJlcGxhY2UoL1xcL3xcXFxcL2csICcuJykucmVwbGFjZSgvXlteYS16QS1aXyRdLywgJ18nKS5yZXBsYWNlKC9bXmEtekEtWjAtOS5fJF0vZywgJ18nKTtcblxuICByZXR1cm4gbW9kdWxlTmFtZTtcbn1cbiJdfQ==