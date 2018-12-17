import { ViewContainerRef, ElementRef, TemplateRef, Type, ComponentFactoryResolver, Renderer2, Injector, OnDestroy, OnInit } from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { WalkLocation } from './guide-content/guide-content.component';
export declare class NgGuideStepDirective implements OnInit, OnDestroy {
    private elementRef;
    private viewContainerRef;
    private renderer;
    private injector;
    private resolver;
    private walkLibService;
    position: string;
    private _step;
    step: number | string;
    beforeStepRun: (next: () => null | void | any, cancel: () => null | void | any) => null;
    afterStepRun: (next: () => null | void | any, cancel: () => null | void | any) => null;
    ngGuideStepContent: string | TemplateRef<any> | Type<any>;
    ngGuideStepLocation: WalkLocation;
    ngGuideStepStyle: {
        [key: string]: string;
    } | null;
    ngGuideStepDisplayArrow: boolean;
    ngGuideStepOverlay: boolean | string;
    ngGuideStepFocusElement: boolean;
    private componentRef;
    constructor(elementRef: ElementRef, viewContainerRef: ViewContainerRef, renderer: Renderer2, injector: Injector, resolver: ComponentFactoryResolver, walkLibService: NgGuideWalkLibService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    private closeComponent;
    private generateComponent;
    private createComponent;
    generateNgContent(): any[][];
    private setInputs;
    private subscribeToGuideRequest;
    private handleOverlay;
    private handleFocus;
}
