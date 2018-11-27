/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/transformer_util", ["require", "exports", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("tsickle/src/typescript");
    /** @return true if node has the specified modifier flag set. */
    function hasModifierFlag(declaration, flag) {
        return (ts.getCombinedModifierFlags(declaration) & flag) !== 0;
    }
    exports.hasModifierFlag = hasModifierFlag;
    /** Returns true if fileName is a .d.ts file. */
    function isDtsFileName(fileName) {
        return fileName.endsWith('.d.ts');
    }
    exports.isDtsFileName = isDtsFileName;
    /** Returns the string contents of a ts.Identifier. */
    function getIdentifierText(identifier) {
        // NOTE: 'escapedText' on an Identifier may be escaped if it starts with '__'. The alternative,
        // getText(), cannot be used on synthesized nodes, so unescape the identifier below.
        return unescapeName(identifier.escapedText);
    }
    exports.getIdentifierText = getIdentifierText;
    /** Returns a dot-joined qualified name (foo.bar.Baz). */
    function getEntityNameText(name) {
        if (ts.isIdentifier(name)) {
            return getIdentifierText(name);
        }
        return getEntityNameText(name.left) + '.' + getIdentifierText(name.right);
    }
    exports.getEntityNameText = getEntityNameText;
    /**
     * Converts an escaped TypeScript name into the original source name.
     */
    function unescapeName(name) {
        // See the private function unescapeIdentifier in TypeScript's utilities.ts.
        var str = name;
        if (str.startsWith('___'))
            return str.substring(1);
        return str;
    }
    exports.unescapeName = unescapeName;
    /**
     * ts.createNotEmittedStatement will create a node, but the comments covered by its text range are
     * never emittedm except for very specific special cases (/// comments).
     *
     * createNotEmittedStatementWithComments creates a not emitted statement and adds comment ranges
     * from the original statement as synthetic comments to it, so that they get retained in the output.
     */
    function createNotEmittedStatementWithComments(sourceFile, original) {
        var replacement = ts.createNotEmittedStatement(original);
        // NB: synthetic nodes can have pos/end == -1. This is handled by the underlying implementation.
        var leading = ts.getLeadingCommentRanges(sourceFile.text, original.pos) || [];
        var trailing = ts.getTrailingCommentRanges(sourceFile.text, original.end) || [];
        replacement =
            ts.setSyntheticLeadingComments(replacement, synthesizeCommentRanges(sourceFile, leading));
        replacement =
            ts.setSyntheticTrailingComments(replacement, synthesizeCommentRanges(sourceFile, trailing));
        return replacement;
    }
    exports.createNotEmittedStatementWithComments = createNotEmittedStatementWithComments;
    /**
     * Converts `ts.CommentRange`s into `ts.SynthesizedComment`s.
     */
    function synthesizeCommentRanges(sourceFile, parsedComments) {
        var synthesizedComments = [];
        parsedComments.forEach(function (_a, commentIdx) {
            var kind = _a.kind, pos = _a.pos, end = _a.end, hasTrailingNewLine = _a.hasTrailingNewLine;
            var commentText = sourceFile.text.substring(pos, end).trim();
            if (kind === ts.SyntaxKind.MultiLineCommentTrivia) {
                commentText = commentText.replace(/(^\/\*)|(\*\/$)/g, '');
            }
            else if (kind === ts.SyntaxKind.SingleLineCommentTrivia) {
                if (commentText.startsWith('///')) {
                    // triple-slash comments are typescript specific, ignore them in the output.
                    return;
                }
                commentText = commentText.replace(/(^\/\/)/g, '');
            }
            synthesizedComments.push({ kind: kind, text: commentText, hasTrailingNewLine: hasTrailingNewLine, pos: -1, end: -1 });
        });
        return synthesizedComments;
    }
    exports.synthesizeCommentRanges = synthesizeCommentRanges;
    /**
     * Creates a non emitted statement that can be used to store synthesized comments.
     */
    function createNotEmittedStatement(sourceFile) {
        var stmt = ts.createNotEmittedStatement(sourceFile);
        ts.setOriginalNode(stmt, undefined);
        ts.setTextRange(stmt, { pos: 0, end: 0 });
        ts.setEmitFlags(stmt, ts.EmitFlags.CustomPrologue);
        return stmt;
    }
    exports.createNotEmittedStatement = createNotEmittedStatement;
    /**
     * This is a version of `ts.visitEachChild` that works that calls our version
     * of `updateSourceFileNode`, so that typescript doesn't lose type information
     * for property decorators.
     * See https://github.com/Microsoft/TypeScript/issues/17384
     *
     * @param sf
     * @param statements
     */
    function visitEachChild(node, visitor, context) {
        if (node.kind === ts.SyntaxKind.SourceFile) {
            var sf = node;
            return updateSourceFileNode(sf, ts.visitLexicalEnvironment(sf.statements, visitor, context));
        }
        return ts.visitEachChild(node, visitor, context);
    }
    exports.visitEachChild = visitEachChild;
    /**
     * This is a version of `ts.updateSourceFileNode` that works
     * well with property decorators.
     * See https://github.com/Microsoft/TypeScript/issues/17384
     * TODO(#634): This has been fixed in TS 2.5. Investigate removal.
     *
     * @param sf
     * @param statements
     */
    function updateSourceFileNode(sf, statements) {
        if (statements === sf.statements) {
            return sf;
        }
        // Note: Need to clone the original file (and not use `ts.updateSourceFileNode`)
        // as otherwise TS fails when resolving types for decorators.
        sf = ts.getMutableClone(sf);
        sf.statements = statements;
        return sf;
    }
    exports.updateSourceFileNode = updateSourceFileNode;
    // Copied from TypeScript
    function isTypeNodeKind(kind) {
        return (kind >= ts.SyntaxKind.FirstTypeNode && kind <= ts.SyntaxKind.LastTypeNode) ||
            kind === ts.SyntaxKind.AnyKeyword || kind === ts.SyntaxKind.NumberKeyword ||
            kind === ts.SyntaxKind.ObjectKeyword || kind === ts.SyntaxKind.BooleanKeyword ||
            kind === ts.SyntaxKind.StringKeyword || kind === ts.SyntaxKind.SymbolKeyword ||
            kind === ts.SyntaxKind.ThisKeyword || kind === ts.SyntaxKind.VoidKeyword ||
            kind === ts.SyntaxKind.UndefinedKeyword || kind === ts.SyntaxKind.NullKeyword ||
            kind === ts.SyntaxKind.NeverKeyword || kind === ts.SyntaxKind.ExpressionWithTypeArguments;
    }
    exports.isTypeNodeKind = isTypeNodeKind;
    /**
     * Creates a string literal that uses single quotes. Purely cosmetic, but increases fidelity to the
     * existing test suite.
     */
    function createSingleQuoteStringLiteral(text) {
        var stringLiteral = ts.createLiteral(text);
        // tslint:disable-next-line:no-any accessing TS internal API.
        stringLiteral.singleQuote = true;
        return stringLiteral;
    }
    exports.createSingleQuoteStringLiteral = createSingleQuoteStringLiteral;
    /** Creates a not emitted statement with the given text as a single line comment. */
    function createSingleLineComment(original, text) {
        var comment = {
            kind: ts.SyntaxKind.SingleLineCommentTrivia,
            text: ' ' + text,
            hasTrailingNewLine: true,
            pos: -1,
            end: -1,
        };
        return ts.setSyntheticTrailingComments(ts.createNotEmittedStatement(original), [comment]);
    }
    exports.createSingleLineComment = createSingleLineComment;
    /** Creates a not emitted statement with the given text as a single line comment. */
    function createMultiLineComment(original, text) {
        var comment = {
            kind: ts.SyntaxKind.MultiLineCommentTrivia,
            text: ' ' + text,
            hasTrailingNewLine: true,
            pos: -1,
            end: -1,
        };
        return ts.setSyntheticTrailingComments(ts.createNotEmittedStatement(original), [comment]);
    }
    exports.createMultiLineComment = createMultiLineComment;
    /**
     * debugWarn logs a debug warning.
     *
     * These should only be used for cases where tsickle is making a questionable judgement about what
     * to do. By default, tsickle does not report any warnings to the caller, and warnings are hidden
     * behind a debug flag, as warnings are only for tsickle to debug itself.
     */
    function reportDebugWarning(host, node, messageText) {
        if (!host.logWarning)
            return;
        host.logWarning(createDiagnostic(node, messageText, /* textRange */ undefined, ts.DiagnosticCategory.Warning));
    }
    exports.reportDebugWarning = reportDebugWarning;
    /**
     * Creates and reports a diagnostic by adding it to the given array.
     *
     * This is used for errors and warnings in tsickle's input. Emit errors (the default) if tsickle
     * cannot emit a correct result given the input. Emit warnings for questionable input if there's a
     * good chance that the output will work.
     *
     * For typical tsickle users, errors are always reported and break the compilation operation,
     * warnings will only be emitted for first party code (and break the compilation there), but wil be
     * ignored for third party code.
     *
     * @param textRange pass to overrride the text range from the node with a more specific range.
     */
    function reportDiagnostic(diagnostics, node, messageText, textRange, category) {
        if (category === void 0) { category = ts.DiagnosticCategory.Error; }
        diagnostics.push(createDiagnostic(node, messageText, textRange, category));
    }
    exports.reportDiagnostic = reportDiagnostic;
    function createDiagnostic(node, messageText, textRange, category) {
        var start, length;
        if (textRange) {
            start = textRange.pos;
            length = textRange.end - textRange.pos;
        }
        else {
            // Only use getStart if node has a valid pos, as it might be synthesized.
            start = node.pos >= 0 ? node.getStart() : 0;
            length = node.end - node.pos;
        }
        return {
            file: node.getSourceFile(),
            start: start,
            length: length,
            messageText: messageText,
            category: category,
            code: 0,
        };
    }
    /**
     * A replacement for ts.getLeadingCommentRanges that returns the union of synthetic and
     * non-synthetic comments on the given node, with their text included. The returned comments must
     * not be mutated, as their content might or might not be reflected back into the AST.
     */
    function getAllLeadingComments(node) {
        var allRanges = [];
        var nodeText = node.getFullText();
        var cr = ts.getLeadingCommentRanges(nodeText, 0);
        if (cr)
            allRanges.push.apply(allRanges, __spread(cr.map(function (c) { return (__assign({}, c, { text: nodeText.substring(c.pos, c.end) })); })));
        var synthetic = ts.getSyntheticLeadingComments(node);
        if (synthetic)
            allRanges.push.apply(allRanges, __spread(synthetic));
        return allRanges;
    }
    exports.getAllLeadingComments = getAllLeadingComments;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtZXJfdXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy90cmFuc2Zvcm1lcl91dGlsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUVILDJDQUFtQztJQUVuQyxnRUFBZ0U7SUFDaEUseUJBQWdDLFdBQTJCLEVBQUUsSUFBc0I7UUFDakYsT0FBTyxDQUFDLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDakUsQ0FBQztJQUZELDBDQUVDO0lBRUQsZ0RBQWdEO0lBQ2hELHVCQUE4QixRQUFnQjtRQUM1QyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztJQUZELHNDQUVDO0lBRUQsc0RBQXNEO0lBQ3RELDJCQUFrQyxVQUF5QjtRQUN6RCwrRkFBK0Y7UUFDL0Ysb0ZBQW9GO1FBQ3BGLE9BQU8sWUFBWSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBSkQsOENBSUM7SUFFRCx5REFBeUQ7SUFDekQsMkJBQWtDLElBQW1CO1FBQ25ELElBQUksRUFBRSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUN6QixPQUFPLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO1FBQ0QsT0FBTyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1RSxDQUFDO0lBTEQsOENBS0M7SUFFRDs7T0FFRztJQUNILHNCQUE2QixJQUFpQjtRQUM1Qyw0RUFBNEU7UUFDNUUsSUFBTSxHQUFHLEdBQUcsSUFBYyxDQUFDO1FBQzNCLElBQUksR0FBRyxDQUFDLFVBQVUs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QixDQUFDO0lBVEQsc0RBU0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCAqIGFzIHRzIGZyb20gJy4vdHlwZXNjcmlwdCc7XG5cbi8qKiBAcmV0dXJuIHRydWUgaWYgbm9kZSBoYXMgdGhlIHNwZWNpZmllZCBtb2RpZmllciBmbGFnIHNldC4gKi9cbmV4cG9ydCBmdW5jdGlvbiBoYXNNb2RpZmllckZsYWcoZGVjbGFyYXRpb246IHRzLkRlY2xhcmF0aW9uLCBmbGFnOiB0cy5Nb2RpZmllckZsYWdzKTogYm9vbGVhbiB7XG4gIHJldHVybiAodHMuZ2V0Q29tYmluZWRNb2RpZmllckZsYWdzKGRlY2xhcmF0aW9uKSAmIGZsYWcpICE9PSAwO1xufVxuXG4vKiogUmV0dXJucyB0cnVlIGlmIGZpbGVOYW1lIGlzIGEgLmQudHMgZmlsZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0R0c0ZpbGVOYW1lKGZpbGVOYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgcmV0dXJuIGZpbGVOYW1lLmVuZHNXaXRoKCcuZC50cycpO1xufVxuXG4vKiogUmV0dXJucyB0aGUgc3RyaW5nIGNvbnRlbnRzIG9mIGEgdHMuSWRlbnRpZmllci4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRJZGVudGlmaWVyVGV4dChpZGVudGlmaWVyOiB0cy5JZGVudGlmaWVyKTogc3RyaW5nIHtcbiAgLy8gTk9URTogJ2VzY2FwZWRUZXh0JyBvbiBhbiBJZGVudGlmaWVyIG1heSBiZSBlc2NhcGVkIGlmIGl0IHN0YXJ0cyB3aXRoICdfXycuIFRoZSBhbHRlcm5hdGl2ZSxcbiAgLy8gZ2V0VGV4dCgpLCBjYW5ub3QgYmUgdXNlZCBvbiBzeW50aGVzaXplZCBub2Rlcywgc28gdW5lc2NhcGUgdGhlIGlkZW50aWZpZXIgYmVsb3cuXG4gIHJldHVybiB1bmVzY2FwZU5hbWUoaWRlbnRpZmllci5lc2NhcGVkVGV4dCk7XG59XG5cbi8qKiBSZXR1cm5zIGEgZG90LWpvaW5lZCBxdWFsaWZpZWQgbmFtZSAoZm9vLmJhci5CYXopLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudGl0eU5hbWVUZXh0KG5hbWU6IHRzLkVudGl0eU5hbWUpOiBzdHJpbmcge1xuICBpZiAodHMuaXNJZGVudGlmaWVyKG5hbWUpKSB7XG4gICAgcmV0dXJuIGdldElkZW50aWZpZXJUZXh0KG5hbWUpO1xuICB9XG4gIHJldHVybiBnZXRFbnRpdHlOYW1lVGV4dChuYW1lLmxlZnQpICsgJy4nICsgZ2V0SWRlbnRpZmllclRleHQobmFtZS5yaWdodCk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYW4gZXNjYXBlZCBUeXBlU2NyaXB0IG5hbWUgaW50byB0aGUgb3JpZ2luYWwgc291cmNlIG5hbWUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1bmVzY2FwZU5hbWUobmFtZTogdHMuX19TdHJpbmcpOiBzdHJpbmcge1xuICAvLyBTZWUgdGhlIHByaXZhdGUgZnVuY3Rpb24gdW5lc2NhcGVJZGVudGlmaWVyIGluIFR5cGVTY3JpcHQncyB1dGlsaXRpZXMudHMuXG4gIGNvbnN0IHN0ciA9IG5hbWUgYXMgc3RyaW5nO1xuICBpZiAoc3RyLnN0YXJ0c1dpdGgoJ19fXycpKSByZXR1cm4gc3RyLnN1YnN0cmluZygxKTtcbiAgcmV0dXJuIHN0cjtcbn1cblxuLyoqXG4gKiB0cy5jcmVhdGVOb3RFbWl0dGVkU3RhdGVtZW50IHdpbGwgY3JlYXRlIGEgbm9kZSwgYnV0IHRoZSBjb21tZW50cyBjb3ZlcmVkIGJ5IGl0cyB0ZXh0IHJhbmdlIGFyZVxuICogbmV2ZXIgZW1pdHRlZG0gZXhjZXB0IGZvciB2ZXJ5IHNwZWNpZmljIHNwZWNpYWwgY2FzZXMgKC8vLyBjb21tZW50cykuXG4gKlxuICogY3JlYXRlTm90RW1pdHRlZFN0YXRlbWVudFdpdGhDb21tZW50cyBjcmVhdGVzIGEgbm90IGVtaXR0ZWQgc3RhdGVtZW50IGFuZCBhZGRzIGNvbW1lbnQgcmFuZ2VzXG4gKiBmcm9tIHRoZSBvcmlnaW5hbCBzdGF0ZW1lbnQgYXMgc3ludGhldGljIGNvbW1lbnRzIHRvIGl0LCBzbyB0aGF0IHRoZXkgZ2V0IHJldGFpbmVkIGluIHRoZSBvdXRwdXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb3RFbWl0dGVkU3RhdGVtZW50V2l0aENvbW1lbnRzKFxuICAgIHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUsIG9yaWdpbmFsOiB0cy5Ob2RlKTogdHMuU3RhdGVtZW50IHtcbiAgbGV0IHJlcGxhY2VtZW50ID0gdHMuY3JlYXRlTm90RW1pdHRlZFN0YXRlbWVudChvcmlnaW5hbCk7XG4gIC8vIE5COiBzeW50aGV0aWMgbm9kZXMgY2FuIGhhdmUgcG9zL2VuZCA9PSAtMS4gVGhpcyBpcyBoYW5kbGVkIGJ5IHRoZSB1bmRlcmx5aW5nIGltcGxlbWVudGF0aW9uLlxuICBjb25zdCBsZWFkaW5nID0gdHMuZ2V0TGVhZGluZ0NvbW1lbnRSYW5nZXMoc291cmNlRmlsZS50ZXh0LCBvcmlnaW5hbC5wb3MpIHx8IFtdO1xuICBjb25zdCB0cmFpbGluZyA9IHRzLmdldFRyYWlsaW5nQ29tbWVudFJhbmdlcyhzb3VyY2VGaWxlLnRleHQsIG9yaWdpbmFsLmVuZCkgfHwgW107XG4gIHJlcGxhY2VtZW50ID1cbiAgICAgIHRzLnNldFN5bnRoZXRpY0xlYWRpbmdDb21tZW50cyhyZXBsYWNlbWVudCwgc3ludGhlc2l6ZUNvbW1lbnRSYW5nZXMoc291cmNlRmlsZSwgbGVhZGluZykpO1xuICByZXBsYWNlbWVudCA9XG4gICAgICB0cy5zZXRTeW50aGV0aWNUcmFpbGluZ0NvbW1lbnRzKHJlcGxhY2VtZW50LCBzeW50aGVzaXplQ29tbWVudFJhbmdlcyhzb3VyY2VGaWxlLCB0cmFpbGluZykpO1xuICByZXR1cm4gcmVwbGFjZW1lbnQ7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHRzLkNvbW1lbnRSYW5nZWBzIGludG8gYHRzLlN5bnRoZXNpemVkQ29tbWVudGBzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ludGhlc2l6ZUNvbW1lbnRSYW5nZXMoXG4gICAgc291cmNlRmlsZTogdHMuU291cmNlRmlsZSwgcGFyc2VkQ29tbWVudHM6IHRzLkNvbW1lbnRSYW5nZVtdKTogdHMuU3ludGhlc2l6ZWRDb21tZW50W10ge1xuICBjb25zdCBzeW50aGVzaXplZENvbW1lbnRzOiB0cy5TeW50aGVzaXplZENvbW1lbnRbXSA9IFtdO1xuICBwYXJzZWRDb21tZW50cy5mb3JFYWNoKCh7a2luZCwgcG9zLCBlbmQsIGhhc1RyYWlsaW5nTmV3TGluZX0sIGNvbW1lbnRJZHgpID0+IHtcbiAgICBsZXQgY29tbWVudFRleHQgPSBzb3VyY2VGaWxlLnRleHQuc3Vic3RyaW5nKHBvcywgZW5kKS50cmltKCk7XG4gICAgaWYgKGtpbmQgPT09IHRzLlN5bnRheEtpbmQuTXVsdGlMaW5lQ29tbWVudFRyaXZpYSkge1xuICAgICAgY29tbWVudFRleHQgPSBjb21tZW50VGV4dC5yZXBsYWNlKC8oXlxcL1xcKil8KFxcKlxcLyQpL2csICcnKTtcbiAgICB9IGVsc2UgaWYgKGtpbmQgPT09IHRzLlN5bnRheEtpbmQuU2luZ2xlTGluZUNvbW1lbnRUcml2aWEpIHtcbiAgICAgIGlmIChjb21tZW50VGV4dC5zdGFydHNXaXRoKCcvLy8nKSkge1xuICAgICAgICAvLyB0cmlwbGUtc2xhc2ggY29tbWVudHMgYXJlIHR5cGVzY3JpcHQgc3BlY2lmaWMsIGlnbm9yZSB0aGVtIGluIHRoZSBvdXRwdXQuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbW1lbnRUZXh0ID0gY29tbWVudFRleHQucmVwbGFjZSgvKF5cXC9cXC8pL2csICcnKTtcbiAgICB9XG4gICAgc3ludGhlc2l6ZWRDb21tZW50cy5wdXNoKHtraW5kLCB0ZXh0OiBjb21tZW50VGV4dCwgaGFzVHJhaWxpbmdOZXdMaW5lLCBwb3M6IC0xLCBlbmQ6IC0xfSk7XG4gIH0pO1xuICByZXR1cm4gc3ludGhlc2l6ZWRDb21tZW50cztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbm9uIGVtaXR0ZWQgc3RhdGVtZW50IHRoYXQgY2FuIGJlIHVzZWQgdG8gc3RvcmUgc3ludGhlc2l6ZWQgY29tbWVudHMuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOb3RFbWl0dGVkU3RhdGVtZW50KHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpOiB0cy5Ob3RFbWl0dGVkU3RhdGVtZW50IHtcbiAgY29uc3Qgc3RtdCA9IHRzLmNyZWF0ZU5vdEVtaXR0ZWRTdGF0ZW1lbnQoc291cmNlRmlsZSk7XG4gIHRzLnNldE9yaWdpbmFsTm9kZShzdG10LCB1bmRlZmluZWQpO1xuICB0cy5zZXRUZXh0UmFuZ2Uoc3RtdCwge3BvczogMCwgZW5kOiAwfSk7XG4gIHRzLnNldEVtaXRGbGFncyhzdG10LCB0cy5FbWl0RmxhZ3MuQ3VzdG9tUHJvbG9ndWUpO1xuICByZXR1cm4gc3RtdDtcbn1cblxuLyoqXG4gKiBUaGlzIGlzIGEgdmVyc2lvbiBvZiBgdHMudmlzaXRFYWNoQ2hpbGRgIHRoYXQgd29ya3MgdGhhdCBjYWxscyBvdXIgdmVyc2lvblxuICogb2YgYHVwZGF0ZVNvdXJjZUZpbGVOb2RlYCwgc28gdGhhdCB0eXBlc2NyaXB0IGRvZXNuJ3QgbG9zZSB0eXBlIGluZm9ybWF0aW9uXG4gKiBmb3IgcHJvcGVydHkgZGVjb3JhdG9ycy5cbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzE3Mzg0XG4gKlxuICogQHBhcmFtIHNmXG4gKiBAcGFyYW0gc3RhdGVtZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdmlzaXRFYWNoQ2hpbGQoXG4gICAgbm9kZTogdHMuTm9kZSwgdmlzaXRvcjogdHMuVmlzaXRvciwgY29udGV4dDogdHMuVHJhbnNmb3JtYXRpb25Db250ZXh0KTogdHMuTm9kZSB7XG4gIGlmIChub2RlLmtpbmQgPT09IHRzLlN5bnRheEtpbmQuU291cmNlRmlsZSkge1xuICAgIGNvbnN0IHNmID0gbm9kZSBhcyB0cy5Tb3VyY2VGaWxlO1xuICAgIHJldHVybiB1cGRhdGVTb3VyY2VGaWxlTm9kZShzZiwgdHMudmlzaXRMZXhpY2FsRW52aXJvbm1lbnQoc2Yuc3RhdGVtZW50cywgdmlzaXRvciwgY29udGV4dCkpO1xuICB9XG5cbiAgcmV0dXJuIHRzLnZpc2l0RWFjaENoaWxkKG5vZGUsIHZpc2l0b3IsIGNvbnRleHQpO1xufVxuXG4vKipcbiAqIFRoaXMgaXMgYSB2ZXJzaW9uIG9mIGB0cy51cGRhdGVTb3VyY2VGaWxlTm9kZWAgdGhhdCB3b3Jrc1xuICogd2VsbCB3aXRoIHByb3BlcnR5IGRlY29yYXRvcnMuXG4gKiBTZWUgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy8xNzM4NFxuICogVE9ETygjNjM0KTogVGhpcyBoYXMgYmVlbiBmaXhlZCBpbiBUUyAyLjUuIEludmVzdGlnYXRlIHJlbW92YWwuXG4gKlxuICogQHBhcmFtIHNmXG4gKiBAcGFyYW0gc3RhdGVtZW50c1xuICovXG5leHBvcnQgZnVuY3Rpb24gdXBkYXRlU291cmNlRmlsZU5vZGUoXG4gICAgc2Y6IHRzLlNvdXJjZUZpbGUsIHN0YXRlbWVudHM6IHRzLk5vZGVBcnJheTx0cy5TdGF0ZW1lbnQ+KTogdHMuU291cmNlRmlsZSB7XG4gIGlmIChzdGF0ZW1lbnRzID09PSBzZi5zdGF0ZW1lbnRzKSB7XG4gICAgcmV0dXJuIHNmO1xuICB9XG4gIC8vIE5vdGU6IE5lZWQgdG8gY2xvbmUgdGhlIG9yaWdpbmFsIGZpbGUgKGFuZCBub3QgdXNlIGB0cy51cGRhdGVTb3VyY2VGaWxlTm9kZWApXG4gIC8vIGFzIG90aGVyd2lzZSBUUyBmYWlscyB3aGVuIHJlc29sdmluZyB0eXBlcyBmb3IgZGVjb3JhdG9ycy5cbiAgc2YgPSB0cy5nZXRNdXRhYmxlQ2xvbmUoc2YpO1xuICBzZi5zdGF0ZW1lbnRzID0gc3RhdGVtZW50cztcbiAgcmV0dXJuIHNmO1xufVxuXG4vLyBDb3BpZWQgZnJvbSBUeXBlU2NyaXB0XG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlTm9kZUtpbmQoa2luZDogdHMuU3ludGF4S2luZCkge1xuICByZXR1cm4gKGtpbmQgPj0gdHMuU3ludGF4S2luZC5GaXJzdFR5cGVOb2RlICYmIGtpbmQgPD0gdHMuU3ludGF4S2luZC5MYXN0VHlwZU5vZGUpIHx8XG4gICAgICBraW5kID09PSB0cy5TeW50YXhLaW5kLkFueUtleXdvcmQgfHwga2luZCA9PT0gdHMuU3ludGF4S2luZC5OdW1iZXJLZXl3b3JkIHx8XG4gICAgICBraW5kID09PSB0cy5TeW50YXhLaW5kLk9iamVjdEtleXdvcmQgfHwga2luZCA9PT0gdHMuU3ludGF4S2luZC5Cb29sZWFuS2V5d29yZCB8fFxuICAgICAga2luZCA9PT0gdHMuU3ludGF4S2luZC5TdHJpbmdLZXl3b3JkIHx8IGtpbmQgPT09IHRzLlN5bnRheEtpbmQuU3ltYm9sS2V5d29yZCB8fFxuICAgICAga2luZCA9PT0gdHMuU3ludGF4S2luZC5UaGlzS2V5d29yZCB8fCBraW5kID09PSB0cy5TeW50YXhLaW5kLlZvaWRLZXl3b3JkIHx8XG4gICAgICBraW5kID09PSB0cy5TeW50YXhLaW5kLlVuZGVmaW5lZEtleXdvcmQgfHwga2luZCA9PT0gdHMuU3ludGF4S2luZC5OdWxsS2V5d29yZCB8fFxuICAgICAga2luZCA9PT0gdHMuU3ludGF4S2luZC5OZXZlcktleXdvcmQgfHwga2luZCA9PT0gdHMuU3ludGF4S2luZC5FeHByZXNzaW9uV2l0aFR5cGVBcmd1bWVudHM7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHN0cmluZyBsaXRlcmFsIHRoYXQgdXNlcyBzaW5nbGUgcXVvdGVzLiBQdXJlbHkgY29zbWV0aWMsIGJ1dCBpbmNyZWFzZXMgZmlkZWxpdHkgdG8gdGhlXG4gKiBleGlzdGluZyB0ZXN0IHN1aXRlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2luZ2xlUXVvdGVTdHJpbmdMaXRlcmFsKHRleHQ6IHN0cmluZyk6IHRzLlN0cmluZ0xpdGVyYWwge1xuICBjb25zdCBzdHJpbmdMaXRlcmFsID0gdHMuY3JlYXRlTGl0ZXJhbCh0ZXh0KTtcbiAgLy8gdHNsaW50OmRpc2FibGUtbmV4dC1saW5lOm5vLWFueSBhY2Nlc3NpbmcgVFMgaW50ZXJuYWwgQVBJLlxuICAoc3RyaW5nTGl0ZXJhbCBhcyBhbnkpLnNpbmdsZVF1b3RlID0gdHJ1ZTtcbiAgcmV0dXJuIHN0cmluZ0xpdGVyYWw7XG59XG5cbi8qKiBDcmVhdGVzIGEgbm90IGVtaXR0ZWQgc3RhdGVtZW50IHdpdGggdGhlIGdpdmVuIHRleHQgYXMgYSBzaW5nbGUgbGluZSBjb21tZW50LiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNpbmdsZUxpbmVDb21tZW50KG9yaWdpbmFsOiB0cy5Ob2RlLCB0ZXh0OiBzdHJpbmcpIHtcbiAgY29uc3QgY29tbWVudDogdHMuU3ludGhlc2l6ZWRDb21tZW50ID0ge1xuICAgIGtpbmQ6IHRzLlN5bnRheEtpbmQuU2luZ2xlTGluZUNvbW1lbnRUcml2aWEsXG4gICAgdGV4dDogJyAnICsgdGV4dCxcbiAgICBoYXNUcmFpbGluZ05ld0xpbmU6IHRydWUsXG4gICAgcG9zOiAtMSxcbiAgICBlbmQ6IC0xLFxuICB9O1xuICByZXR1cm4gdHMuc2V0U3ludGhldGljVHJhaWxpbmdDb21tZW50cyh0cy5jcmVhdGVOb3RFbWl0dGVkU3RhdGVtZW50KG9yaWdpbmFsKSwgW2NvbW1lbnRdKTtcbn1cblxuLyoqIENyZWF0ZXMgYSBub3QgZW1pdHRlZCBzdGF0ZW1lbnQgd2l0aCB0aGUgZ2l2ZW4gdGV4dCBhcyBhIHNpbmdsZSBsaW5lIGNvbW1lbnQuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTXVsdGlMaW5lQ29tbWVudChvcmlnaW5hbDogdHMuTm9kZSwgdGV4dDogc3RyaW5nKSB7XG4gIGNvbnN0IGNvbW1lbnQ6IHRzLlN5bnRoZXNpemVkQ29tbWVudCA9IHtcbiAgICBraW5kOiB0cy5TeW50YXhLaW5kLk11bHRpTGluZUNvbW1lbnRUcml2aWEsXG4gICAgdGV4dDogJyAnICsgdGV4dCxcbiAgICBoYXNUcmFpbGluZ05ld0xpbmU6IHRydWUsXG4gICAgcG9zOiAtMSxcbiAgICBlbmQ6IC0xLFxuICB9O1xuICByZXR1cm4gdHMuc2V0U3ludGhldGljVHJhaWxpbmdDb21tZW50cyh0cy5jcmVhdGVOb3RFbWl0dGVkU3RhdGVtZW50KG9yaWdpbmFsKSwgW2NvbW1lbnRdKTtcbn1cblxuLyoqXG4gKiBkZWJ1Z1dhcm4gbG9ncyBhIGRlYnVnIHdhcm5pbmcuXG4gKlxuICogVGhlc2Ugc2hvdWxkIG9ubHkgYmUgdXNlZCBmb3IgY2FzZXMgd2hlcmUgdHNpY2tsZSBpcyBtYWtpbmcgYSBxdWVzdGlvbmFibGUganVkZ2VtZW50IGFib3V0IHdoYXRcbiAqIHRvIGRvLiBCeSBkZWZhdWx0LCB0c2lja2xlIGRvZXMgbm90IHJlcG9ydCBhbnkgd2FybmluZ3MgdG8gdGhlIGNhbGxlciwgYW5kIHdhcm5pbmdzIGFyZSBoaWRkZW5cbiAqIGJlaGluZCBhIGRlYnVnIGZsYWcsIGFzIHdhcm5pbmdzIGFyZSBvbmx5IGZvciB0c2lja2xlIHRvIGRlYnVnIGl0c2VsZi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcG9ydERlYnVnV2FybmluZyhcbiAgICBob3N0OiB7bG9nV2FybmluZyA/IChkOiB0cy5EaWFnbm9zdGljKSA6IHZvaWR9LCBub2RlOiB0cy5Ob2RlLCBtZXNzYWdlVGV4dDogc3RyaW5nKSB7XG4gIGlmICghaG9zdC5sb2dXYXJuaW5nKSByZXR1cm47XG4gIGhvc3QubG9nV2FybmluZyhjcmVhdGVEaWFnbm9zdGljKFxuICAgICAgbm9kZSwgbWVzc2FnZVRleHQsIC8qIHRleHRSYW5nZSAqLyB1bmRlZmluZWQsIHRzLkRpYWdub3N0aWNDYXRlZ29yeS5XYXJuaW5nKSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbmQgcmVwb3J0cyBhIGRpYWdub3N0aWMgYnkgYWRkaW5nIGl0IHRvIHRoZSBnaXZlbiBhcnJheS5cbiAqXG4gKiBUaGlzIGlzIHVzZWQgZm9yIGVycm9ycyBhbmQgd2FybmluZ3MgaW4gdHNpY2tsZSdzIGlucHV0LiBFbWl0IGVycm9ycyAodGhlIGRlZmF1bHQpIGlmIHRzaWNrbGVcbiAqIGNhbm5vdCBlbWl0IGEgY29ycmVjdCByZXN1bHQgZ2l2ZW4gdGhlIGlucHV0LiBFbWl0IHdhcm5pbmdzIGZvciBxdWVzdGlvbmFibGUgaW5wdXQgaWYgdGhlcmUncyBhXG4gKiBnb29kIGNoYW5jZSB0aGF0IHRoZSBvdXRwdXQgd2lsbCB3b3JrLlxuICpcbiAqIEZvciB0eXBpY2FsIHRzaWNrbGUgdXNlcnMsIGVycm9ycyBhcmUgYWx3YXlzIHJlcG9ydGVkIGFuZCBicmVhayB0aGUgY29tcGlsYXRpb24gb3BlcmF0aW9uLFxuICogd2FybmluZ3Mgd2lsbCBvbmx5IGJlIGVtaXR0ZWQgZm9yIGZpcnN0IHBhcnR5IGNvZGUgKGFuZCBicmVhayB0aGUgY29tcGlsYXRpb24gdGhlcmUpLCBidXQgd2lsIGJlXG4gKiBpZ25vcmVkIGZvciB0aGlyZCBwYXJ0eSBjb2RlLlxuICpcbiAqIEBwYXJhbSB0ZXh0UmFuZ2UgcGFzcyB0byBvdmVycnJpZGUgdGhlIHRleHQgcmFuZ2UgZnJvbSB0aGUgbm9kZSB3aXRoIGEgbW9yZSBzcGVjaWZpYyByYW5nZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcG9ydERpYWdub3N0aWMoXG4gICAgZGlhZ25vc3RpY3M6IHRzLkRpYWdub3N0aWNbXSwgbm9kZTogdHMuTm9kZSwgbWVzc2FnZVRleHQ6IHN0cmluZywgdGV4dFJhbmdlPzogdHMuVGV4dFJhbmdlLFxuICAgIGNhdGVnb3J5ID0gdHMuRGlhZ25vc3RpY0NhdGVnb3J5LkVycm9yKSB7XG4gIGRpYWdub3N0aWNzLnB1c2goY3JlYXRlRGlhZ25vc3RpYyhub2RlLCBtZXNzYWdlVGV4dCwgdGV4dFJhbmdlLCBjYXRlZ29yeSkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVEaWFnbm9zdGljKFxuICAgIG5vZGU6IHRzLk5vZGUsIG1lc3NhZ2VUZXh0OiBzdHJpbmcsIHRleHRSYW5nZTogdHMuVGV4dFJhbmdlfHVuZGVmaW5lZCxcbiAgICBjYXRlZ29yeTogdHMuRGlhZ25vc3RpY0NhdGVnb3J5KTogdHMuRGlhZ25vc3RpYyB7XG4gIGxldCBzdGFydCwgbGVuZ3RoOiBudW1iZXI7XG4gIGlmICh0ZXh0UmFuZ2UpIHtcbiAgICBzdGFydCA9IHRleHRSYW5nZS5wb3M7XG4gICAgbGVuZ3RoID0gdGV4dFJhbmdlLmVuZCAtIHRleHRSYW5nZS5wb3M7XG4gIH0gZWxzZSB7XG4gICAgLy8gT25seSB1c2UgZ2V0U3RhcnQgaWYgbm9kZSBoYXMgYSB2YWxpZCBwb3MsIGFzIGl0IG1pZ2h0IGJlIHN5bnRoZXNpemVkLlxuICAgIHN0YXJ0ID0gbm9kZS5wb3MgPj0gMCA/IG5vZGUuZ2V0U3RhcnQoKSA6IDA7XG4gICAgbGVuZ3RoID0gbm9kZS5lbmQgLSBub2RlLnBvcztcbiAgfVxuICByZXR1cm4ge1xuICAgIGZpbGU6IG5vZGUuZ2V0U291cmNlRmlsZSgpLFxuICAgIHN0YXJ0LFxuICAgIGxlbmd0aCxcbiAgICBtZXNzYWdlVGV4dCxcbiAgICBjYXRlZ29yeSxcbiAgICBjb2RlOiAwLFxuICB9O1xufVxuXG4vKipcbiAqIEEgcmVwbGFjZW1lbnQgZm9yIHRzLmdldExlYWRpbmdDb21tZW50UmFuZ2VzIHRoYXQgcmV0dXJucyB0aGUgdW5pb24gb2Ygc3ludGhldGljIGFuZFxuICogbm9uLXN5bnRoZXRpYyBjb21tZW50cyBvbiB0aGUgZ2l2ZW4gbm9kZSwgd2l0aCB0aGVpciB0ZXh0IGluY2x1ZGVkLiBUaGUgcmV0dXJuZWQgY29tbWVudHMgbXVzdFxuICogbm90IGJlIG11dGF0ZWQsIGFzIHRoZWlyIGNvbnRlbnQgbWlnaHQgb3IgbWlnaHQgbm90IGJlIHJlZmxlY3RlZCBiYWNrIGludG8gdGhlIEFTVC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFsbExlYWRpbmdDb21tZW50cyhub2RlOiB0cy5Ob2RlKTpcbiAgICBSZWFkb25seUFycmF5PFJlYWRvbmx5PHRzLkNvbW1lbnRSYW5nZSZ7dGV4dDogc3RyaW5nfT4+IHtcbiAgY29uc3QgYWxsUmFuZ2VzOiBBcnJheTxSZWFkb25seTx0cy5Db21tZW50UmFuZ2Ume3RleHQ6IHN0cmluZ30+PiA9IFtdO1xuICBjb25zdCBub2RlVGV4dCA9IG5vZGUuZ2V0RnVsbFRleHQoKTtcbiAgY29uc3QgY3IgPSB0cy5nZXRMZWFkaW5nQ29tbWVudFJhbmdlcyhub2RlVGV4dCwgMCk7XG4gIGlmIChjcikgYWxsUmFuZ2VzLnB1c2goLi4uY3IubWFwKGMgPT4gKHsuLi5jLCB0ZXh0OiBub2RlVGV4dC5zdWJzdHJpbmcoYy5wb3MsIGMuZW5kKX0pKSk7XG4gIGNvbnN0IHN5bnRoZXRpYyA9IHRzLmdldFN5bnRoZXRpY0xlYWRpbmdDb21tZW50cyhub2RlKTtcbiAgaWYgKHN5bnRoZXRpYykgYWxsUmFuZ2VzLnB1c2goLi4uc3ludGhldGljKTtcbiAgcmV0dXJuIGFsbFJhbmdlcztcbn1cbiJdfQ==