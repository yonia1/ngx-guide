/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __values = (this && this.__values) || function (o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/decorators", ["require", "exports", "tsickle/src/transformer_util", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var transformer_util_1 = require("tsickle/src/transformer_util");
    var ts = require("tsickle/src/typescript");
    /**
     * Returns the declarations for the given decorator.
     */
    function getDecoratorDeclarations(decorator, typeChecker) {
        // Walk down the expression to find the identifier of the decorator function.
        var node = decorator;
        while (node.kind !== ts.SyntaxKind.Identifier) {
            if (node.kind === ts.SyntaxKind.Decorator || node.kind === ts.SyntaxKind.CallExpression) {
                node = node.expression;
            }
            else {
                // We do not know how to handle this type of decorator.
                return [];
            }
        }
        var decSym = typeChecker.getSymbolAtLocation(node);
        if (!decSym)
            return [];
        if (decSym.flags & ts.SymbolFlags.Alias) {
            decSym = typeChecker.getAliasedSymbol(decSym);
        }
        return decSym.getDeclarations() || [];
    }
    exports.getDecoratorDeclarations = getDecoratorDeclarations;
    /**
     * Returns true if node has an exporting decorator  (i.e., a decorator with @ExportDecoratedItems
     * in its JSDoc).
     */
    function hasExportingDecorator(node, typeChecker) {
        return node.decorators &&
            node.decorators.some(function (decorator) { return isExportingDecorator(decorator, typeChecker); });
    }
    exports.hasExportingDecorator = hasExportingDecorator;
    /**
     * Returns true if the given decorator has an @ExportDecoratedItems directive in its JSDoc.
     */
    function isExportingDecorator(decorator, typeChecker) {
        return getDecoratorDeclarations(decorator, typeChecker).some(function (declaration) {
            var e_1, _a;
            var range = transformer_util_1.getAllLeadingComments(declaration);
            if (!range) {
                return false;
            }
            try {
                for (var range_1 = __values(range), range_1_1 = range_1.next(); !range_1_1.done; range_1_1 = range_1.next()) {
                    var text = range_1_1.value.text;
                    if (/@ExportDecoratedItems\b/.test(text)) {
                        return true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (range_1_1 && !range_1_1.done && (_a = range_1.return)) _a.call(range_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            return false;
        });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVjb3JhdG9ycy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9kZWNvcmF0b3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVILGlFQUF5RDtJQUN6RCwyQ0FBbUM7SUFFbkM7O09BRUc7SUFDSCxrQ0FDSSxTQUF1QixFQUFFLFdBQTJCO1FBQ3RELDZFQUE2RTtRQUM3RSxJQUFJLElBQUksR0FBWSxTQUFTLENBQUM7UUFDOUIsT0FBTyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO1lBQzdDLElBQUksSUFBSSxDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFO2dCQUN2RixJQUFJLEdBQUksSUFBeUMsQ0FBQyxVQUFVLENBQUM7YUFDOUQ7aUJBQU07Z0JBQ0wsdURBQXVEO2dCQUN2RCxPQUFPLEVBQUUsQ0FBQzthQUNYO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLE1BQU07WUFBRSxPQUFPLEVBQUUsQ0FBQztRQUN2QixJQUFJLE1BQU0sQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMvQztRQUNELE9BQU8sTUFBTSxDQUFDLGVBQWUsRUFBRSxJQUFJLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBbkJELDREQW1CQztJQUVEOzs7T0FHRztJQUNILCtCQUFzQyxJQUFhLEVBQUUsV0FBMkI7UUFDOUUsT0FBTyxJQUFJLENBQUMsVUFBVTtZQUNsQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxVQUFBLFNBQVMsSUFBSSxPQUFBLG9CQUFvQixDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUMsRUFBNUMsQ0FBNEMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFIRCxzREFHQztJQUVEOztPQUVHO0lBQ0gsOEJBQThCLFNBQXVCLEVBQUUsV0FBMkI7UUFDaEYsT0FBTyx3QkFBd0IsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsV0FBVzs7WUFDdEUsSUFBTSxLQUFLLEdBQUcsd0NBQXFCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixPQUFPLEtBQUssQ0FBQzthQUNkOztnQkFDRCxLQUFxQixJQUFBLFVBQUEsU0FBQSxLQUFLLENBQUEsNEJBQUEsK0NBQUU7b0JBQWhCLElBQUEsMkJBQUk7b0JBQ2QsSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3hDLE9BQU8sSUFBSSxDQUFDO3FCQUNiO2lCQUNGOzs7Ozs7Ozs7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtnZXRBbGxMZWFkaW5nQ29tbWVudHN9IGZyb20gJy4vdHJhbnNmb3JtZXJfdXRpbCc7XG5pbXBvcnQgKiBhcyB0cyBmcm9tICcuL3R5cGVzY3JpcHQnO1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGRlY2xhcmF0aW9ucyBmb3IgdGhlIGdpdmVuIGRlY29yYXRvci5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldERlY29yYXRvckRlY2xhcmF0aW9ucyhcbiAgICBkZWNvcmF0b3I6IHRzLkRlY29yYXRvciwgdHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyKTogdHMuRGVjbGFyYXRpb25bXSB7XG4gIC8vIFdhbGsgZG93biB0aGUgZXhwcmVzc2lvbiB0byBmaW5kIHRoZSBpZGVudGlmaWVyIG9mIHRoZSBkZWNvcmF0b3IgZnVuY3Rpb24uXG4gIGxldCBub2RlOiB0cy5Ob2RlID0gZGVjb3JhdG9yO1xuICB3aGlsZSAobm9kZS5raW5kICE9PSB0cy5TeW50YXhLaW5kLklkZW50aWZpZXIpIHtcbiAgICBpZiAobm9kZS5raW5kID09PSB0cy5TeW50YXhLaW5kLkRlY29yYXRvciB8fCBub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuQ2FsbEV4cHJlc3Npb24pIHtcbiAgICAgIG5vZGUgPSAobm9kZSBhcyB0cy5EZWNvcmF0b3IgfCB0cy5DYWxsRXhwcmVzc2lvbikuZXhwcmVzc2lvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2UgZG8gbm90IGtub3cgaG93IHRvIGhhbmRsZSB0aGlzIHR5cGUgb2YgZGVjb3JhdG9yLlxuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cbiAgfVxuXG4gIGxldCBkZWNTeW0gPSB0eXBlQ2hlY2tlci5nZXRTeW1ib2xBdExvY2F0aW9uKG5vZGUpO1xuICBpZiAoIWRlY1N5bSkgcmV0dXJuIFtdO1xuICBpZiAoZGVjU3ltLmZsYWdzICYgdHMuU3ltYm9sRmxhZ3MuQWxpYXMpIHtcbiAgICBkZWNTeW0gPSB0eXBlQ2hlY2tlci5nZXRBbGlhc2VkU3ltYm9sKGRlY1N5bSk7XG4gIH1cbiAgcmV0dXJuIGRlY1N5bS5nZXREZWNsYXJhdGlvbnMoKSB8fCBbXTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgbm9kZSBoYXMgYW4gZXhwb3J0aW5nIGRlY29yYXRvciAgKGkuZS4sIGEgZGVjb3JhdG9yIHdpdGggQEV4cG9ydERlY29yYXRlZEl0ZW1zXG4gKiBpbiBpdHMgSlNEb2MpLlxuICovXG5leHBvcnQgZnVuY3Rpb24gaGFzRXhwb3J0aW5nRGVjb3JhdG9yKG5vZGU6IHRzLk5vZGUsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcikge1xuICByZXR1cm4gbm9kZS5kZWNvcmF0b3JzICYmXG4gICAgICBub2RlLmRlY29yYXRvcnMuc29tZShkZWNvcmF0b3IgPT4gaXNFeHBvcnRpbmdEZWNvcmF0b3IoZGVjb3JhdG9yLCB0eXBlQ2hlY2tlcikpO1xufVxuXG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gZGVjb3JhdG9yIGhhcyBhbiBARXhwb3J0RGVjb3JhdGVkSXRlbXMgZGlyZWN0aXZlIGluIGl0cyBKU0RvYy5cbiAqL1xuZnVuY3Rpb24gaXNFeHBvcnRpbmdEZWNvcmF0b3IoZGVjb3JhdG9yOiB0cy5EZWNvcmF0b3IsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlcikge1xuICByZXR1cm4gZ2V0RGVjb3JhdG9yRGVjbGFyYXRpb25zKGRlY29yYXRvciwgdHlwZUNoZWNrZXIpLnNvbWUoZGVjbGFyYXRpb24gPT4ge1xuICAgIGNvbnN0IHJhbmdlID0gZ2V0QWxsTGVhZGluZ0NvbW1lbnRzKGRlY2xhcmF0aW9uKTtcbiAgICBpZiAoIXJhbmdlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAoY29uc3Qge3RleHR9IG9mIHJhbmdlKSB7XG4gICAgICBpZiAoL0BFeHBvcnREZWNvcmF0ZWRJdGVtc1xcYi8udGVzdCh0ZXh0KSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9KTtcbn1cbiJdfQ==