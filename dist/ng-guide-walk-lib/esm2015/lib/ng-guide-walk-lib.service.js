/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-walk-lib.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class NgGuideWalkLibService {
    constructor() {
        this.activeSteps = [];
        this.eventWalkSubject = new Subject();
        this.currentStep = null;
        this._config = {};
    }
    /**
     * @return {?}
     */
    get config() {
        return this._config;
    }
    /**
     * @param {?} config
     * @return {?}
     */
    set config(config) {
        this._config = config;
    }
    /**
     * @param {?} step
     * @return {?}
     */
    register(step) {
        this.activeSteps.push(step);
    }
    /**
     * @param {?} step
     * @return {?}
     */
    unregister(step) {
        this.activeSteps = this.activeSteps.filter((/**
         * @param {?} stepNumber
         * @return {?}
         */
        stepNumber => stepNumber !== step));
    }
    /**
     * @param {?} step
     * @return {?}
     */
    isLast(step) {
        return this.currentStep ? (this.activeSteps.length) === step : true;
    }
    /**
     * @return {?}
     */
    stopGuide() {
        this.closeCurrentStep();
        this.currentStep = undefined;
    }
    /**
     * @return {?}
     */
    startGuide() {
        this.activeSteps.sort();
        if (this.currentStep) {
            return;
        }
        this.currentStep = 1;
        this.invokeStep(this.currentStep);
    }
    /**
     * @param {?} stepNum
     * @return {?}
     */
    invokeStep(stepNum) {
        this.closeCurrentStep();
        this.currentStep = this.activeSteps[stepNum - 1];
        this.eventWalkSubject.next({ step: stepNum, event: 'open' });
    }
    /**
     * @private
     * @return {?}
     */
    closeCurrentStep() {
        if (this.currentStep) {
            this.eventWalkSubject.next({ step: this.currentStep, event: 'close' });
        }
    }
    /**
     * @return {?}
     */
    nextGuide() {
        this.closeCurrentStep();
        if (this.isLast(this.currentStep)) {
            this.currentStep = undefined;
            return; // and we are done for this tour
        }
        this.currentStep++;
        this.invokeStep(this.currentStep);
    }
    /**
     * @param {?} stepNum
     * @return {?}
     */
    getStepObservable(stepNum) {
        return this.eventWalkSubject
            .asObservable()
            .pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        item => item.step === stepNum)));
    }
}
NgGuideWalkLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgGuideWalkLibService.ctorParameters = () => [];
/** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBTXhDLE1BQU0sT0FBTyxxQkFBcUI7SUFhaEM7UUFaUSxnQkFBVyxHQUFHLEVBQUUsQ0FBQztRQUNqQixxQkFBZ0IsR0FBdUIsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUNyRCxnQkFBVyxHQUFrQixJQUFJLENBQUM7UUFDbEMsWUFBTyxHQUFHLEVBQUUsQ0FBQztJQVNMLENBQUM7Ozs7SUFQakIsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFBSSxNQUFNLENBQUMsTUFBTTtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBR0QsUUFBUSxDQUFDLElBQVk7UUFDbkIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDOUIsQ0FBQzs7Ozs7SUFDRCxVQUFVLENBQUMsSUFBWTtRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTTs7OztRQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsVUFBVSxLQUFLLElBQUksRUFBQyxDQUFDO0lBQ2pGLENBQUM7Ozs7O0lBQ0QsTUFBTSxDQUFDLElBQUk7UUFFVCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN0RSxDQUFDOzs7O0lBQ0QsU0FBUztRQUNQLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO0lBQy9CLENBQUM7Ozs7SUFDTSxVQUFVO1FBQ2YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFDTSxVQUFVLENBQUMsT0FBZTtRQUMvQixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ2pELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Ozs7O0lBQ08sZ0JBQWdCO1FBQ3RCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNwQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxDQUFDLENBQUM7U0FDeEU7SUFDSCxDQUFDOzs7O0lBRU0sU0FBUztRQUNkLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUU7WUFDakMsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7WUFDN0IsT0FBTyxDQUFDLGdDQUFnQztTQUN6QztRQUNELElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUdwQyxDQUFDOzs7OztJQUNNLGlCQUFpQixDQUFDLE9BQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCO2FBQ3pCLFlBQVksRUFBRTthQUNkLElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBQyxDQUFDLENBQUM7SUFDakQsQ0FBQzs7O1lBL0RGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztJQUVDLDRDQUF5Qjs7Ozs7SUFDekIsaURBQTZEOzs7OztJQUM3RCw0Q0FBMEM7Ozs7O0lBQzFDLHdDQUFxQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN1YmplY3QsIE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdhbGtFdmVudCB9IGZyb20gJy4vbmctZ3VpZGUudHlwZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2Uge1xuICBwcml2YXRlIGFjdGl2ZVN0ZXBzID0gW107XG4gIHByaXZhdGUgZXZlbnRXYWxrU3ViamVjdDogU3ViamVjdDxXYWxrRXZlbnQ+ID0gbmV3IFN1YmplY3QoKTtcbiAgcHJpdmF0ZSBjdXJyZW50U3RlcDogbnVtYmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX2NvbmZpZyA9IHt9O1xuXG4gIGdldCBjb25maWcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NvbmZpZztcbiAgfVxuICBzZXQgY29uZmlnKGNvbmZpZykge1xuICAgIHRoaXMuX2NvbmZpZyA9IGNvbmZpZztcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIHJlZ2lzdGVyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMucHVzaChzdGVwKTtcbiAgfVxuICB1bnJlZ2lzdGVyKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMgPSAgdGhpcy5hY3RpdmVTdGVwcy5maWx0ZXIoc3RlcE51bWJlciA9PiBzdGVwTnVtYmVyICE9PSBzdGVwKTtcbiAgfVxuICBpc0xhc3Qoc3RlcCkge1xuXG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFN0ZXAgPyAodGhpcy5hY3RpdmVTdGVwcy5sZW5ndGgpID09PSBzdGVwIDogdHJ1ZTtcbiAgfVxuICBzdG9wR3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHVuZGVmaW5lZDtcbiAgfVxuICBwdWJsaWMgc3RhcnRHdWlkZSgpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzLnNvcnQoKTtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RlcCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gIH1cbiAgcHVibGljIGludm9rZVN0ZXAoc3RlcE51bTogbnVtYmVyKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHRoaXMuYWN0aXZlU3RlcHNbc3RlcE51bSAtIDFdO1xuICAgIHRoaXMuZXZlbnRXYWxrU3ViamVjdC5uZXh0KHsgc3RlcDogc3RlcE51bSwgZXZlbnQ6ICdvcGVuJyB9KTtcbiAgfVxuICBwcml2YXRlIGNsb3NlQ3VycmVudFN0ZXAoKSB7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHtcbiAgICAgIHRoaXMuZXZlbnRXYWxrU3ViamVjdC5uZXh0KHsgc3RlcDogdGhpcy5jdXJyZW50U3RlcCwgZXZlbnQ6ICdjbG9zZScgfSk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG5leHRHdWlkZSgpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICBpZiAodGhpcy5pc0xhc3QodGhpcy5jdXJyZW50U3RlcCkpIHtcbiAgICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gICAgICByZXR1cm47IC8vIGFuZCB3ZSBhcmUgZG9uZSBmb3IgdGhpcyB0b3VyXG4gICAgfVxuICAgIHRoaXMuY3VycmVudFN0ZXArKztcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgXG4gICAgXG4gIH1cbiAgcHVibGljIGdldFN0ZXBPYnNlcnZhYmxlKHN0ZXBOdW06IG51bWJlcik6IE9ic2VydmFibGU8V2Fsa0V2ZW50PiB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRXYWxrU3ViamVjdFxuICAgICAgLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShmaWx0ZXIoaXRlbSA9PiBpdGVtLnN0ZXAgPT09IHN0ZXBOdW0pKTtcbiAgfVxufVxuIl19