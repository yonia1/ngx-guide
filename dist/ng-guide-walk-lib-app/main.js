(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.html":
/*!***************************************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.html ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"ngx-guide\"\n[ngStyle]=\"customCss\"\n[class.visible]=\"show\">\n \n  <ng-content></ng-content>\n  <hr>\n  \n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"next()\">\n    next\n  </button>\n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"done()\">\n    done\n  </button>\n  \n  <div *ngIf=\"displayArrow\" [ngStyle]=\"customCss\" class=\"ngx-guide__arrow\" x-arrow></div>\n</div>"

/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.scss":
/*!***************************************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.scss ***!
  \***************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".ngx-guide {\n  position: absolute;\n  z-index: 9999;\n  background: #FFC107;\n  color: white;\n  opacity: 0.85;\n  width: 150px;\n  border-radius: 3px;\n  box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);\n  padding: 10px;\n  text-align: center;\n  z-index: 9999; }\n\n.ngx-guide:not(.visible) {\n  display: none; }\n\n.ngx-guide .ngx-guide__arrow {\n  width: 0;\n  height: 0;\n  border-style: solid;\n  border-color: #FFC107;\n  position: absolute;\n  margin: 5px; }\n\n.ngx-guide[x-placement^=\"top\"] {\n  margin-bottom: 5px; }\n\n.ngx-guide[x-placement^=\"top\"] .ngx-guide__arrow {\n  border-width: 5px 5px 0 5px;\n  border-left-color: transparent;\n  border-right-color: transparent;\n  border-bottom-color: transparent;\n  bottom: -5px;\n  left: calc(50% - 5px);\n  margin-top: 0;\n  margin-bottom: 0; }\n\n.ngx-guide[x-placement^=\"bottom\"] {\n  margin-top: 10px; }\n\n.ngx-guide[x-placement^=\"bottom\"] .ngx-guide__arrow {\n  border-width: 0 5px 5px 5px;\n  border-left-color: transparent;\n  border-right-color: transparent;\n  border-top-color: transparent;\n  top: -5px;\n  left: calc(50% - 5px);\n  margin-top: 0;\n  margin-bottom: 0; }\n\n.ngx-guide[x-placement^=\"right\"] {\n  margin-left: 10px; }\n\n.ngx-guide[x-placement^=\"right\"] .ngx-guide__arrow {\n  border-width: 5px 5px 5px 0;\n  border-left-color: transparent;\n  border-top-color: transparent;\n  border-bottom-color: transparent;\n  left: -5px;\n  top: calc(50% - 5px);\n  margin-left: 0;\n  margin-right: 0; }\n\n.ngx-guide[x-placement^=\"left\"] {\n  margin-right: 10px; }\n\n.ngx-guide[x-placement^=\"left\"] .ngx-guide__arrow {\n  border-width: 5px 0 5px 5px;\n  border-top-color: transparent;\n  border-right-color: transparent;\n  border-bottom-color: transparent;\n  right: -5px;\n  top: calc(50% - 5px);\n  margin-left: 0;\n  margin-right: 0; }\n\n.overlay {\n  top: 0px;\n  bottom: 0px;\n  left: 0px;\n  right: 0px;\n  position: fixed;\n  opacity: 0.8;\n  position: absolute;\n  box-sizing: content-box;\n  z-index: 99;\n  background-color: #000;\n  opacity: 0.55;\n  background: radial-gradient(center, ellipse farthest-corner, rgba(0, 0, 0, 0.4) 0, rgba(0, 0, 0, 0.9) 100%);\n  filter: \"progid:DXImageTransform.Microsoft.gradient(startColorstr='#66000000',endColorstr='#e6000000',GradientType=1)\";\n  -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=50)\";\n  filter: alpha(opacity=50);\n  transition: all 0.3s ease-out; }\n\n.helperLayer {\n  padding: 2px;\n  box-sizing: content-box;\n  position: absolute;\n  z-index: 9999998;\n  background-color: #FFF;\n  background-color: rgba(255, 255, 255, 0.9);\n  border: 1px solid #777;\n  border: 1px solid rgba(0, 0, 0, 0.5);\n  border-radius: 4px;\n  box-shadow: 0 2px 15px rgba(0, 0, 0, 0.4);\n  transition: all 0.3s ease-out; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy95b25pYW1pc2hhdi9Eb2N1bWVudHMvd29yay9uZy1ndWlkZS13YWxrLWxpYi9wcm9qZWN0cy9uZy1ndWlkZS13YWxrLWxpYi9zcmMvbGliL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLG1CQUFrQjtFQUNsQixjQUFhO0VBQ2Isb0JBQW9CO0VBQ3BCLGFBQVk7RUFDWixjQUFhO0VBQ2IsYUFBWTtFQUNaLG1CQUFrQjtFQUNsQix1Q0FBbUM7RUFDbkMsY0FBYTtFQUNiLG1CQUFrQjtFQUNsQixjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxjQUFhLEVBQ2Q7O0FBRUQ7RUFDRSxTQUFRO0VBQ1IsVUFBUztFQUNULG9CQUFtQjtFQUNuQixzQkFBcUI7RUFDckIsbUJBQWtCO0VBRWxCLFlBQVcsRUFFWjs7QUFFRDtFQUNFLG1CQUFrQixFQUNuQjs7QUFFRDtFQUNFLDRCQUEyQjtFQUMzQiwrQkFBOEI7RUFDOUIsZ0NBQStCO0VBQy9CLGlDQUFnQztFQUNoQyxhQUFZO0VBQ1osc0JBQXFCO0VBQ3JCLGNBQWE7RUFDYixpQkFBZ0IsRUFDakI7O0FBRUQ7RUFDRSxpQkFBZ0IsRUFDakI7O0FBRUQ7RUFDRSw0QkFBMkI7RUFDM0IsK0JBQThCO0VBQzlCLGdDQUErQjtFQUMvQiw4QkFBNkI7RUFDN0IsVUFBUztFQUNULHNCQUFxQjtFQUNyQixjQUFhO0VBQ2IsaUJBQWdCLEVBQ2pCOztBQUVEO0VBQ0Usa0JBQWlCLEVBQ2xCOztBQUVEO0VBQ0UsNEJBQTJCO0VBQzNCLCtCQUE4QjtFQUM5Qiw4QkFBNkI7RUFDN0IsaUNBQWdDO0VBQ2hDLFdBQVU7RUFDVixxQkFBb0I7RUFDcEIsZUFBYztFQUNkLGdCQUFlLEVBQ2hCOztBQUVEO0VBQ0UsbUJBQWtCLEVBQ25COztBQUVEO0VBQ0UsNEJBQTJCO0VBQzNCLDhCQUE2QjtFQUM3QixnQ0FBK0I7RUFDL0IsaUNBQWdDO0VBQ2hDLFlBQVc7RUFDWCxxQkFBb0I7RUFDcEIsZUFBYztFQUNkLGdCQUFlLEVBQ2hCOztBQUVEO0VBQ0UsU0FBUTtFQUFFLFlBQVc7RUFBRSxVQUFTO0VBQUUsV0FBVTtFQUFFLGdCQUFlO0VBQUUsYUFBWTtFQUMzRSxtQkFBa0I7RUFDbEIsd0JBQXVCO0VBQ3ZCLFlBQVc7RUFDWCx1QkFBc0I7RUFDdEIsY0FBYTtFQU1iLDRHQUFrRztFQUNsRyx1SEFBc0g7RUFDdEgsa0VBQWlFO0VBQ2pFLDBCQUF5QjtFQUtqQiw4QkFBNkIsRUFDdEM7O0FBQ0Q7RUFDRSxhQUFZO0VBQ1osd0JBQXVCO0VBQ3ZCLG1CQUFrQjtFQUNsQixpQkFBZ0I7RUFDaEIsdUJBQXNCO0VBQ3RCLDJDQUFzQztFQUN0Qyx1QkFBc0I7RUFDdEIscUNBQWdDO0VBQ2hDLG1CQUFrQjtFQUNsQiwwQ0FBcUM7RUFLN0IsOEJBQTZCLEVBQ3RDIiwiZmlsZSI6InByb2plY3RzL25nLWd1aWRlLXdhbGstbGliL3NyYy9saWIvZ3VpZGUtY29udGVudC9ndWlkZS1jb250ZW50LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm5neC1ndWlkZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogOTk5OTtcbiAgYmFja2dyb3VuZDogICNGRkMxMDc7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgb3BhY2l0eTogMC44NTtcbiAgd2lkdGg6IDE1MHB4O1xuICBib3JkZXItcmFkaXVzOiAzcHg7XG4gIGJveC1zaGFkb3c6IDAgMCAycHggcmdiYSgwLDAsMCwwLjUpO1xuICBwYWRkaW5nOiAxMHB4O1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHotaW5kZXg6IDk5OTk7XG59XG5cbi5uZ3gtZ3VpZGU6bm90KC52aXNpYmxlKSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5uZ3gtZ3VpZGUgLm5neC1ndWlkZV9fYXJyb3cge1xuICB3aWR0aDogMDtcbiAgaGVpZ2h0OiAwO1xuICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICBib3JkZXItY29sb3I6ICNGRkMxMDc7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgLy8gei1pbmRleDogOTk5OTtcbiAgbWFyZ2luOiA1cHg7XG4gIFxufVxuXG4ubmd4LWd1aWRlW3gtcGxhY2VtZW50Xj1cInRvcFwiXSB7XG4gIG1hcmdpbi1ib3R0b206IDVweDtcbn1cblxuLm5neC1ndWlkZVt4LXBsYWNlbWVudF49XCJ0b3BcIl0gLm5neC1ndWlkZV9fYXJyb3cge1xuICBib3JkZXItd2lkdGg6IDVweCA1cHggMCA1cHg7XG4gIGJvcmRlci1sZWZ0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvdHRvbTogLTVweDtcbiAgbGVmdDogY2FsYyg1MCUgLSA1cHgpO1xuICBtYXJnaW4tdG9wOiAwO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4ubmd4LWd1aWRlW3gtcGxhY2VtZW50Xj1cImJvdHRvbVwiXSB7XG4gIG1hcmdpbi10b3A6IDEwcHg7XG59XG5cbi5uZ3gtZ3VpZGVbeC1wbGFjZW1lbnRePVwiYm90dG9tXCJdIC5uZ3gtZ3VpZGVfX2Fycm93IHtcbiAgYm9yZGVyLXdpZHRoOiAwIDVweCA1cHggNXB4O1xuICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci1yaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci10b3AtY29sb3I6IHRyYW5zcGFyZW50O1xuICB0b3A6IC01cHg7XG4gIGxlZnQ6IGNhbGMoNTAlIC0gNXB4KTtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cblxuLm5neC1ndWlkZVt4LXBsYWNlbWVudF49XCJyaWdodFwiXSB7XG4gIG1hcmdpbi1sZWZ0OiAxMHB4O1xufVxuXG4ubmd4LWd1aWRlW3gtcGxhY2VtZW50Xj1cInJpZ2h0XCJdIC5uZ3gtZ3VpZGVfX2Fycm93IHtcbiAgYm9yZGVyLXdpZHRoOiA1cHggNXB4IDVweCAwO1xuICBib3JkZXItbGVmdC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIGJvcmRlci10b3AtY29sb3I6IHRyYW5zcGFyZW50O1xuICBib3JkZXItYm90dG9tLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgbGVmdDogLTVweDtcbiAgdG9wOiBjYWxjKDUwJSAtIDVweCk7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICBtYXJnaW4tcmlnaHQ6IDA7XG59XG5cbi5uZ3gtZ3VpZGVbeC1wbGFjZW1lbnRePVwibGVmdFwiXSB7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbn1cblxuLm5neC1ndWlkZVt4LXBsYWNlbWVudF49XCJsZWZ0XCJdIC5uZ3gtZ3VpZGVfX2Fycm93IHtcbiAgYm9yZGVyLXdpZHRoOiA1cHggMCA1cHggNXB4O1xuICBib3JkZXItdG9wLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLXJpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgYm9yZGVyLWJvdHRvbS1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIHJpZ2h0OiAtNXB4O1xuICB0b3A6IGNhbGMoNTAlIC0gNXB4KTtcbiAgbWFyZ2luLWxlZnQ6IDA7XG4gIG1hcmdpbi1yaWdodDogMDtcbn1cblxuLm92ZXJsYXkge1xuICB0b3A6IDBweDsgYm90dG9tOiAwcHg7IGxlZnQ6IDBweDsgcmlnaHQ6IDBweDsgcG9zaXRpb246IGZpeGVkOyBvcGFjaXR5OiAwLjg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIHotaW5kZXg6IDk5O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMDAwO1xuICBvcGFjaXR5OiAwLjU1O1xuICBiYWNrZ3JvdW5kOiAtbW96LXJhZGlhbC1ncmFkaWVudChjZW50ZXIsZWxsaXBzZSBmYXJ0aGVzdC1jb3JuZXIscmdiYSgwLDAsMCwwLjQpIDAscmdiYSgwLDAsMCwwLjkpIDEwMCUpO1xuICBiYWNrZ3JvdW5kOiAtd2Via2l0LWdyYWRpZW50KHJhZGlhbCxjZW50ZXIgY2VudGVyLDBweCxjZW50ZXIgY2VudGVyLDEwMCUsY29sb3Itc3RvcCgwJSxyZ2JhKDAsMCwwLDAuNCkpLGNvbG9yLXN0b3AoMTAwJSxyZ2JhKDAsMCwwLDAuOSkpKTtcbiAgYmFja2dyb3VuZDogLXdlYmtpdC1yYWRpYWwtZ3JhZGllbnQoY2VudGVyLGVsbGlwc2UgZmFydGhlc3QtY29ybmVyLHJnYmEoMCwwLDAsMC40KSAwLHJnYmEoMCwwLDAsMC45KSAxMDAlKTtcbiAgYmFja2dyb3VuZDogLW8tcmFkaWFsLWdyYWRpZW50KGNlbnRlcixlbGxpcHNlIGZhcnRoZXN0LWNvcm5lcixyZ2JhKDAsMCwwLDAuNCkgMCxyZ2JhKDAsMCwwLDAuOSkgMTAwJSk7XG4gIGJhY2tncm91bmQ6IC1tcy1yYWRpYWwtZ3JhZGllbnQoY2VudGVyLGVsbGlwc2UgZmFydGhlc3QtY29ybmVyLHJnYmEoMCwwLDAsMC40KSAwLHJnYmEoMCwwLDAsMC45KSAxMDAlKTtcbiAgYmFja2dyb3VuZDogcmFkaWFsLWdyYWRpZW50KGNlbnRlcixlbGxpcHNlIGZhcnRoZXN0LWNvcm5lcixyZ2JhKDAsMCwwLDAuNCkgMCxyZ2JhKDAsMCwwLDAuOSkgMTAwJSk7XG4gIGZpbHRlcjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuZ3JhZGllbnQoc3RhcnRDb2xvcnN0cj0nIzY2MDAwMDAwJyxlbmRDb2xvcnN0cj0nI2U2MDAwMDAwJyxHcmFkaWVudFR5cGU9MSlcIjtcbiAgLW1zLWZpbHRlcjogXCJwcm9naWQ6RFhJbWFnZVRyYW5zZm9ybS5NaWNyb3NvZnQuQWxwaGEoT3BhY2l0eT01MClcIjtcbiAgZmlsdGVyOiBhbHBoYShvcGFjaXR5PTUwKTtcbiAgLXdlYmtpdC10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbiAgICAgLW1vei10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbiAgICAgIC1tcy10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbiAgICAgICAtby10cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbiAgICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLW91dDtcbn1cbi5oZWxwZXJMYXllciB7XG4gIHBhZGRpbmc6IDJweDtcbiAgYm94LXNpemluZzogY29udGVudC1ib3g7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogOTk5OTk5ODtcbiAgYmFja2dyb3VuZC1jb2xvcjogI0ZGRjtcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsMjU1LDI1NSwuOSk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICM3Nzc7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMCwwLDAsLjUpO1xuICBib3JkZXItcmFkaXVzOiA0cHg7XG4gIGJveC1zaGFkb3c6IDAgMnB4IDE1cHggcmdiYSgwLDAsMCwuNCk7XG4gIC13ZWJraXQtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG4gICAgIC1tb3otdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG4gICAgICAtbXMtdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG4gICAgICAgLW8tdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG4gICAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1vdXQ7XG59XG4iXX0= */"

/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.ts":
/*!*************************************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.ts ***!
  \*************************************************************************************/
/*! exports provided: GuideContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GuideContentComponent", function() { return GuideContentComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./projects/ng-guide-walk-lib/src/lib/utils/index.ts");
/* harmony import */ var _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ng-guide-walk-lib.service */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.service.ts");
/* harmony import */ var popper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! popper.js */ "./node_modules/popper.js/dist/esm/popper.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GuideContentComponent = /** @class */ (function () {
    function GuideContentComponent(_element, _renderer, host, guideService) {
        this._element = _element;
        this._renderer = _renderer;
        this.host = host;
        this.guideService = guideService;
        this.currentAction = 'next';
        this._step = 1;
        this.show = true;
        this.overlayObject = null;
        this.shouldCreateOverlay = false;
        this.positionFixed = false;
        this.eventsEnabled = true;
        this.location = 'right';
        this.displayArrow = true;
        this.customCss = null;
    }
    Object.defineProperty(GuideContentComponent.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (step) {
            this._step = _utils__WEBPACK_IMPORTED_MODULE_1__["toNumber"](step);
        },
        enumerable: true,
        configurable: true
    });
    GuideContentComponent.prototype.ngOnInit = function () {
        // todo : move to an action trigger when needed
        var _a = this, location = _a.location, positionFixed = _a.positionFixed, eventsEnabled = _a.eventsEnabled, modifiers = _a.modifiers;
        this.popper = new popper_js__WEBPACK_IMPORTED_MODULE_3__["default"](this.getNode(), this._element.nativeElement.querySelector('.ngx-guide'), {
            placement: location,
            positionFixed: positionFixed,
            eventsEnabled: eventsEnabled,
            modifiers: modifiers
        });
    };
    GuideContentComponent.prototype.ngOnDestroy = function () {
        this.popper.destroy();
        this.clean();
    };
    GuideContentComponent.prototype.next = function () {
        this.guideService.nextGuide();
    };
    GuideContentComponent.prototype.isLast = function () {
        return this.guideService.isLast(this.step);
    };
    GuideContentComponent.prototype.done = function () {
        this.guideService.stopGuide();
    };
    GuideContentComponent.prototype.getNode = function () {
        if (this.target) {
            if (typeof this.target === 'string') {
                return document.querySelector(this.target);
            }
            else {
                return this.target;
            }
        }
        else {
            return this._element.nativeElement;
        }
    };
    GuideContentComponent.prototype.clean = function () {
        if (!this.overlayObject) {
            return;
        }
        this.overlayObject.style.display = 'none';
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GuideContentComponent.prototype, "shouldCreateOverlay", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GuideContentComponent.prototype, "modifiers", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GuideContentComponent.prototype, "positionFixed", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GuideContentComponent.prototype, "eventsEnabled", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GuideContentComponent.prototype, "target", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", String)
    ], GuideContentComponent.prototype, "location", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Boolean)
    ], GuideContentComponent.prototype, "displayArrow", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], GuideContentComponent.prototype, "customCss", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], GuideContentComponent.prototype, "step", null);
    GuideContentComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewEncapsulation"].None,
            selector: 'ng-guide-content',
            template: __webpack_require__(/*! ./guide-content.component.html */ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.html"),
            styles: [__webpack_require__(/*! ./guide-content.component.scss */ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_2__["NgGuideWalkLibService"]])
    ], GuideContentComponent);
    return GuideContentComponent;
}());



/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/ng-guide-step.directive.ts":
/*!***********************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/ng-guide-step.directive.ts ***!
  \***********************************************************************/
/*! exports provided: NgGuideStepDirective */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGuideStepDirective", function() { return NgGuideStepDirective; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ng-guide-walk-lib.service */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.service.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./projects/ng-guide-walk-lib/src/lib/utils/index.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./guide-content/guide-content.component */ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (undefined && undefined.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var NgGuideStepDirective = /** @class */ (function () {
    function NgGuideStepDirective(document, elementRef, viewContainerRef, renderer, injector, resolver, walkLibService) {
        this.document = document;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.injector = injector;
        this.resolver = resolver;
        this.walkLibService = walkLibService;
        this.overlay = null;
        this.position = 'below';
        this._step = 1;
        this.rootElement = 'body';
        this.ngGuideStepLocation = 'bottom';
        this.ngGuideStepStyle = null;
        this.ngGuideStepDisplayArrow = true;
        this.ngGuideStepOverlay = true;
        this.ngGuideStepFocusElement = true;
        this.ngGuideStepStepStatus = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
    }
    Object.defineProperty(NgGuideStepDirective.prototype, "step", {
        get: function () {
            return this._step;
        },
        set: function (stepNumber) {
            this._step = Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toNumber"])(stepNumber);
        },
        enumerable: true,
        configurable: true
    });
    NgGuideStepDirective.prototype.ngOnInit = function () {
        this.subscribeToGuideRequest();
        this.walkLibService.register(this.step);
    };
    NgGuideStepDirective.prototype.ngOnDestroy = function () {
        this.closeComponent();
        this.walkLibService.unregister(this.step);
    };
    NgGuideStepDirective.prototype.closeComponent = function () {
        if (!this.componentRef) {
            return;
        }
        this.ngGuideStepStepStatus.emit('BeforeClose');
        this.componentRef.destroy();
        this.componentRef = null;
        this.ngGuideStepStepStatus.emit('AfterClose');
    };
    NgGuideStepDirective.prototype.generateComponent = function () {
        this.ngGuideStepStepStatus.emit('BeforeOpen');
        var factory = this.resolver.resolveComponentFactory(_guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_4__["GuideContentComponent"]);
        var content = this.generateNgContent();
        this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
        this.setInputs();
        this.handleFocus();
        this.handleOverlay();
        this.ngGuideStepStepStatus.emit('Open');
    };
    NgGuideStepDirective.prototype.createComponent = function () {
        this.generateComponent();
    };
    NgGuideStepDirective.prototype.generateNgContent = function () {
        // Content is string
        if (typeof this.ngGuideStepContent === 'string') {
            var element = this.renderer.createText(this.ngGuideStepContent);
            return [[element]];
        }
        // Content is Template
        if (this.ngGuideStepContent instanceof _angular_core__WEBPACK_IMPORTED_MODULE_0__["TemplateRef"]) {
            var viewRefTemplate = this.ngGuideStepContent.createEmbeddedView({});
            return [viewRefTemplate.rootNodes];
        }
        // Else it's a component
        var factory = this.resolver.resolveComponentFactory(this.ngGuideStepContent);
        var viewRef = factory.create(this.injector);
        return [[viewRef.location.nativeElement]];
    };
    NgGuideStepDirective.prototype.setInputs = function () {
        var instanceRef = this.componentRef.instance;
        instanceRef.step = this.step;
        instanceRef.target = this.elementRef.nativeElement;
        instanceRef.location = this.ngGuideStepLocation || 'bottom';
        instanceRef.displayArrow = this.ngGuideStepDisplayArrow;
        if (this.ngGuideStepStyle) {
            instanceRef.customCss = this.ngGuideStepStyle;
        }
    };
    NgGuideStepDirective.prototype.subscribeToGuideRequest = function () {
        var _this = this;
        this.walkLibService.getStepObservable(this.step)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["takeUntil"])(Object(_utils__WEBPACK_IMPORTED_MODULE_2__["unsignedOnDestroyed"])(this)))
            .subscribe(function (walkEvent) { return walkEvent.event === 'open' ? _this.createComponent() : _this.closeComponent(); });
    };
    NgGuideStepDirective.prototype.getOffset = function (element) {
        var body = document.body;
        var docEl = document.documentElement;
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        var x = element.getBoundingClientRect();
        return {
            top: x.top + scrollTop,
            width: x.width,
            height: x.height,
            left: x.left + scrollLeft
        };
    };
    NgGuideStepDirective.prototype.handleOverlay = function () {
        var _this = this;
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toBoolean"])(this.ngGuideStepOverlay)) {
            this.overlay = this.renderer.createElement('div');
            // this.overlay.className = 'overlay';
            this.renderer.addClass(this.overlay, 'overlay');
            this.renderer.appendChild(this.getRootElement(), this.overlay);
            var targetElm = this.elementRef.nativeElement;
            // if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
            //   const styleText = 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
            //   this.overlay.style.cssText = styleText;
            // } else {
            //   // set overlay layer position
            //   const elementPosition = this.getOffset(targetElm);
            //   if (elementPosition) {
            //     const styleText = 'width: ' + elementPosition.width + 'px; height:' 
            //     + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
            //     this.overlay.style.cssText = styleText;
            //    }
            // }
            this.renderer.addClass(this.elementRef.nativeElement, 'helperLayer');
            this.componentRef.onDestroy(function () {
                _this.renderer.removeChild(_this.getRootElement(), _this.overlay);
                _this.renderer.removeClass(_this.elementRef.nativeElement, 'helperLayer');
            });
            // this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
            // this.componentRef.onDestroy(() => {
            //  this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
            // });
        }
    };
    NgGuideStepDirective.prototype.handleFocus = function () {
        if (Object(_utils__WEBPACK_IMPORTED_MODULE_2__["toBoolean"])(this.ngGuideStepFocusElement)) {
            this.elementRef.nativeElement.focus();
        }
    };
    NgGuideStepDirective.prototype.getRootElement = function () {
        return this.document ? this.document.body : this.getRootOfAllElement();
    };
    NgGuideStepDirective.prototype.getRootOfAllElement = function () {
        var last = this.renderer.parentNode(this.elementRef.nativeElement);
        var res = null;
        while (last && last.localName !== this.rootElement) {
            res = last;
            last = this.renderer.parentNode(res);
        }
        return res;
    };
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])(),
        __metadata("design:type", Object)
    ], NgGuideStepDirective.prototype, "rootElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStep'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], NgGuideStepDirective.prototype, "step", null);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStepContent'),
        __metadata("design:type", Object)
    ], NgGuideStepDirective.prototype, "ngGuideStepContent", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStepLocation'),
        __metadata("design:type", String)
    ], NgGuideStepDirective.prototype, "ngGuideStepLocation", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStepStyle'),
        __metadata("design:type", Object)
    ], NgGuideStepDirective.prototype, "ngGuideStepStyle", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStepDisplayArrow'),
        __metadata("design:type", Boolean)
    ], NgGuideStepDirective.prototype, "ngGuideStepDisplayArrow", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStepOverlay'),
        __metadata("design:type", Object)
    ], NgGuideStepDirective.prototype, "ngGuideStepOverlay", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"])('ngGuideStepFocusElement'),
        __metadata("design:type", Boolean)
    ], NgGuideStepDirective.prototype, "ngGuideStepFocusElement", void 0);
    __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"])('ngGuideStepStepStatus'),
        __metadata("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"])
    ], NgGuideStepDirective.prototype, "ngGuideStepStepStatus", void 0);
    NgGuideStepDirective = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Directive"])({
            selector: '[ngGuideStep]',
        }),
        __param(0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"])(_angular_common__WEBPACK_IMPORTED_MODULE_5__["DOCUMENT"])),
        __metadata("design:paramtypes", [Object, _angular_core__WEBPACK_IMPORTED_MODULE_0__["ElementRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewContainerRef"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Renderer2"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injector"],
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ComponentFactoryResolver"],
            _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_1__["NgGuideWalkLibService"]])
    ], NgGuideStepDirective);
    return NgGuideStepDirective;
}());



/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.component.ts":
/*!***************************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.component.ts ***!
  \***************************************************************************/
/*! exports provided: NgGuideWalkLibComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGuideWalkLibComponent", function() { return NgGuideWalkLibComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NgGuideWalkLibComponent = /** @class */ (function () {
    function NgGuideWalkLibComponent() {
    }
    NgGuideWalkLibComponent.prototype.ngOnInit = function () {
    };
    NgGuideWalkLibComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'ng-guide-walk',
            template: "\n    <p>\n      ng-guide-walk-lib works!\n    </p>\n    <ng-content></ng-content>\n  "
        }),
        __metadata("design:paramtypes", [])
    ], NgGuideWalkLibComponent);
    return NgGuideWalkLibComponent;
}());



/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.module.ts":
/*!************************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.module.ts ***!
  \************************************************************************/
/*! exports provided: NgGuideWalkLibModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGuideWalkLibModule", function() { return NgGuideWalkLibModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _ng_guide_walk_lib_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ng-guide-walk-lib.component */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.component.ts");
/* harmony import */ var _ng_guide_step_directive__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ng-guide-step.directive */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-step.directive.ts");
/* harmony import */ var _guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./guide-content/guide-content.component */ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.ts");
/* harmony import */ var _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ng-guide-walk-lib.service */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.service.ts");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

// import { CommonModule } from '@angular/common';





var NgGuideWalkLibModule = /** @class */ (function () {
    function NgGuideWalkLibModule() {
    }
    NgGuideWalkLibModule_1 = NgGuideWalkLibModule;
    NgGuideWalkLibModule.forRoot = function () {
        return {
            ngModule: NgGuideWalkLibModule_1,
            providers: [
                {
                    provide: _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_4__["NgGuideWalkLibService"],
                    useClass: _ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_4__["NgGuideWalkLibService"]
                }
            ]
        };
    };
    var NgGuideWalkLibModule_1;
    NgGuideWalkLibModule = NgGuideWalkLibModule_1 = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"])({
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_5__["CommonModule"],
            ],
            entryComponents: [_guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_3__["GuideContentComponent"]],
            declarations: [_ng_guide_walk_lib_component__WEBPACK_IMPORTED_MODULE_1__["NgGuideWalkLibComponent"],
                _ng_guide_step_directive__WEBPACK_IMPORTED_MODULE_2__["NgGuideStepDirective"],
                _guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_3__["GuideContentComponent"]],
            exports: [
                _ng_guide_walk_lib_component__WEBPACK_IMPORTED_MODULE_1__["NgGuideWalkLibComponent"],
                _ng_guide_step_directive__WEBPACK_IMPORTED_MODULE_2__["NgGuideStepDirective"],
                _guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_3__["GuideContentComponent"]
            ]
        })
    ], NgGuideWalkLibModule);
    return NgGuideWalkLibModule;
}());



/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.service.ts":
/*!*************************************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.service.ts ***!
  \*************************************************************************/
/*! exports provided: NgGuideWalkLibService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgGuideWalkLibService", function() { return NgGuideWalkLibService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm5/operators/index.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var NgGuideWalkLibService = /** @class */ (function () {
    function NgGuideWalkLibService() {
        this.activeSteps = [];
        this.eventWalkSubject = new rxjs__WEBPACK_IMPORTED_MODULE_1__["Subject"]();
        this.currentStep = null;
        this._config = {};
    }
    Object.defineProperty(NgGuideWalkLibService.prototype, "config", {
        get: function () {
            return this._config;
        },
        set: function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    NgGuideWalkLibService.prototype.register = function (step) {
        this.activeSteps.push(step);
    };
    NgGuideWalkLibService.prototype.unregister = function (step) {
        this.activeSteps = this.activeSteps.filter(function (stepNumber) { return stepNumber !== step; });
    };
    NgGuideWalkLibService.prototype.isLast = function (step) {
        return this.currentStep ? (this.activeSteps.length) === step : true;
    };
    NgGuideWalkLibService.prototype.stopGuide = function () {
        this.closeCurrentStep();
        this.currentStep = undefined;
    };
    NgGuideWalkLibService.prototype.startGuide = function () {
        this.activeSteps.sort();
        if (this.currentStep) {
            return;
        }
        this.currentStep = 1;
        this.invokeStep(this.currentStep);
    };
    NgGuideWalkLibService.prototype.invokeStep = function (stepNum) {
        this.closeCurrentStep();
        this.currentStep = this.activeSteps[stepNum - 1];
        this.eventWalkSubject.next({ step: stepNum, event: 'open' });
    };
    NgGuideWalkLibService.prototype.closeCurrentStep = function () {
        if (this.currentStep) {
            this.eventWalkSubject.next({ step: this.currentStep, event: 'close' });
        }
    };
    NgGuideWalkLibService.prototype.nextGuide = function () {
        this.closeCurrentStep();
        if (this.isLast(this.currentStep)) {
            this.currentStep = undefined;
            return; // and we are done for this tour
        }
        this.currentStep++;
        this.invokeStep(this.currentStep);
    };
    NgGuideWalkLibService.prototype.getStepObservable = function (stepNum) {
        return this.eventWalkSubject
            .asObservable()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["filter"])(function (item) { return item.step === stepNum; }));
    };
    NgGuideWalkLibService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [])
    ], NgGuideWalkLibService);
    return NgGuideWalkLibService;
}());



/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/lib/utils/index.ts":
/*!***********************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/lib/utils/index.ts ***!
  \***********************************************************/
/*! exports provided: toNumber, unsignedOnDestroyed, toBoolean */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toNumber", function() { return toNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unsignedOnDestroyed", function() { return unsignedOnDestroyed; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toBoolean", function() { return toBoolean; });
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm5/index.js");

/**
 *
 * @param num - the number to parse
 * Try's to parse any to number
 */
function toNumber(num) {
    return Number.isInteger(num) ? num : Number.parseInt(num);
}
function unsignedOnDestroyed(component) {
    var oldNgOnDestroy = component.ngOnDestroy;
    var onDestroySubject$ = new rxjs__WEBPACK_IMPORTED_MODULE_0__["ReplaySubject"](1);
    component.ngOnDestroy = function () {
        oldNgOnDestroy.apply(component);
        onDestroySubject$.next(undefined);
        onDestroySubject$.complete();
    };
    return onDestroySubject$;
}
function toBoolean(value) {
    return String(value) == 'true';
}


/***/ }),

/***/ "./projects/ng-guide-walk-lib/src/public_api.ts":
/*!******************************************************!*\
  !*** ./projects/ng-guide-walk-lib/src/public_api.ts ***!
  \******************************************************/
/*! exports provided: NgGuideWalkLibService, NgGuideWalkLibComponent, NgGuideWalkLibModule, NgGuideStepDirective, GuideContentComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _lib_ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/ng-guide-walk-lib.service */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.service.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgGuideWalkLibService", function() { return _lib_ng_guide_walk_lib_service__WEBPACK_IMPORTED_MODULE_0__["NgGuideWalkLibService"]; });

/* harmony import */ var _lib_ng_guide_walk_lib_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./lib/ng-guide-walk-lib.component */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgGuideWalkLibComponent", function() { return _lib_ng_guide_walk_lib_component__WEBPACK_IMPORTED_MODULE_1__["NgGuideWalkLibComponent"]; });

/* harmony import */ var _lib_ng_guide_walk_lib_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lib/ng-guide-walk-lib.module */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-walk-lib.module.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgGuideWalkLibModule", function() { return _lib_ng_guide_walk_lib_module__WEBPACK_IMPORTED_MODULE_2__["NgGuideWalkLibModule"]; });

/* harmony import */ var _lib_ng_guide_step_directive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lib/ng-guide-step.directive */ "./projects/ng-guide-walk-lib/src/lib/ng-guide-step.directive.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "NgGuideStepDirective", function() { return _lib_ng_guide_step_directive__WEBPACK_IMPORTED_MODULE_3__["NgGuideStepDirective"]; });

/* harmony import */ var _lib_guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./lib/guide-content/guide-content.component */ "./projects/ng-guide-walk-lib/src/lib/guide-content/guide-content.component.ts");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "GuideContentComponent", function() { return _lib_guide_content_guide_content_component__WEBPACK_IMPORTED_MODULE_4__["GuideContentComponent"]; });

/*
 * Public API Surface of ng-guide-walk-lib
 */







/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".tooltip {\n    position: relative;\n    display: inline-block;\n    border-bottom: 1px dotted black;\n}\n\n.tooltip .tooltiptext {\n    visibility: hidden;\n    width: 120px;\n    background-color: #555;\n    color: #fff;\n    text-align: center;\n    border-radius: 6px;\n    padding: 5px 0;\n    position: absolute;\n    z-index: 1;\n    bottom: 105%;\n    left: 50%;\n    margin-left: -60px;\n    opacity: 0;\n    transition: opacity 0.3s;\n}\n\n.tooltip .tooltiptext::after {\n    content: \"\";\n    position: absolute;\n    top: 100%;\n    left: 50%;\n    margin-left: -5px;\n    border-width: 5px;\n    border-style: solid;\n    border-color: #555 transparent transparent transparent;\n}\n\n.tooltip:hover .tooltiptext {\n    visibility: visible;\n    opacity: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvYXBwLmNvbXBvbmVudC5jc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFDSSxtQkFBbUI7SUFDbkIsc0JBQXNCO0lBQ3RCLGdDQUFnQztDQUNuQzs7QUFFRDtJQUNJLG1CQUFtQjtJQUNuQixhQUFhO0lBQ2IsdUJBQXVCO0lBQ3ZCLFlBQVk7SUFDWixtQkFBbUI7SUFDbkIsbUJBQW1CO0lBQ25CLGVBQWU7SUFDZixtQkFBbUI7SUFDbkIsV0FBVztJQUNYLGFBQWE7SUFDYixVQUFVO0lBQ1YsbUJBQW1CO0lBQ25CLFdBQVc7SUFDWCx5QkFBeUI7Q0FDNUI7O0FBRUQ7SUFDSSxZQUFZO0lBQ1osbUJBQW1CO0lBQ25CLFVBQVU7SUFDVixVQUFVO0lBQ1Ysa0JBQWtCO0lBQ2xCLGtCQUFrQjtJQUNsQixvQkFBb0I7SUFDcEIsdURBQXVEO0NBQzFEOztBQUVEO0lBQ0ksb0JBQW9CO0lBQ3BCLFdBQVc7Q0FDZCIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnRvb2x0aXAge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYm9yZGVyLWJvdHRvbTogMXB4IGRvdHRlZCBibGFjaztcbn1cblxuLnRvb2x0aXAgLnRvb2x0aXB0ZXh0IHtcbiAgICB2aXNpYmlsaXR5OiBoaWRkZW47XG4gICAgd2lkdGg6IDEyMHB4O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICM1NTU7XG4gICAgY29sb3I6ICNmZmY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGJvcmRlci1yYWRpdXM6IDZweDtcbiAgICBwYWRkaW5nOiA1cHggMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgei1pbmRleDogMTtcbiAgICBib3R0b206IDEwNSU7XG4gICAgbGVmdDogNTAlO1xuICAgIG1hcmdpbi1sZWZ0OiAtNjBweDtcbiAgICBvcGFjaXR5OiAwO1xuICAgIHRyYW5zaXRpb246IG9wYWNpdHkgMC4zcztcbn1cblxuLnRvb2x0aXAgLnRvb2x0aXB0ZXh0OjphZnRlciB7XG4gICAgY29udGVudDogXCJcIjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAxMDAlO1xuICAgIGxlZnQ6IDUwJTtcbiAgICBtYXJnaW4tbGVmdDogLTVweDtcbiAgICBib3JkZXItd2lkdGg6IDVweDtcbiAgICBib3JkZXItc3R5bGU6IHNvbGlkO1xuICAgIGJvcmRlci1jb2xvcjogIzU1NSB0cmFuc3BhcmVudCB0cmFuc3BhcmVudCB0cmFuc3BhcmVudDtcbn1cblxuLnRvb2x0aXA6aG92ZXIgLnRvb2x0aXB0ZXh0IHtcbiAgICB2aXNpYmlsaXR5OiB2aXNpYmxlO1xuICAgIG9wYWNpdHk6IDE7XG59Il19 */"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<!--The content below is only a placeholder and can be replaced.-->\n<div style=\"text-align:center\">\n  \n  <div \n  class=\"tooltip\"\n  (ngGuideStepStepStatus)=\"handleStep($event)\"\n  ngGuideStep=\"1\" ngGuideStepContent=\"this is step 1\" ngGuideStepLocation='bottom'>\n    <h1 >\n      Welcome to {{ title }}!\n    </h1>\n    <span class=\"tooltiptext\">Tooltip text</span>\n\n  </div>\n \n  <img \n  ngGuideStep=\"2\" \n  [ngGuideStepOverlay]=\"true\"\n  (ngGuideStepStepStatus)=\"handleStep($event)\"\n  ngGuideStepContent=\"this is step 2\" \n  width=\"300\" alt=\"Angular Logo\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n<br>\n<button (click)=\"startTour()\">Start tour</button>\n<br>\n<h2\nngGuideStep=\"3\"  ngGuideStepContent=\"this is step 3\"\n[ngGuideStepOverlay]=\"false\"\n[ngGuideStepStyle]=\"customStyle\"\n>Here are some links to help you start: </h2>\n<ul>\n  <li>\n    <h2><a target=\"_blank\" rel=\"noopener\" href=\"https://angular.io/tutorial\">Tour of Heroes</a></h2>\n  </li>\n  <li>\n    <h2\n    ngGuideStep=\"4\"  [ngGuideStepContent]=\"templ\" ngGuideStepLocation='left'\n    ><a target=\"_blank\" rel=\"noopener\" href=\"https://github.com/angular/angular-cli/wiki\">CLI Documentation</a></h2>\n  </li>\n  <li>\n    <h2\n    type=\"text\" ngGuideStep=\"6\"  ngGuideStepContent=\"step 6\"\n    ><a target=\"_blank\" rel=\"noopener\" href=\"https://blog.angular.io/\">Angular blog</a></h2>\n  </li>\n</ul>\n\n<input type=\"text\" ngGuideStep=\"5\"  [ngGuideStepContent]=\"getComp()\">\n\n<ng-template #templ>\n  <div>This is an ng Template</div>\n</ng-template>"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _test_comp_test_comp_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./test-comp/test-comp.component */ "./src/app/test-comp/test-comp.component.ts");
/* harmony import */ var projects_ng_guide_walk_lib_src_public_api__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! projects/ng-guide-walk-lib/src/public_api */ "./projects/ng-guide-walk-lib/src/public_api.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(guideSerivce) {
        var _this = this;
        this.guideSerivce = guideSerivce;
        this.title = 'app';
        this.customStyle = {
            'background-color': 'red',
            'color': 'green',
            'border-radius': '50%'
        };
        setTimeout(function () { return _this.guideSerivce.startGuide(); }, 2000);
    }
    AppComponent.prototype.getComp = function () {
        return _test_comp_test_comp_component__WEBPACK_IMPORTED_MODULE_1__["TestCompComponent"];
    };
    AppComponent.prototype.startTour = function () {
        this.guideSerivce.startGuide();
    };
    AppComponent.prototype.handleStep = function (event) {
        console.log(event);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [projects_ng_guide_walk_lib_src_public_api__WEBPACK_IMPORTED_MODULE_2__["NgGuideWalkLibService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _test_comp_test_comp_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./test-comp/test-comp.component */ "./src/app/test-comp/test-comp.component.ts");
/* harmony import */ var projects_ng_guide_walk_lib_src_public_api__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! projects/ng-guide-walk-lib/src/public_api */ "./projects/ng-guide-walk-lib/src/public_api.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
                _test_comp_test_comp_component__WEBPACK_IMPORTED_MODULE_3__["TestCompComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                projects_ng_guide_walk_lib_src_public_api__WEBPACK_IMPORTED_MODULE_4__["NgGuideWalkLibModule"]
            ],
            entryComponents: [_test_comp_test_comp_component__WEBPACK_IMPORTED_MODULE_3__["TestCompComponent"]],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/test-comp/test-comp.component.css":
/*!***************************************************!*\
  !*** ./src/app/test-comp/test-comp.component.css ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Rlc3QtY29tcC90ZXN0LWNvbXAuY29tcG9uZW50LmNzcyJ9 */"

/***/ }),

/***/ "./src/app/test-comp/test-comp.component.html":
/*!****************************************************!*\
  !*** ./src/app/test-comp/test-comp.component.html ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n   test-comp works!\n</p>\n<h3>test-comp works!</h3>\n"

/***/ }),

/***/ "./src/app/test-comp/test-comp.component.ts":
/*!**************************************************!*\
  !*** ./src/app/test-comp/test-comp.component.ts ***!
  \**************************************************/
/*! exports provided: TestCompComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestCompComponent", function() { return TestCompComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TestCompComponent = /** @class */ (function () {
    function TestCompComponent() {
    }
    TestCompComponent.prototype.ngOnInit = function () {
    };
    TestCompComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-test-comp',
            template: __webpack_require__(/*! ./test-comp.component.html */ "./src/app/test-comp/test-comp.component.html"),
            styles: [__webpack_require__(/*! ./test-comp.component.css */ "./src/app/test-comp/test-comp.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], TestCompComponent);
    return TestCompComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /Users/yoniamishav/Documents/work/ng-guide-walk-lib/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map