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
        define("tsickle/src/fileoverview_comment_transformer", ["require", "exports", "tsickle/src/jsdoc", "tsickle/src/transformer_util", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var jsdoc = require("tsickle/src/jsdoc");
    var transformer_util_1 = require("tsickle/src/transformer_util");
    var ts = require("tsickle/src/typescript");
    /**
     * A set of JSDoc tags that mark a comment as a fileoverview comment. These are recognized by other
     * pieces of infrastructure (Closure Compiler, module system, ...).
     */
    var FILEOVERVIEW_COMMENT_MARKERS = new Set(['fileoverview', 'externs', 'modName', 'mods', 'pintomodule']);
    /**
     * Given a parsed \@fileoverview comment, ensures it has all the attributes we need.
     * This function can be called to modify an existing comment or to make a new one.
     *
     * @param tags Comment as parsed list of tags; modified in-place.
     */
    function augmentFileoverviewComments(tags) {
        // Ensure we start with a @fileoverview.
        if (!tags.find(function (t) { return t.tagName === 'fileoverview'; })) {
            tags.splice(0, 0, { tagName: 'fileoverview', text: 'added by tsickle' });
        }
        // Find or create a @suppress tag.
        // Closure compiler barfs if there's a duplicated @suppress tag in a file, so the tag must
        // only appear once and be merged.
        var suppressTag = tags.find(function (t) { return t.tagName === 'suppress'; });
        var suppressions;
        if (suppressTag) {
            suppressions = new Set((suppressTag.type || '').split(',').map(function (s) { return s.trim(); }));
        }
        else {
            suppressTag = { tagName: 'suppress', text: 'checked by tsc' };
            tags.push(suppressTag);
            suppressions = new Set();
        }
        // Ensure our suppressions are included in the @suppress tag:
        // 1) Suppress checkTypes.  We believe the code has already been type-checked by TypeScript,
        // and we cannot model all the TypeScript type decisions in Closure syntax.
        suppressions.add('checkTypes');
        // 2) Suppress extraRequire.  We remove extra requires at the TypeScript level, so any require
        // that gets to the JS level is a load-bearing require.
        suppressions.add('extraRequire');
        // 3) Suppress uselessCode.  We emit an "if (false)" around type declarations,
        // which is flagged as unused code unless we suppress it.
        suppressions.add('uselessCode');
        // 4) Suppress missingReturn.  If the TS compiler's exhaustiveness analysis
        // concludes that all possible branches return a value, then we don't want
        // Closure to second-guess this decision.
        suppressions.add('missingReturn');
        suppressTag.type = Array.from(suppressions.values()).sort().join(',');
        return tags;
    }
    /**
     * A transformer that ensures the emitted JS file has an \@fileoverview comment that contains an
     * \@suppress {checkTypes} annotation by either adding or updating an existing comment.
     */
    function transformFileoverviewCommentFactory(diagnostics) {
        return function () {
            function checkNoFileoverviewComments(context, comments, message) {
                var e_1, _a;
                try {
                    for (var comments_1 = __values(comments), comments_1_1 = comments_1.next(); !comments_1_1.done; comments_1_1 = comments_1.next()) {
                        var comment = comments_1_1.value;
                        var parse = jsdoc.parse(comment);
                        if (parse !== null && parse.tags.some(function (t) { return FILEOVERVIEW_COMMENT_MARKERS.has(t.tagName); })) {
                            // Report a warning; this should not break compilation in third party code.
                            transformer_util_1.reportDiagnostic(diagnostics, context, message, comment.originalRange, ts.DiagnosticCategory.Warning);
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (comments_1_1 && !comments_1_1.done && (_a = comments_1.return)) _a.call(comments_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
            }
            return function (sourceFile) {
                var text = sourceFile.getFullText();
                var fileComments = [];
                var firstStatement = sourceFile.statements.length && sourceFile.statements[0] || null;
                var originalComments = ts.getLeadingCommentRanges(text, 0) || [];
                if (!firstStatement) {
                    // In an empty source file, all comments are file-level comments.
                    fileComments = transformer_util_1.synthesizeCommentRanges(sourceFile, originalComments);
                }
                else {
                    // Search for the last comment split from the file with a \n\n. All comments before that are
                    // considered fileoverview comments, all comments after that belong to the next
                    // statement(s). If none found, comments remains empty, and the code below will insert a new
                    // fileoverview comment.
                    for (var i = originalComments.length - 1; i >= 0; i--) {
                        var end = originalComments[i].end;
                        if (!text.substring(end).startsWith('\n\n') &&
                            !text.substring(end).startsWith('\r\n\r\n')) {
                            continue;
                        }
                        // This comment is separated from the source file with a double break, marking it (and any
                        // preceding comments) as a file-level comment. Split them off and attach them onto a
                        // NotEmittedStatement, so that they do not get lost later on.
                        var synthesizedComments = jsdoc.synthesizeLeadingComments(firstStatement);
                        var notEmitted = ts.createNotEmittedStatement(sourceFile);
                        // Modify the comments on the firstStatement in place by removing the file-level comments.
                        fileComments = synthesizedComments.splice(0, i + 1);
                        // Move the fileComments onto notEmitted.
                        ts.setSyntheticLeadingComments(notEmitted, fileComments);
                        sourceFile = transformer_util_1.updateSourceFileNode(sourceFile, ts.createNodeArray(__spread([notEmitted, firstStatement], sourceFile.statements.slice(1))));
                        break;
                    }
                    // Now walk every top level statement and escape/drop any @fileoverview comments found.
                    // Closure ignores all @fileoverview comments but the last, so tsickle must make sure not to
                    // emit duplicated ones.
                    for (var i = 0; i < sourceFile.statements.length; i++) {
                        var stmt = sourceFile.statements[i];
                        // Accept the NotEmittedStatement inserted above.
                        if (i === 0 && stmt.kind === ts.SyntaxKind.NotEmittedStatement)
                            continue;
                        var comments = jsdoc.synthesizeLeadingComments(stmt);
                        checkNoFileoverviewComments(stmt, comments, "file comments must be at the top of the file, " +
                            "separated from the file body by an empty line.");
                    }
                }
                // Closure Compiler considers the *last* comment with @fileoverview (or @externs or
                // @nocompile) that has not been attached to some other tree node to be the file overview
                // comment, and only applies @suppress tags from it. Google-internal tooling considers *any*
                // comment mentioning @fileoverview.
                var fileoverviewIdx = -1;
                var tags = [];
                for (var i = fileComments.length - 1; i >= 0; i--) {
                    var parse = jsdoc.parseContents(fileComments[i].text);
                    if (parse !== null && parse.tags.some(function (t) { return FILEOVERVIEW_COMMENT_MARKERS.has(t.tagName); })) {
                        fileoverviewIdx = i;
                        tags = parse.tags;
                        break;
                    }
                }
                if (fileoverviewIdx !== -1) {
                    checkNoFileoverviewComments(firstStatement || sourceFile, fileComments.slice(0, fileoverviewIdx), "duplicate file level comment");
                }
                augmentFileoverviewComments(tags);
                var commentText = jsdoc.toStringWithoutStartEnd(tags);
                if (fileoverviewIdx < 0) {
                    // No existing comment to merge with, just emit a new one.
                    return addNewFileoverviewComment(sourceFile, commentText);
                }
                fileComments[fileoverviewIdx].text = commentText;
                // sf does not need to be updated, synthesized comments are mutable.
                return sourceFile;
            };
        };
    }
    exports.transformFileoverviewCommentFactory = transformFileoverviewCommentFactory;
    function addNewFileoverviewComment(sf, commentText) {
        var syntheticFirstStatement = transformer_util_1.createNotEmittedStatement(sf);
        syntheticFirstStatement = ts.addSyntheticTrailingComment(syntheticFirstStatement, ts.SyntaxKind.MultiLineCommentTrivia, commentText, true);
        return transformer_util_1.updateSourceFileNode(sf, ts.createNodeArray(__spread([syntheticFirstStatement], sf.statements)));
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZW92ZXJ2aWV3X2NvbW1lbnRfdHJhbnNmb3JtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvZmlsZW92ZXJ2aWV3X2NvbW1lbnRfdHJhbnNmb3JtZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFSCx5Q0FBaUM7SUFDakMsaUVBQThIO0lBQzlILDJDQUFtQztJQUVuQzs7O09BR0c7SUFDSCxJQUFNLDRCQUE0QixHQUM5QixJQUFJLEdBQUcsQ0FBQyxDQUFDLGNBQWMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRTNFOzs7OztPQUtHO0lBQ0gscUNBQXFDLElBQWlCO1FBQ3BELHdDQUF3QztRQUN4QyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssY0FBYyxFQUE1QixDQUE0QixDQUFDLEVBQUU7WUFDakQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO1NBQ3hFO1FBRUQsa0NBQWtDO1FBQ2xDLDBGQUEwRjtRQUMxRixrQ0FBa0M7UUFDbEMsSUFBSSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUF4QixDQUF3QixDQUFDLENBQUM7UUFDM0QsSUFBSSxZQUF5QixDQUFDO1FBQzlCLElBQUksV0FBVyxFQUFFO1lBQ2YsWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMs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QUFLLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBRXhELElBQUksZUFBZSxHQUFHLENBQUMsRUFBRTtvQkFDdkIsMERBQTBEO29CQUMxRCxPQUFPLHlCQUF5QixDQUFDLFVBQVUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDM0Q7Z0JBRUQsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7Z0JBQ2pELG9FQUFvRTtnQkFDcEUsT0FBTyxVQUFVLENBQUM7WUFDcEIsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQXBHRCxrRkFvR0M7SUFFRCxtQ0FBbUMsRUFBaUIsRUFBRSxXQUFtQjtRQUN2RSxJQUFJLHVCQUF1QixHQUFHLDRDQUF5QixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzVELHVCQUF1QixHQUFHLEVBQUUsQ0FBQywyQkFBMkIsQ0FDcEQsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsRUFBRSxXQUFXLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEYsT0FBTyx1Q0FBb0IsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLGVBQWUsV0FBRSx1QkFBdUIsR0FBSyxFQUFFLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNuRyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyBqc2RvYyBmcm9tICcuL2pzZG9jJztcbmltcG9ydCB7Y3JlYXRlTm90RW1pdHRlZFN0YXRlbWVudCwgcmVwb3J0RGlhZ25vc3RpYywgc3ludGhlc2l6ZUNvbW1lbnRSYW5nZXMsIHVwZGF0ZVNvdXJjZUZpbGVOb2RlfSBmcm9tICcuL3RyYW5zZm9ybWVyX3V0aWwnO1xuaW1wb3J0ICogYXMgdHMgZnJvbSAnLi90eXBlc2NyaXB0JztcblxuLyoqXG4gKiBBIHNldCBvZiBKU0RvYyB0YWdzIHRoYXQgbWFyayBhIGNvbW1lbnQgYXMgYSBmaWxlb3ZlcnZpZXcgY29tbWVudC4gVGhlc2UgYXJlIHJlY29nbml6ZWQgYnkgb3RoZXJcbiAqIHBpZWNlcyBvZiBpbmZyYXN0cnVjdHVyZSAoQ2xvc3VyZSBDb21waWxlciwgbW9kdWxlIHN5c3RlbSwgLi4uKS5cbiAqL1xuY29uc3QgRklMRU9WRVJWSUVXX0NPTU1FTlRfTUFSS0VSUzogUmVhZG9ubHlTZXQ8c3RyaW5nPiA9XG4gICAgbmV3IFNldChbJ2ZpbGVvdmVydmlldycsICdleHRlcm5zJywgJ21vZE5hbWUnLCAnbW9kcycsICdwaW50b21vZHVsZSddKTtcblxuLyoqXG4gKiBHaXZlbiBhIHBhcnNlZCBcXEBmaWxlb3ZlcnZpZXcgY29tbWVudCwgZW5zdXJlcyBpdCBoYXMgYWxsIHRoZSBhdHRyaWJ1dGVzIHdlIG5lZWQuXG4gKiBUaGlzIGZ1bmN0aW9uIGNhbiBiZSBjYWxsZWQgdG8gbW9kaWZ5IGFuIGV4aXN0aW5nIGNvbW1lbnQgb3IgdG8gbWFrZSBhIG5ldyBvbmUuXG4gKlxuICogQHBhcmFtIHRhZ3MgQ29tbWVudCBhcyBwYXJzZWQgbGlzdCBvZiB0YWdzOyBtb2RpZmllZCBpbi1wbGFjZS5cbiAqL1xuZnVuY3Rpb24gYXVnbWVudEZpbGVvdmVydmlld0NvbW1lbnRzKHRhZ3M6IGpzZG9jLlRhZ1tdKSB7XG4gIC8vIEVuc3VyZSB3ZSBzdGFydCB3aXRoIGEgQGZpbGVvdmVydmlldy5cbiAgaWYgKCF0YWdzLmZpbmQodCA9PiB0LnRhZ05hbWUgPT09ICdmaWxlb3ZlcnZpZXcnKSkge1xuICAgIHRhZ3Muc3BsaWNlKDAsIDAsIHt0YWdOYW1lOiAnZmlsZW92ZXJ2aWV3JywgdGV4dDogJ2FkZGVkIGJ5IHRzaWNrbGUnfSk7XG4gIH1cblxuICAvLyBGaW5kIG9yIGNyZWF0ZSBhIEBzdXBwcmVzcyB0YWcuXG4gIC8vIENsb3N1cmUgY29tcGlsZXIgYmFyZnMgaWYgdGhlcmUncyBhIGR1cGxpY2F0ZWQgQHN1cHByZXNzIHRhZyBpbiBhIGZpbGUsIHNvIHRoZSB0YWcgbXVzdFxuICAvLyBvbmx5IGFwcGVhciBvbmNlIGFuZCBiZSBtZXJnZWQuXG4gIGxldCBzdXBwcmVzc1RhZyA9IHRhZ3MuZmluZCh0ID0+IHQudGFnTmFtZSA9PT0gJ3N1cHByZXNzJyk7XG4gIGxldCBzdXBwcmVzc2lvbnM6IFNldDxzdHJpbmc+O1xuICBpZiAoc3VwcHJlc3NUYWcpIHtcbiAgICBzdXBwcmVzc2lvbnMgPSBuZXcgU2V0KChzdXBwcmVzc1RhZy50eXBlIHx8ICcnKS5zcGxpdCgnLCcpLm1hcChzID0+IHMudHJpbSgpKSk7XG4gIH0gZWxzZSB7XG4gICAgc3VwcHJlc3NUYWcgPSB7dGFnTmFtZTogJ3N1cHByZXNzJywgdGV4dDogJ2NoZWNrZWQgYnkgdHNjJ307XG4gICAgdGFncy5wdXNoKHN1cHByZXNzVGFnKTtcbiAgICBzdXBwcmVzc2lvbnMgPSBuZXcgU2V0KCk7XG4gIH1cblxuICAvLyBFbnN1cmUgb3VyIHN1cHByZXNzaW9ucyBhcmUgaW5jbHVkZWQgaW4gdGhlIEBzdXBwcmVzcyB0YWc6XG4gIC8vIDEpIFN1cHByZXNzIGNoZWNrVHlwZXMuICBXZSBiZWxpZXZlIHRoZSBjb2RlIGhhcyBhbHJlYWR5IGJlZW4gdHlwZS1jaGVja2VkIGJ5IFR5cGVTY3JpcHQsXG4gIC8vIGFuZCB3ZSBjYW5ub3QgbW9kZWwgYWxsIHRoZSBUeXBlU2NyaXB0IHR5cGUgZGVjaXNpb25zIGluIENsb3N1cmUgc3ludGF4LlxuICBzdXBwcmVzc2lvbnMuYWRkKCdjaGVja1R5cGVzJyk7XG4gIC8vIDIpIFN1cHByZXNzIGV4dHJhUmVxdWlyZS4gIFdlIHJlbW92ZSBleHRyYSByZXF1aXJlcyBhdCB0aGUgVHlwZVNjcmlwdCBsZXZlbCwgc28gYW55IHJlcXVpcmVcbiAgLy8gdGhhdCBnZXRzIHRvIHRoZSBKUyBsZXZlbCBpcyBhIGxvYWQtYmVhcmluZyByZXF1aXJlLlxuICBzdXBwcmVzc2lvbnMuYWRkKCdleHRyYVJlcXVpcmUnKTtcbiAgLy8gMykgU3VwcHJlc3MgdXNlbGVzc0NvZGUuICBXZSBlbWl0IGFuIFwiaWYgKGZhbHNlKVwiIGFyb3VuZCB0eXBlIGRlY2xhcmF0aW9ucyxcbiAgLy8gd2hpY2ggaXMgZmxhZ2dlZCBhcyB1bnVzZWQgY29kZSB1bmxlc3Mgd2Ugc3VwcHJlc3MgaXQuXG4gIHN1cHByZXNzaW9ucy5hZGQoJ3VzZWxlc3NDb2RlJyk7XG4gIC8vIDQpIFN1cHByZXNzIG1pc3NpbmdSZXR1cm4uICBJZiB0aGUgVFMgY29tcGlsZXIncyBleGhhdXN0aXZlbmVzcyBhbmFseXNpc1xuICAvLyBjb25jbHVkZXMgdGhhdCBhbGwgcG9zc2libGUgYnJhbmNoZXMgcmV0dXJuIGEgdmFsdWUsIHRoZW4gd2UgZG9uJ3Qgd2FudFxuICAvLyBDbG9zdXJlIHRvIHNlY29uZC1ndWVzcyB0aGlzIGRlY2lzaW9uLlxuICBzdXBwcmVzc2lvbnMuYWRkKCdtaXNzaW5nUmV0dXJuJyk7XG4gIHN1cHByZXNzVGFnLnR5cGUgPSBBcnJheS5mcm9tKHN1cHByZXNzaW9ucy52YWx1ZXMoKSkuc29ydCgpLmpvaW4oJywnKTtcblxuICByZXR1cm4gdGFncztcbn1cblxuLyoqXG4gKiBBIHRyYW5zZm9ybWVyIHRoYXQgZW5zdXJlcyB0aGUgZW1pdHRlZCBKUyBmaWxlIGhhcyBhbiBcXEBmaWxlb3ZlcnZpZXcgY29tbWVudCB0aGF0IGNvbnRhaW5zIGFuXG4gKiBcXEBzdXBwcmVzcyB7Y2hlY2tUeXBlc30gYW5ub3RhdGlvbiBieSBlaXRoZXIgYWRkaW5nIG9yIHVwZGF0aW5nIGFuIGV4aXN0aW5nIGNvbW1lbnQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1GaWxlb3ZlcnZpZXdDb21tZW50RmFjdG9yeShkaWFnbm9zdGljczogdHMuRGlhZ25vc3RpY1tdKSB7XG4gIHJldHVybiAoKTogKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpID0+IHRzLlNvdXJjZUZpbGUgPT4ge1xuICAgIGZ1bmN0aW9uIGNoZWNrTm9GaWxlb3ZlcnZpZXdDb21tZW50cyhcbiAgICAgICAgY29udGV4dDogdHMuTm9kZSwgY29tbWVudHM6IGpzZG9jLlN5bnRoZXNpemVkQ29tbWVudFdpdGhPcmlnaW5hbFtdLCBtZXNzYWdlOiBzdHJpbmcpIHtcbiAgICAgIGZvciAoY29uc3QgY29tbWVudCBvZiBjb21tZW50cykge1xuICAgICAgICBjb25zdCBwYXJzZSA9IGpzZG9jLnBhcnNlKGNvbW1lbnQpO1xuICAgICAgICBpZiAocGFyc2UgIT09IG51bGwgJiYgcGFyc2UudGFncy5zb21lKHQgPT4gRklMRU9WRVJWSUVXX0NPTU1FTlRfTUFSS0VSUy5oYXModC50YWdOYW1lKSkpIHtcbiAgICAgICAgICAvLyBSZXBvcnQgYSB3YXJuaW5nOyB0aGlzIHNob3VsZCBub3QgYnJlYWsgY29tcGlsYXRpb24gaW4gdGhpcmQgcGFydHkgY29kZS5cbiAgICAgICAgICByZXBvcnREaWFnbm9zdGljKFxuICAgICAgICAgICAgICBkaWFnbm9zdGljcywgY29udGV4dCwgbWVzc2FnZSwgY29tbWVudC5vcmlnaW5hbFJhbmdlLCB0cy5EaWFnbm9zdGljQ2F0ZWdvcnkuV2FybmluZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gKHNvdXJjZUZpbGU6IHRzLlNvdXJjZUZpbGUpID0+IHtcbiAgICAgIGNvbnN0IHRleHQgPSBzb3VyY2VGaWxlLmdldEZ1bGxUZXh0KCk7XG5cbiAgICAgIGxldCBmaWxlQ29tbWVudHM6IHRzLlN5bnRoZXNpemVkQ29tbWVudFtdID0gW107XG4gICAgICBjb25zdCBmaXJzdFN0YXRlbWVudCA9IHNvdXJjZUZpbGUuc3RhdGVtZW50cy5sZW5ndGggJiYgc291cmNlRmlsZS5zdGF0ZW1lbnRzWzBdIHx8IG51bGw7XG5cbiAgICAgIGNvbnN0IG9yaWdpbmFsQ29tbWVudHMgPSB0cy5nZXRMZWFkaW5nQ29tbWVudFJhbmdlcyh0ZXh0LCAwKSB8fCBbXTtcbiAgICAgIGlmICghZmlyc3RTdGF0ZW1lbnQpIHtcbiAgICAgICAgLy8gSW4gYW4gZW1wdHkgc291cmNlIGZpbGUsIGFsbCBjb21tZW50cyBhcmUgZmlsZS1sZXZlbCBjb21tZW50cy5cbiAgICAgICAgZmlsZUNvbW1lbnRzID0gc3ludGhlc2l6ZUNvbW1lbnRSYW5nZXMoc291cmNlRmlsZSwgb3JpZ2luYWxDb21tZW50cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBTZWFyY2ggZm9yIHRoZSBsYXN0IGNvbW1lbnQgc3BsaXQgZnJvbSB0aGUgZmlsZSB3aXRoIGEgXFxuXFxuLiBBbGwgY29tbWVudHMgYmVmb3JlIHRoYXQgYXJlXG4gICAgICAgIC8vIGNvbnNpZGVyZWQgZmlsZW92ZXJ2aWV3IGNvbW1lbnRzLCBhbGwgY29tbWVudHMgYWZ0ZXIgdGhhdCBiZWxvbmcgdG8gdGhlIG5leHRcbiAgICAgICAgLy8gc3RhdGVtZW50KHMpLiBJZiBub25lIGZvdW5kLCBjb21tZW50cyByZW1haW5zIGVtcHR5LCBhbmQgdGhlIGNvZGUgYmVsb3cgd2lsbCBpbnNlcnQgYSBuZXdcbiAgICAgICAgLy8gZmlsZW92ZXJ2aWV3IGNvbW1lbnQuXG4gICAgICAgIGZvciAobGV0IGkgPSBvcmlnaW5hbENvbW1lbnRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgY29uc3QgZW5kID0gb3JpZ2luYWxDb21tZW50c1tpXS5lbmQ7XG4gICAgICAgICAgaWYgKCF0ZXh0LnN1YnN0cmluZyhlbmQpLnN0YXJ0c1dpdGgoJ1xcblxcbicpICYmXG4gICAgICAgICAgICAgICF0ZXh0LnN1YnN0cmluZyhlbmQpLnN0YXJ0c1dpdGgoJ1xcclxcblxcclxcbicpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVGhpcyBjb21tZW50IGlzIHNlcGFyYXRlZCBmcm9tIHRoZSBzb3VyY2UgZmlsZSB3aXRoIGEgZG91YmxlIGJyZWFrLCBtYXJraW5nIGl0IChhbmQgYW55XG4gICAgICAgICAgLy8gcHJlY2VkaW5nIGNvbW1lbnRzKSBhcyBhIGZpbGUtbGV2ZWwgY29tbWVudC4gU3BsaXQgdGhlbSBvZmYgYW5kIGF0dGFjaCB0aGVtIG9udG8gYVxuICAgICAgICAgIC8vIE5vdEVtaXR0ZWRTdGF0ZW1lbnQsIHNvIHRoYXQgdGhleSBkbyBub3QgZ2V0IGxvc3QgbGF0ZXIgb24uXG4gICAgICAgICAgY29uc3Qgc3ludGhlc2l6ZWRDb21tZW50cyA9IGpzZG9jLnN5bnRoZXNpemVMZWFkaW5nQ29tbWVudHMoZmlyc3RTdGF0ZW1lbnQpO1xuICAgICAgICAgIGNvbnN0IG5vdEVtaXR0ZWQgPSB0cy5jcmVhdGVOb3RFbWl0dGVkU3RhdGVtZW50KHNvdXJjZUZpbGUpO1xuICAgICAgICAgIC8vIE1vZGlmeSB0aGUgY29tbWVudHMgb24gdGhlIGZpcnN0U3RhdGVtZW50IGluIHBsYWNlIGJ5IHJlbW92aW5nIHRoZSBmaWxlLWxldmVsIGNvbW1lbnRzLlxuICAgICAgICAgIGZpbGVDb21tZW50cyA9IHN5bnRoZXNpemVkQ29tbWVudHMuc3BsaWNlKDAsIGkgKyAxKTtcbiAgICAgICAgICAvLyBNb3ZlIHRoZSBmaWxlQ29tbWVudHMgb250byBub3RFbWl0dGVkLlxuICAgICAgICAgIHRzLnNldFN5bnRoZXRpY0xlYWRpbmdDb21tZW50cyhub3RFbWl0dGVkLCBmaWxlQ29tbWVudHMpO1xuICAgICAgICAgIHNvdXJjZUZpbGUgPSB1cGRhdGVTb3VyY2VGaWxlTm9kZShcbiAgICAgICAgICAgICAgc291cmNlRmlsZSxcbiAgICAgICAgICAgICAgdHMuY3JlYXRlTm9kZUFycmF5KFtub3RFbWl0dGVkLCBmaXJzdFN0YXRlbWVudCwgLi4uc291cmNlRmlsZS5zdGF0ZW1lbnRzLnNsaWNlKDEpXSkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cblxuICAgICAgICAvLyBOb3cgd2FsayBldmVyeSB0b3AgbGV2ZWwgc3RhdGVtZW50IGFuZCBlc2NhcGUvZHJvcCBhbnkgQGZpbGVvdmVydmlldyBjb21tZW50cyBmb3VuZC5cbiAgICAgICAgLy8gQ2xvc3VyZSBpZ25vcmVzIGFsbCBAZmlsZW92ZXJ2aWV3IGNvbW1lbnRzIGJ1dCB0aGUgbGFzdCwgc28gdHNpY2tsZSBtdXN0IG1ha2Ugc3VyZSBub3QgdG9cbiAgICAgICAgLy8gZW1pdCBkdXBsaWNhdGVkIG9uZXMuXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc291cmNlRmlsZS5zdGF0ZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3Qgc3RtdCA9IHNvdXJjZUZpbGUuc3RhdGVtZW50c1tpXTtcbiAgICAgICAgICAvLyBBY2NlcHQgdGhlIE5vdEVtaXR0ZWRTdGF0ZW1lbnQgaW5zZXJ0ZWQgYWJvdmUuXG4gICAgICAgICAgaWYgKGkgPT09IDAgJiYgc3RtdC5raW5kID09PSB0cy5TeW50YXhLaW5kLk5vdEVtaXR0ZWRTdGF0ZW1lbnQpIGNvbnRpbnVlO1xuICAgICAgICAgIGNvbnN0IGNvbW1lbnRzID0ganNkb2Muc3ludGhlc2l6ZUxlYWRpbmdDb21tZW50cyhzdG10KTtcbiAgICAgICAgICBjaGVja05vRmlsZW92ZXJ2aWV3Q29tbWVudHMoXG4gICAgICAgICAgICAgIHN0bXQsIGNvbW1lbnRzLFxuICAgICAgICAgICAgICBgZmlsZSBjb21tZW50cyBtdXN0IGJlIGF0IHRoZSB0b3Agb2YgdGhlIGZpbGUsIGAgK1xuICAgICAgICAgICAgICAgICAgYHNlcGFyYXRlZCBmcm9tIHRoZSBmaWxlIGJvZHkgYnkgYW4gZW1wdHkgbGluZS5gKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBDbG9zdXJlIENvbXBpbGVyIGNvbnNpZGVycyB0aGUgKmxhc3QqIGNvbW1lbnQgd2l0aCBAZmlsZW92ZXJ2aWV3IChvciBAZXh0ZXJucyBvclxuICAgICAgLy8gQG5vY29tcGlsZSkgdGhhdCBoYXMgbm90IGJlZW4gYXR0YWNoZWQgdG8gc29tZSBvdGhlciB0cmVlIG5vZGUgdG8gYmUgdGhlIGZpbGUgb3ZlcnZpZXdcbiAgICAgIC8vIGNvbW1lbnQsIGFuZCBvbmx5IGFwcGxpZXMgQHN1cHByZXNzIHRhZ3MgZnJvbSBpdC4gR29vZ2xlLWludGVybmFsIHRvb2xpbmcgY29uc2lkZXJzICphbnkqXG4gICAgICAvLyBjb21tZW50IG1lbnRpb25pbmcgQGZpbGVvdmVydmlldy5cbiAgICAgIGxldCBmaWxlb3ZlcnZpZXdJZHggPSAtMTtcbiAgICAgIGxldCB0YWdzOiBqc2RvYy5UYWdbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IGZpbGVDb21tZW50cy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBjb25zdCBwYXJzZSA9IGpzZG9jLnBhcnNlQ29udGVudHMoZmlsZUNvbW1lbnRzW2ldLnRleHQpO1xuICAgICAgICBpZiAocGFyc2UgIT09IG51bGwgJiYgcGFyc2UudGFncy5zb21lKHQgPT4gRklMRU9WRVJWSUVXX0NPTU1FTlRfTUFSS0VSUy5oYXModC50YWdOYW1lKSkpIHtcbiAgICAgICAgICBmaWxlb3ZlcnZpZXdJZHggPSBpO1xuICAgICAgICAgIHRhZ3MgPSBwYXJzZS50YWdzO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChmaWxlb3ZlcnZpZXdJZHggIT09IC0xKSB7XG4gICAgICAgIGNoZWNrTm9GaWxlb3ZlcnZpZXdDb21tZW50cyhcbiAgICAgICAgICAgIGZpcnN0U3RhdGVtZW50IHx8IHNvdXJjZUZpbGUsIGZpbGVDb21tZW50cy5zbGljZSgwLCBmaWxlb3ZlcnZpZXdJZHgpLFxuICAgICAgICAgICAgYGR1cGxpY2F0ZSBmaWxlIGxldmVsIGNvbW1lbnRgKTtcbiAgICAgIH1cblxuICAgICAgYXVnbWVudEZpbGVvdmVydmlld0NvbW1lbnRzKHRhZ3MpO1xuICAgICAgY29uc3QgY29tbWVudFRleHQgPSBqc2RvYy50b1N0cmluZ1dpdGhvdXRTdGFydEVuZCh0YWdzKTtcblxuICAgICAgaWYgKGZpbGVvdmVydmlld0lkeCA8IDApIHtcbiAgICAgICAgLy8gTm8gZXhpc3RpbmcgY29tbWVudCB0byBtZXJnZSB3aXRoLCBqdXN0IGVtaXQgYSBuZXcgb25lLlxuICAgICAgICByZXR1cm4gYWRkTmV3RmlsZW92ZXJ2aWV3Q29tbWVudChzb3VyY2VGaWxlLCBjb21tZW50VGV4dCk7XG4gICAgICB9XG5cbiAgICAgIGZpbGVDb21tZW50c1tmaWxlb3ZlcnZpZXdJZHhdLnRleHQgPSBjb21tZW50VGV4dDtcbiAgICAgIC8vIHNmIGRvZXMgbm90IG5lZWQgdG8gYmUgdXBkYXRlZCwgc3ludGhlc2l6ZWQgY29tbWVudHMgYXJlIG11dGFibGUuXG4gICAgICByZXR1cm4gc291cmNlRmlsZTtcbiAgICB9O1xuICB9O1xufVxuXG5mdW5jdGlvbiBhZGROZXdGaWxlb3ZlcnZpZXdDb21tZW50KHNmOiB0cy5Tb3VyY2VGaWxlLCBjb21tZW50VGV4dDogc3RyaW5nKTogdHMuU291cmNlRmlsZSB7XG4gIGxldCBzeW50aGV0aWNGaXJzdFN0YXRlbWVudCA9IGNyZWF0ZU5vdEVtaXR0ZWRTdGF0ZW1lbnQoc2YpO1xuICBzeW50aGV0aWNGaXJzdFN0YXRlbWVudCA9IHRzLmFkZFN5bnRoZXRpY1RyYWlsaW5nQ29tbWVudChcbiAgICAgIHN5bnRoZXRpY0ZpcnN0U3RhdGVtZW50LCB0cy5TeW50YXhLaW5kLk11bHRpTGluZUNvbW1lbnRUcml2aWEsIGNvbW1lbnRUZXh0LCB0cnVlKTtcbiAgcmV0dXJuIHVwZGF0ZVNvdXJjZUZpbGVOb2RlKHNmLCB0cy5jcmVhdGVOb2RlQXJyYXkoW3N5bnRoZXRpY0ZpcnN0U3RhdGVtZW50LCAuLi5zZi5zdGF0ZW1lbnRzXSkpO1xufVxuIl19