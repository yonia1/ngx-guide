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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25nLWd1aWRlLXdhbGstbGliLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXdhbGstbGliLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBYyxNQUFNLE1BQU0sQ0FBQztBQUMzQyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7O0FBR3hDO0lBZ0JFO1FBWlEsZ0JBQVcsR0FBRyxDQUFDLENBQUM7UUFDaEIscUJBQWdCLEdBQXVCLElBQUksT0FBTyxFQUFFLENBQUM7UUFDckQsZ0JBQVcsR0FBa0IsSUFBSSxDQUFDO1FBQ2xDLFlBQU8sR0FBRyxFQUFFLENBQUM7SUFTTCxDQUFDO0lBUGpCLHNCQUFJLHlDQUFNOzs7O1FBQVY7WUFDRSxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdEIsQ0FBQzs7Ozs7UUFDRCxVQUFXLE1BQU07WUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN4QixDQUFDOzs7T0FIQTs7OztJQU1ELHdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7O0lBQ0QsMENBQVU7OztJQUFWO1FBQ0UsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7O0lBQ0Qsc0NBQU07Ozs7SUFBTixVQUFPLElBQUk7UUFDVCxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQztJQUNyQyxDQUFDOzs7O0lBQ0QseUNBQVM7OztJQUFUO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUM7SUFDL0IsQ0FBQzs7OztJQUNNLDBDQUFVOzs7SUFBakI7UUFDRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNwQyxDQUFDOzs7OztJQUNNLDBDQUFVOzs7O0lBQWpCLFVBQWtCLE9BQWU7UUFDL0IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxPQUFPLENBQUM7UUFDM0IsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7SUFDL0QsQ0FBQzs7OztJQUNPLGdEQUFnQjs7O0lBQXhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN4RTtJQUNILENBQUM7Ozs7SUFFTSx5Q0FBUzs7O0lBQWhCO1FBQ0UsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ25CLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ3BDLENBQUM7Ozs7O0lBQ00saURBQWlCOzs7O0lBQXhCLFVBQXlCLE9BQWU7UUFDdEMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFyQixDQUFxQixDQUFDLENBQUMsQ0FBQztJQUMxRixDQUFDOztnQkFwREYsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7Z0NBUEQ7Q0EwREMsQUFyREQsSUFxREM7U0FsRFkscUJBQXFCOzs7SUFDaEMsNENBQXdCOztJQUN4QixpREFBNkQ7O0lBQzdELDRDQUEwQzs7SUFDMUMsd0NBQXFCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgV2Fsa0V2ZW50IH0gZnJvbSAnLi9uZy1ndWlkZS50eXBlcyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VpZGVXYWxrTGliU2VydmljZSB7XG4gIHByaXZhdGUgYWN0aXZlU3RlcHMgPSAwO1xuICBwcml2YXRlIGV2ZW50V2Fsa1N1YmplY3Q6IFN1YmplY3Q8V2Fsa0V2ZW50PiA9IG5ldyBTdWJqZWN0KCk7XG4gIHByaXZhdGUgY3VycmVudFN0ZXA6IG51bWJlciB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF9jb25maWcgPSB7fTtcblxuICBnZXQgY29uZmlnKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25maWc7XG4gIH1cbiAgc2V0IGNvbmZpZyhjb25maWcpIHtcbiAgICB0aGlzLl9jb25maWcgPSBjb25maWc7XG4gIH1cblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICByZWdpc3RlcigpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzKys7XG4gIH1cbiAgdW5yZWdpc3RlcigpIHtcbiAgICB0aGlzLmFjdGl2ZVN0ZXBzLS07XG4gIH1cbiAgaXNMYXN0KHN0ZXApIHtcbiAgICByZXR1cm4gKHRoaXMuYWN0aXZlU3RlcHMpID09PSBzdGVwO1xuICB9XG4gIHN0b3BHdWlkZSgpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gdW5kZWZpbmVkO1xuICB9XG4gIHB1YmxpYyBzdGFydEd1aWRlKCkge1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSAxO1xuICAgIHRoaXMuaW52b2tlU3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuICBwdWJsaWMgaW52b2tlU3RlcChzdGVwTnVtOiBudW1iZXIpIHtcbiAgICB0aGlzLmNsb3NlQ3VycmVudFN0ZXAoKTtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gc3RlcE51bTtcbiAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHN0ZXBOdW0sIGV2ZW50OiAnb3BlbicgfSk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUN1cnJlbnRTdGVwKCkge1xuICAgIGlmICh0aGlzLmN1cnJlbnRTdGVwKSB7XG4gICAgICB0aGlzLmV2ZW50V2Fsa1N1YmplY3QubmV4dCh7IHN0ZXA6IHRoaXMuY3VycmVudFN0ZXAsIGV2ZW50OiAnY2xvc2UnIH0pO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBuZXh0R3VpZGUoKSB7XG4gICAgdGhpcy5jbG9zZUN1cnJlbnRTdGVwKCk7XG4gICAgdGhpcy5jdXJyZW50U3RlcCsrO1xuICAgIHRoaXMuaW52b2tlU3RlcCh0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuICBwdWJsaWMgZ2V0U3RlcE9ic2VydmFibGUoc3RlcE51bTogbnVtYmVyKTogT2JzZXJ2YWJsZTxXYWxrRXZlbnQ+IHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFdhbGtTdWJqZWN0LmFzT2JzZXJ2YWJsZSgpLnBpcGUoZmlsdGVyKGl0ZW0gPT4gaXRlbS5zdGVwID09PSBzdGVwTnVtKSk7XG4gIH1cbn1cbiJdfQ==