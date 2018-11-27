"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_js_1 = require("injection-js");
const transform_di_1 = require("../../../brocc/transform.di");
const template_transform_1 = require("./template.transform");
exports.TEMPLATE_TRANSFORM_TOKEN = new injection_js_1.InjectionToken(`ng.v5.templateTransform`);
exports.TEMPLATE_TRANSFORM = transform_di_1.provideTransform({
    provide: exports.TEMPLATE_TRANSFORM_TOKEN,
    useFactory: () => template_transform_1.templateTransform
});
//# sourceMappingURL=template.di.js.map