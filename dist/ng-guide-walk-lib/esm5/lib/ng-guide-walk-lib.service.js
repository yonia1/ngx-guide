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
        this.activeSteps = 0;
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
     * @return {?}
     */
    NgGuideWalkLibService.prototype.register = /**
     * @return {?}
     */
    function () {
        this.activeSteps++;
    };
    /**
     * @return {?}
     */
    NgGuideWalkLibService.prototype.unregister = /**
     * @return {?}
     */
    function () {
        this.activeSteps--;
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
        return (this.activeSteps) === step;
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
        this.currentStep = stepNum;
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
        return this.eventWalkSubject.asObservable().pipe(filter(function (item) { return item.step === stepNum; }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEM7SUFnQkU7UUFaUSxnQkFBVyxHQUFHLENBQUMsQ0FBQztRQUNoQixxQkFBZ0IsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQVNMLENBQUM7SUFQakIsc0JBQUkseUNBQU07Ozs7UUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7OztRQUNELFVBQVcsTUFBTTtZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLENBQUM7OztPQUhBOzs7O0lBTUQsd0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFDRCwwQ0FBVTs7O0lBQVY7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxzQ0FBTTs7OztJQUFOLFVBQU8sSUFBSTtRQUNULE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDO0lBQ3JDLENBQUM7Ozs7SUFDRCx5Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztJQUMvQixDQUFDOzs7O0lBQ00sMENBQVU7OztJQUFqQjtRQUVFLElBQUksQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBQ00sMENBQVU7Ozs7SUFBakIsVUFBa0IsT0FBZTtRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLE9BQU8sQ0FBQztRQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUMvRCxDQUFDOzs7O0lBQ08sZ0RBQWdCOzs7SUFBeEI7UUFDRSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7OztJQUVNLHlDQUFTOzs7SUFBaEI7UUFDRSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFDTSxpREFBaUI7Ozs7SUFBeEIsVUFBeUIsT0FBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7O2dCQXJERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztnQ0FQRDtDQTJEQyxBQXRERCxJQXNEQztTQW5EWSxxQkFBcUI7OztJQUNoQyw0Q0FBd0I7O0lBQ3hCLGlEQUE2RDs7SUFDN0QsNENBQTBDOztJQUMxQyx3Q0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhY3RpdmVTdGVwcyA9IDA7XG4gIHByaXZhdGUgZXZlbnRXYWxrU3ViamVjdDogU3ViamVjdDxXYWxrRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50U3RlcDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NvbmZpZyA9IHt9O1xuXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuICBzZXQgY29uZmlnKGNvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIHJlZ2lzdGVyKCkge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMrKztcbiAgfVxuICB1bnJlZ2lzdGVyKCkge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMtLTtcbiAgfVxuICBpc0xhc3Qoc3RlcCkge1xuICAgIHJldHVybiAodGhpcy5hY3RpdmVTdGVwcykgPT09IHN0ZXA7XG4gIH1cbiAgc3RvcEd1aWRlKCkge1xuICAgIHRoaXMuY2xvc2VDdXJyZW50U3RlcCgpO1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcHVibGljIHN0YXJ0R3VpZGUoKSB7XG4gIFxuICAgIHRoaXMuY3VycmVudFN0ZXAgPSAxO1xuICAgIHRoaXMuaW52b2tlU3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuICBwdWJsaWMgaW52b2tlU3RlcChzdGVwTnVtOiBudW1iZXIpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gc3RlcE51bTtcbiAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHN0ZXBOdW0sIGV2ZW50OiAnb3BlbicgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUN1cnJlbnRTdGVwKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7XG4gICAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHRoaXMuY3VycmVudFN0ZXAsIGV2ZW50OiAnY2xvc2UnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZXh0R3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCsrO1xuICAgIHRoaXMuaW52b2tlU3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuICBwdWJsaWMgZ2V0U3RlcE9ic2VydmFibGUoc3RlcE51bTogbnVtYmVyKTogT2JzZXJ2YWJsZTxXYWxrRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFdhbGtTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGVwID09PSBzdGVwTnVtKSk7XG4gIH1cbn1cbiJdfQ==