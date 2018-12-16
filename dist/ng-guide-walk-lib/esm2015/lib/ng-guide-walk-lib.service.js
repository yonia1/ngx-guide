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
        this.currentStep++;
        this.invokeStep(this.currentStep);
        if (this.isLast(this.currentStep)) {
            this.currentStep = undefined;
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGsvIiwic291cmNlcyI6WyJsaWIvbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBQzNDLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFNeEMsTUFBTSxPQUFPLHFCQUFxQjtJQWFoQztRQVpRLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ2pCLHFCQUFnQixHQUF1QixJQUFJLE9BQU8sRUFBRSxDQUFDO1FBQ3JELGdCQUFXLEdBQWtCLElBQUksQ0FBQztRQUNsQyxZQUFPLEdBQUcsRUFBRSxDQUFDO0lBU0wsQ0FBQzs7OztJQVBqQixJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7SUFDdEIsQ0FBQzs7Ozs7SUFDRCxJQUFJLE1BQU0sQ0FBQyxNQUFNO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDeEIsQ0FBQzs7Ozs7SUFHRCxRQUFRLENBQUMsSUFBWTtRQUNuQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM5QixDQUFDOzs7OztJQUNELFVBQVUsQ0FBQyxJQUFZO1FBQ3JCLElBQUksQ0FBQyxXQUFXLEdBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxVQUFVLEtBQUssSUFBSSxDQUFDLENBQUM7SUFDakYsQ0FBQzs7Ozs7SUFDRCxNQUFNLENBQUMsSUFBSTtRQUVULE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RFLENBQUM7Ozs7SUFDRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUNNLFVBQVU7UUFDZixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3hCLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUNNLFVBQVUsQ0FBQyxPQUFlO1FBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7OztJQUNPLGdCQUFnQjtRQUN0QixJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUU7WUFDcEIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1NBQ3hFO0lBQ0gsQ0FBQzs7OztJQUVNLFNBQVM7UUFDZCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDbEMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQztTQUM5QjtJQUVILENBQUM7Ozs7O0lBQ00saUJBQWlCLENBQUMsT0FBZTtRQUN0QyxPQUFPLElBQUksQ0FBQyxnQkFBZ0I7YUFDekIsWUFBWSxFQUFFO2FBQ2QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNqRCxDQUFDOzs7WUE3REYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7O0lBRUMsNENBQXlCOztJQUN6QixpREFBNkQ7O0lBQzdELDRDQUEwQzs7SUFDMUMsd0NBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgV2Fsa0V2ZW50IH0gZnJvbSAnLi9uZy1ndWlkZS50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VpZGVXYWxrTGliU2VydmljZSB7XG4gIHByaXZhdGUgYWN0aXZlU3RlcHMgPSBbXTtcbiAgcHJpdmF0ZSBldmVudFdhbGtTdWJqZWN0OiBTdWJqZWN0PFdhbGtFdmVudD4gPSBuZXcgU3ViamVjdCgpO1xuICBwcml2YXRlIGN1cnJlbnRTdGVwOiBudW1iZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfY29uZmlnID0ge307XG5cbiAgZ2V0IGNvbmZpZygpIHtcbiAgICByZXR1cm4gdGhpcy5fY29uZmlnO1xuICB9XG4gIHNldCBjb25maWcoY29uZmlnKSB7XG4gICAgdGhpcy5fY29uZmlnID0gY29uZmlnO1xuICB9XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgcmVnaXN0ZXIoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVTdGVwcy5wdXNoKHN0ZXApO1xuICB9XG4gIHVucmVnaXN0ZXIoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5hY3RpdmVTdGVwcyA9ICB0aGlzLmFjdGl2ZVN0ZXBzLmZpbHRlcihzdGVwTnVtYmVyID0+IHN0ZXBOdW1iZXIgIT09IHN0ZXApO1xuICB9XG4gIGlzTGFzdChzdGVwKSB7XG5cbiAgICByZXR1cm4gdGhpcy5jdXJyZW50U3RlcCA/ICh0aGlzLmFjdGl2ZVN0ZXBzLmxlbmd0aCkgPT09IHN0ZXAgOiB0cnVlO1xuICB9XG4gIHN0b3BHdWlkZSgpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gdW5kZWZpbmVkO1xuICB9XG4gIHB1YmxpYyBzdGFydEd1aWRlKCkge1xuICAgIHRoaXMuYWN0aXZlU3RlcHMuc29ydCgpO1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY3VycmVudFN0ZXAgPSAxO1xuICAgIHRoaXMuaW52b2tlU3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuICBwdWJsaWMgaW52b2tlU3RlcChzdGVwTnVtOiBudW1iZXIpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gdGhpcy5hY3RpdmVTdGVwc1tzdGVwTnVtIC0gMV07XG4gICAgdGhpcy5ldmVudFdhbGtTdWJqZWN0Lm5leHQoeyBzdGVwOiBzdGVwTnVtLCBldmVudDogJ29wZW4nIH0pO1xuICB9XG4gIHByaXZhdGUgY2xvc2VDdXJyZW50U3RlcCgpIHtcbiAgICBpZiAodGhpcy5jdXJyZW50U3RlcCkge1xuICAgICAgdGhpcy5ldmVudFdhbGtTdWJqZWN0Lm5leHQoeyBzdGVwOiB0aGlzLmN1cnJlbnRTdGVwLCBldmVudDogJ2Nsb3NlJyB9KTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgbmV4dEd1aWRlKCkge1xuICAgIHRoaXMuY2xvc2VDdXJyZW50U3RlcCgpO1xuICAgIHRoaXMuY3VycmVudFN0ZXArKztcbiAgICB0aGlzLmludm9rZVN0ZXAodGhpcy5jdXJyZW50U3RlcCk7XG4gICAgaWYgKHRoaXMuaXNMYXN0KHRoaXMuY3VycmVudFN0ZXApKSB7XG4gICAgICB0aGlzLmN1cnJlbnRTdGVwID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBcbiAgfVxuICBwdWJsaWMgZ2V0U3RlcE9ic2VydmFibGUoc3RlcE51bTogbnVtYmVyKTogT2JzZXJ2YWJsZTxXYWxrRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFdhbGtTdWJqZWN0XG4gICAgICAuYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKGZpbHRlcihpdGVtID0+IGl0ZW0uc3RlcCA9PT0gc3RlcE51bSkpO1xuICB9XG59XG4iXX0=