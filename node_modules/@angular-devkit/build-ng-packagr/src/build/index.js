"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
// TODO move this function to architect or somewhere else where it can be imported from.
// Blatantly copy-pasted from 'require-project-module.ts'.
function requireProjectModule(root, moduleName) {
    const resolve = require('resolve');
    return require(resolve.sync(moduleName, { basedir: root }));
}
class NgPackagrBuilder {
    constructor(context) {
        this.context = context;
    }
    run(builderConfig) {
        const root = this.context.workspace.root;
        const options = builderConfig.options;
        if (!options.project) {
            throw new Error('A "project" must be specified to build a library\'s npm package.');
        }
        return new rxjs_1.Observable(obs => {
            const projectNgPackagr = requireProjectModule(core_1.getSystemPath(root), 'ng-packagr');
            const packageJsonPath = core_1.getSystemPath(core_1.resolve(root, core_1.normalize(options.project)));
            const ngPkgProject = projectNgPackagr.ngPackagr()
                .forProject(packageJsonPath);
            if (options.tsConfig) {
                const tsConfigPath = core_1.getSystemPath(core_1.resolve(root, core_1.normalize(options.tsConfig)));
                ngPkgProject.withTsConfig(tsConfigPath);
            }
            ngPkgProject.build()
                .then(() => {
                obs.next({ success: true });
                obs.complete();
            })
                .catch((e) => obs.error(e));
        });
    }
}
exports.NgPackagrBuilder = NgPackagrBuilder;
exports.default = NgPackagrBuilder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi8iLCJzb3VyY2VzIjpbInBhY2thZ2VzL2FuZ3VsYXJfZGV2a2l0L2J1aWxkX25nX3BhY2thZ3Ivc3JjL2J1aWxkL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7O0dBTUc7O0FBUUgsK0NBQXlFO0FBRXpFLCtCQUFrQztBQUVsQyx3RkFBd0Y7QUFDeEYsMERBQTBEO0FBQzFELDhCQUE4QixJQUFZLEVBQUUsVUFBa0I7SUFDNUQsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBRW5DLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFRRDtJQUVFLFlBQW1CLE9BQXVCO1FBQXZCLFlBQU8sR0FBUCxPQUFPLENBQWdCO0lBQUksQ0FBQztJQUUvQyxHQUFHLENBQUMsYUFBNEQ7UUFDOUQsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUM7UUFFdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGtFQUFrRSxDQUFDLENBQUM7UUFDdEYsQ0FBQztRQUVELE1BQU0sQ0FBQyxJQUFJLGlCQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDMUIsTUFBTSxnQkFBZ0IsR0FBRyxvQkFBb0IsQ0FDM0Msb0JBQWEsQ0FBQyxJQUFJLENBQUMsRUFBRSxZQUFZLENBQXFCLENBQUM7WUFDekQsTUFBTSxlQUFlLEdBQUcsb0JBQWEsQ0FBQyxjQUFPLENBQUMsSUFBSSxFQUFFLGdCQUFTLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVqRixNQUFNLFlBQVksR0FBRyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUU7aUJBQzlDLFVBQVUsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUvQixFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTSxZQUFZLEdBQUcsb0JBQWEsQ0FBQyxjQUFPLENBQUMsSUFBSSxFQUFFLGdCQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0UsWUFBWSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMxQyxDQUFDO1lBRUQsWUFBWSxDQUFDLEtBQUssRUFBRTtpQkFDakIsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDVCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQzVCLEdBQUcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqQixDQUFDLENBQUM7aUJBQ0QsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDaEMsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBRUY7QUFsQ0QsNENBa0NDO0FBRUQsa0JBQWUsZ0JBQWdCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7XG4gIEJ1aWxkRXZlbnQsXG4gIEJ1aWxkZXIsXG4gIEJ1aWxkZXJDb25maWd1cmF0aW9uLFxuICBCdWlsZGVyQ29udGV4dCxcbn0gZnJvbSAnQGFuZ3VsYXItZGV2a2l0L2FyY2hpdGVjdCc7XG5pbXBvcnQgeyBnZXRTeXN0ZW1QYXRoLCBub3JtYWxpemUsIHJlc29sdmUgfSBmcm9tICdAYW5ndWxhci1kZXZraXQvY29yZSc7XG5pbXBvcnQgKiBhcyBuZ1BhY2thZ3IgZnJvbSAnbmctcGFja2Fncic7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbi8vIFRPRE8gbW92ZSB0aGlzIGZ1bmN0aW9uIHRvIGFyY2hpdGVjdCBvciBzb21ld2hlcmUgZWxzZSB3aGVyZSBpdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbS5cbi8vIEJsYXRhbnRseSBjb3B5LXBhc3RlZCBmcm9tICdyZXF1aXJlLXByb2plY3QtbW9kdWxlLnRzJy5cbmZ1bmN0aW9uIHJlcXVpcmVQcm9qZWN0TW9kdWxlKHJvb3Q6IHN0cmluZywgbW9kdWxlTmFtZTogc3RyaW5nKSB7XG4gIGNvbnN0IHJlc29sdmUgPSByZXF1aXJlKCdyZXNvbHZlJyk7XG5cbiAgcmV0dXJuIHJlcXVpcmUocmVzb2x2ZS5zeW5jKG1vZHVsZU5hbWUsIHsgYmFzZWRpcjogcm9vdCB9KSk7XG59XG5cblxuZXhwb3J0IGludGVyZmFjZSBOZ1BhY2thZ3JCdWlsZGVyT3B0aW9ucyB7XG4gIHByb2plY3Q6IHN0cmluZztcbiAgdHNDb25maWc/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBjbGFzcyBOZ1BhY2thZ3JCdWlsZGVyIGltcGxlbWVudHMgQnVpbGRlcjxOZ1BhY2thZ3JCdWlsZGVyT3B0aW9ucz4ge1xuXG4gIGNvbnN0cnVjdG9yKHB1YmxpYyBjb250ZXh0OiBCdWlsZGVyQ29udGV4dCkgeyB9XG5cbiAgcnVuKGJ1aWxkZXJDb25maWc6IEJ1aWxkZXJDb25maWd1cmF0aW9uPE5nUGFja2FnckJ1aWxkZXJPcHRpb25zPik6IE9ic2VydmFibGU8QnVpbGRFdmVudD4ge1xuICAgIGNvbnN0IHJvb3QgPSB0aGlzLmNvbnRleHQud29ya3NwYWNlLnJvb3Q7XG4gICAgY29uc3Qgb3B0aW9ucyA9IGJ1aWxkZXJDb25maWcub3B0aW9ucztcblxuICAgIGlmICghb3B0aW9ucy5wcm9qZWN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0EgXCJwcm9qZWN0XCIgbXVzdCBiZSBzcGVjaWZpZWQgdG8gYnVpbGQgYSBsaWJyYXJ5XFwncyBucG0gcGFja2FnZS4nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGUob2JzID0+IHtcbiAgICAgIGNvbnN0IHByb2plY3ROZ1BhY2thZ3IgPSByZXF1aXJlUHJvamVjdE1vZHVsZShcbiAgICAgICAgZ2V0U3lzdGVtUGF0aChyb290KSwgJ25nLXBhY2thZ3InKSBhcyB0eXBlb2YgbmdQYWNrYWdyO1xuICAgICAgY29uc3QgcGFja2FnZUpzb25QYXRoID0gZ2V0U3lzdGVtUGF0aChyZXNvbHZlKHJvb3QsIG5vcm1hbGl6ZShvcHRpb25zLnByb2plY3QpKSk7XG5cbiAgICAgIGNvbnN0IG5nUGtnUHJvamVjdCA9IHByb2plY3ROZ1BhY2thZ3IubmdQYWNrYWdyKClcbiAgICAgICAgLmZvclByb2plY3QocGFja2FnZUpzb25QYXRoKTtcblxuICAgICAgaWYgKG9wdGlvbnMudHNDb25maWcpIHtcbiAgICAgICAgY29uc3QgdHNDb25maWdQYXRoID0gZ2V0U3lzdGVtUGF0aChyZXNvbHZlKHJvb3QsIG5vcm1hbGl6ZShvcHRpb25zLnRzQ29uZmlnKSkpO1xuICAgICAgICBuZ1BrZ1Byb2plY3Qud2l0aFRzQ29uZmlnKHRzQ29uZmlnUGF0aCk7XG4gICAgICB9XG5cbiAgICAgIG5nUGtnUHJvamVjdC5idWlsZCgpXG4gICAgICAgIC50aGVuKCgpID0+IHtcbiAgICAgICAgICBvYnMubmV4dCh7IHN1Y2Nlc3M6IHRydWUgfSk7XG4gICAgICAgICAgb2JzLmNvbXBsZXRlKCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZSkgPT4gb2JzLmVycm9yKGUpKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IE5nUGFja2FnckJ1aWxkZXI7XG4iXX0=