"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toArray(value) {
    return [].concat(value);
}
exports.toArray = toArray;
function flatten(value) {
    return [].concat.apply([], value);
}
exports.flatten = flatten;
function unique(value) {
    // todo: his has been fixed in TypeScript 2.8 remove the casting when updating
    return [...new Set(value)];
}
exports.unique = unique;
//# sourceMappingURL=array.js.map