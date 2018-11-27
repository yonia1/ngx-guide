"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const stripBom = require("strip-bom");
const transform_1 = require("../../../brocc/transform");
const log = require("../../../util/log");
const nodes_1 = require("../../nodes");
exports.templateTransform = transform_1.transformFromPromise((graph) => __awaiter(this, void 0, void 0, function* () {
    log.info(`Rendering Templates`);
    const entryPoint = graph.find(nodes_1.isEntryPointInProgress());
    const templateNodes = graph.from(entryPoint).filter(node => node.type === 'text/html' && node.state !== 'done');
    // TOTO [].forEach(async fn)
    const promises = templateNodes.map(templateNode => {
        const templateFilePath = templateNode.url.substring(nodes_1.URL_PROTOCOL_FILE.length);
        return processTemplate(templateFilePath).then(val => {
            templateNode.data = Object.assign({}, templateNode.data, { content: val });
        });
    });
    yield Promise.all(promises);
    return graph;
}));
/**
 * Process a component's template.
 *
 * @param templateFilePath Path of the HTML templatefile, e.g. `/Users/foo/Project/bar/bar.component.html`
 * @return Resolved content of HTML template file
 */
function processTemplate(templateFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
        const buffer = yield fs_extra_1.readFile(templateFilePath);
        return stripBom(buffer.toString());
    });
}
//# sourceMappingURL=template.transform.js.map