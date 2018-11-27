"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_js_1 = require("injection-js");
const transform_di_1 = require("../../../brocc/transform.di");
const stylesheet_transform_1 = require("./stylesheet.transform");
exports.STYLESHEET_TRANSFORM_TOKEN = new injection_js_1.InjectionToken(`ng.v5.stylesheetTransform`);
exports.STYLESHEET_TRANSFORM = transform_di_1.provideTransform({
    provide: exports.STYLESHEET_TRANSFORM_TOKEN,
    useFactory: () => stylesheet_transform_1.stylesheetTransform
});
//# sourceMappingURL=stylesheet.di.js.map