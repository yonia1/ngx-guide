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
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("tsickle/src/jsdoc", ["require", "exports", "tsickle/src/typescript"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ts = require("tsickle/src/typescript");
    /**
     * A list of all JSDoc tags allowed by the Closure compiler.
     * The public Closure docs don't list all the tags it allows; this list comes
     * from the compiler source itself.
     * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/parsing/Annotation.java
     * https://github.com/google/closure-compiler/blob/master/src/com/google/javascript/jscomp/parsing/ParserConfig.properties
     */
    var JSDOC_TAGS_WHITELIST = new Set([
        'abstract',
        'argument',
        'author',
        'consistentIdGenerator',
        'const',
        'constant',
        'constructor',
        'copyright',
        'define',
        'deprecated',
        'desc',
        'dict',
        'disposes',
        'enhance',
        'enhanceable',
        'enum',
        'export',
        'expose',
        'extends',
        'externs',
        'fileoverview',
        'final',
        'hassoydelcall',
        'hassoydeltemplate',
        'hidden',
        'id',
        'idGenerator',
        'ignore',
        'implements',
        'implicitCast',
        'inheritDoc',
        'interface',
        'jaggerInject',
        'jaggerModule',
        'jaggerProvide',
        'jaggerProvidePromise',
        'lends',
        'license',
        'link',
        'meaning',
        'modifies',
        'modName',
        'mods',
        'ngInject',
        'noalias',
        'nocollapse',
        'nocompile',
        'nosideeffects',
        'override',
        'owner',
        'package',
        'param',
        'pintomodule',
        'polymer',
        'polymerBehavior',
        'preserve',
        'preserveTry',
        'private',
        'protected',
        'public',
        'record',
        'requirecss',
        'requires',
        'return',
        'returns',
        'see',
        'stableIdGenerator',
        'struct',
        'suppress',
        'template',
        'this',
        'throws',
        'type',
        'typedef',
        'unrestricted',
        'version',
        'wizaction',
        'wizmodule',
    ]);
    /**
     * A list of JSDoc @tags that are never allowed in TypeScript source. These are Closure tags that
     * can be expressed in the TypeScript surface syntax. As tsickle's emit will mangle type names,
     * these will cause Closure Compiler issues and should not be used.
     */
    var JSDOC_TAGS_BLACKLIST = new Set([
        'augments', 'class', 'constructs', 'constructor', 'enum', 'extends', 'field',
        'function', 'implements', 'interface', 'lends', 'namespace', 'private', 'public',
        'record', 'static', 'template', 'this', 'type', 'typedef',
    ]);
    /**
     * A list of JSDoc @tags that might include a {type} after them. Only banned when a type is passed.
     * Note that this does not include tags that carry a non-type system type, e.g. \@suppress.
     */
    var JSDOC_TAGS_WITH_TYPES = new Set([
        'const',
        'export',
        'param',
        'return',
    ]);
    /**
     * parse parses JSDoc out of a comment string.
     * Returns null if comment is not JSDoc.
     */
    // TODO(martinprobst): representing JSDoc as a list of tags is too simplistic. We need functionality
    // such as merging (below), de-duplicating certain tags (@deprecated), and special treatment for
    // others (e.g. @suppress). We should introduce a proper model class with a more suitable data
    // strucure (e.g. a Map<TagName, Values[]>).
    function parse(comment) {
        // TODO(evanm): this is a pile of hacky regexes for now, because we
        // would rather use the better TypeScript implementation of JSDoc
        // parsing.  https://github.com/Microsoft/TypeScript/issues/7393
        if (comment.kind !== ts.SyntaxKind.MultiLineCommentTrivia)
            return null;
        // comment.text does not include /* and */, so must start with '*' for JSDoc.
        if (comment.text[0] !== '*')
            return null;
        var text = comment.text.substring(1).trim();
        return parseContents(text);
    }
    exports.parse = parse;
    /**
     * Returns the input string with line endings normalized to '\n'.
     */
    function normalizeLineEndings(input) {
        return input.replace(/\r\n/g, '\n');
    }
    exports.normalizeLineEndings = normalizeLineEndings;
    /**
     * parseContents parses JSDoc out of a comment text.
     * Returns null if comment is not JSDoc.
     *
     * @param commentText a comment's text content, i.e. the comment w/o /* and * /.
     */
    function parseContents(commentText) {
        var e_1, _a, _b, _c;
        // Make sure we have proper line endings before parsing on Windows.
        commentText = normalizeLineEndings(commentText);
        // Strip all the " * " bits from the front of each line.
        commentText = commentText.replace(/^\s*\*? ?/gm, '');
        var lines = commentText.split('\n');
        var tags = [];
        var warnings = [];
        try {
            for (var lines_1 = __values(lines), lines_1_1 = lines_1.next(); !lines_1_1.done; lines_1_1 = lines_1.next()) {
                var line = lines_1_1.value;
                var match = line.match(/^\s*@(\S+) *(.*)/);
                if (match) {
                    var _d = __read(match, 3), _ = _d[0], tagName = _d[1], text = _d[2];
                    if (tagName === 'returns') {
                        // A synonym for 'return'.
                        tagName = 'return';
                    }
                    var type = void 0;
                    if (JSDOC_TAGS_BLACKLIST.has(tagName)) {
                        warnings.push("@" + tagName + " annotations are redundant with TypeScript equivalents");
                        continue; // Drop the tag so Closure won't process it.
                    }
                    else if (JSDOC_TAGS_WITH_TYPES.has(tagName) && text[0] === '{') {
                        warnings.push("the type annotation on @" + tagName + " is redundant with its TypeScript type, " +
                            "remove the {...} part");
                        continue;
                    }
                    else if (tagName === 'suppress') {
                        var suppressMatch = text.match(/^\{(.*)\}(.*)$/);
                        if (!suppressMatch) {
                            warnings.push("malformed @suppress tag: \"" + text + "\"");
                        }
                        else {
                            _b = __read(suppressMatch, 3), type = _b[1], text = _b[2];
                        }
                    }
                    else if (tagName === 'dict') {
                        warnings.push('use index signatures (`[k: string]: type`) instead of @dict');
                        continue;
                    }
                    // Grab the parameter name from @param tags.
                    var parameterName = void 0;
                    if (tagName === 'param') {
                        match = text.match(/^(\S+) ?(.*)/);
                        if (match)
                            _c = __read(match, 3), _ = _c[0], parameterName = _c[1], text = _c[2];
                    }
                    var tag = { tagName: tagName };
                    if (parameterName)
                        tag.parameterName = parameterName;
                    if (text)
                        tag.text = text;
                    if (type)
                        tag.type = type;
                    tags.push(tag);
                }
                else {
                    // Text without a preceding @tag on it is either the plain text
                    // documentation or a continuation of a previous tag.
                    if (tags.length === 0) {
                        tags.push({ tagName: '', text: line });
                    }
                    else {
                        var lastTag = tags[tags.length - 1];
                        lastTag.text = (lastTag.text || '') + '\n' + line;
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (lines_1_1 && !lines_1_1.done && (_a = lines_1.return)) _a.call(lines_1);
            }
            finally { if (e_1) throw e_1.error; }
        }
        if (warnings.length > 0) {
            return { tags: tags, warnings: warnings };
        }
        return { tags: tags };
    }
    exports.parseContents = parseContents;
    /**
     * Serializes a Tag into a string usable in a comment.
     * Returns a string like " @foo {bar} baz" (note the whitespace).
     */
    function tagToString(tag, escapeExtraTags) {
        if (escapeExtraTags === void 0) { escapeExtraTags = new Set(); }
        var out = '';
        if (tag.tagName) {
            if (!JSDOC_TAGS_WHITELIST.has(tag.tagName) || escapeExtraTags.has(tag.tagName)) {
                // Escape tags we don't understand.  This is a subtle
                // compromise between multiple issues.
                // 1) If we pass through these non-Closure tags, the user will
                //    get a warning from Closure, and the point of tsickle is
                //    to insulate the user from Closure.
                // 2) The output of tsickle is for Closure but also may be read
                //    by humans, for example non-TypeScript users of Angular.
                // 3) Finally, we don't want to warn because users should be
                //    free to add whichever JSDoc they feel like.  If the user
                //    wants help ensuring they didn't typo a tag, that is the
                //    responsibility of a linter.
                out += " \\@" + tag.tagName;
            }
            else {
                out += " @" + tag.tagName;
            }
        }
        if (tag.type) {
            out += ' {';
            if (tag.restParam) {
                out += '...';
            }
            out += tag.type;
            if (tag.optional) {
                out += '=';
            }
            out += '}';
        }
        if (tag.parameterName) {
            out += ' ' + tag.parameterName;
        }
        if (tag.text) {
            out += ' ' + tag.text.replace(/@/g, '\\@');
        }
        return out;
    }
    /** Tags that must only occur onces in a comment (filtered below). */
    var SINGLETON_TAGS = new Set(['deprecated']);
    /** Tags that conflict with \@type in Closure Compiler (e.g. \@param). */
    exports.TAGS_CONFLICTING_WITH_TYPE = new Set(['param', 'return']);
    /**
     * synthesizeLeadingComments parses the leading comments of node, converts them
     * to synthetic comments, and makes sure the original text comments do not get
     * emitted by TypeScript.
     */
    function synthesizeLeadingComments(node) {
        var existing = ts.getSyntheticLeadingComments(node);
        if (existing)
            return existing;
        var text = node.getFullText();
        var synthComments = getLeadingCommentRangesSynthesized(text, node.getFullStart());
        if (synthComments.length) {
            ts.setSyntheticLeadingComments(node, synthComments);
            suppressLeadingCommentsRecursively(node);
        }
        return synthComments;
    }
    exports.synthesizeLeadingComments = synthesizeLeadingComments;
    /**
     * parseLeadingCommentRangesSynthesized parses the leading comment ranges out of the given text and
     * converts them to SynthesizedComments.
     * @param offset the offset of text in the source file, e.g. node.getFullStart().
     */
    // VisibleForTesting
    function getLeadingCommentRangesSynthesized(text, offset) {
        if (offset === void 0) { offset = 0; }
        var comments = ts.getLeadingCommentRanges(text, 0) || [];
        return comments.map(function (cr) {
            // Confusingly, CommentRange in TypeScript includes start and end markers, but
            // SynthesizedComments do not.
            var commentText = cr.kind === ts.SyntaxKind.SingleLineCommentTrivia ?
                text.substring(cr.pos + 2, cr.end) :
                text.substring(cr.pos + 2, cr.end - 2);
            return __assign({}, cr, { text: commentText, pos: -1, end: -1, originalRange: { pos: cr.pos + offset, end: cr.end + offset } });
        });
    }
    exports.getLeadingCommentRangesSynthesized = getLeadingCommentRangesSynthesized;
    /**
     * suppressCommentsRecursively prevents emit of leading comments on node, and any recursive nodes
     * underneath it that start at the same offset.
     */
    function suppressLeadingCommentsRecursively(node) {
        // TypeScript emits leading comments on a node, unless:
        // - the comment was emitted by the parent node
        // - the node has the NoLeadingComments emit flag.
        // However, transformation steps sometimes copy nodes without keeping their emit flags, so just
        // setting NoLeadingComments recursively is not enough, we must also set the text range to avoid
        // the copied node to have comments emitted.
        var originalStart = node.getFullStart();
        var actualStart = node.getStart();
        function suppressCommentsInternal(node) {
            ts.setEmitFlags(node, ts.EmitFlags.NoLeadingComments);
            return !!ts.forEachChild(node, function (child) {
                if (child.pos !== originalStart)
                    return true;
                return suppressCommentsInternal(child);
            });
        }
        suppressCommentsInternal(node);
    }
    exports.suppressLeadingCommentsRecursively = suppressLeadingCommentsRecursively;
    function toSynthesizedComment(tags, escapeExtraTags) {
        return {
            kind: ts.SyntaxKind.MultiLineCommentTrivia,
            text: toStringWithoutStartEnd(tags, escapeExtraTags),
            pos: -1,
            end: -1,
            hasTrailingNewLine: true,
        };
    }
    exports.toSynthesizedComment = toSynthesizedComment;
    /** Serializes a Comment out to a string, but does not include the start and end comment tokens. */
    function toStringWithoutStartEnd(tags, escapeExtraTags) {
        if (escapeExtraTags === void 0) { escapeExtraTags = new Set(); }
        return serialize(tags, false, escapeExtraTags);
    }
    exports.toStringWithoutStartEnd = toStringWithoutStartEnd;
    /** Serializes a Comment out to a string usable in source code. */
    function toString(tags, escapeExtraTags) {
        if (escapeExtraTags === void 0) { escapeExtraTags = new Set(); }
        return serialize(tags, true, escapeExtraTags);
    }
    exports.toString = toString;
    function serialize(tags, includeStartEnd, escapeExtraTags) {
        if (escapeExtraTags === void 0) { escapeExtraTags = new Set(); }
        var e_2, _a;
        if (tags.length === 0)
            return '';
        if (tags.length === 1) {
            var tag = tags[0];
            if ((tag.tagName === 'type' || tag.tagName === 'typedef' || tag.tagName === 'nocollapse') &&
                (!tag.text || !tag.text.match('\n'))) {
                // Special-case one-liner "type" and "nocollapse" tags to fit on one line, e.g.
                //   /** @type {foo} */
                var text = tagToString(tag, escapeExtraTags);
                return includeStartEnd ? "/**" + text + " */" : "*" + text + " ";
            }
            // Otherwise, fall through to the multi-line output.
        }
        var out = includeStartEnd ? '/**\n' : '*\n';
        var emitted = new Set();
        try {
            for (var tags_1 = __values(tags), tags_1_1 = tags_1.next(); !tags_1_1.done; tags_1_1 = tags_1.next()) {
                var tag = tags_1_1.value;
                if (emitted.has(tag.tagName) && SINGLETON_TAGS.has(tag.tagName)) {
                    continue;
                }
                emitted.add(tag.tagName);
                out += ' *';
                // If the tagToString is multi-line, insert " * " prefixes on subsequent lines.
                out += tagToString(tag, escapeExtraTags).split('\n').join('\n * ');
                out += '\n';
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (tags_1_1 && !tags_1_1.done && (_a = tags_1.return)) _a.call(tags_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        out += includeStartEnd ? ' */\n' : ' ';
        return out;
    }
    /** Merges multiple tags (of the same tagName type) into a single unified tag. */
    function merge(tags) {
        var e_3, _a;
        var tagNames = new Set();
        var parameterNames = new Set();
        var types = new Set();
        var texts = new Set();
        // If any of the tags are optional/rest, then the merged output is optional/rest.
        var optional = false;
        var restParam = false;
        try {
            for (var tags_2 = __values(tags), tags_2_1 = tags_2.next(); !tags_2_1.done; tags_2_1 = tags_2.next()) {
                var tag_1 = tags_2_1.value;
                tagNames.add(tag_1.tagName);
                if (tag_1.parameterName !== undefined)
                    parameterNames.add(tag_1.parameterName);
                if (tag_1.type !== undefined)
                    types.add(tag_1.type);
                if (tag_1.text !== undefined)
                    texts.add(tag_1.text);
                if (tag_1.optional)
                    optional = true;
                if (tag_1.restParam)
                    restParam = true;
            }
        }
        catch (e_3_1) { e_3 = { error: e_3_1 }; }
        finally {
            try {
                if (tags_2_1 && !tags_2_1.done && (_a = tags_2.return)) _a.call(tags_2);
            }
            finally { if (e_3) throw e_3.error; }
        }
        if (tagNames.size !== 1) {
            throw new Error("cannot merge differing tags: " + JSON.stringify(tags));
        }
        var tagName = tagNames.values().next().value;
        var parameterName = parameterNames.size > 0 ? Array.from(parameterNames).join('_or_') : undefined;
        var type = types.size > 0 ? Array.from(types).join('|') : undefined;
        // @template uses text (not type!) to declare its type parameters, with ','-separated text.
        var isTemplateTag = tagName === 'template';
        var text = texts.size > 0 ? Array.from(texts).join(isTemplateTag ? ',' : ' / ') : undefined;
        var tag = { tagName: tagName, parameterName: parameterName, type: type, text: text };
        // Note: a param can either be optional or a rest param; if we merged an
        // optional and rest param together, prefer marking it as a rest param.
        if (restParam) {
            tag.restParam = true;
        }
        else if (optional) {
            tag.optional = true;
        }
        return tag;
    }
    exports.merge = merge;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvanNkb2MudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRUgsMkNBQW1DO0lBc0NuQzs7Ozs7O09BTUc7SUFDSCxJQUFNLG9CQUFvQixHQUFHLElBQUksR0FBRyxDQUFDO1FBQ25DLFVBQVU7UUFDVixVQUFVO1FBQ1YsUUFBUTtRQUNSLHVCQUF1QjtRQUN2QixPQUFPO1FBQ1AsVUFBVTtRQUNWLGFBQWE7UUFDYixXQUFXO1FBQ1gsUUFBUTtRQUNSLFlBQVk7UUFDWixNQUFNO1FBQ04sTUFBTTtRQUNOLFVBQVU7UUFDVixTQUFTO1FBQ1QsYUFBYTtRQUNiLE1BQU07UUFDTixRQUFRO1FBQ1IsUUFBUTtRQUNSLFNBQVM7UUFDVCxTQUFTO1FBQ1QsY0FBYztRQUNkLE9BQU87UUFDUCxlQUFlO1FBQ2YsbUJBQW1CO1FBQ25CLFFBQVE7UUFDUixJQUFJO1FBQ0osYUFBYTtRQUNiLFFBQVE7UUFDUixZQUFZO1FBQ1osY0FBYztRQUNkLFlBQVk7UUFDWixXQUFXO1FBQ1gsY0FBYztRQUNkLGNBQWM7UUFDZCxlQUFlO1FBQ2Ysc0JBQXNCO1FBQ3RCLE9BQU87UUFDUCxTQUFTO1FBQ1QsTUFBTTtRQUNOLFNBQVM7UUFDVCxVQUFVO1FBQ1YsU0FBUztRQUNULE1BQU07UUFDTixVQUFVO1FBQ1YsU0FBUztRQUNULFlBQVk7UUFDWixXQUFXO1FBQ1gsZUFBZTtRQUNmLFVBQVU7UUFDVixPQUFPO1FBQ1AsU0FBUztRQUNULE9BQU87UUFDUCxhQUFhO1FBQ2IsU0FBUztRQUNULGlCQUFpQjtRQUNqQixVQUFVO1FBQ1YsYUFBYTtRQUNiLFNBQVM7UUFDVCxXQUFXO1FBQ1gsUUFBUTtRQUNSLFFBQVE7UUFDUixZQUFZO1FBQ1osVUFBVTtRQUNWLFFBQVE7UUFDUixTQUFTO1FB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QUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1FBQ3RFLDJGQUEyRjtRQUMzRixJQUFNLGFBQWEsR0FBRyxPQUFPLEtBQUssVUFBVSxDQUFDO1FBQzdDLElBQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUM5RixJQUFNLEdBQUcsR0FBUSxFQUFDLE9BQU8sU0FBQSxFQUFFLGFBQWEsZUFBQSxFQUFFLElBQUksTUFBQSxFQUFFLElBQUksTUFBQSxFQUFDLENBQUM7UUFDdEQsd0VBQXdFO1FBQ3hFLHVFQUF1RTtRQUN2RSxJQUFJLFNBQVMsRUFBRTtZQUNiLEdBQUcsQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO2FBQU0sSUFBSSxRQUFRLEVBQUU7WUFDbkIsR0FBRyxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7U0FDckI7UUFDRCxPQUFPLEdBQUcsQ0FBQztJQUNiLENBQUM7SUFwQ0Qsc0JBb0NDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQgKiBhcyB0cyBmcm9tICcuL3R5cGVzY3JpcHQnO1xuXG4vKipcbiAqIFR5cGVTY3JpcHQgaGFzIGFuIEFQSSBmb3IgSlNEb2MgYWxyZWFkeSwgYnV0IGl0J3Mgbm90IGV4cG9zZWQuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzczOTNcbiAqIEZvciBub3cgd2UgY3JlYXRlIHR5cGVzIHRoYXQgYXJlIHNpbWlsYXIgdG8gdGhlaXJzIHNvIHRoYXQgbWlncmF0aW5nXG4gKiB0byB0aGVpciBBUEkgd2lsbCBiZSBlYXNpZXIuICBTZWUgZS5nLiB0cy5KU0RvY1RhZyBhbmQgdHMuSlNEb2NDb21tZW50LlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFRhZyB7XG4gIC8qKlxuICAgKiB0YWdOYW1lIGlzIGUuZy4gXCJwYXJhbVwiIGluIGFuIEBwYXJhbSBkZWNsYXJhdGlvbi4gIEl0IGlzIHRoZSBlbXB0eSBzdHJpbmdcbiAgICogZm9yIHRoZSBwbGFpbiB0ZXh0IGRvY3VtZW50YXRpb24gdGhhdCBvY2N1cnMgYmVmb3JlIGFueSBAZm9vIGxpbmVzLlxuICAgKi9cbiAgdGFnTmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogcGFyYW1ldGVyTmFtZSBpcyB0aGUgdGhlIG5hbWUgb2YgdGhlIGZ1bmN0aW9uIHBhcmFtZXRlciwgZS5nLiBcImZvb1wiXG4gICAqIGluIGBcXEBwYXJhbSBmb28gVGhlIGZvbyBwYXJhbWBcbiAgICovXG4gIHBhcmFtZXRlck5hbWU/OiBzdHJpbmc7XG4gIC8qKlxuICAgKiBUaGUgdHlwZSBvZiBhIEpTRG9jIFxcQHBhcmFtLCBcXEB0eXBlIGV0YyB0YWcsIHJlbmRlcmVkIGluIGN1cmx5IGJyYWNlcy5cbiAgICogQ2FuIGFsc28gaG9sZCB0aGUgdHlwZSBvZiBhbiBcXEBzdXBwcmVzcy5cbiAgICovXG4gIHR5cGU/OiBzdHJpbmc7XG4gIC8qKiBvcHRpb25hbCBpcyB0cnVlIGZvciBvcHRpb25hbCBmdW5jdGlvbiBwYXJhbWV0ZXJzLiAqL1xuICBvcHRpb25hbD86IGJvb2xlYW47XG4gIC8qKiByZXN0UGFyYW0gaXMgdHJ1ZSBmb3IgXCIuLi54OiBmb29bXVwiIGZ1bmN0aW9uIHBhcmFtZXRlcnMuICovXG4gIHJlc3RQYXJhbT86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBkZXN0cnVjdHVyaW5nIGlzIHRydWUgZm9yIGRlc3RydWN0dXJpbmcgYmluZCBwYXJhbWV0ZXJzLCB3aGljaCByZXF1aXJlXG4gICAqIG5vbi1udWxsIGFyZ3VtZW50cyBvbiB0aGUgQ2xvc3VyZSBzaWRlLiAgQ2FuIGxpa2VseSByZW1vdmUgdGhpc1xuICAgKiBvbmNlIFR5cGVTY3JpcHQgbnVsbGFibGUgdHlwZXMgYXJlIGF2YWlsYWJsZS5cbiAgICovXG4gIGRlc3RydWN0dXJpbmc/OiBib29sZWFuO1xuICAvKiogQW55IHJlbWFpbmluZyB0ZXh0IG9uIHRoZSB0YWcsIGUuZy4gdGhlIGRlc2NyaXB0aW9uLiAqL1xuICB0ZXh0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIEEgbGlzdCBvZiBhbGwgSlNEb2MgdGFncyBhbGxvd2VkIGJ5IHRoZSBDbG9zdXJlIGNvbXBpbGVyLlxuICogVGhlIHB1YmxpYyBDbG9zdXJlIGRvY3MgZG9uJ3QgbGlzdCBhbGwgdGhlIHRhZ3MgaXQgYWxsb3dzOyB0aGlzIGxpc3QgY29tZXNcbiAqIGZyb20gdGhlIGNvbXBpbGVyIHNvdXJjZSBpdHNlbGYuXG4gKiBodHRwczovL2dpdGh1Yi5jb20vZ29vZ2xlL2Nsb3N1cmUtY29tcGlsZXIvYmxvYi9tYXN0ZXIvc3JjL2NvbS9nb29nbGUvamF2YXNjcmlwdC9qc2NvbXAvcGFyc2luZy9Bbm5vdGF0aW9uLmphdmFcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9nb29nbGUvY2xvc3VyZS1jb21waWxlci9ibG9iL21hc3Rlci9zcmMvY29tL2dvb2dsZS9qYXZhc2NyaXB0L2pzY29tcC9wYXJzaW5nL1BhcnNlckNvbmZpZy5wcm9wZXJ0aWVzXG4gKi9cbmNvbnN0IEpTRE9DX1RBR1NfV0hJVEVMSVNUID0gbmV3IFNldChbXG4gICdhYnN0cmFjdCcsXG4gICdhcmd1bWVudCcsXG4gICdhdXRob3InLFxuICAnY29uc2lzdGVudElkR2VuZXJhdG9yJyxcbiAgJ2NvbnN0JyxcbiAgJ2NvbnN0YW50JyxcbiAgJ2NvbnN0cnVjdG9yJyxcbiAgJ2NvcHlyaWdodCcsXG4gICdkZWZpbmUnLFxuICAnZGVwcmVjYXRlZCcsXG4gICdkZXNjJyxcbiAgJ2RpY3QnLFxuICAnZGlzcG9zZXMnLFxuICAnZW5oYW5jZScsXG4gICdlbmhhbmNlYWJsZScsXG4gICdlbnVtJyxcbiAgJ2V4cG9ydCcsXG4gICdleHBvc2UnLFxuICAnZXh0ZW5kcycsXG4gICdleHRlcm5zJyxcbiAgJ2ZpbGVvdmVydmlldycsXG4gICdmaW5hbCcsXG4gICdoYXNzb3lkZWxjYWxsJyxcbiAgJ2hhc3NveWRlbHRlbXBsYXRlJyxcbiAgJ2hpZGRlbicsXG4gICdpZCcsXG4gICdpZEdlbmVyYXRvcicsXG4gICdpZ25vcmUnLFxuICAnaW1wbGVtZW50cycsXG4gICdpbXBsaWNpdENhc3QnLFxuICAnaW5oZXJpdERvYycsXG4gICdpbnRlcmZhY2UnLFxuICAnamFnZ2VySW5qZWN0JyxcbiAgJ2phZ2dlck1vZHVsZScsXG4gICdqYWdnZXJQcm92aWRlJyxcbiAgJ2phZ2dlclByb3ZpZGVQcm9taXNlJyxcbiAgJ2xlbmRzJyxcbiAgJ2xpY2Vuc2UnLFxuICAnbGluaycsXG4gICdtZWFuaW5nJyxcbiAgJ21vZGlmaWVzJyxcbiAgJ21vZE5hbWUnLFxuICAnbW9kcycsXG4gICduZ0luamVjdCcsXG4gICdub2FsaWFzJyxcbiAgJ25vY29sbGFwc2UnLFxuICAnbm9jb21waWxlJyxcbiAgJ25vc2lkZWVmZmVjdHMnLFxuICAnb3ZlcnJpZGUnLFxuICAnb3duZXInLFxuICAncGFja2FnZScsXG4gICdwYXJhbScsXG4gICdwaW50b21vZHVsZScsXG4gICdwb2x5bWVyJyxcbiAgJ3BvbHltZXJCZWhhdmlvcicsXG4gICdwcmVzZXJ2ZScsXG4gICdwcmVzZXJ2ZVRyeScsXG4gICdwcml2YXRlJyxcbiAgJ3Byb3RlY3RlZCcsXG4gICdwdWJsaWMnLFxuICAncmVjb3JkJyxcbiAgJ3JlcXVpcmVjc3MnLFxuICAncmVxdWlyZXMnLFxuICAncmV0dXJuJyxcbiAgJ3JldHVybnMnLFxuICAnc2VlJyxcbiAgJ3N0YWJsZUlkR2VuZXJhdG9yJyxcbiAgJ3N0cnVjdCcsXG4gICdzdXBwcmVzcycsXG4gICd0ZW1wbGF0ZScsXG4gICd0aGlzJyxcbiAgJ3Rocm93cycsXG4gICd0eXBlJyxcbiAgJ3R5cGVkZWYnLFxuICAndW5yZXN0cmljdGVkJyxcbiAgJ3ZlcnNpb24nLFxuICAnd2l6YWN0aW9uJyxcbiAgJ3dpem1vZHVsZScsXG5dKTtcblxuLyoqXG4gKiBBIGxpc3Qgb2YgSlNEb2MgQHRhZ3MgdGhhdCBhcmUgbmV2ZXIgYWxsb3dlZCBpbiBUeXBlU2NyaXB0IHNvdXJjZS4gVGhlc2UgYXJlIENsb3N1cmUgdGFncyB0aGF0XG4gKiBjYW4gYmUgZXhwcmVzc2VkIGluIHRoZSBUeXBlU2NyaXB0IHN1cmZhY2Ugc3ludGF4LiBBcyB0c2lja2xlJ3MgZW1pdCB3aWxsIG1hbmdsZSB0eXBlIG5hbWVzLFxuICogdGhlc2Ugd2lsbCBjYXVzZSBDbG9zdXJlIENvbXBpbGVyIGlzc3VlcyBhbmQgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICovXG5jb25zdCBKU0RPQ19UQUdTX0JMQUNLTElTVCA9IG5ldyBTZXQoW1xuICAnYXVnbWVudHMnLCAnY2xhc3MnLCAgICAgICdjb25zdHJ1Y3RzJywgJ2NvbnN0cnVjdG9yJywgJ2VudW0nLCAgICAgICdleHRlbmRzJywgJ2ZpZWxkJyxcbiAgJ2Z1bmN0aW9uJywgJ2ltcGxlbWVudHMnLCAnaW50ZXJmYWNlJywgICdsZW5kcycsICAgICAgICduYW1lc3BhY2UnLCAncHJpdmF0ZScsICdwdWJsaWMnLFxuICAncmVjb3JkJywgICAnc3RhdGljJywgICAgICd0ZW1wbGF0ZScsICAgJ3RoaXMnLCAgICAgICAgJ3R5cGUnLCAgICAgICd0eXBlZGVmJyxcbl0pO1xuXG4vKipcbiAqIEEgbGlzdCBvZiBKU0RvYyBAdGFncyB0aGF0IG1pZ2h0IGluY2x1ZGUgYSB7dHlwZX0gYWZ0ZXIgdGhlbS4gT25seSBiYW5uZWQgd2hlbiBhIHR5cGUgaXMgcGFzc2VkLlxuICogTm90ZSB0aGF0IHRoaXMgZG9lcyBub3QgaW5jbHVkZSB0YWdzIHRoYXQgY2FycnkgYSBub24tdHlwZSBzeXN0ZW0gdHlwZSwgZS5nLiBcXEBzdXBwcmVzcy5cbiAqL1xuY29uc3QgSlNET0NfVEFHU19XSVRIX1RZUEVTID0gbmV3IFNldChbXG4gICdjb25zdCcsXG4gICdleHBvcnQnLFxuICAncGFyYW0nLFxuICAncmV0dXJuJyxcbl0pO1xuXG4vKipcbiAqIFJlc3VsdCBvZiBwYXJzaW5nIGEgSlNEb2MgY29tbWVudC4gU3VjaCBjb21tZW50cyBlc3NlbnRpYWxseSBhcmUgYnVpbHQgb2YgYSBsaXN0IG9mIHRhZ3MuXG4gKiBJbiBhZGRpdGlvbiB0byB0aGUgdGFncywgdGhpcyBtaWdodCBhbHNvIGNvbnRhaW4gd2FybmluZ3MgdG8gaW5kaWNhdGUgbm9uLWZhdGFsIHByb2JsZW1zXG4gKiB3aGlsZSBmaW5kaW5nIHRoZSB0YWdzLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIFBhcnNlZEpTRG9jQ29tbWVudCB7XG4gIHRhZ3M6IFRhZ1tdO1xuICB3YXJuaW5ncz86IHN0cmluZ1tdO1xufVxuXG4vKipcbiAqIHBhcnNlIHBhcnNlcyBKU0RvYyBvdXQgb2YgYSBjb21tZW50IHN0cmluZy5cbiAqIFJldHVybnMgbnVsbCBpZiBjb21tZW50IGlzIG5vdCBKU0RvYy5cbiAqL1xuLy8gVE9ETyhtYXJ0aW5wcm9ic3QpOiByZXByZXNlbnRpbmcgSlNEb2MgYXMgYSBsaXN0IG9mIHRhZ3MgaXMgdG9vIHNpbXBsaXN0aWMuIFdlIG5lZWQgZnVuY3Rpb25hbGl0eVxuLy8gc3VjaCBhcyBtZXJnaW5nIChiZWxvdyksIGRlLWR1cGxpY2F0aW5nIGNlcnRhaW4gdGFncyAoQGRlcHJlY2F0ZWQpLCBhbmQgc3BlY2lhbCB0cmVhdG1lbnQgZm9yXG4vLyBvdGhlcnMgKGUuZy4gQHN1cHByZXNzKS4gV2Ugc2hvdWxkIGludHJvZHVjZSBhIHByb3BlciBtb2RlbCBjbGFzcyB3aXRoIGEgbW9yZSBzdWl0YWJsZSBkYXRhXG4vLyBzdHJ1Y3VyZSAoZS5nLiBhIE1hcDxUYWdOYW1lLCBWYWx1ZXNbXT4pLlxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlKGNvbW1lbnQ6IHRzLlN5bnRoZXNpemVkQ29tbWVudCk6IFBhcnNlZEpTRG9jQ29tbWVudHxudWxsIHtcbiAgLy8gVE9ETyhldmFubSk6IHRoaXMgaXMgYSBwaWxlIG9mIGhhY2t5IHJlZ2V4ZXMgZm9yIG5vdywgYmVjYXVzZSB3ZVxuICAvLyB3b3VsZCByYXRoZXIgdXNlIHRoZSBiZXR0ZXIgVHlwZVNjcmlwdCBpbXBsZW1lbnRhdGlvbiBvZiBKU0RvY1xuICAvLyBwYXJzaW5nLiAgaHR0cHM6Ly9naXRodWIuY29tL01pY3Jvc29mdC9UeXBlU2NyaXB0L2lzc3Vlcy83MzkzXG4gIGlmIChjb21tZW50LmtpbmQgIT09IHRzLlN5bnRheEtpbmQuTXVsdGlMaW5lQ29tbWVudFRyaXZpYSkgcmV0dXJuIG51bGw7XG4gIC8vIGNvbW1lbnQudGV4dCBkb2VzIG5vdCBpbmNsdWRlIC8qIGFuZCAqLywgc28gbXVzdCBzdGFydCB3aXRoICcqJyBmb3IgSlNEb2MuXG4gIGlmIChjb21tZW50LnRleHRbMF0gIT09ICcqJykgcmV0dXJuIG51bGw7XG4gIGNvbnN0IHRleHQgPSBjb21tZW50LnRleHQuc3Vic3RyaW5nKDEpLnRyaW0oKTtcbiAgcmV0dXJuIHBhcnNlQ29udGVudHModGV4dCk7XG59XG5cbi8qKlxuICogUmV0dXJucyB0aGUgaW5wdXQgc3RyaW5nIHdpdGggbGluZSBlbmRpbmdzIG5vcm1hbGl6ZWQgdG8gJ1xcbicuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemVMaW5lRW5kaW5ncyhpbnB1dDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGlucHV0LnJlcGxhY2UoL1xcclxcbi9nLCAnXFxuJyk7XG59XG5cbi8qKlxuICogcGFyc2VDb250ZW50cyBwYXJzZXMgSlNEb2Mgb3V0IG9mIGEgY29tbWVudCB0ZXh0LlxuICogUmV0dXJucyBudWxsIGlmIGNvbW1lbnQgaXMgbm90IEpTRG9jLlxuICpcbiAqIEBwYXJhbSBjb21tZW50VGV4dCBhIGNvbW1lbnQncyB0ZXh0IGNvbnRlbnQsIGkuZS4gdGhlIGNvbW1lbnQgdy9vIC8qIGFuZCAqIC8uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUNvbnRlbnRzKGNvbW1lbnRUZXh0OiBzdHJpbmcpOiBQYXJzZWRKU0RvY0NvbW1lbnR8bnVsbCB7XG4gIC8vIE1ha2Ugc3VyZSB3ZSBoYXZlIHByb3BlciBsaW5lIGVuZGluZ3MgYmVmb3JlIHBhcnNpbmcgb24gV2luZG93cy5cbiAgY29tbWVudFRleHQgPSBub3JtYWxpemVMaW5lRW5kaW5ncyhjb21tZW50VGV4dCk7XG4gIC8vIFN0cmlwIGFsbCB0aGUgXCIgKiBcIiBiaXRzIGZyb20gdGhlIGZyb250IG9mIGVhY2ggbGluZS5cbiAgY29tbWVudFRleHQgPSBjb21tZW50VGV4dC5yZXBsYWNlKC9eXFxzKlxcKj8gPy9nbSwgJycpO1xuICBjb25zdCBsaW5lcyA9IGNvbW1lbnRUZXh0LnNwbGl0KCdcXG4nKTtcbiAgY29uc3QgdGFnczogVGFnW10gPSBbXTtcbiAgY29uc3Qgd2FybmluZ3M6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgbGluZSBvZiBsaW5lcykge1xuICAgIGxldCBtYXRjaCA9IGxpbmUubWF0Y2goL15cXHMqQChcXFMrKSAqKC4qKS8pO1xuICAgIGlmIChtYXRjaCkge1xuICAgICAgbGV0IFtfLCB0YWdOYW1lLCB0ZXh0XSA9IG1hdGNoO1xuICAgICAgaWYgKHRhZ05hbWUgPT09ICdyZXR1cm5zJykge1xuICAgICAgICAvLyBBIHN5bm9ueW0gZm9yICdyZXR1cm4nLlxuICAgICAgICB0YWdOYW1lID0gJ3JldHVybic7XG4gICAgICB9XG4gICAgICBsZXQgdHlwZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgICAgIGlmIChKU0RPQ19UQUdTX0JMQUNLTElTVC5oYXModGFnTmFtZSkpIHtcbiAgICAgICAgd2FybmluZ3MucHVzaChgQCR7dGFnTmFtZX0gYW5ub3RhdGlvbnMgYXJlIHJlZHVuZGFudCB3aXRoIFR5cGVTY3JpcHQgZXF1aXZhbGVudHNgKTtcbiAgICAgICAgY29udGludWU7ICAvLyBEcm9wIHRoZSB0YWcgc28gQ2xvc3VyZSB3b24ndCBwcm9jZXNzIGl0LlxuICAgICAgfSBlbHNlIGlmIChKU0RPQ19UQUdTX1dJVEhfVFlQRVMuaGFzKHRhZ05hbWUpICYmIHRleHRbMF0gPT09ICd7Jykge1xuICAgICAgICB3YXJuaW5ncy5wdXNoKFxuICAgICAgICAgICAgYHRoZSB0eXBlIGFubm90YXRpb24gb24gQCR7dGFnTmFtZX0gaXMgcmVkdW5kYW50IHdpdGggaXRzIFR5cGVTY3JpcHQgdHlwZSwgYCArXG4gICAgICAgICAgICBgcmVtb3ZlIHRoZSB7Li4ufSBwYXJ0YCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnc3VwcHJlc3MnKSB7XG4gICAgICAgIGNvbnN0IHN1cHByZXNzTWF0Y2ggPSB0ZXh0Lm1hdGNoKC9eXFx7KC4qKVxcfSguKikkLyk7XG4gICAgICAgIGlmICghc3VwcHJlc3NNYXRjaCkge1xuICAgICAgICAgIHdhcm5pbmdzLnB1c2goYG1hbGZvcm1lZCBAc3VwcHJlc3MgdGFnOiBcIiR7dGV4dH1cImApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIFssIHR5cGUsIHRleHRdID0gc3VwcHJlc3NNYXRjaDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0YWdOYW1lID09PSAnZGljdCcpIHtcbiAgICAgICAgd2FybmluZ3MucHVzaCgndXNlIGluZGV4IHNpZ25hdHVyZXMgKGBbazogc3RyaW5nXTogdHlwZWApIGluc3RlYWQgb2YgQGRpY3QnKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIC8vIEdyYWIgdGhlIHBhcmFtZXRlciBuYW1lIGZyb20gQHBhcmFtIHRhZ3MuXG4gICAgICBsZXQgcGFyYW1ldGVyTmFtZTogc3RyaW5nfHVuZGVmaW5lZDtcbiAgICAgIGlmICh0YWdOYW1lID09PSAncGFyYW0nKSB7XG4gICAgICAgIG1hdGNoID0gdGV4dC5tYXRjaCgvXihcXFMrKSA/KC4qKS8pO1xuICAgICAgICBpZiAobWF0Y2gpIFtfLCBwYXJhbWV0ZXJOYW1lLCB0ZXh0XSA9IG1hdGNoO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0YWc6IFRhZyA9IHt0YWdOYW1lfTtcbiAgICAgIGlmIChwYXJhbWV0ZXJOYW1lKSB0YWcucGFyYW1ldGVyTmFtZSA9IHBhcmFtZXRlck5hbWU7XG4gICAgICBpZiAodGV4dCkgdGFnLnRleHQgPSB0ZXh0O1xuICAgICAgaWYgKHR5cGUpIHRhZy50eXBlID0gdHlwZTtcbiAgICAgIHRhZ3MucHVzaCh0YWcpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBUZXh0IHdpdGhvdXQgYSBwcmVjZWRpbmcgQHRhZyBvbiBpdCBpcyBlaXRoZXIgdGhlIHBsYWluIHRleHRcbiAgICAgIC8vIGRvY3VtZW50YXRpb24gb3IgYSBjb250aW51YXRpb24gb2YgYSBwcmV2aW91cyB0YWcuXG4gICAgICBpZiAodGFncy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGFncy5wdXNoKHt0YWdOYW1lOiAnJywgdGV4dDogbGluZX0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbGFzdFRhZyA9IHRhZ3NbdGFncy5sZW5ndGggLSAxXTtcbiAgICAgICAgbGFzdFRhZy50ZXh0ID0gKGxhc3RUYWcudGV4dCB8fCAnJykgKyAnXFxuJyArIGxpbmU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmICh3YXJuaW5ncy5sZW5ndGggPiAwKSB7XG4gICAgcmV0dXJuIHt0YWdzLCB3YXJuaW5nc307XG4gIH1cbiAgcmV0dXJuIHt0YWdzfTtcbn1cblxuLyoqXG4gKiBTZXJpYWxpemVzIGEgVGFnIGludG8gYSBzdHJpbmcgdXNhYmxlIGluIGEgY29tbWVudC5cbiAqIFJldHVybnMgYSBzdHJpbmcgbGlrZSBcIiBAZm9vIHtiYXJ9IGJhelwiIChub3RlIHRoZSB3aGl0ZXNwYWNlKS5cbiAqL1xuZnVuY3Rpb24gdGFnVG9TdHJpbmcodGFnOiBUYWcsIGVzY2FwZUV4dHJhVGFncyA9IG5ldyBTZXQ8c3RyaW5nPigpKTogc3RyaW5nIHtcbiAgbGV0IG91dCA9ICcnO1xuICBpZiAodGFnLnRhZ05hbWUpIHtcbiAgICBpZiAoIUpTRE9DX1RBR1NfV0hJVEVMSVNULmhhcyh0YWcudGFnTmFtZSkgfHwgZXNjYXBlRXh0cmFUYWdzLmhhcyh0YWcudGFnTmFtZSkpIHtcbiAgICAgIC8vIEVzY2FwZSB0YWdzIHdlIGRvbid0IHVuZGVyc3RhbmQuICBUaGlzIGlzIGEgc3VidGxlXG4gICAgICAvLyBjb21wcm9taXNlIGJldHdlZW4gbXVsdGlwbGUgaXNzdWVzLlxuICAgICAgLy8gMSkgSWYgd2UgcGFzcyB0aHJvdWdoIHRoZXNlIG5vbi1DbG9zdXJlIHRhZ3MsIHRoZSB1c2VyIHdpbGxcbiAgICAgIC8vICAgIGdldCBhIHdhcm5pbmcgZnJvbSBDbG9zdXJlLCBhbmQgdGhlIHBvaW50IG9mIHRzaWNrbGUgaXNcbiAgICAgIC8vICAgIHRvIGluc3VsYXRlIHRoZSB1c2VyIGZyb20gQ2xvc3VyZS5cbiAgICAgIC8vIDIpIFRoZSBvdXRwdXQgb2YgdHNpY2tsZSBpcyBmb3IgQ2xvc3VyZSBidXQgYWxzbyBtYXkgYmUgcmVhZFxuICAgICAgLy8gICAgYnkgaHVtYW5zLCBmb3IgZXhhbXBsZSBub24tVHlwZVNjcmlwdCB1c2VycyBvZiBBbmd1bGFyLlxuICAgICAgLy8gMykgRmluYWxseSwgd2UgZG9uJ3Qgd2FudCB0byB3YXJuIGJlY2F1c2UgdXNlcnMgc2hvdWxkIGJlXG4gICAgICAvLyAgICBmcmVlIHRvIGFkZCB3aGljaGV2ZXIgSlNEb2MgdGhleSBmZWVsIGxpa2UuICBJZiB0aGUgdXNlclxuICAgICAgLy8gICAgd2FudHMgaGVscCBlbnN1cmluZyB0aGV5IGRpZG4ndCB0eXBvIGEgdGFnLCB0aGF0IGlzIHRoZVxuICAgICAgLy8gICAgcmVzcG9uc2liaWxpdHkgb2YgYSBsaW50ZXIuXG4gICAgICBvdXQgKz0gYCBcXFxcQCR7dGFnLnRhZ05hbWV9YDtcbiAgICB9IGVsc2Uge1xuICAgICAgb3V0ICs9IGAgQCR7dGFnLnRhZ05hbWV9YDtcbiAgICB9XG4gIH1cbiAgaWYgKHRhZy50eXBlKSB7XG4gICAgb3V0ICs9ICcgeyc7XG4gICAgaWYgKHRhZy5yZXN0UGFyYW0pIHtcbiAgICAgIG91dCArPSAnLi4uJztcbiAgICB9XG4gICAgb3V0ICs9IHRhZy50eXBlO1xuICAgIGlmICh0YWcub3B0aW9uYWwpIHtcbiAgICAgIG91dCArPSAnPSc7XG4gICAgfVxuICAgIG91dCArPSAnfSc7XG4gIH1cbiAgaWYgKHRhZy5wYXJhbWV0ZXJOYW1lKSB7XG4gICAgb3V0ICs9ICcgJyArIHRhZy5wYXJhbWV0ZXJOYW1lO1xuICB9XG4gIGlmICh0YWcudGV4dCkge1xuICAgIG91dCArPSAnICcgKyB0YWcudGV4dC5yZXBsYWNlKC9AL2csICdcXFxcQCcpO1xuICB9XG4gIHJldHVybiBvdXQ7XG59XG5cbi8qKiBUYWdzIHRoYXQgbXVzdCBvbmx5IG9jY3VyIG9uY2VzIGluIGEgY29tbWVudCAoZmlsdGVyZWQgYmVsb3cpLiAqL1xuY29uc3QgU0lOR0xFVE9OX1RBR1MgPSBuZXcgU2V0KFsnZGVwcmVjYXRlZCddKTtcblxuLyoqIFRhZ3MgdGhhdCBjb25mbGljdCB3aXRoIFxcQHR5cGUgaW4gQ2xvc3VyZSBDb21waWxlciAoZS5nLiBcXEBwYXJhbSkuICovXG5leHBvcnQgY29uc3QgVEFHU19DT05GTElDVElOR19XSVRIX1RZUEUgPSBuZXcgU2V0KFsncGFyYW0nLCAncmV0dXJuJ10pO1xuXG4vKipcbiAqIEEgc3ludGhlc2l6ZWQgY29tbWVudCB0aGF0IChwb3NzaWJseSkgaW5jbHVkZXMgdGhlIG9yaWdpbmFsIGNvbW1lbnQgcmFuZ2UgaXQgd2FzIGNyZWF0ZWQgZnJvbS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBTeW50aGVzaXplZENvbW1lbnRXaXRoT3JpZ2luYWwgZXh0ZW5kcyB0cy5TeW50aGVzaXplZENvbW1lbnQge1xuICAvKipcbiAgICogVGhlIG9yaWdpbmFsIHRleHQgcmFuZ2Ugb2YgdGhlIGNvbW1lbnQgKHJlbGF0aXZlIHRvIHRoZSBzb3VyY2UgZmlsZSdzIGZ1bGwgdGV4dCkuXG4gICAqL1xuICBvcmlnaW5hbFJhbmdlPzogdHMuVGV4dFJhbmdlO1xufVxuXG4vKipcbiAqIHN5bnRoZXNpemVMZWFkaW5nQ29tbWVudHMgcGFyc2VzIHRoZSBsZWFkaW5nIGNvbW1lbnRzIG9mIG5vZGUsIGNvbnZlcnRzIHRoZW1cbiAqIHRvIHN5bnRoZXRpYyBjb21tZW50cywgYW5kIG1ha2VzIHN1cmUgdGhlIG9yaWdpbmFsIHRleHQgY29tbWVudHMgZG8gbm90IGdldFxuICogZW1pdHRlZCBieSBUeXBlU2NyaXB0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gc3ludGhlc2l6ZUxlYWRpbmdDb21tZW50cyhub2RlOiB0cy5Ob2RlKTogU3ludGhlc2l6ZWRDb21tZW50V2l0aE9yaWdpbmFsW10ge1xuICBjb25zdCBleGlzdGluZyA9IHRzLmdldFN5bnRoZXRpY0xlYWRpbmdDb21tZW50cyhub2RlKTtcbiAgaWYgKGV4aXN0aW5nKSByZXR1cm4gZXhpc3Rpbmc7XG4gIGNvbnN0IHRleHQgPSBub2RlLmdldEZ1bGxUZXh0KCk7XG4gIGNvbnN0IHN5bnRoQ29tbWVudHMgPSBnZXRMZWFkaW5nQ29tbWVudFJhbmdlc1N5bnRoZXNpemVkKHRleHQsIG5vZGUuZ2V0RnVsbFN0YXJ0KCkpO1xuICBpZiAoc3ludGhDb21tZW50cy5sZW5ndGgpIHtcbiAgICB0cy5zZXRTeW50aGV0aWNMZWFkaW5nQ29tbWVudHMobm9kZSwgc3ludGhDb21tZW50cyk7XG4gICAgc3VwcHJlc3NMZWFkaW5nQ29tbWVudHNSZWN1cnNpdmVseShub2RlKTtcbiAgfVxuICByZXR1cm4gc3ludGhDb21tZW50cztcbn1cblxuLyoqXG4gKiBwYXJzZUxlYWRpbmdDb21tZW50UmFuZ2VzU3ludGhlc2l6ZWQgcGFyc2VzIHRoZSBsZWFkaW5nIGNvbW1lbnQgcmFuZ2VzIG91dCBvZiB0aGUgZ2l2ZW4gdGV4dCBhbmRcbiAqIGNvbnZlcnRzIHRoZW0gdG8gU3ludGhlc2l6ZWRDb21tZW50cy5cbiAqIEBwYXJhbSBvZmZzZXQgdGhlIG9mZnNldCBvZiB0ZXh0IGluIHRoZSBzb3VyY2UgZmlsZSwgZS5nLiBub2RlLmdldEZ1bGxTdGFydCgpLlxuICovXG4vLyBWaXNpYmxlRm9yVGVzdGluZ1xuZXhwb3J0IGZ1bmN0aW9uIGdldExlYWRpbmdDb21tZW50UmFuZ2VzU3ludGhlc2l6ZWQoXG4gICAgdGV4dDogc3RyaW5nLCBvZmZzZXQgPSAwKTogU3ludGhlc2l6ZWRDb21tZW50V2l0aE9yaWdpbmFsW10ge1xuICBjb25zdCBjb21tZW50cyA9IHRzLmdldExlYWRpbmdDb21tZW50UmFuZ2VzKHRleHQsIDApIHx8IFtdO1xuICByZXR1cm4gY29tbWVudHMubWFwKChjcik6IFN5bnRoZXNpemVkQ29tbWVudFdpdGhPcmlnaW5hbCA9PiB7XG4gICAgLy8gQ29uZnVzaW5nbHksIENvbW1lbnRSYW5nZSBpbiBUeXBlU2NyaXB0IGluY2x1ZGVzIHN0YXJ0IGFuZCBlbmQgbWFya2VycywgYnV0XG4gICAgLy8gU3ludGhlc2l6ZWRDb21tZW50cyBkbyBub3QuXG4gICAgY29uc3QgY29tbWVudFRleHQgPSBjci5raW5kID09PSB0cy5TeW50YXhLaW5kLlNpbmdsZUxpbmVDb21tZW50VHJpdmlhID9cbiAgICAgICAgdGV4dC5zdWJzdHJpbmcoY3IucG9zICsgMiwgY3IuZW5kKSA6XG4gICAgICAgIHRleHQuc3Vic3RyaW5nKGNyLnBvcyArIDIsIGNyLmVuZCAtIDIpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5jcixcbiAgICAgIHRleHQ6IGNvbW1lbnRUZXh0LFxuICAgICAgcG9zOiAtMSxcbiAgICAgIGVuZDogLTEsXG4gICAgICBvcmlnaW5hbFJhbmdlOiB7cG9zOiBjci5wb3MgKyBvZmZzZXQsIGVuZDogY3IuZW5kICsgb2Zmc2V0fVxuICAgIH07XG4gIH0pO1xufVxuXG4vKipcbiAqIHN1cHByZXNzQ29tbWVudHNSZWN1cnNpdmVseSBwcmV2ZW50cyBlbWl0IG9mIGxlYWRpbmcgY29tbWVudHMgb24gbm9kZSwgYW5kIGFueSByZWN1cnNpdmUgbm9kZXNcbiAqIHVuZGVybmVhdGggaXQgdGhhdCBzdGFydCBhdCB0aGUgc2FtZSBvZmZzZXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBzdXBwcmVzc0xlYWRpbmdDb21tZW50c1JlY3Vyc2l2ZWx5KG5vZGU6IHRzLk5vZGUpIHtcbiAgLy8gVHlwZVNjcmlwdCBlbWl0cyBsZWFkaW5nIGNvbW1lbnRzIG9uIGEgbm9kZSwgdW5sZXNzOlxuICAvLyAtIHRoZSBjb21tZW50IHdhcyBlbWl0dGVkIGJ5IHRoZSBwYXJlbnQgbm9kZVxuICAvLyAtIHRoZSBub2RlIGhhcyB0aGUgTm9MZWFkaW5nQ29tbWVudHMgZW1pdCBmbGFnLlxuICAvLyBIb3dldmVyLCB0cmFuc2Zvcm1hdGlvbiBzdGVwcyBzb21ldGltZXMgY29weSBub2RlcyB3aXRob3V0IGtlZXBpbmcgdGhlaXIgZW1pdCBmbGFncywgc28ganVzdFxuICAvLyBzZXR0aW5nIE5vTGVhZGluZ0NvbW1lbnRzIHJlY3Vyc2l2ZWx5IGlzIG5vdCBlbm91Z2gsIHdlIG11c3QgYWxzbyBzZXQgdGhlIHRleHQgcmFuZ2UgdG8gYXZvaWRcbiAgLy8gdGhlIGNvcGllZCBub2RlIHRvIGhhdmUgY29tbWVudHMgZW1pdHRlZC5cbiAgY29uc3Qgb3JpZ2luYWxTdGFydCA9IG5vZGUuZ2V0RnVsbFN0YXJ0KCk7XG4gIGNvbnN0IGFjdHVhbFN0YXJ0ID0gbm9kZS5nZXRTdGFydCgpO1xuICBmdW5jdGlvbiBzdXBwcmVzc0NvbW1lbnRzSW50ZXJuYWwobm9kZTogdHMuTm9kZSk6IGJvb2xlYW4ge1xuICAgIHRzLnNldEVtaXRGbGFncyhub2RlLCB0cy5FbWl0RmxhZ3MuTm9MZWFkaW5nQ29tbWVudHMpO1xuICAgIHJldHVybiAhIXRzLmZvckVhY2hDaGlsZChub2RlLCAoY2hpbGQpID0+IHtcbiAgICAgIGlmIChjaGlsZC5wb3MgIT09IG9yaWdpbmFsU3RhcnQpIHJldHVybiB0cnVlO1xuICAgICAgcmV0dXJuIHN1cHByZXNzQ29tbWVudHNJbnRlcm5hbChjaGlsZCk7XG4gICAgfSk7XG4gIH1cbiAgc3VwcHJlc3NDb21tZW50c0ludGVybmFsKG5vZGUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9TeW50aGVzaXplZENvbW1lbnQoXG4gICAgdGFnczogVGFnW10sIGVzY2FwZUV4dHJhVGFncz86IFNldDxzdHJpbmc+KTogdHMuU3ludGhlc2l6ZWRDb21tZW50IHtcbiAgcmV0dXJuIHtcbiAgICBraW5kOiB0cy5TeW50YXhLaW5kLk11bHRpTGluZUNvbW1lbnRUcml2aWEsXG4gICAgdGV4dDogdG9TdHJpbmdXaXRob3V0U3RhcnRFbmQodGFncywgZXNjYXBlRXh0cmFUYWdzKSxcbiAgICBwb3M6IC0xLFxuICAgIGVuZDogLTEsXG4gICAgaGFzVHJhaWxpbmdOZXdMaW5lOiB0cnVlLFxuICB9O1xufVxuXG4vKiogU2VyaWFsaXplcyBhIENvbW1lbnQgb3V0IHRvIGEgc3RyaW5nLCBidXQgZG9lcyBub3QgaW5jbHVkZSB0aGUgc3RhcnQgYW5kIGVuZCBjb21tZW50IHRva2Vucy4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZ1dpdGhvdXRTdGFydEVuZCh0YWdzOiBUYWdbXSwgZXNjYXBlRXh0cmFUYWdzID0gbmV3IFNldDxzdHJpbmc+KCkpOiBzdHJpbmcge1xuICByZXR1cm4gc2VyaWFsaXplKHRhZ3MsIGZhbHNlLCBlc2NhcGVFeHRyYVRhZ3MpO1xufVxuXG4vKiogU2VyaWFsaXplcyBhIENvbW1lbnQgb3V0IHRvIGEgc3RyaW5nIHVzYWJsZSBpbiBzb3VyY2UgY29kZS4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0b1N0cmluZyh0YWdzOiBUYWdbXSwgZXNjYXBlRXh0cmFUYWdzID0gbmV3IFNldDxzdHJpbmc+KCkpOiBzdHJpbmcge1xuICByZXR1cm4gc2VyaWFsaXplKHRhZ3MsIHRydWUsIGVzY2FwZUV4dHJhVGFncyk7XG59XG5cbmZ1bmN0aW9uIHNlcmlhbGl6ZShcbiAgICB0YWdzOiBUYWdbXSwgaW5jbHVkZVN0YXJ0RW5kOiBib29sZWFuLCBlc2NhcGVFeHRyYVRhZ3MgPSBuZXcgU2V0PHN0cmluZz4oKSk6IHN0cmluZyB7XG4gIGlmICh0YWdzLmxlbmd0aCA9PT0gMCkgcmV0dXJuICcnO1xuICBpZiAodGFncy5sZW5ndGggPT09IDEpIHtcbiAgICBjb25zdCB0YWcgPSB0YWdzWzBdO1xuICAgIGlmICgodGFnLnRhZ05hbWUgPT09ICd0eXBlJyB8fCB0YWcudGFnTmFtZSA9PT0gJ3R5cGVkZWYnIHx8IHRhZy50YWdOYW1lID09PSAnbm9jb2xsYXBzZScpICYmXG4gICAgICAgICghdGFnLnRleHQgfHwgIXRhZy50ZXh0Lm1hdGNoKCdcXG4nKSkpIHtcbiAgICAgIC8vIFNwZWNpYWwtY2FzZSBvbmUtbGluZXIgXCJ0eXBlXCIgYW5kIFwibm9jb2xsYXBzZVwiIHRhZ3MgdG8gZml0IG9uIG9uZSBsaW5lLCBlLmcuXG4gICAgICAvLyAgIC8qKiBAdHlwZSB7Zm9vfSAqL1xuICAgICAgY29uc3QgdGV4dCA9IHRhZ1RvU3RyaW5nKHRhZywgZXNjYXBlRXh0cmFUYWdzKTtcbiAgICAgIHJldHVybiBpbmNsdWRlU3RhcnRFbmQgPyBgLyoqJHt0ZXh0fSAqL2AgOiBgKiR7dGV4dH0gYDtcbiAgICB9XG4gICAgLy8gT3RoZXJ3aXNlLCBmYWxsIHRocm91Z2ggdG8gdGhlIG11bHRpLWxpbmUgb3V0cHV0LlxuICB9XG5cbiAgbGV0IG91dCA9IGluY2x1ZGVTdGFydEVuZCA/ICcvKipcXG4nIDogJypcXG4nO1xuICBjb25zdCBlbWl0dGVkID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGZvciAoY29uc3QgdGFnIG9mIHRhZ3MpIHtcbiAgICBpZiAoZW1pdHRlZC5oYXModGFnLnRhZ05hbWUpICYmIFNJTkdMRVRPTl9UQUdTLmhhcyh0YWcudGFnTmFtZSkpIHtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBlbWl0dGVkLmFkZCh0YWcudGFnTmFtZSk7XG4gICAgb3V0ICs9ICcgKic7XG4gICAgLy8gSWYgdGhlIHRhZ1RvU3RyaW5nIGlzIG11bHRpLWxpbmUsIGluc2VydCBcIiAqIFwiIHByZWZpeGVzIG9uIHN1YnNlcXVlbnQgbGluZXMuXG4gICAgb3V0ICs9IHRhZ1RvU3RyaW5nKHRhZywgZXNjYXBlRXh0cmFUYWdzKS5zcGxpdCgnXFxuJykuam9pbignXFxuICogJyk7XG4gICAgb3V0ICs9ICdcXG4nO1xuICB9XG4gIG91dCArPSBpbmNsdWRlU3RhcnRFbmQgPyAnICovXFxuJyA6ICcgJztcbiAgcmV0dXJuIG91dDtcbn1cblxuLyoqIE1lcmdlcyBtdWx0aXBsZSB0YWdzIChvZiB0aGUgc2FtZSB0YWdOYW1lIHR5cGUpIGludG8gYSBzaW5nbGUgdW5pZmllZCB0YWcuICovXG5leHBvcnQgZnVuY3Rpb24gbWVyZ2UodGFnczogVGFnW10pOiBUYWcge1xuICBjb25zdCB0YWdOYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCBwYXJhbWV0ZXJOYW1lcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCB0eXBlcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICBjb25zdCB0ZXh0cyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAvLyBJZiBhbnkgb2YgdGhlIHRhZ3MgYXJlIG9wdGlvbmFsL3Jlc3QsIHRoZW4gdGhlIG1lcmdlZCBvdXRwdXQgaXMgb3B0aW9uYWwvcmVzdC5cbiAgbGV0IG9wdGlvbmFsID0gZmFsc2U7XG4gIGxldCByZXN0UGFyYW0gPSBmYWxzZTtcbiAgZm9yIChjb25zdCB0YWcgb2YgdGFncykge1xuICAgIHRhZ05hbWVzLmFkZCh0YWcudGFnTmFtZSk7XG4gICAgaWYgKHRhZy5wYXJhbWV0ZXJOYW1lICE9PSB1bmRlZmluZWQpIHBhcmFtZXRlck5hbWVzLmFkZCh0YWcucGFyYW1ldGVyTmFtZSk7XG4gICAgaWYgKHRhZy50eXBlICE9PSB1bmRlZmluZWQpIHR5cGVzLmFkZCh0YWcudHlwZSk7XG4gICAgaWYgKHRhZy50ZXh0ICE9PSB1bmRlZmluZWQpIHRleHRzLmFkZCh0YWcudGV4dCk7XG4gICAgaWYgKHRhZy5vcHRpb25hbCkgb3B0aW9uYWwgPSB0cnVlO1xuICAgIGlmICh0YWcucmVzdFBhcmFtKSByZXN0UGFyYW0gPSB0cnVlO1xuICB9XG5cbiAgaWYgKHRhZ05hbWVzLnNpemUgIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGNhbm5vdCBtZXJnZSBkaWZmZXJpbmcgdGFnczogJHtKU09OLnN0cmluZ2lmeSh0YWdzKX1gKTtcbiAgfVxuICBjb25zdCB0YWdOYW1lID0gdGFnTmFtZXMudmFsdWVzKCkubmV4dCgpLnZhbHVlO1xuICBjb25zdCBwYXJhbWV0ZXJOYW1lID1cbiAgICAgIHBhcmFtZXRlck5hbWVzLnNpemUgPiAwID8gQXJyYXkuZnJvbShwYXJhbWV0ZXJOYW1lcykuam9pbignX29yXycpIDogdW5kZWZpbmVkO1xuICBjb25zdCB0eXBlID0gdHlwZXMuc2l6ZSA+IDAgPyBBcnJheS5mcm9tKHR5cGVzKS5qb2luKCd8JykgOiB1bmRlZmluZWQ7XG4gIC8vIEB0ZW1wbGF0ZSB1c2VzIHRleHQgKG5vdCB0eXBlISkgdG8gZGVjbGFyZSBpdHMgdHlwZSBwYXJhbWV0ZXJzLCB3aXRoICcsJy1zZXBhcmF0ZWQgdGV4dC5cbiAgY29uc3QgaXNUZW1wbGF0ZVRhZyA9IHRhZ05hbWUgPT09ICd0ZW1wbGF0ZSc7XG4gIGNvbnN0IHRleHQgPSB0ZXh0cy5zaXplID4gMCA/IEFycmF5LmZyb20odGV4dHMpLmpvaW4oaXNUZW1wbGF0ZVRhZyA/ICcsJyA6ICcgLyAnKSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgdGFnOiBUYWcgPSB7dGFnTmFtZSwgcGFyYW1ldGVyTmFtZSwgdHlwZSwgdGV4dH07XG4gIC8vIE5vdGU6IGEgcGFyYW0gY2FuIGVpdGhlciBiZSBvcHRpb25hbCBvciBhIHJlc3QgcGFyYW07IGlmIHdlIG1lcmdlZCBhblxuICAvLyBvcHRpb25hbCBhbmQgcmVzdCBwYXJhbSB0b2dldGhlciwgcHJlZmVyIG1hcmtpbmcgaXQgYXMgYSByZXN0IHBhcmFtLlxuICBpZiAocmVzdFBhcmFtKSB7XG4gICAgdGFnLnJlc3RQYXJhbSA9IHRydWU7XG4gIH0gZWxzZSBpZiAob3B0aW9uYWwpIHtcbiAgICB0YWcub3B0aW9uYWwgPSB0cnVlO1xuICB9XG4gIHJldHVybiB0YWc7XG59XG4iXX0=