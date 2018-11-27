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
        define("tsickle/src/quoting_transformer", ["require", "exports", "tsickle/src/transformer_util", "tsickle/src/type_translator", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var transformer_util_1 = require("tsickle/src/transformer_util");
    var type_translator_1 = require("tsickle/src/type_translator");
    var ts = require("tsickle/src/typescript");
    /**
     * quotingTransformer warns on quoted accesses to declared properties, and converts dotted property
     * accesses on types with a string index type to element accesses (quoted accesses).
     */
    // TODO(martinprobst): this code has surprising effects, and should probably rather generate an
    // error than silently changing code semantics behind the scenes.
    function quotingTransformer(host, typeChecker, diagnostics) {
        return function (context) {
            function visitor(node) {
                switch (node.kind) {
                    case ts.SyntaxKind.ElementAccessExpression:
                        // Warn for quoted accesses to properties that have a symbol declared.
                        // Mixing quoted and non-quoted access to a symbol (x['foo'] and x.foo) risks breaking
                        // Closure Compiler renaming. Quoted access is more cumbersome to write than dotted access
                        // though, so chances are users did intend to avoid renaming. The better fix is to use
                        // `declare interface` though.
                        var eae = node;
                        if (!eae.argumentExpression ||
                            eae.argumentExpression.kind !== ts.SyntaxKind.StringLiteral) {
                            break;
                        }
                        var quotedPropSym = typeChecker.getSymbolAtLocation(eae.argumentExpression);
                        // If it has a symbol, it's actually a regular declared property.
                        if (!quotedPropSym)
                            break;
                        var declarationHasQuotes = !quotedPropSym.declarations || quotedPropSym.declarations.some(function (d) {
                            var decl = d;
                            if (!decl.name)
                                return false;
                            return decl.name.kind === ts.SyntaxKind.StringLiteral;
                        });
                        // If the property is declared with quotes, it should also be accessed with them.
                        if (declarationHasQuotes)
                            break;
                        var propName = eae.argumentExpression.text;
                        // Properties containing non-JS identifier names can only be accessed with quotes.
                        if (!type_translator_1.isValidClosurePropertyName(propName))
                            break;
                        var symName = typeChecker.symbolToString(quotedPropSym);
                        transformer_util_1.reportDebugWarning(host, eae, "Declared property " + symName + " accessed with quotes. " +
                            "This can lead to renaming bugs. A better fix is to use 'declare interface' " +
                            "on the declaration.");
                        // Previously, the code below changed the quoted into a non-quoted access.
                        // this.writeNode(eae.expression);
                        // this.emit(`.${propName}`);
                        break;
                    case ts.SyntaxKind.PropertyAccessExpression:
                        // Convert dotted accesses to types that have an index type declared to quoted accesses,
                        // to avoid Closure renaming one access but not the other. This can happen because TS
                        // allows dotted access to string index types.
                        var pae = node;
                        var t = typeChecker.getTypeAtLocation(pae.expression);
                        if (!t.getStringIndexType())
                            break;
                        // Types can have string index signatures and declared properties (of the matching type).
                        // These properties have a symbol, as opposed to pure string index types.
                        var propSym = typeChecker.getSymbolAtLocation(pae.name);
                        // The decision to return below is a judgement call. Presumably, in most situations,
                        // dotted access to a property is correct, and should not be turned into quoted access
                        // even if there is a string index on the type. However it is possible to construct
                        // programs where this is incorrect, e.g. where user code assigns into a property through
                        // the index access in another location.
                        if (propSym)
                            break;
                        transformer_util_1.reportDebugWarning(host, pae, typeChecker.typeToString(t) +
                            " has a string index type but is accessed using dotted access. " +
                            "Quoting the access.");
                        return ts.setOriginalNode(ts.createElementAccess(ts.visitNode(pae.expression, visitor), transformer_util_1.createSingleQuoteStringLiteral(pae.name.text)), node);
                    default:
                        break;
                }
                return ts.visitEachChild(node, visitor, context);
            }
            return function (sourceFile) { return ts.visitEachChild(sourceFile, visitor, context); };
        };
    }
    exports.quotingTransformer = quotingTransformer;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVvdGluZ190cmFuc2Zvcm1lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9xdW90aW5nX3RyYW5zZm9ybWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7O0lBR0gsaUVBQXNGO0lBQ3RGLCtEQUE2RDtJQUM3RCwyQ0FBbUM7SUFFbkM7OztPQUdHO0lBQ0gsK0ZBQStGO0lBQy9GLGlFQUFpRTtJQUNqRSw0QkFDSSxJQUFtQixFQUFFLFdBQTJCLEVBQUUsV0FBNEI7UUFFaEYsT0FBTyxVQUFDLE9BQWlDO1lBQ3ZDLGlCQUFpQixJQUFhO2dCQUM1QixRQUFRLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pCLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUI7d0JBQ3hDLHNFQUFzRTt3QkFDdEUsc0ZBQXNGO3dCQUN0RiwwRkFBMEY7d0JBQzFGLHNGQUFzRjt3QkFDdEYsOEJBQThCO3dCQUM5QixJQUFNLEdBQUcsR0FBRyxJQUFrQyxDQUFDO3dCQUMvQyxJQUFJLENBQUMsR0FBRyxDQUFDLGtCQUFrQjs0QkFDdkIsR0FBRyxDQUFDLGtCQUFrQixDQUFDLElBQUksS0FBSyxFQUFFLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRTs0QkFDL0QsTUFBTTt5QkFDUDt3QkFDRCxJQUFNLGFBQWEsR0FBRyxXQUFXLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLGtCQUFrQixDQUFDLENBQUM7d0JBQzlFLGlFQUFpRTt3QkFDakUsSUFBSSxDQUFDLGFBQWE7NEJBQUUsTUFBTTt3QkFDMUIsSUFBTSxvQkFBb0IsR0FDdEIsQ0FBQyxhQUFhLENBQUMsWUFBWSxJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQUEsQ0FBQzs0QkFDOUQsSUFBTSxJQUFJLEdBQUcsQ0FBd0IsQ0FBQzs0QkFDdEMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJO2dDQUFFLE9BQU8sS0FBSyxDQUFDOzRCQUM3QixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDO3dCQUN4RCxDQUFDLENBQUMsQ0FBQzt3QkFDUCxpRkFBaUY7d0JBQ2pGLElBQUksb0JBQW9COzRCQUFFLE1BQU07d0JBQ2hDLElBQU0sUUFBUSxHQUFJLEdBQUcsQ0FBQyxrQkFBdUMsQ0FBQyxJQUFJLENBQUM7d0JBQ25FLGtGQUFrRjt3QkFDbEYsSUFBSSxDQUFDLDRDQUEwQixDQUFDLFFBQVEsQ0FBQzs0QkFBRSxNQUFNO3dCQUNqRCxJQUFNLE9BQU8sR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDO3dCQUMxRCxxQ0FBa0IsQ0FDZCxJQUFJLEVBQUUsR0FBRyxFQUNULHVCQUFxQixPQUFPLDRCQUF5Qjs0QkFDakQsNkVBQTZFOzRCQUM3RSxxQkFBcUIsQ0FBQyxDQUFDO3dCQUMvQiwwRUFBMEU7d0JBQzFFLGtDQUFrQzt3QkFDbEMsNkJBQTZCO3dCQUM3QixNQUFNO29CQUNSLEtBQUssRUFBRSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0I7d0JBQ3pDLHdGQUF3Rjt3QkFDeEYscUZBQXFGO3dCQUNyRiw4Q0FBOEM7d0JBQzlDLElBQU0sR0FBRyxHQUFHLElBQW1DLENBQUM7d0JBQ2hELElBQU0sQ0FBQyxHQUFHLFdBQVcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7d0JBQ3hELElBQUksQ0FBQyxDQUFDLENBQUMsa0JBQWtCLEVBQUU7NEJBQUUsTUFBTTt3QkFDbkMseUZBQXlGO3dCQUN6Rix5RUFBeUU7d0JBQ3pFLElBQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQzFELG9GQUFvRjt3QkFDcEYsc0ZBQXNGO3dCQUN0RixtRkFBbUY7d0JBQ25GLHlGQUF5Rjt3QkFDekYsd0NBQXdDO3dCQUN4QyxJQUFJLE9BQU87NEJBQUUsTUFBTTt3QkFFbkIscUNBQWtCLENBQ2QsSUFBSSxFQUFFLEdBQUcsRUFDVCxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsZ0VBQWdFOzRCQUNoRSxxQkFBcUIsQ0FBQyxDQUFDO3dCQUMvQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQ3JCLEVBQUUsQ0FBQyxtQkFBbUIsQ0FDbEIsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxFQUNyQyxpREFBOEIsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2xELElBQUksQ0FBQyxDQUFDO29CQUNaO3dCQUNFLE1BQU07aUJBQ1Q7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUNELE9BQU8sVUFBQyxVQUF5QixJQUFLLE9BQUEsRUFBRSxDQUFDLGNBQWMsQ0FBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxFQUEvQyxDQUErQyxDQUFDO1FBQ3hGLENBQUMsQ0FBQztJQUNKLENBQUM7SUEzRUQsZ0RBMkVDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0Fubm90YXRvckhvc3R9IGZyb20gJy4vanNkb2NfdHJhbnNmb3JtZXInO1xuaW1wb3J0IHtjcmVhdGVTaW5nbGVRdW90ZVN0cmluZ0xpdGVyYWwsIHJlcG9ydERlYnVnV2FybmluZ30gZnJvbSAnLi90cmFuc2Zvcm1lcl91dGlsJztcbmltcG9ydCB7aXNWYWxpZENsb3N1cmVQcm9wZXJ0eU5hbWV9IGZyb20gJy4vdHlwZV90cmFuc2xhdG9yJztcbmltcG9ydCAqIGFzIHRzIGZyb20gJy4vdHlwZXNjcmlwdCc7XG5cbi8qKlxuICogcXVvdGluZ1RyYW5zZm9ybWVyIHdhcm5zIG9uIHF1b3RlZCBhY2Nlc3NlcyB0byBkZWNsYXJlZCBwcm9wZXJ0aWVzLCBhbmQgY29udmVydHMgZG90dGVkIHByb3BlcnR5XG4gKiBhY2Nlc3NlcyBvbiB0eXBlcyB3aXRoIGEgc3RyaW5nIGluZGV4IHR5cGUgdG8gZWxlbWVudCBhY2Nlc3NlcyAocXVvdGVkIGFjY2Vzc2VzKS5cbiAqL1xuLy8gVE9ETyhtYXJ0aW5wcm9ic3QpOiB0aGlzIGNvZGUgaGFzIHN1cnByaXNpbmcgZWZmZWN0cywgYW5kIHNob3VsZCBwcm9iYWJseSByYXRoZXIgZ2VuZXJhdGUgYW5cbi8vIGVycm9yIHRoYW4gc2lsZW50bHkgY2hhbmdpbmcgY29kZSBzZW1hbnRpY3MgYmVoaW5kIHRoZSBzY2VuZXMuXG5leHBvcnQgZnVuY3Rpb24gcXVvdGluZ1RyYW5zZm9ybWVyKFxuICAgIGhvc3Q6IEFubm90YXRvckhvc3QsIHR5cGVDaGVja2VyOiB0cy5UeXBlQ2hlY2tlciwgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSk6XG4gICAgKGNvbnRleHQ6IHRzLlRyYW5zZm9ybWF0aW9uQ29udGV4dCkgPT4gdHMuVHJhbnNmb3JtZXI8dHMuU291cmNlRmlsZT4ge1xuICByZXR1cm4gKGNvbnRleHQ6IHRzLlRyYW5zZm9ybWF0aW9uQ29udGV4dCk6IHRzLlRyYW5zZm9ybWVyPHRzLlNvdXJjZUZpbGU+ID0+IHtcbiAgICBmdW5jdGlvbiB2aXNpdG9yKG5vZGU6IHRzLk5vZGUpOiB0cy5Ob2RlIHtcbiAgICAgIHN3aXRjaCAobm9kZS5raW5kKSB7XG4gICAgICAgIGNhc2UgdHMuU3ludGF4S2luZC5FbGVtZW50QWNjZXNzRXhwcmVzc2lvbjpcbiAgICAgICAgICAvLyBXYXJuIGZvciBxdW90ZWQgYWNjZXNzZXMgdG8gcHJvcGVydGllcyB0aGF0IGhhdmUgYSBzeW1ib2wgZGVjbGFyZWQuXG4gICAgICAgICAgLy8gTWl4aW5nIHF1b3RlZCBhbmQgbm9uLXF1b3RlZCBhY2Nlc3MgdG8gYSBzeW1ib2wgKHhbJ2ZvbyddIGFuZCB4LmZvbykgcmlza3MgYnJlYWtpbmdcbiAgICAgICAgICAvLyBDbG9zdXJlIENvbXBpbGVyIHJlbmFtaW5nLiBRdW90ZWQgYWNjZXNzIGlzIG1vcmUgY3VtYmVyc29tZSB0byB3cml0ZSB0aGFuIGRvdHRlZCBhY2Nlc3NcbiAgICAgICAgICAvLyB0aG91Z2gsIHNvIGNoYW5jZXMgYXJlIHVzZXJzIGRpZCBpbnRlbmQgdG8gYXZvaWQgcmVuYW1pbmcuIFRoZSBiZXR0ZXIgZml4IGlzIHRvIHVzZVxuICAgICAgICAgIC8vIGBkZWNsYXJlIGludGVyZmFjZWAgdGhvdWdoLlxuICAgICAgICAgIGNvbnN0IGVhZSA9IG5vZGUgYXMgdHMuRWxlbWVudEFjY2Vzc0V4cHJlc3Npb247XG4gICAgICAgICAgaWYgKCFlYWUuYXJndW1lbnRFeHByZXNzaW9uIHx8XG4gICAgICAgICAgICAgIGVhZS5hcmd1bWVudEV4cHJlc3Npb24ua2luZCAhPT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcXVvdGVkUHJvcFN5bSA9IHR5cGVDaGVja2VyLmdldFN5bWJvbEF0TG9jYXRpb24oZWFlLmFyZ3VtZW50RXhwcmVzc2lvbik7XG4gICAgICAgICAgLy8gSWYgaXQgaGFzIGEgc3ltYm9sLCBpdCdzIGFjdHVhbGx5IGEgcmVndWxhciBkZWNsYXJlZCBwcm9wZXJ0eS5cbiAgICAgICAgICBpZiAoIXF1b3RlZFByb3BTeW0pIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IGRlY2xhcmF0aW9uSGFzUXVvdGVzID1cbiAgICAgICAgICAgICAgIXF1b3RlZFByb3BTeW0uZGVjbGFyYXRpb25zIHx8IHF1b3RlZFByb3BTeW0uZGVjbGFyYXRpb25zLnNvbWUoZCA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGVjbCA9IGQgYXMgdHMuTmFtZWREZWNsYXJhdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoIWRlY2wubmFtZSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIHJldHVybiBkZWNsLm5hbWUua2luZCA9PT0gdHMuU3ludGF4S2luZC5TdHJpbmdMaXRlcmFsO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBJZiB0aGUgcHJvcGVydHkgaXMgZGVjbGFyZWQgd2l0aCBxdW90ZXMsIGl0IHNob3VsZCBhbHNvIGJlIGFjY2Vzc2VkIHdpdGggdGhlbS5cbiAgICAgICAgICBpZiAoZGVjbGFyYXRpb25IYXNRdW90ZXMpIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IHByb3BOYW1lID0gKGVhZS5hcmd1bWVudEV4cHJlc3Npb24gYXMgdHMuU3RyaW5nTGl0ZXJhbCkudGV4dDtcbiAgICAgICAgICAvLyBQcm9wZXJ0aWVzIGNvbnRhaW5pbmcgbm9uLUpTIGlkZW50aWZpZXIgbmFtZXMgY2FuIG9ubHkgYmUgYWNjZXNzZWQgd2l0aCBxdW90ZXMuXG4gICAgICAgICAgaWYgKCFpc1ZhbGlkQ2xvc3VyZVByb3BlcnR5TmFtZShwcm9wTmFtZSkpIGJyZWFrO1xuICAgICAgICAgIGNvbnN0IHN5bU5hbWUgPSB0eXBlQ2hlY2tlci5zeW1ib2xUb1N0cmluZyhxdW90ZWRQcm9wU3ltKTtcbiAgICAgICAgICByZXBvcnREZWJ1Z1dhcm5pbmcoXG4gICAgICAgICAgICAgIGhvc3QsIGVhZSxcbiAgICAgICAgICAgICAgYERlY2xhcmVkIHByb3BlcnR5ICR7c3ltTmFtZX0gYWNjZXNzZWQgd2l0aCBxdW90ZXMuIGAgK1xuICAgICAgICAgICAgICAgICAgYFRoaXMgY2FuIGxlYWQgdG8gcmVuYW1pbmcgYnVncy4gQSBiZXR0ZXIgZml4IGlzIHRvIHVzZSAnZGVjbGFyZSBpbnRlcmZhY2UnIGAgK1xuICAgICAgICAgICAgICAgICAgYG9uIHRoZSBkZWNsYXJhdGlvbi5gKTtcbiAgICAgICAgICAvLyBQcmV2aW91c2x5LCB0aGUgY29kZSBiZWxvdyBjaGFuZ2VkIHRoZSBxdW90ZWQgaW50byBhIG5vbi1xdW90ZWQgYWNjZXNzLlxuICAgICAgICAgIC8vIHRoaXMud3JpdGVOb2RlKGVhZS5leHByZXNzaW9uKTtcbiAgICAgICAgICAvLyB0aGlzLmVtaXQoYC4ke3Byb3BOYW1lfWApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIHRzLlN5bnRheEtpbmQuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uOlxuICAgICAgICAgIC8vIENvbnZlcnQgZG90dGVkIGFjY2Vzc2VzIHRvIHR5cGVzIHRoYXQgaGF2ZSBhbiBpbmRleCB0eXBlIGRlY2xhcmVkIHRvIHF1b3RlZCBhY2Nlc3NlcyxcbiAgICAgICAgICAvLyB0byBhdm9pZCBDbG9zdXJlIHJlbmFtaW5nIG9uZSBhY2Nlc3MgYnV0IG5vdCB0aGUgb3RoZXIuIFRoaXMgY2FuIGhhcHBlbiBiZWNhdXNlIFRTXG4gICAgICAgICAgLy8gYWxsb3dzIGRvdHRlZCBhY2Nlc3MgdG8gc3RyaW5nIGluZGV4IHR5cGVzLlxuICAgICAgICAgIGNvbnN0IHBhZSA9IG5vZGUgYXMgdHMuUHJvcGVydHlBY2Nlc3NFeHByZXNzaW9uO1xuICAgICAgICAgIGNvbnN0IHQgPSB0eXBlQ2hlY2tlci5nZXRUeXBlQXRMb2NhdGlvbihwYWUuZXhwcmVzc2lvbik7XG4gICAgICAgICAgaWYgKCF0LmdldFN0cmluZ0luZGV4VHlwZSgpKSBicmVhaztcbiAgICAgICAgICAvLyBUeXBlcyBjYW4gaGF2ZSBzdHJpbmcgaW5kZXggc2lnbmF0dXJlcyBhbmQgZGVjbGFyZWQgcHJvcGVydGllcyAob2YgdGhlIG1hdGNoaW5nIHR5cGUpLlxuICAgICAgICAgIC8vIFRoZXNlIHByb3BlcnRpZXMgaGF2ZSBhIHN5bWJvbCwgYXMgb3Bwb3NlZCB0byBwdXJlIHN0cmluZyBpbmRleCB0eXBlcy5cbiAgICAgICAgICBjb25zdCBwcm9wU3ltID0gdHlwZUNoZWNrZXIuZ2V0U3ltYm9sQXRMb2NhdGlvbihwYWUubmFtZSk7XG4gICAgICAgICAgLy8gVGhlIGRlY2lzaW9uIHRvIHJldHVybiBiZWxvdyBpcyBhIGp1ZGdlbWVudCBjYWxsLiBQcmVzdW1hYmx5LCBpbiBtb3N0IHNpdHVhdGlvbnMsXG4gICAgICAgICAgLy8gZG90dGVkIGFjY2VzcyB0byBhIHByb3BlcnR5IGlzIGNvcnJlY3QsIGFuZCBzaG91bGQgbm90IGJlIHR1cm5lZCBpbnRvIHF1b3RlZCBhY2Nlc3NcbiAgICAgICAgICAvLyBldmVuIGlmIHRoZXJlIGlzIGEgc3RyaW5nIGluZGV4IG9uIHRoZSB0eXBlLiBIb3dldmVyIGl0IGlzIHBvc3NpYmxlIHRvIGNvbnN0cnVjdFxuICAgICAgICAgIC8vIHByb2dyYW1zIHdoZXJlIHRoaXMgaXMgaW5jb3JyZWN0LCBlLmcuIHdoZXJlIHVzZXIgY29kZSBhc3NpZ25zIGludG8gYSBwcm9wZXJ0eSB0aHJvdWdoXG4gICAgICAgICAgLy8gdGhlIGluZGV4IGFjY2VzcyBpbiBhbm90aGVyIGxvY2F0aW9uLlxuICAgICAgICAgIGlmIChwcm9wU3ltKSBicmVhaztcblxuICAgICAgICAgIHJlcG9ydERlYnVnV2FybmluZyhcbiAgICAgICAgICAgICAgaG9zdCwgcGFlLFxuICAgICAgICAgICAgICB0eXBlQ2hlY2tlci50eXBlVG9TdHJpbmcodCkgK1xuICAgICAgICAgICAgICAgICAgYCBoYXMgYSBzdHJpbmcgaW5kZXggdHlwZSBidXQgaXMgYWNjZXNzZWQgdXNpbmcgZG90dGVkIGFjY2Vzcy4gYCArXG4gICAgICAgICAgICAgICAgICBgUXVvdGluZyB0aGUgYWNjZXNzLmApO1xuICAgICAgICAgIHJldHVybiB0cy5zZXRPcmlnaW5hbE5vZGUoXG4gICAgICAgICAgICAgIHRzLmNyZWF0ZUVsZW1lbnRBY2Nlc3MoXG4gICAgICAgICAgICAgICAgICB0cy52aXNpdE5vZGUocGFlLmV4cHJlc3Npb24sIHZpc2l0b3IpLFxuICAgICAgICAgICAgICAgICAgY3JlYXRlU2luZ2xlUXVvdGVTdHJpbmdMaXRlcmFsKHBhZS5uYW1lLnRleHQpKSxcbiAgICAgICAgICAgICAgbm9kZSk7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHMudmlzaXRFYWNoQ2hpbGQobm9kZSwgdmlzaXRvciwgY29udGV4dCk7XG4gICAgfVxuICAgIHJldHVybiAoc291cmNlRmlsZTogdHMuU291cmNlRmlsZSkgPT4gdHMudmlzaXRFYWNoQ2hpbGQoc291cmNlRmlsZSwgdmlzaXRvciwgY29udGV4dCk7XG4gIH07XG59XG4iXX0=