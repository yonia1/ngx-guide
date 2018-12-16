import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { WalkEvent } from './ng-guide.types';

@Injectable({
  providedIn: 'root'
})
export class NgGuideWalkLibService {
  private activeSteps = [];
  private eventWalkSubject: Subject<WalkEvent> = new Subject();
  private currentStep: number | null = null;
  private _config = {};

  get config() {
    return this._config;
  }
  set config(config) {
    this._config = config;
  }

  constructor() { }
  register(step: number) {
    this.activeSteps.push(step);
  }
  unregister(step: number) {
    this.activeSteps =  this.activeSteps.filter(stepNumber => stepNumber !== step);
  }
  isLast(step) {

    return this.currentStep ? (this.activeSteps.length) === step : true;
  }
  stopGuide() {
    this.closeCurrentStep();
    this.currentStep = undefined;
  }
  public startGuide() {
    this.activeSteps.sort();
    if (this.currentStep) { return; }
    this.currentStep = 1;
    this.invokeStep(this.currentStep);
  }
  public invokeStep(stepNum: number) {
    this.closeCurrentStep();
    this.currentStep = this.activeSteps[stepNum - 1];
    this.eventWalkSubject.next({ step: stepNum, event: 'open' });
  }
  private closeCurrentStep() {
    if (this.currentStep) {
      this.eventWalkSubject.next({ step: this.currentStep, event: 'close' });
    }
  }

  public nextGuide() {
    this.closeCurrentStep();
    this.currentStep++;
    this.invokeStep(this.currentStep);
    if (this.isLast(this.currentStep)) {
      this.currentStep = undefined;
    }
    
  }
  public getStepObservable(stepNum: number): Observable<WalkEvent> {
    return this.eventWalkSubject
      .asObservable()
      .pipe(filter(item => item.step === stepNum));
  }
}
