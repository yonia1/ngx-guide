/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
        this.activeSteps = this.activeSteps.filter(stepNumber => stepNumber !== step);
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
            .pipe(filter(item => item.step === stepNum));
    }
}
NgGuideWalkLibService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgGuideWalkLibService.ctorParameters = () => [];
/** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = i0.defineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFNeEMsTUFBTSxPQUFPLHFCQUFxQjtJQWFoQztRQVpRLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLHFCQUFnQixHQUF1QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3JELGdCQUFXLEdBQWtCLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBU0wsQ0FBQzs7OztJQVBqQixJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFHRCxRQUFRLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUNELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFDRCxNQUFNLENBQUMsSUFBSTtRQUVULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFDRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUNNLFVBQVU7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUNNLFVBQVUsQ0FBQyxPQUFlO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7OztJQUNPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7OztJQUVNLFNBQVM7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQ2pDLElBQUksQ0FBQyxXQUFXLEdBQUcsU0FBUyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxnQ0FBZ0M7U0FDekM7UUFDRCxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7SUFHcEMsQ0FBQzs7Ozs7SUFDTSxpQkFBaUIsQ0FBQyxPQUFlO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQjthQUN6QixZQUFZLEVBQUU7YUFDZCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO0lBQ2pELENBQUM7OztZQS9ERixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7SUFFQyw0Q0FBeUI7O0lBQ3pCLGlEQUE2RDs7SUFDN0QsNENBQTBDOztJQUMxQyx3Q0FBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBhY3RpdmVTdGVwcyA9IFtdO1xuICBwcml2YXRlIGV2ZW50V2Fsa1N1YmplY3Q6IFN1YmplY3Q8V2Fsa0V2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudFN0ZXA6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jb25maWcgPSB7fTtcblxuICBnZXQgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cbiAgc2V0IGNvbmZpZyhjb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICByZWdpc3RlcihzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzLnB1c2goc3RlcCk7XG4gIH1cbiAgdW5yZWdpc3RlcihzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzID0gIHRoaXMuYWN0aXZlU3RlcHMuZmlsdGVyKHN0ZXBOdW1iZXIgPT4gc3RlcE51bWJlciAhPT0gc3RlcCk7XG4gIH1cbiAgaXNMYXN0KHN0ZXApIHtcblxuICAgIHJldHVybiB0aGlzLmN1cnJlbnRTdGVwID8gKHRoaXMuYWN0aXZlU3RlcHMubGVuZ3RoKSA9PT0gc3RlcCA6IHRydWU7XG4gIH1cbiAgc3RvcEd1aWRlKCkge1xuICAgIHRoaXMuY2xvc2VDdXJyZW50U3RlcCgpO1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSB1bmRlZmluZWQ7XG4gIH1cbiAgcHVibGljIHN0YXJ0R3VpZGUoKSB7XG4gICAgdGhpcy5hY3RpdmVTdGVwcy5zb3J0KCk7XG4gICAgaWYgKHRoaXMuY3VycmVudFN0ZXApIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IDE7XG4gICAgdGhpcy5pbnZva2VTdGVwKHRoaXMuY3VycmVudFN0ZXApO1xuICB9XG4gIHB1YmxpYyBpbnZva2VTdGVwKHN0ZXBOdW06IG51bWJlcikge1xuICAgIHRoaXMuY2xvc2VDdXJyZW50U3RlcCgpO1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSB0aGlzLmFjdGl2ZVN0ZXBzW3N0ZXBOdW0gLSAxXTtcbiAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHN0ZXBOdW0sIGV2ZW50OiAnb3BlbicgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUN1cnJlbnRTdGVwKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7XG4gICAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHRoaXMuY3VycmVudFN0ZXAsIGV2ZW50OiAnY2xvc2UnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZXh0R3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgaWYgKHRoaXMuaXNMYXN0KHRoaXMuY3VycmVudFN0ZXApKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGVwID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuOyAvLyBhbmQgd2UgYXJlIGRvbmUgZm9yIHRoaXMgdG91clxuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRTdGVwKys7XG4gICAgdGhpcy5pbnZva2VTdGVwKHRoaXMuY3VycmVudFN0ZXApO1xuICAgIFxuICAgIFxuICB9XG4gIHB1YmxpYyBnZXRTdGVwT2JzZXJ2YWJsZShzdGVwTnVtOiBudW1iZXIpOiBPYnNlcnZhYmxlPFdhbGtFdmVudD4ge1xuICAgIHJldHVybiB0aGlzLmV2ZW50V2Fsa1N1YmplY3RcbiAgICAgIC5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGVwID09PSBzdGVwTnVtKSk7XG4gIH1cbn1cbiJdfQ==