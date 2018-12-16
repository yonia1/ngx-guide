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
        this.currentStep++;
        this.invokeStep(this.currentStep);
        if (this.isLast(this.currentStep)) {
            this.currentStep = undefined;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHeEM7SUFnQkU7UUFaUSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixxQkFBZ0IsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQVNMLENBQUM7SUFQakIsc0JBQUkseUNBQU07Ozs7UUFBVjtZQUNFLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUN0QixDQUFDOzs7OztRQUNELFVBQVcsTUFBTTtZQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3hCLENBQUM7OztPQUhBOzs7OztJQU1ELHdDQUFROzs7O0lBQVIsVUFBUyxJQUFZO1FBQ25CLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzlCLENBQUM7Ozs7O0lBQ0QsMENBQVU7Ozs7SUFBVixVQUFXLElBQVk7UUFDckIsSUFBSSxDQUFDLFdBQVcsR0FBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxVQUFBLFVBQVUsSUFBSSxPQUFBLFVBQVUsS0FBSyxJQUFJLEVBQW5CLENBQW1CLENBQUMsQ0FBQztJQUNqRixDQUFDOzs7OztJQUNELHNDQUFNOzs7O0lBQU4sVUFBTyxJQUFJO1FBRVQsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDdEUsQ0FBQzs7OztJQUNELHlDQUFTOzs7SUFBVDtRQUNFLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFDTSwwQ0FBVTs7O0lBQWpCO1FBQ0UsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFDTSwwQ0FBVTs7OztJQUFqQixVQUFrQixPQUFlO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7OztJQUNPLGdEQUFnQjs7O0lBQXhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7Ozs7SUFFTSx5Q0FBUzs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7U0FDOUI7SUFFSCxDQUFDOzs7OztJQUNNLGlEQUFpQjs7OztJQUF4QixVQUF5QixPQUFlO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQjthQUN6QixZQUFZLEVBQUU7YUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQXJCLENBQXFCLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7O2dCQTdERixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztnQ0FQRDtDQW1FQyxBQTlERCxJQThEQztTQTNEWSxxQkFBcUI7OztJQUNoQyw0Q0FBeUI7O0lBQ3pCLGlEQUE2RDs7SUFDN0QsNENBQTBDOztJQUMxQyx3Q0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhY3RpdmVTdGVwcyA9IFtdO1xuICBwcml2YXRlIGV2ZW50V2Fsa1N1YmplY3Q6IFN1YmplY3Q8V2Fsa0V2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudFN0ZXA6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jb25maWcgPSB7fTtcblxuICBnZXQgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cbiAgc2V0IGNvbmZpZyhjb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICByZWdpc3RlcihzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzLnB1c2goc3RlcCk7XG4gIH1cbiAgdW5yZWdpc3RlcihzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzID0gIHRoaXMuYWN0aXZlU3RlcHMuZmlsdGVyKHN0ZXBOdW1iZXIgPT4gc3RlcE51bWJlciAhPT0gc3RlcCk7XG4gIH1cbiAgaXNMYXN0KHN0ZXApIHtcblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGVwID8gKHRoaXMuYWN0aXZlU3RlcHMubGVuZ3RoKSA9PT0gc3RlcCA6IHRydWU7XG4gIH1cbiAgc3RvcEd1aWRlKCkge1xuICAgIHRoaXMuY2xvc2VDdXJyZW50U3RlcCgpO1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcHVibGljIHN0YXJ0R3VpZGUoKSB7XG4gICAgdGhpcy5hY3RpdmVTdGVwcy5zb3J0KCk7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IDE7XG4gICAgdGhpcy5pbnZva2VTdGVwKHRoaXMuY3VycmVudFN0ZXApO1xuICB9XG4gIHB1YmxpYyBpbnZva2VTdGVwKHN0ZXBOdW06IG51bWJlcikge1xuICAgIHRoaXMuY2xvc2VDdXJyZW50U3RlcCgpO1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSB0aGlzLmFjdGl2ZVN0ZXBzW3N0ZXBOdW0gLSAxXTtcbiAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHN0ZXBOdW0sIGV2ZW50OiAnb3BlbicgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUN1cnJlbnRTdGVwKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7XG4gICAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHRoaXMuY3VycmVudFN0ZXAsIGV2ZW50OiAnY2xvc2UnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZXh0R3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCsrO1xuICAgIHRoaXMuaW52b2tlU3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgICBpZiAodGhpcy5pc0xhc3QodGhpcy5jdXJyZW50U3RlcCkpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIFxuICB9XG4gIHB1YmxpYyBnZXRTdGVwT2JzZXJ2YWJsZShzdGVwTnVtOiBudW1iZXIpOiBPYnNlcnZhYmxlPFdhbGtFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50V2Fsa1N1YmplY3RcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGVwID09PSBzdGVwTnVtKSk7XG4gIH1cbn1cbiJdfQ==