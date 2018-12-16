/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
        this.activeSteps = this.activeSteps.filter(function (stepNumber) { return stepNumber !== step; });
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
     * @return {?}
     */
    NgGuideWalkLibService.prototype.closeCurrentStep = /**
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
            .pipe(filter(function (item) { return item.step === stepNum; }));
    };
    NgGuideWalkLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgGuideWalkLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = i0.defineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });
    return NgGuideWalkLibService;
}());
export { NgGuideWalkLibService };
if (false) {
    /** @type {?} */
    NgGuideWalkLibService.prototype.activeSteps;
    /** @type {?} */
    NgGuideWalkLibService.prototype.eventWalkSubject;
    /** @type {?} */
    NgGuideWalkLibService.prototype.currentStep;
    /** @type {?} */
    NgGuideWalkLibService.prototype._config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEM7SUFnQkU7UUFaUSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixxQkFBZ0IsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQVNMLENBQUM7SUFQakIsc0JBQUkseUNBQU07Ozs7UUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7OztRQUNELFVBQVcsTUFBTTtZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLENBQUM7OztPQUhBOzs7OztJQU1ELHdDQUFROzs7O0lBQVIsVUFBUyxJQUFZO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBQ0QsMENBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLFVBQVUsS0FBSyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUNqRixDQUFDOzs7OztJQUNELHNDQUFNOzs7O0lBQU4sVUFBTyxJQUFJO1FBRVQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEUsQ0FBQzs7OztJQUNELHlDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFDTSwwQ0FBVTs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFDTSwwQ0FBVTs7OztJQUFqQixVQUFrQixPQUFlO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7OztJQUNPLGdEQUFnQjs7O0lBQXhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7Ozs7SUFFTSx5Q0FBUzs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztZQUM3QixPQUFPLENBQUMsZ0NBQWdDO1NBQ3pDO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBR3BDLENBQUM7Ozs7O0lBQ00saURBQWlCOzs7O0lBQXhCLFVBQXlCLE9BQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3pCLFlBQVksRUFBRTthQUNkLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBckIsQ0FBcUIsQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7Z0JBL0RGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O2dDQVBEO0NBcUVDLEFBaEVELElBZ0VDO1NBN0RZLHFCQUFxQjs7O0lBQ2hDLDRDQUF5Qjs7SUFDekIsaURBQTZEOztJQUM3RCw0Q0FBMEM7O0lBQzFDLHdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdhbGtFdmVudCB9IGZyb20gJy4vbmctZ3VpZGUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2Uge1xuICBwcml2YXRlIGFjdGl2ZVN0ZXBzID0gW107XG4gIHByaXZhdGUgZXZlbnRXYWxrU3ViamVjdDogU3ViamVjdDxXYWxrRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50U3RlcDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NvbmZpZyA9IHt9O1xuXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuICBzZXQgY29uZmlnKGNvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIHJlZ2lzdGVyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMucHVzaChzdGVwKTtcbiAgfVxuICB1bnJlZ2lzdGVyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMgPSAgdGhpcy5hY3RpdmVTdGVwcy5maWx0ZXIoc3RlcE51bWJlciA9PiBzdGVwTnVtYmVyICE9PSBzdGVwKTtcbiAgfVxuICBpc0xhc3Qoc3RlcCkge1xuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0ZXAgPyAodGhpcy5hY3RpdmVTdGVwcy5sZW5ndGgpID09PSBzdGVwIDogdHJ1ZTtcbiAgfVxuICBzdG9wR3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHVuZGVmaW5lZDtcbiAgfVxuICBwdWJsaWMgc3RhcnRHdWlkZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzLnNvcnQoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RlcCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gIH1cbiAgcHVibGljIGludm9rZVN0ZXAoc3RlcE51bTogbnVtYmVyKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHRoaXMuYWN0aXZlU3RlcHNbc3RlcE51bSAtIDFdO1xuICAgIHRoaXMuZXZlbnRXYWxrU3ViamVjdC5uZXh0KHsgc3RlcDogc3RlcE51bSwgZXZlbnQ6ICdvcGVuJyB9KTtcbiAgfVxuICBwcml2YXRlIGNsb3NlQ3VycmVudFN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHtcbiAgICAgIHRoaXMuZXZlbnRXYWxrU3ViamVjdC5uZXh0KHsgc3RlcDogdGhpcy5jdXJyZW50U3RlcCwgZXZlbnQ6ICdjbG9zZScgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5leHRHdWlkZSgpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICBpZiAodGhpcy5pc0xhc3QodGhpcy5jdXJyZW50U3RlcCkpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47IC8vIGFuZCB3ZSBhcmUgZG9uZSBmb3IgdGhpcyB0b3VyXG4gICAgfVxuICAgIHRoaXMuY3VycmVudFN0ZXArKztcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgXG4gICAgXG4gIH1cbiAgcHVibGljIGdldFN0ZXBPYnNlcnZhYmxlKHN0ZXBOdW06IG51bWJlcik6IE9ic2VydmFibGU8V2Fsa0V2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRXYWxrU3ViamVjdFxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShmaWx0ZXIoaXRlbSA9PiBpdGVtLnN0ZXAgPT09IHN0ZXBOdW0pKTtcbiAgfVxufVxuIl19