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
        define("tsickle/src/enum_transformer", ["require", "exports", "typescript", "tsickle/src/jsdoc_transformer", "tsickle/src/transformer_util"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @fileoverview Transforms TypeScript enum declarations to Closure enum declarations, which
     * look like:
     *
     *     /.. @enum {number} ./
     *     const Foo = {BAR: 0, BAZ: 1, ...};
     *     export {Foo};  // even if originally exported on one line.
     *
     * This declares an enum type for Closure Compiler (and Closure JS users of this TS code).
     * Splitting the enum into declaration and export is required so that local references to the
     * type resolve ("@type {Foo}").
     */
    var ts = require("typescript");
    var jsdoc_transformer_1 = require("tsickle/src/jsdoc_transformer");
    var transformer_util_1 = require("tsickle/src/transformer_util");
    /** isInNamespace returns true if any of node's ancestors is a namespace (ModuleDeclaration). */
    function isInNamespace(node) {
        // Must use the original node because node might have already been transformed, with node.parent
        // no longer being set.
        var parent = ts.getOriginalNode(node).parent;
        while (parent) {
            if (parent.kind === ts.SyntaxKind.ModuleDeclaration) {
                return true;
            }
            parent = parent.parent;
        }
        return false;
    }
    /**
     * getEnumMemberType computes the type of an enum member by inspecting its initializer expression.
     */
    function getEnumMemberType(typeChecker, member) {
        // Enum members without initialization have type 'number'
        if (!member.initializer) {
            return 'number';
        }
        var type = typeChecker.getTypeAtLocation(member.initializer);
        // Note: checking against 'NumberLike' instead of just 'Number' means this code
        // handles both
        //   MEMBER = 3,  // TypeFlags.NumberLiteral
        // and
        //   MEMBER = someFunction(),  // TypeFlags.Number
        if (type.flags & ts.TypeFlags.NumberLike) {
            return 'number';
        }
        // If the value is not a number, it must be a string.
        // TypeScript does not allow enum members to have any other type.
        return 'string';
    }
    /**
     * getEnumType computes the Closure type of an enum, by iterating through the members and gathering
     * their types.
     */
    function getEnumType(typeChecker, enumDecl) {
        var e_1, _a;
        var hasNumber = false;
        var hasString = false;
        try {
            for (var _b = __values(enumDecl.members), _c = _b.next(); !_c.done; _c = _b.next()) {
                var member = _c.value;
                var type = getEnumMemberType(typeChecker, member);
                if (type === 'string') {
                    hasString = true;
                }
                else if (type === 'number') {
                    hasNumber = true;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (hasNumber && hasString) {
            return '?'; // Closure's new type inference doesn't support enums of unions.
        }
        else if (hasNumber) {
            return 'number';
        }
        else if (hasString) {
            return 'string';
        }
        else {
            // Perhaps an empty enum?
            return '?';
        }
    }
    exports.getEnumType = getEnumType;
    /**
     * Transformer factory for the enum transformer. See fileoverview for details.
     */
    function enumTransformer(typeChecker, diagnostics) {
        return function (context) {
            function visitor(node) {
                var e_2, _a, e_3, _b;
                if (!ts.isEnumDeclaration(node))
                    return ts.visitEachChild(node, visitor, context);
                // TODO(martinprobst): The enum transformer does not work for enums embedded in namespaces,
                // because TS does not support splitting export and declaration ("export {Foo};") in
                // namespaces. tsickle's emit for namespaces is unintelligible for Closure in any case, so
                // this is left to fix for another day.
                if (isInNamespace(node))
                    return ts.visitEachChild(node, visitor, context);
                // TypeScript does not emit any code for ambient enums, so early exit here to prevent the code
                // below from producing runtime values for an ambient structure.
                if (jsdoc_transformer_1.isAmbient(node))
                    return ts.visitEachChild(node, visitor, context);
                var name = node.name.getText();
                var isExported = transformer_util_1.hasModifierFlag(node, ts.ModifierFlags.Export);
                var enumType = getEnumType(typeChecker, node);
                var values = [];
                var enumIndex = 0;
                try {
                    for (var _c = __values(node.members), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var member = _d.value;
                        var enumValue = void 0;
                        if (member.initializer) {
                            var enumConstValue = typeChecker.getConstantValue(member);
                            if (typeof enumConstValue === 'number') {
                                enumIndex = enumConstValue + 1;
                                enumValue = ts.createLiteral(enumConstValue);
                            }
                            else {
                                // Non-numeric enum value (string or an expression).
                                // Emit this initializer expression as-is.
                                // Note: if the member's initializer expression refers to another
                                // value within the enum (e.g. something like
                                //   enum Foo {
                                //     Field1,
                                //     Field2 = Field1 + something(),
                                //   }
                                // Then when we emit the initializer we produce invalid code because
                                // on the Closure side the reference to Field1 has to be namespaced,
                                // e.g. written "Foo.Field1 + something()".
                                // Hopefully this doesn't come up often -- if the enum instead has
                                // something like
                                //     Field2 = Field1 + 3,
                                // then it's still a constant expression and we inline the constant
                                // value in the above branch of this "if" statement.
                                enumValue = visitor(member.initializer);
                            }
                        }
                        else {
                            enumValue = ts.createLiteral(enumIndex);
                            enumIndex++;
                        }
                        var memberName = member.name.getText();
                        values.push(ts.setOriginalNode(ts.setTextRange(ts.createPropertyAssignment(memberName, enumValue), member), member));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                var varDecl = ts.createVariableStatement(
                /* modifiers */ undefined, ts.createVariableDeclarationList([ts.createVariableDeclaration(name, undefined, ts.createObjectLiteral(ts.setTextRange(ts.createNodeArray(values, true), node.members), true))], 
                /* create a const var */ ts.NodeFlags.Const));
                var comment = {
                    kind: ts.SyntaxKind.MultiLineCommentTrivia,
                    text: "* @enum {" + enumType + "} ",
                    hasTrailingNewLine: true,
                    pos: -1,
                    end: -1
                };
                ts.setSyntheticLeadingComments(varDecl, [comment]);
                var resultNodes = [varDecl];
                if (isExported) {
                    // Create a separate export {...} statement, so that the enum name can be used in local
                    // type annotations within the file.
                    resultNodes.push(ts.createExportDeclaration(undefined, undefined, ts.createNamedExports([ts.createExportSpecifier(undefined, name)])));
                }
                if (transformer_util_1.hasModifierFlag(node, ts.ModifierFlags.Const)) {
                    // By TypeScript semantics, const enums disappear after TS compilation.
                    // We still need to generate the runtime value above to make Closure Compiler's type system
                    // happy and allow refering to enums from JS code, but we should at least not emit string
                    // value mappings.
                    return resultNodes;
                }
                try {
                    // Emit the reverse mapping of foo[foo.BAR] = 'BAR'; lines for number enum members
                    for (var _e = __values(node.members), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var member = _f.value;
                        var memberName = member.name;
                        var memberType = getEnumMemberType(typeChecker, member);
                        if (memberType !== 'number')
                            continue;
                        // TypeScript enum members can have Identifier names or String names.
                        // We need to emit slightly different code to support these two syntaxes:
                        var nameExpr = void 0;
                        var memberAccess = void 0;
                        if (ts.isIdentifier(memberName)) {
                            // Foo[Foo.ABC] = "ABC";
                            nameExpr = transformer_util_1.createSingleQuoteStringLiteral(memberName.text);
                            // Make sure to create a clean, new identifier, so comments do not get emitted twice.
                            var ident = ts.createIdentifier(transformer_util_1.getIdentifierText(memberName));
                            memberAccess = ts.createPropertyAccess(ts.createIdentifier(name), ident);
                        }
                        else {
                            // Foo[Foo["A B C"]] = "A B C"; or Foo[Foo[expression]] = expression;
                            nameExpr = ts.isComputedPropertyName(memberName) ? memberName.expression : memberName;
                            memberAccess = ts.createElementAccess(ts.createIdentifier(name), nameExpr);
                        }
                        resultNodes.push(ts.createStatement(ts.createAssignment(ts.createElementAccess(ts.createIdentifier(name), memberAccess), nameExpr)));
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return resultNodes;
            }
            return function (sf) { return visitor(sf); };
        };
    }
    exports.enumTransformer = enumTransformer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bV90cmFuc2Zvcm1lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9lbnVtX3RyYW5zZm9ybWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVIOzs7Ozs7Ozs7OztPQVdHO0lBRUgsK0JBQWlDO0lBRWpDLG1FQUE4QztJQUM5QyxpRUFBc0c7SUFFdEcsZ0dBQWdHO0lBQ2hHLHVCQUF1QixJQUFhO1FBQ2xDLGdHQUFnRztRQUNoRyx1QkFBdUI7UUFDdkIsSUFBSSxNQUFNLEdBQUcsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDN0MsT0FBTyxNQUFNLEVBQUU7WUFDYixJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRTtnQkFDbkQsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCwyQkFBMkIsV0FBMkIsRUFBRSxNQUFxQjtRQUMzRSx5REFBeUQ7UUFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsT0FBTyxRQUFRLENBQUM7U0FDakI7UUFDRCxJQUFNLElBQUksR0FBRyxXQUFXLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQy9ELCtFQUErRTtRQUMvRSxlQUFlO1FBQ2YsNENBQTRDO1FBQzVDLE1BQU07UUFDTixrREFBa0Q7UUFDbEQsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO1lBQ3hDLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO1FBQ0QscURBQXFEO1FBQ3JELGlFQUFpRTtRQUNqRSxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gscUJBQTRCLFdBQTJCLEVBQUUsUUFBNEI7O1FBRW5GLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7O1lBQ3RCLEtBQXFCLElBQUEsS0FBQSxTQUFBLFFBQVEsQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7Z0JBQWxDLElBQU0sTUFBTSxXQUFBO2dCQUNmLElBQU0sSUFBSSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO29CQUNyQixTQUFTLEdBQUcsSUFBSSxDQUFDO2lCQUNsQjtxQkFBTSxJQUFJLElBQUksS0FBSyxRQUFRLEVBQUU7b0JBQzVCLFNBQVMsR0FBRyxJQUFJLENBQUM7aUJBQ2xCO2FBQ0Y7Ozs7Ozs7OztRQUNELElBQUksU0FBUyxJQUFJLFNBQVMsRUFBRTtZQUMxQixPQUFPLEdBQUcsQ0FBQyxDQUFFLGdFQUFnRTtTQUM5RTthQUFNLElBQUksU0FBUyxFQUFFO1lBQ3BCLE9BQU8sUUFBUSxDQUFDO1NBQ2pCO2FBQU0sSUFBSSxTQUFTLEVBQUU7WUFDcEIsT0FBTyxRQUFRLENBQUM7U0FDakI7YUFBTTtZQUNMLHlCQUF5QjtZQUN6QixPQUFPLEdBQUcsQ0FBQztTQUNaO0lBQ0gsQ0FBQztJQXRCRCxrQ0FzQkM7SUFFRDs7T0FFRztJQUNILHlCQUFnQyxXQUEyQixFQUFFLFdBQTRCO1FBRXZGLE9BQU8sVUFBQyxPQUFpQztZQUN2QyxpQkFBb0MsSUFBTzs7Z0JBQ3pDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDO29CQUFFLE9BQU8sRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUVsRiwyRkFBMkY7Z0JBQzNGLG9GQUFvRjtnQkFDcEYsMEZBQTBGO2dCQUMxRix1Q0FBdUM7Z0JBQ3ZDLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQztvQkFBRSxPQUFPLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFFMUUsOEZBQThGO2dCQUM5RixnRUFBZ0U7Z0JBQ2hFLElBQUksNkJBQVMsQ0FBQyxJQUFJLENBQUM7b0JBQUUsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBRXRFLElBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQ2pDLElBQU0sVUFBVSxHQUFHLGtDQUFlLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQ2xFLElBQU0sUUFBUSxHQUFHLFdBQVcsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRWhELElBQU0sTUFBTSxHQUE0QixFQUFFLENBQUM7Z0JBQzNDLElBQUksU0FBUyxHQUFHLENBQUMsQ0FBQzs7b0JBQ2xCLEtBQXFCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7d0JBQTlCLElBQU0sTUFBTSxXQUFBO3dCQUNmLElBQUksU0FBUyxTQUFlLENBQUM7d0JBQzdCLElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTs0QkFDdEIsSUFBTSxjQUFjLEdBQUcsV0FBVyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDOzRCQUM1RCxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtnQ0FDdEMsU0FBUyxHQUFHLGNBQWMsR0FBRyxDQUFDLENBQUM7Z0NBQy9CLFNBQVMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDOzZCQUM5QztpQ0FBTTtnQ0FDTCxvREFBb0Q7Z0NBQ3BELDBDQUEwQztnQ0FDMUMsaUVBQWlFO2dDQUNqRSw2Q0FBNkM7Z0NBQzdDLGVBQWU7Z0NBQ2YsY0FBYztnQ0FDZCxxQ0FBcUM7Z0NBQ3JDLE1BQU07Z0NBQ04sb0VBQW9FO2dDQUNwRSxvRUFBb0U7Z0NBQ3BFLDJDQUEyQztnQ0FDM0Msa0VBQWtFO2dDQUNsRSxpQkFBaUI7Z0NBQ2pCLDJCQUEyQjtnQ0FDM0IsbUVBQW1FO2dDQUNuRSxvREFBb0Q7Z0NBQ3BELFNBQVMsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBa0IsQ0FBQzs2QkFDMUQ7eUJBQ0Y7NkJBQU07NEJBQ0wsU0FBUyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7NEJBQ3hDLFNBQVMsRUFBRSxDQUFDO3lCQUNiO3dCQUNELElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7d0JBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FDMUIsRUFBRSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsd0JBQXdCLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQzNGOzs7Ozs7Ozs7Z0JBRUQsSUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDLHVCQUF1QjtnQkFDdEMsZUFBZSxDQUFDLFNBQVMsRUFDekIsRUFBRSxDQUFDLDZCQUE2QixDQUM1QixDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsQ0FDekIsSUFBSSxFQUFFLFNBQVMsRUFDZixFQUFFLENBQUMsbUJBQW1CLENBQ2xCLEVBQUUsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ2hGLHdCQUF3QixDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsSUFBTSxPQUFPLEdBQTBCO29CQUNyQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0I7b0JBQzFDLElBQUksRUFBRSxjQUFZLFFBQVEsT0FBSTtvQkFDOUIsa0JBQWtCLEVBQUUsSUFBSTtvQkFDeEIsR0FBRyxFQUFFLENBQUMsQ0FBQztvQkFDUCxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUNSLENBQUM7Z0JBQ0YsRUFBRSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBRW5ELElBQU0sV0FBVyxHQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksVUFBVSxFQUFFO29CQUNkLHVGQUF1RjtvQkFDdkYsb0NBQW9DO29CQUNwQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FDdkMsU0FBUyxFQUFFLFNBQVMsRUFDcEIsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUMxRTtnQkFFRCxJQUFJLGtDQUFlLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQ2pELHVFQUF1RTtvQkFDdkUsMkZBQTJGO29CQUMzRix5RkFBeUY7b0JBQ3pGLGtCQUFrQjtvQkFDbEIsT0FBTyxXQUFXLENBQUM7aUJBQ3BCOztvQkFFRCxrRkFBa0Y7b0JBQ2xGLEtBQXFCLElBQUEsS0FBQSxTQUFBLElBQUksQ0FBQyxPQUFPLENBQUEsZ0JBQUEsNEJBQUU7d0JBQTlCLElBQU0sTUFBTSxXQUFBO3dCQUNmLElBQU0sVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7d0JBQy9CLElBQU0sVUFBVSxHQUFHLGlCQUFpQixDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQzt3QkFDMUQsSUFBSSxVQUFVLEtBQUssUUFBUTs0QkFBRSxTQUFTO3dCQUV0QyxxRUFBcUU7d0JBQ3JFLHlFQUF5RTt3QkFDekUsSUFBSSxRQUFRLFNBQWUsQ0FBQzt3QkFDNUIsSUFBSSxZQUFZLFNBQWUsQ0FBQzt3QkFDaEMsSUFBSSxFQUFFLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxFQUFFOzRCQUMvQix3QkFBd0I7NEJBQ3hCLFFBQVEsR0FBRyxpREFBOEIsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQzNELHFGQUFxRjs0QkFDckYsSUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDLGdCQUFnQixDQUFDLG9DQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7NEJBQ2pFLFlBQVksR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFBRSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO3lCQUMxRTs2QkFBTTs0QkFDTCxxRUFBcUU7NEJBQ3JFLFFBQVEsR0FBRyxFQUFFLENBQUMsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQzs0QkFDdEYsWUFBWSxHQUFHLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7eUJBQzVFO3dCQUNELFdBQVcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQ25ELEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsWUFBWSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUNsRjs7Ozs7Ozs7O2dCQUNELE9BQU8sV0FBVyxDQUFDO1lBQ3JCLENBQUM7WUFFRCxPQUFPLFVBQUMsRUFBaUIsSUFBSyxPQUFBLE9BQU8sQ0FBQyxFQUFFLENBQWtCLEVBQTVCLENBQTRCLENBQUM7UUFDN0QsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXhIRCwwQ0F3SEMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogQGZpbGVvdmVydmlldyBUcmFuc2Zvcm1zIFR5cGVTY3JpcHQgZW51bSBkZWNsYXJhdGlvbnMgdG8gQ2xvc3VyZSBlbnVtIGRlY2xhcmF0aW9ucywgd2hpY2hcbiAqIGxvb2sgbGlrZTpcbiAqXG4gKiAgICAgLy4uIEBlbnVtIHtudW1iZXJ9IC4vXG4gKiAgICAgY29uc3QgRm9vID0ge0JBUjogMCwgQkFaOiAxLCAuLi59O1xuICogICAgIGV4cG9ydCB7Rm9vfTsgIC8vIGV2ZW4gaWYgb3JpZ2luYWxseSBleHBvcnRlZCBvbiBvbmUgbGluZS5cbiAqXG4gKiBUaGlzIGRlY2xhcmVzIGFuIGVudW0gdHlwZSBmb3IgQ2xvc3VyZSBDb21waWxlciAoYW5kIENsb3N1cmUgSlMgdXNlcnMgb2YgdGhpcyBUUyBjb2RlKS5cbiAqIFNwbGl0dGluZyB0aGUgZW51bSBpbnRvIGRlY2xhcmF0aW9uIGFuZCBleHBvcnQgaXMgcmVxdWlyZWQgc28gdGhhdCBsb2NhbCByZWZlcmVuY2VzIHRvIHRoZVxuICogdHlwZSByZXNvbHZlIChcIkB0eXBlIHtGb299XCIpLlxuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJ3R5cGVzY3JpcHQnO1xuXG5pbXBvcnQge2lzQW1iaWVudH0gZnJvbSAnLi9qc2RvY190cmFuc2Zvcm1lcic7XG5pbXBvcnQge2NyZWF0ZVNpbmdsZVF1b3RlU3RyaW5nTGl0ZXJhbCwgZ2V0SWRlbnRpZmllclRleHQsIGhhc01vZGlmaWVyRmxhZ30gZnJvbSAnLi90cmFuc2Zvcm1lcl91dGlsJztcblxuLyoqIGlzSW5OYW1lc3BhY2UgcmV0dXJucyB0cnVlIGlmIGFueSBvZiBub2RlJ3MgYW5jZXN0b3JzIGlzIGEgbmFtZXNwYWNlIChNb2R1bGVEZWNsYXJhdGlvbikuICovXG5mdW5jdGlvbiBpc0luTmFtZXNwYWNlKG5vZGU6IHRzLk5vZGUpIHtcbiAgLy8gTXVzdCB1c2UgdGhlIG9yaWdpbmFsIG5vZGUgYmVjYXVzZSBub2RlIG1pZ2h0IGhhdmUgYWxyZWFkeSBiZWVuIHRyYW5zZm9ybWVkLCB3aXRoIG5vZGUucGFyZW50XG4gIC8vIG5vIGxvbmdlciBiZWluZyBzZXQuXG4gIGxldCBwYXJlbnQgPSB0cy5nZXRPcmlnaW5hbE5vZGUobm9kZSkucGFyZW50O1xuICB3aGlsZSAocGFyZW50KSB7XG4gICAgaWYgKHBhcmVudC5raW5kID09PSB0cy5TeW50YXhLaW5kLk1vZHVsZURlY2xhcmF0aW9uKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudDtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogZ2V0RW51bU1lbWJlclR5cGUgY29tcHV0ZXMgdGhlIHR5cGUgb2YgYW4gZW51bSBtZW1iZXIgYnkgaW5zcGVjdGluZyBpdHMgaW5pdGlhbGl6ZXIgZXhwcmVzc2lvbi5cbiAqL1xuZnVuY3Rpb24gZ2V0RW51bU1lbWJlclR5cGUodHlwZUNoZWNrZXI6IHRzLlR5cGVDaGVja2VyLCBtZW1iZXI6IHRzLkVudW1NZW1iZXIpOiAnbnVtYmVyJ3wnc3RyaW5nJyB7XG4gIC8vIEVudW0gbWVtYmVycyB3aXRob3V0IGluaXRpYWxpemF0aW9uIGhhdmUgdHlwZSAnbnVtYmVyJ1xuICBpZiAoIW1lbWJlci5pbml0aWFsaXplcikge1xuICAgIHJldHVybiAnbnVtYmVyJztcbiAgfVxuICBjb25zdCB0eXBlID0gdHlwZUNoZWNrZXIuZ2V0VHlwZUF0TG9jYXRpb24obWVtYmVyLmluaXRpYWxpemVyKTtcbiAgLy8gTm90ZTogY2hlY2tpbmcgYWdhaW5zdCAnTnVtYmVyTGlrZScgaW5zdGVhZCBvZiBqdXN0ICdOdW1iZXInIG1lYW5zIHRoaXMgY29kZVxuICAvLyBoYW5kbGVzIGJvdGhcbiAgLy8gICBNRU1CRVIgPSAzLCAgLy8gVHlwZUZsYWdzLk51bWJlckxpdGVyYWxcbiAgLy8gYW5kXG4gIC8vICAgTUVNQkVSID0gc29tZUZ1bmN0aW9uKCksICAvLyBUeXBlRmxhZ3MuTnVtYmVyXG4gIGlmICh0eXBlLmZsYWdzICYgdHMuVHlwZUZsYWdzLk51bWJlckxpa2UpIHtcbiAgICByZXR1cm4gJ251bWJlcic7XG4gIH1cbiAgLy8gSWYgdGhlIHZhbHVlIGlzIG5vdCBhIG51bWJlciwgaXQgbXVzdCBiZSBhIHN0cmluZy5cbiAgLy8gVHlwZVNjcmlwdCBkb2VzIG5vdCBhbGxvdyBlbnVtIG1lbWJlcnMgdG8gaGF2ZSBhbnkgb3RoZXIgdHlwZS5cbiAgcmV0dXJuICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIGdldEVudW1UeXBlIGNvbXB1dGVzIHRoZSBDbG9zdXJlIHR5cGUgb2YgYW4gZW51bSwgYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIG1lbWJlcnMgYW5kIGdhdGhlcmluZ1xuICogdGhlaXIgdHlwZXMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnVtVHlwZSh0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsIGVudW1EZWNsOiB0cy5FbnVtRGVjbGFyYXRpb24pOiAnbnVtYmVyJ3xcbiAgICAnc3RyaW5nJ3wnPycge1xuICBsZXQgaGFzTnVtYmVyID0gZmFsc2U7XG4gIGxldCBoYXNTdHJpbmcgPSBmYWxzZTtcbiAgZm9yIChjb25zdCBtZW1iZXIgb2YgZW51bURlY2wubWVtYmVycykge1xuICAgIGNvbnN0IHR5cGUgPSBnZXRFbnVtTWVtYmVyVHlwZSh0eXBlQ2hlY2tlciwgbWVtYmVyKTtcbiAgICBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGhhc1N0cmluZyA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh0eXBlID09PSAnbnVtYmVyJykge1xuICAgICAgaGFzTnVtYmVyID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGhhc051bWJlciAmJiBoYXNTdHJpbmcpIHtcbiAgICByZXR1cm4gJz8nOyAgLy8gQ2xvc3VyZSdzIG5ldyB0eXBlIGluZmVyZW5jZSBkb2Vzbid0IHN1cHBvcnQgZW51bXMgb2YgdW5pb25zLlxuICB9IGVsc2UgaWYgKGhhc051bWJlcikge1xuICAgIHJldHVybiAnbnVtYmVyJztcbiAgfSBlbHNlIGlmIChoYXNTdHJpbmcpIHtcbiAgICByZXR1cm4gJ3N0cmluZyc7XG4gIH0gZWxzZSB7XG4gICAgLy8gUGVyaGFwcyBhbiBlbXB0eSBlbnVtP1xuICAgIHJldHVybiAnPyc7XG4gIH1cbn1cblxuLyoqXG4gKiBUcmFuc2Zvcm1lciBmYWN0b3J5IGZvciB0aGUgZW51bSB0cmFuc2Zvcm1lci4gU2VlIGZpbGVvdmVydmlldyBmb3IgZGV0YWlscy5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVudW1UcmFuc2Zvcm1lcih0eXBlQ2hlY2tlcjogdHMuVHlwZUNoZWNrZXIsIGRpYWdub3N0aWNzOiB0cy5EaWFnbm9zdGljW10pOlxuICAgIChjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpID0+IHRzLlRyYW5zZm9ybWVyPHRzLlNvdXJjZUZpbGU+IHtcbiAgcmV0dXJuIChjb250ZXh0OiB0cy5UcmFuc2Zvcm1hdGlvbkNvbnRleHQpID0+IHtcbiAgICBmdW5jdGlvbiB2aXNpdG9yPFQgZXh0ZW5kcyB0cy5Ob2RlPihub2RlOiBUKTogVHx0cy5Ob2RlW10ge1xuICAgICAgaWYgKCF0cy5pc0VudW1EZWNsYXJhdGlvbihub2RlKSkgcmV0dXJuIHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIHZpc2l0b3IsIGNvbnRleHQpO1xuXG4gICAgICAvLyBUT0RPKG1hcnRpbnByb2JzdCk6IFRoZSBlbnVtIHRyYW5zZm9ybWVyIGRvZXMgbm90IHdvcmsgZm9yIGVudW1zIGVtYmVkZGVkIGluIG5hbWVzcGFjZXMsXG4gICAgICAvLyBiZWNhdXNlIFRTIGRvZXMgbm90IHN1cHBvcnQgc3BsaXR0aW5nIGV4cG9ydCBhbmQgZGVjbGFyYXRpb24gKFwiZXhwb3J0IHtGb299O1wiKSBpblxuICAgICAgLy8gbmFtZXNwYWNlcy4gdHNpY2tsZSdzIGVtaXQgZm9yIG5hbWVzcGFjZXMgaXMgdW5pbnRlbGxpZ2libGUgZm9yIENsb3N1cmUgaW4gYW55IGNhc2UsIHNvXG4gICAgICAvLyB0aGlzIGlzIGxlZnQgdG8gZml4IGZvciBhbm90aGVyIGRheS5cbiAgICAgIGlmIChpc0luTmFtZXNwYWNlKG5vZGUpKSByZXR1cm4gdHMudmlzaXRFYWNoQ2hpbGQobm9kZSwgdmlzaXRvciwgY29udGV4dCk7XG5cbiAgICAgIC8vIFR5cGVTY3JpcHQgZG9lcyBub3QgZW1pdCBhbnkgY29kZSBmb3IgYW1iaWVudCBlbnVtcywgc28gZWFybHkgZXhpdCBoZXJlIHRvIHByZXZlbnQgdGhlIGNvZGVcbiAgICAgIC8vIGJlbG93IGZyb20gcHJvZHVjaW5nIHJ1bnRpbWUgdmFsdWVzIGZvciBhbiBhbWJpZW50IHN0cnVjdHVyZS5cbiAgICAgIGlmIChpc0FtYmllbnQobm9kZSkpIHJldHVybiB0cy52aXNpdEVhY2hDaGlsZChub2RlLCB2aXNpdG9yLCBjb250ZXh0KTtcblxuICAgICAgY29uc3QgbmFtZSA9IG5vZGUubmFtZS5nZXRUZXh0KCk7XG4gICAgICBjb25zdCBpc0V4cG9ydGVkID0gaGFzTW9kaWZpZXJGbGFnKG5vZGUsIHRzLk1vZGlmaWVyRmxhZ3MuRXhwb3J0KTtcbiAgICAgIGNvbnN0IGVudW1UeXBlID0gZ2V0RW51bVR5cGUodHlwZUNoZWNrZXIsIG5vZGUpO1xuXG4gICAgICBjb25zdCB2YWx1ZXM6IHRzLlByb3BlcnR5QXNzaWdubWVudFtdID0gW107XG4gICAgICBsZXQgZW51bUluZGV4ID0gMDtcbiAgICAgIGZvciAoY29uc3QgbWVtYmVyIG9mIG5vZGUubWVtYmVycykge1xuICAgICAgICBsZXQgZW51bVZhbHVlOiB0cy5FeHByZXNzaW9uO1xuICAgICAgICBpZiAobWVtYmVyLmluaXRpYWxpemVyKSB7XG4gICAgICAgICAgY29uc3QgZW51bUNvbnN0VmFsdWUgPSB0eXBlQ2hlY2tlci5nZXRDb25zdGFudFZhbHVlKG1lbWJlcik7XG4gICAgICAgICAgaWYgKHR5cGVvZiBlbnVtQ29uc3RWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIGVudW1JbmRleCA9IGVudW1Db25zdFZhbHVlICsgMTtcbiAgICAgICAgICAgIGVudW1WYWx1ZSA9IHRzLmNyZWF0ZUxpdGVyYWwoZW51bUNvbnN0VmFsdWUpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBOb24tbnVtZXJpYyBlbnVtIHZhbHVlIChzdHJpbmcgb3IgYW4gZXhwcmVzc2lvbikuXG4gICAgICAgICAgICAvLyBFbWl0IHRoaXMgaW5pdGlhbGl6ZXIgZXhwcmVzc2lvbiBhcy1pcy5cbiAgICAgICAgICAgIC8vIE5vdGU6IGlmIHRoZSBtZW1iZXIncyBpbml0aWFsaXplciBleHByZXNzaW9uIHJlZmVycyB0byBhbm90aGVyXG4gICAgICAgICAgICAvLyB2YWx1ZSB3aXRoaW4gdGhlIGVudW0gKGUuZy4gc29tZXRoaW5nIGxpa2VcbiAgICAgICAgICAgIC8vICAgZW51bSBGb28ge1xuICAgICAgICAgICAgLy8gICAgIEZpZWxkMSxcbiAgICAgICAgICAgIC8vICAgICBGaWVsZDIgPSBGaWVsZDEgKyBzb21ldGhpbmcoKSxcbiAgICAgICAgICAgIC8vICAgfVxuICAgICAgICAgICAgLy8gVGhlbiB3aGVuIHdlIGVtaXQgdGhlIGluaXRpYWxpemVyIHdlIHByb2R1Y2UgaW52YWxpZCBjb2RlIGJlY2F1c2VcbiAgICAgICAgICAgIC8vIG9uIHRoZSBDbG9zdXJlIHNpZGUgdGhlIHJlZmVyZW5jZSB0byBGaWVsZDEgaGFzIHRvIGJlIG5hbWVzcGFjZWQsXG4gICAgICAgICAgICAvLyBlLmcuIHdyaXR0ZW4gXCJGb28uRmllbGQxICsgc29tZXRoaW5nKClcIi5cbiAgICAgICAgICAgIC8vIEhvcGVmdWxseSB0aGlzIGRvZXNuJ3QgY29tZSB1cCBvZnRlbiAtLSBpZiB0aGUgZW51bSBpbnN0ZWFkIGhhc1xuICAgICAgICAgICAgLy8gc29tZXRoaW5nIGxpa2VcbiAgICAgICAgICAgIC8vICAgICBGaWVsZDIgPSBGaWVsZDEgKyAzLFxuICAgICAgICAgICAgLy8gdGhlbiBpdCdzIHN0aWxsIGEgY29uc3RhbnQgZXhwcmVzc2lvbiBhbmQgd2UgaW5saW5lIHRoZSBjb25zdGFudFxuICAgICAgICAgICAgLy8gdmFsdWUgaW4gdGhlIGFib3ZlIGJyYW5jaCBvZiB0aGlzIFwiaWZcIiBzdGF0ZW1lbnQuXG4gICAgICAgICAgICBlbnVtVmFsdWUgPSB2aXNpdG9yKG1lbWJlci5pbml0aWFsaXplcikgYXMgdHMuRXhwcmVzc2lvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW51bVZhbHVlID0gdHMuY3JlYXRlTGl0ZXJhbChlbnVtSW5kZXgpO1xuICAgICAgICAgIGVudW1JbmRleCsrO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IG1lbWJlck5hbWUgPSBtZW1iZXIubmFtZS5nZXRUZXh0KCk7XG4gICAgICAgIHZhbHVlcy5wdXNoKHRzLnNldE9yaWdpbmFsTm9kZShcbiAgICAgICAgICAgIHRzLnNldFRleHRSYW5nZSh0cy5jcmVhdGVQcm9wZXJ0eUFzc2lnbm1lbnQobWVtYmVyTmFtZSwgZW51bVZhbHVlKSwgbWVtYmVyKSwgbWVtYmVyKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhckRlY2wgPSB0cy5jcmVhdGVWYXJpYWJsZVN0YXRlbWVudChcbiAgICAgICAgICAvKiBtb2RpZmllcnMgKi8gdW5kZWZpbmVkLFxuICAgICAgICAgIHRzLmNyZWF0ZVZhcmlhYmxlRGVjbGFyYXRpb25MaXN0KFxuICAgICAgICAgICAgICBbdHMuY3JlYXRlVmFyaWFibGVEZWNsYXJhdGlvbihcbiAgICAgICAgICAgICAgICAgIG5hbWUsIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIHRzLmNyZWF0ZU9iamVjdExpdGVyYWwoXG4gICAgICAgICAgICAgICAgICAgICAgdHMuc2V0VGV4dFJhbmdlKHRzLmNyZWF0ZU5vZGVBcnJheSh2YWx1ZXMsIHRydWUpLCBub2RlLm1lbWJlcnMpLCB0cnVlKSldLFxuICAgICAgICAgICAgICAvKiBjcmVhdGUgYSBjb25zdCB2YXIgKi8gdHMuTm9kZUZsYWdzLkNvbnN0KSk7XG4gICAgICBjb25zdCBjb21tZW50OiB0cy5TeW50aGVzaXplZENvbW1lbnQgPSB7XG4gICAgICAgIGtpbmQ6IHRzLlN5bnRheEtpbmQuTXVsdGlMaW5lQ29tbWVudFRyaXZpYSxcbiAgICAgICAgdGV4dDogYCogQGVudW0geyR7ZW51bVR5cGV9fSBgLFxuICAgICAgICBoYXNUcmFpbGluZ05ld0xpbmU6IHRydWUsXG4gICAgICAgIHBvczogLTEsXG4gICAgICAgIGVuZDogLTFcbiAgICAgIH07XG4gICAgICB0cy5zZXRTeW50aGV0aWNMZWFkaW5nQ29tbWVudHModmFyRGVjbCwgW2NvbW1lbnRdKTtcblxuICAgICAgY29uc3QgcmVzdWx0Tm9kZXM6IHRzLk5vZGVbXSA9IFt2YXJEZWNsXTtcbiAgICAgIGlmIChpc0V4cG9ydGVkKSB7XG4gICAgICAgIC8vIENyZWF0ZSBhIHNlcGFyYXRlIGV4cG9ydCB7Li4ufSBzdGF0ZW1lbnQsIHNvIHRoYXQgdGhlIGVudW0gbmFtZSBjYW4gYmUgdXNlZCBpbiBsb2NhbFxuICAgICAgICAvLyB0eXBlIGFubm90YXRpb25zIHdpdGhpbiB0aGUgZmlsZS5cbiAgICAgICAgcmVzdWx0Tm9kZXMucHVzaCh0cy5jcmVhdGVFeHBvcnREZWNsYXJhdGlvbihcbiAgICAgICAgICAgIHVuZGVmaW5lZCwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgdHMuY3JlYXRlTmFtZWRFeHBvcnRzKFt0cy5jcmVhdGVFeHBvcnRTcGVjaWZpZXIodW5kZWZpbmVkLCBuYW1lKV0pKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChoYXNNb2RpZmllckZsYWcobm9kZSwgdHMuTW9kaWZpZXJGbGFncy5Db25zdCkpIHtcbiAgICAgICAgLy8gQnkgVHlwZVNjcmlwdCBzZW1hbnRpY3MsIGNvbnN0IGVudW1zIGRpc2FwcGVhciBhZnRlciBUUyBjb21waWxhdGlvbi5cbiAgICAgICAgLy8gV2Ugc3RpbGwgbmVlZCB0byBnZW5lcmF0ZSB0aGUgcnVudGltZSB2YWx1ZSBhYm92ZSB0byBtYWtlIENsb3N1cmUgQ29tcGlsZXIncyB0eXBlIHN5c3RlbVxuICAgICAgICAvLyBoYXBweSBhbmQgYWxsb3cgcmVmZXJpbmcgdG8gZW51bXMgZnJvbSBKUyBjb2RlLCBidXQgd2Ugc2hvdWxkIGF0IGxlYXN0IG5vdCBlbWl0IHN0cmluZ1xuICAgICAgICAvLyB2YWx1ZSBtYXBwaW5ncy5cbiAgICAgICAgcmV0dXJuIHJlc3VsdE5vZGVzO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IHRoZSByZXZlcnNlIG1hcHBpbmcgb2YgZm9vW2Zvby5CQVJdID0gJ0JBUic7IGxpbmVzIGZvciBudW1iZXIgZW51bSBtZW1iZXJzXG4gICAgICBmb3IgKGNvbnN0IG1lbWJlciBvZiBub2RlLm1lbWJlcnMpIHtcbiAgICAgICAgY29uc3QgbWVtYmVyTmFtZSA9IG1lbWJlci5uYW1lO1xuICAgICAgICBjb25zdCBtZW1iZXJUeXBlID0gZ2V0RW51bU1lbWJlclR5cGUodHlwZUNoZWNrZXIsIG1lbWJlcik7XG4gICAgICAgIGlmIChtZW1iZXJUeXBlICE9PSAnbnVtYmVyJykgY29udGludWU7XG5cbiAgICAgICAgLy8gVHlwZVNjcmlwdCBlbnVtIG1lbWJlcnMgY2FuIGhhdmUgSWRlbnRpZmllciBuYW1lcyBvciBTdHJpbmcgbmFtZXMuXG4gICAgICAgIC8vIFdlIG5lZWQgdG8gZW1pdCBzbGlnaHRseSBkaWZmZXJlbnQgY29kZSB0byBzdXBwb3J0IHRoZXNlIHR3byBzeW50YXhlczpcbiAgICAgICAgbGV0IG5hbWVFeHByOiB0cy5FeHByZXNzaW9uO1xuICAgICAgICBsZXQgbWVtYmVyQWNjZXNzOiB0cy5FeHByZXNzaW9uO1xuICAgICAgICBpZiAodHMuaXNJZGVudGlmaWVyKG1lbWJlck5hbWUpKSB7XG4gICAgICAgICAgLy8gRm9vW0Zvby5BQkNdID0gXCJBQkNcIjtcbiAgICAgICAgICBuYW1lRXhwciA9IGNyZWF0ZVNpbmdsZVF1b3RlU3RyaW5nTGl0ZXJhbChtZW1iZXJOYW1lLnRleHQpO1xuICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0byBjcmVhdGUgYSBjbGVhbiwgbmV3IGlkZW50aWZpZXIsIHNvIGNvbW1lbnRzIGRvIG5vdCBnZXQgZW1pdHRlZCB0d2ljZS5cbiAgICAgICAgICBjb25zdCBpZGVudCA9IHRzLmNyZWF0ZUlkZW50aWZpZXIoZ2V0SWRlbnRpZmllclRleHQobWVtYmVyTmFtZSkpO1xuICAgICAgICAgIG1lbWJlckFjY2VzcyA9IHRzLmNyZWF0ZVByb3BlcnR5QWNjZXNzKHRzLmNyZWF0ZUlkZW50aWZpZXIobmFtZSksIGlkZW50KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBGb29bRm9vW1wiQSBCIENcIl1dID0gXCJBIEIgQ1wiOyBvciBGb29bRm9vW2V4cHJlc3Npb25dXSA9IGV4cHJlc3Npb247XG4gICAgICAgICAgbmFtZUV4cHIgPSB0cy5pc0NvbXB1dGVkUHJvcGVydHlOYW1lKG1lbWJlck5hbWUpID8gbWVtYmVyTmFtZS5leHByZXNzaW9uIDogbWVtYmVyTmFtZTtcbiAgICAgICAgICBtZW1iZXJBY2Nlc3MgPSB0cy5jcmVhdGVFbGVtZW50QWNjZXNzKHRzLmNyZWF0ZUlkZW50aWZpZXIobmFtZSksIG5hbWVFeHByKTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHROb2Rlcy5wdXNoKHRzLmNyZWF0ZVN0YXRlbWVudCh0cy5jcmVhdGVBc3NpZ25tZW50KFxuICAgICAgICAgICAgdHMuY3JlYXRlRWxlbWVudEFjY2Vzcyh0cy5jcmVhdGVJZGVudGlmaWVyKG5hbWUpLCBtZW1iZXJBY2Nlc3MpLCBuYW1lRXhwcikpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHROb2RlcztcbiAgICB9XG5cbiAgICByZXR1cm4gKHNmOiB0cy5Tb3VyY2VGaWxlKSA9PiB2aXNpdG9yKHNmKSBhcyB0cy5Tb3VyY2VGaWxlO1xuICB9O1xufVxuIl19