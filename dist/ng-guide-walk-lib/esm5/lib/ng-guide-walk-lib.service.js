/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-walk-lib.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
var NgGuideWalkLibService = /** @class */ (function () {
    function NgGuideWalkLibService() {
        this.activeSteps = [];
        this.eventWalkSubject = new Subject();
        this.currentStep = null;
        this._config = {};
    }
    Object.defineProperty(NgGuideWalkLibService.prototype, "config", {
        get: /**
         * @return {?}
         */
        function () {
            return this._config;
        },
        set: /**
         * @param {?} config
         * @return {?}
         */
        function (config) {
            this._config = config;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} step
     * @return {?}
     */
    NgGuideWalkLibService.prototype.register = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.activeSteps.push(step);
    };
    /**
     * @param {?} step
     * @return {?}
     */
    NgGuideWalkLibService.prototype.unregister = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        this.activeSteps = this.activeSteps.filter((/**
         * @param {?} stepNumber
         * @return {?}
         */
        function (stepNumber) { return stepNumber !== step; }));
    };
    /**
     * @param {?} step
     * @return {?}
     */
    NgGuideWalkLibService.prototype.isLast = /**
     * @param {?} step
     * @return {?}
     */
    function (step) {
        return this.currentStep ? (this.activeSteps.length) === step : true;
    };
    /**
     * @return {?}
     */
    NgGuideWalkLibService.prototype.stopGuide = /**
     * @return {?}
     */
    function () {
        this.closeCurrentStep();
        this.currentStep = undefined;
    };
    /**
     * @return {?}
     */
    NgGuideWalkLibService.prototype.startGuide = /**
     * @return {?}
     */
    function () {
        this.activeSteps.sort();
        if (this.currentStep) {
            return;
        }
        this.currentStep = 1;
        this.invokeStep(this.currentStep);
    };
    /**
     * @param {?} stepNum
     * @return {?}
     */
    NgGuideWalkLibService.prototype.invokeStep = /**
     * @param {?} stepNum
     * @return {?}
     */
    function (stepNum) {
        this.closeCurrentStep();
        this.currentStep = this.activeSteps[stepNum - 1];
        this.eventWalkSubject.next({ step: stepNum, event: 'open' });
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideWalkLibService.prototype.closeCurrentStep = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.currentStep) {
            this.eventWalkSubject.next({ step: this.currentStep, event: 'close' });
        }
    };
    /**
     * @return {?}
     */
    NgGuideWalkLibService.prototype.nextGuide = /**
     * @return {?}
     */
    function () {
        this.closeCurrentStep();
        if (this.isLast(this.currentStep)) {
            this.currentStep = undefined;
            return; // and we are done for this tour
        }
        this.currentStep++;
        this.invokeStep(this.currentStep);
    };
    /**
     * @param {?} stepNum
     * @return {?}
     */
    NgGuideWalkLibService.prototype.getStepObservable = /**
     * @param {?} stepNum
     * @return {?}
     */
    function (stepNum) {
        return this.eventWalkSubject
            .asObservable()
            .pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.step === stepNum; })));
    };
    NgGuideWalkLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgGuideWalkLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });
    return NgGuideWalkLibService;
}());
export { NgGuideWalkLibService };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgGuideWalkLibService.prototype.activeSteps;
    /**
     * @type {?}
     * @private
     */
    NgGuideWalkLibService.prototype.eventWalkSubject;
    /**
     * @type {?}
     * @private
     */
    NgGuideWalkLibService.prototype.currentStep;
    /**
     * @type {?}
     * @private
     */
    NgGuideWalkLibService.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBR3hDO0lBZ0JFO1FBWlEsZ0JBQVcsR0FBRyxFQUFFLENBQUM7UUFDakIscUJBQWdCLEdBQXVCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDckQsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFTTCxDQUFDO0lBUGpCLHNCQUFJLHlDQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7Ozs7UUFDRCxVQUFXLE1BQU07WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FIQTs7Ozs7SUFNRCx3Q0FBUTs7OztJQUFSLFVBQVMsSUFBWTtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUNELDBDQUFVOzs7O0lBQVYsVUFBVyxJQUFZO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxVQUFVLElBQUksT0FBQSxVQUFVLEtBQUssSUFBSSxFQUFuQixDQUFtQixFQUFDLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFDRCxzQ0FBTTs7OztJQUFOLFVBQU8sSUFBSTtRQUVULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFDRCx5Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDOzs7O0lBQ00sMENBQVU7OztJQUFqQjtRQUNFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBQ00sMENBQVU7Ozs7SUFBakIsVUFBa0IsT0FBZTtRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBQ08sZ0RBQWdCOzs7O0lBQXhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7Ozs7SUFFTSx5Q0FBUzs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUM3QixPQUFPLENBQUMsZ0NBQWdDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBR3BDLENBQUM7Ozs7O0lBQ00saURBQWlCOzs7O0lBQXhCLFVBQXlCLE9BQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3pCLFlBQVksRUFBRTthQUNkLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBckIsQ0FBcUIsRUFBQyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0JBL0RGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O2dDQVBEO0NBcUVDLEFBaEVELElBZ0VDO1NBN0RZLHFCQUFxQjs7Ozs7O0lBQ2hDLDRDQUF5Qjs7Ozs7SUFDekIsaURBQTZEOzs7OztJQUM3RCw0Q0FBMEM7Ozs7O0lBQzFDLHdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdhbGtFdmVudCB9IGZyb20gJy4vbmctZ3VpZGUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2Uge1xuICBwcml2YXRlIGFjdGl2ZVN0ZXBzID0gW107XG4gIHByaXZhdGUgZXZlbnRXYWxrU3ViamVjdDogU3ViamVjdDxXYWxrRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50U3RlcDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NvbmZpZyA9IHt9O1xuXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuICBzZXQgY29uZmlnKGNvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIHJlZ2lzdGVyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMucHVzaChzdGVwKTtcbiAgfVxuICB1bnJlZ2lzdGVyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMgPSAgdGhpcy5hY3RpdmVTdGVwcy5maWx0ZXIoc3RlcE51bWJlciA9PiBzdGVwTnVtYmVyICE9PSBzdGVwKTtcbiAgfVxuICBpc0xhc3Qoc3RlcCkge1xuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0ZXAgPyAodGhpcy5hY3RpdmVTdGVwcy5sZW5ndGgpID09PSBzdGVwIDogdHJ1ZTtcbiAgfVxuICBzdG9wR3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHVuZGVmaW5lZDtcbiAgfVxuICBwdWJsaWMgc3RhcnRHdWlkZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzLnNvcnQoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RlcCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gIH1cbiAgcHVibGljIGludm9rZVN0ZXAoc3RlcE51bTogbnVtYmVyKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHRoaXMuYWN0aXZlU3RlcHNbc3RlcE51bSAtIDFdO1xuICAgIHRoaXMuZXZlbnRXYWxrU3ViamVjdC5uZXh0KHsgc3RlcDogc3RlcE51bSwgZXZlbnQ6ICdvcGVuJyB9KTtcbiAgfVxuICBwcml2YXRlIGNsb3NlQ3VycmVudFN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHtcbiAgICAgIHRoaXMuZXZlbnRXYWxrU3ViamVjdC5uZXh0KHsgc3RlcDogdGhpcy5jdXJyZW50U3RlcCwgZXZlbnQ6ICdjbG9zZScgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5leHRHdWlkZSgpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICBpZiAodGhpcy5pc0xhc3QodGhpcy5jdXJyZW50U3RlcCkpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47IC8vIGFuZCB3ZSBhcmUgZG9uZSBmb3IgdGhpcyB0b3VyXG4gICAgfVxuICAgIHRoaXMuY3VycmVudFN0ZXArKztcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgXG4gICAgXG4gIH1cbiAgcHVibGljIGdldFN0ZXBPYnNlcnZhYmxlKHN0ZXBOdW06IG51bWJlcik6IE9ic2VydmFibGU8V2Fsa0V2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRXYWxrU3ViamVjdFxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShmaWx0ZXIoaXRlbSA9PiBpdGVtLnN0ZXAgPT09IHN0ZXBOdW0pKTtcbiAgfVxufVxuIl19