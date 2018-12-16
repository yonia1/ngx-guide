import { Observable } from 'rxjs';
import { WalkEvent } from './ng-guide.types';
export declare class NgGuideWalkLibService {
    private activeSteps;
    private eventWalkSubject;
    private currentStep;
    private _config;
    config: {};
    constructor();
    register(step: number): void;
    unregister(step: number): void;
    isLast(step: any): boolean;
    stopGuide(): void;
    startGuide(): void;
    invokeStep(stepNum: number): void;
    private closeCurrentStep;
    nextGuide(): void;
    getStepObservable(stepNum: number): Observable<WalkEvent>;
}
