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
        define("tsickle/src/modules_manifest", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /** A class that maintains the module dependency graph of output JS files. */
    var ModulesManifest = /** @class */ (function () {
        /** A class that maintains the module dependency graph of output JS files. */
        function ModulesManifest() {
            /** Map of googmodule module name to file name */
            this.moduleToFileName = {};
            /** Map of file name to arrays of imported googmodule module names */
            this.referencedModules = {};
        }
        ModulesManifest.prototype.addManifest = function (other) {
            Object.assign(this.moduleToFileName, other.moduleToFileName);
            Object.assign(this.referencedModules, other.referencedModules);
        };
        ModulesManifest.prototype.addModule = function (fileName, module) {
            this.moduleToFileName[module] = fileName;
            this.referencedModules[fileName] = [];
        };
        ModulesManifest.prototype.addReferencedModule = function (fileName, resolvedModule) {
            this.referencedModules[fileName].push(resolvedModule);
        };
        Object.defineProperty(ModulesManifest.prototype, "modules", {
            get: function () {
                return Object.keys(this.moduleToFileName);
            },
            enumerable: true,
            configurable: true
        });
        ModulesManifest.prototype.getFileNameFromModule = function (module) {
            return this.moduleToFileName[module];
        };
        Object.defineProperty(ModulesManifest.prototype, "fileNames", {
            get: function () {
                return Object.keys(this.referencedModules);
            },
            enumerable: true,
            configurable: true
        });
        ModulesManifest.prototype.getReferencedModules = function (fileName) {
            return this.referencedModules[fileName];
        };
        return ModulesManifest;
    }());
    exports.ModulesManifest = ModulesManifest;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlc19tYW5pZmVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9tb2R1bGVzX21hbmlmZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBTUgsNkVBQTZFO0lBQzdFO1FBREEsNkVBQTZFO1FBQzdFO1lBQ0UsaURBQWlEO1lBQ3pDLHFCQUFnQixHQUFvQixFQUFFLENBQUM7WUFDL0MscUVBQXFFO1lBQzdELHNCQUFpQixHQUFzQixFQUFFLENBQUM7UUErQnBELENBQUM7UUE3QkMscUNBQVcsR0FBWCxVQUFZLEtBQXNCO1lBQ2hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzdELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxtQ0FBUyxHQUFULFVBQVUsUUFBZ0IsRUFBRSxNQUFjO1lBQ3hDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUM7WUFDekMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUN4QyxDQUFDO1FBRUQsNkNBQW1CLEdBQW5CLFVBQW9CLFFBQWdCLEVBQUUsY0FBc0I7WUFDMUQsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBRUQsc0JBQUksb0NBQU87aUJBQVg7Z0JBQ0UsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzVDLENBQUM7OztXQUFBO1FBRUQsK0NBQXFCLEdBQXJCLFVBQXNCLE1BQWM7WUFDbEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELHNCQUFJLHNDQUFTO2lCQUFiO2dCQUNFLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM3QyxDQUFDOzs7V0FBQTtRQUVELDhDQUFvQixHQUFwQixVQUFxQixRQUFnQjtZQUNuQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBQ0gsc0JBQUM7SUFBRCxDQUFDLEFBbkNELElBbUNDO0lBbkNZLDBDQUFlIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5leHBvcnQgaW50ZXJmYWNlIEZpbGVNYXA8VD4ge1xuICBbZmlsZU5hbWU6IHN0cmluZ106IFQ7XG59XG5cbi8qKiBBIGNsYXNzIHRoYXQgbWFpbnRhaW5zIHRoZSBtb2R1bGUgZGVwZW5kZW5jeSBncmFwaCBvZiBvdXRwdXQgSlMgZmlsZXMuICovXG5leHBvcnQgY2xhc3MgTW9kdWxlc01hbmlmZXN0IHtcbiAgLyoqIE1hcCBvZiBnb29nbW9kdWxlIG1vZHVsZSBuYW1lIHRvIGZpbGUgbmFtZSAqL1xuICBwcml2YXRlIG1vZHVsZVRvRmlsZU5hbWU6IEZpbGVNYXA8c3RyaW5nPiA9IHt9O1xuICAvKiogTWFwIG9mIGZpbGUgbmFtZSB0byBhcnJheXMgb2YgaW1wb3J0ZWQgZ29vZ21vZHVsZSBtb2R1bGUgbmFtZXMgKi9cbiAgcHJpdmF0ZSByZWZlcmVuY2VkTW9kdWxlczogRmlsZU1hcDxzdHJpbmdbXT4gPSB7fTtcblxuICBhZGRNYW5pZmVzdChvdGhlcjogTW9kdWxlc01hbmlmZXN0KSB7XG4gICAgT2JqZWN0LmFzc2lnbih0aGlzLm1vZHVsZVRvRmlsZU5hbWUsIG90aGVyLm1vZHVsZVRvRmlsZU5hbWUpO1xuICAgIE9iamVjdC5hc3NpZ24odGhpcy5yZWZlcmVuY2VkTW9kdWxlcywgb3RoZXIucmVmZXJlbmNlZE1vZHVsZXMpO1xuICB9XG5cbiAgYWRkTW9kdWxlKGZpbGVOYW1lOiBzdHJpbmcsIG1vZHVsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5tb2R1bGVUb0ZpbGVOYW1lW21vZHVsZV0gPSBmaWxlTmFtZTtcbiAgICB0aGlzLnJlZmVyZW5jZWRNb2R1bGVzW2ZpbGVOYW1lXSA9IFtdO1xuICB9XG5cbiAgYWRkUmVmZXJlbmNlZE1vZHVsZShmaWxlTmFtZTogc3RyaW5nLCByZXNvbHZlZE1vZHVsZTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5yZWZlcmVuY2VkTW9kdWxlc1tmaWxlTmFtZV0ucHVzaChyZXNvbHZlZE1vZHVsZSk7XG4gIH1cblxuICBnZXQgbW9kdWxlcygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMubW9kdWxlVG9GaWxlTmFtZSk7XG4gIH1cblxuICBnZXRGaWxlTmFtZUZyb21Nb2R1bGUobW9kdWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLm1vZHVsZVRvRmlsZU5hbWVbbW9kdWxlXTtcbiAgfVxuXG4gIGdldCBmaWxlTmFtZXMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLnJlZmVyZW5jZWRNb2R1bGVzKTtcbiAgfVxuXG4gIGdldFJlZmVyZW5jZWRNb2R1bGVzKGZpbGVOYW1lOiBzdHJpbmcpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMucmVmZXJlbmNlZE1vZHVsZXNbZmlsZU5hbWVdO1xuICB9XG59XG4iXX0=