import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { WalkEvent } from './ng-guide.types';

@Injectable({
  providedIn: 'root'
})
export class NgGuideWalkLibService {
  private activeSteps = 0;
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
  register() {
    this.activeSteps++;
  }
  unregister() {
    this.activeSteps--;
  }
  isLast(step) {
    return (this.activeSteps) === step;
  }
  stopGuide() {
    this.closeCurrentStep();
    this.currentStep = undefined;
  }
  public startGuide() {
  
    this.currentStep = 1;
    this.invokeStep(this.currentStep);
  }
  public invokeStep(stepNum: number) {
    this.closeCurrentStep();
    this.currentStep = stepNum;
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
  }
  public getStepObservable(stepNum: number): Observable<WalkEvent> {
    return this.eventWalkSubject.asObservable().pipe(filter(item => item.step === stepNum));
  }
}
