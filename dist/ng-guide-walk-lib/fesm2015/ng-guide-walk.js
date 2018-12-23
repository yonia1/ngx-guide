import { Subject, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Injectable, NgModule, Component, Directive, ViewContainerRef, ElementRef, Input, TemplateRef, EventEmitter, ComponentFactoryResolver, Renderer2, Injector, Output, Inject, ViewEncapsulation, defineInjectable } from '@angular/core';
import Popper from 'popper.js';
import { DOCUMENT, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgGuideWalkLibService {
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
/** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = defineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgGuideWalkLibComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
NgGuideWalkLibComponent.decorators = [
    { type: Component, args: [{
                selector: 'ng-guide-walk',
                template: `
    <p>
      ng-guide-walk-lib works!
    </p>
    <ng-content></ng-content>
  `
            }] }
];
/** @nocollapse */
NgGuideWalkLibComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
/**
 *
 * @param {?} num - the number to parse
 * Try's to parse any to number
 * @return {?}
 */
function toNumber(num) {
    return Number.isInteger(num) ? num : Number.parseInt(num);
}
/**
 * @param {?} component
 * @return {?}
 */
function unsignedOnDestroyed(component) {
    /** @type {?} */
    const oldNgOnDestroy = component.ngOnDestroy;
    /** @type {?} */
    const onDestroySubject$ = new ReplaySubject(1);
    component.ngOnDestroy = () => {
        oldNgOnDestroy.apply(component);
        onDestroySubject$.next(undefined);
        onDestroySubject$.complete();
    };
    return onDestroySubject$;
}
/**
 * @param {?} value
 * @return {?}
 */
function toBoolean(value) {
    return String(value) == 'true';
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class GuideContentComponent {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} host
     * @param {?} guideService
     */
    constructor(_element, _renderer, host, guideService) {
        this._element = _element;
        this._renderer = _renderer;
        this.host = host;
        this.guideService = guideService;
        this.currentAction = 'next';
        this._step = 1;
        this.show = true;
        this.overlayObject = null;
        this.shouldCreateOverlay = false;
        this.positionFixed = false;
        this.eventsEnabled = true;
        this.location = 'right';
        this.displayArrow = true;
        this.customCss = null;
    }
    /**
     * @param {?} step
     * @return {?}
     */
    set step(step) {
        this._step = toNumber(step);
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // todo : move to an action trigger when needed
        // todo : move to an action trigger when needed
        const { location, positionFixed, eventsEnabled, modifiers } = this;
        this.popper = new Popper(this.getNode(), this._element.nativeElement.querySelector('.ngx-guide'), (/** @type {?} */ ({
            placement: location,
            positionFixed,
            eventsEnabled,
            modifiers
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.popper.destroy();
        this.clean();
    }
    /**
     * @return {?}
     */
    next() {
        this.guideService.nextGuide();
    }
    /**
     * @return {?}
     */
    isLast() {
        return this.guideService.isLast(this.step);
    }
    /**
     * @return {?}
     */
    done() {
        this.guideService.stopGuide();
    }
    /**
     * @return {?}
     */
    getNode() {
        if (this.target) {
            if (typeof this.target === 'string') {
                return document.querySelector(this.target);
            }
            else {
                return this.target;
            }
        }
        else {
            return this._element.nativeElement;
        }
    }
    /**
     * @return {?}
     */
    clean() {
        if (!this.overlayObject) {
            return;
        }
        this.overlayObject.style.display = 'none';
    }
}
GuideContentComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'ng-guide-content',
                template: "<div class=\"ngx-guide\"\n[ngStyle]=\"customCss\"\n[class.visible]=\"show\">\n \n  <ng-content></ng-content>\n  <hr>\n  \n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"next()\">\n    next\n  </button>\n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"done()\">\n    done\n  </button>\n  \n  <div *ngIf=\"displayArrow\" [ngStyle]=\"customCss\" class=\"ngx-guide__arrow\" x-arrow></div>\n</div>",
                styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:10px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:10px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:10px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{top:0;bottom:0;left:0;right:0;opacity:.8;position:absolute;box-sizing:content-box;z-index:99;background-color:#000;opacity:.55;background:radial-gradient(center,ellipse farthest-corner,rgba(0,0,0,.4) 0,rgba(0,0,0,.9) 100%);transition:.3s ease-out}.helperLayer{padding:2px;box-sizing:content-box;position:absolute;z-index:9999998;background-color:rgba(255,255,255,.9);border:1px solid rgba(0,0,0,.5);border-radius:4px;box-shadow:0 2px 15px rgba(0,0,0,.4);transition:.3s ease-out}"]
            }] }
];
/** @nocollapse */
GuideContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgGuideWalkLibService }
];
GuideContentComponent.propDecorators = {
    shouldCreateOverlay: [{ type: Input }],
    modifiers: [{ type: Input }],
    positionFixed: [{ type: Input }],
    eventsEnabled: [{ type: Input }],
    target: [{ type: Input }],
    location: [{ type: Input }],
    displayArrow: [{ type: Input }],
    customCss: [{ type: Input }],
    step: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgGuideStepDirective {
    /**
     * @param {?} document
     * @param {?} elementRef
     * @param {?} viewContainerRef
     * @param {?} renderer
     * @param {?} injector
     * @param {?} resolver
     * @param {?} walkLibService
     */
    constructor(document, elementRef, viewContainerRef, renderer, injector, resolver, walkLibService) {
        this.document = document;
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.injector = injector;
        this.resolver = resolver;
        this.walkLibService = walkLibService;
        this.overlay = null;
        this.position = 'below';
        this._step = 1;
        this.rootElement = 'body';
        this.ngGuideStepLocation = 'bottom';
        this.ngGuideStepStyle = null;
        this.ngGuideStepDisplayArrow = true;
        this.ngGuideStepOverlay = true;
        this.ngGuideStepFocusElement = true;
        this.ngGuideStepStepStatus = new EventEmitter();
    }
    /**
     * @param {?} stepNumber
     * @return {?}
     */
    set step(stepNumber) {
        this._step = toNumber(stepNumber);
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.subscribeToGuideRequest();
        this.walkLibService.register((/** @type {?} */ (this.step)));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.closeComponent();
        this.walkLibService.unregister((/** @type {?} */ (this.step)));
    }
    /**
     * @return {?}
     */
    closeComponent() {
        if (!this.componentRef) {
            return;
        }
        this.ngGuideStepStepStatus.emit('BeforeClose');
        this.componentRef.destroy();
        this.componentRef = null;
        this.ngGuideStepStepStatus.emit('AfterClose');
    }
    /**
     * @return {?}
     */
    generateComponent() {
        this.ngGuideStepStepStatus.emit('BeforeOpen');
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(GuideContentComponent);
        /** @type {?} */
        const content = this.generateNgContent();
        this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
        this.setInputs();
        this.handleFocus();
        this.handleOverlay();
        this.ngGuideStepStepStatus.emit('Open');
    }
    /**
     * @return {?}
     */
    createComponent() {
        this.generateComponent();
    }
    /**
     * @return {?}
     */
    generateNgContent() {
        // Content is string
        if (typeof this.ngGuideStepContent === 'string') {
            /** @type {?} */
            const element = this.renderer.createText(this.ngGuideStepContent);
            return [[element]];
        }
        // Content is Template
        if (this.ngGuideStepContent instanceof TemplateRef) {
            /** @type {?} */
            const viewRefTemplate = this.ngGuideStepContent.createEmbeddedView({});
            return [viewRefTemplate.rootNodes];
        }
        // Else it's a component
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(this.ngGuideStepContent);
        /** @type {?} */
        const viewRef = factory.create(this.injector);
        return [[viewRef.location.nativeElement]];
    }
    /**
     * @return {?}
     */
    setInputs() {
        /** @type {?} */
        const instanceRef = this.componentRef.instance;
        instanceRef.step = (/** @type {?} */ (this.step));
        instanceRef.target = this.elementRef.nativeElement;
        instanceRef.location = this.ngGuideStepLocation || 'bottom';
        instanceRef.displayArrow = this.ngGuideStepDisplayArrow;
        if (this.ngGuideStepStyle) {
            instanceRef.customCss = this.ngGuideStepStyle;
        }
    }
    /**
     * @return {?}
     */
    subscribeToGuideRequest() {
        this.walkLibService.getStepObservable((/** @type {?} */ (this.step)))
            .pipe(takeUntil(unsignedOnDestroyed(this)))
            .subscribe((walkEvent) => walkEvent.event === 'open' ? this.createComponent() : this.closeComponent());
    }
    /**
     * @param {?} element
     * @return {?}
     */
    getOffset(element) {
        /** @type {?} */
        const body = document.body;
        /** @type {?} */
        const docEl = document.documentElement;
        /** @type {?} */
        const scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        /** @type {?} */
        const scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        /** @type {?} */
        const x = element.getBoundingClientRect();
        return {
            top: x.top + scrollTop,
            width: x.width,
            height: x.height,
            left: x.left + scrollLeft
        };
    }
    /**
     * @return {?}
     */
    handleOverlay() {
        if (toBoolean(this.ngGuideStepOverlay)) {
            this.overlay = this.renderer.createElement('div');
            // this.overlay.className = 'overlay';
            this.renderer.addClass(this.overlay, 'overlay');
            this.renderer.appendChild(this.getRootElement(), this.overlay);
            /** @type {?} */
            const targetElm = this.elementRef.nativeElement;
            // if (!targetElm.tagName || targetElm.tagName.toLowerCase() === 'body') {
            //   const styleText = 'top: 0;bottom: 0; left: 0;right: 0;position: fixed;';
            //   this.overlay.style.cssText = styleText;
            // } else {
            //   // set overlay layer position
            //   const elementPosition = this.getOffset(targetElm);
            //   if (elementPosition) {
            //     const styleText = 'width: ' + elementPosition.width + 'px; height:' 
            //     + elementPosition.height + 'px; top:' + elementPosition.top + 'px;left: ' + elementPosition.left + 'px;';
            //     this.overlay.style.cssText = styleText;
            //    }
            // }
            this.renderer.addClass(this.elementRef.nativeElement, 'helperLayer');
            this.componentRef.onDestroy(() => {
                this.renderer.removeChild(this.getRootElement(), this.overlay);
                this.renderer.removeClass(this.elementRef.nativeElement, 'helperLayer');
            });
            // this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
            // this.componentRef.onDestroy(() => {
            //  this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
            // });
        }
    }
    /**
     * @return {?}
     */
    handleFocus() {
        if (toBoolean(this.ngGuideStepFocusElement)) {
            this.elementRef.nativeElement.focus();
        }
    }
    /**
     * @return {?}
     */
    getRootElement() {
        return this.document ? this.document.body : this.getRootOfAllElement();
    }
    /**
     * @return {?}
     */
    getRootOfAllElement() {
        /** @type {?} */
        let last = this.renderer.parentNode(this.elementRef.nativeElement);
        /** @type {?} */
        let res = null;
        while (last && last.localName !== this.rootElement) {
            res = last;
            last = this.renderer.parentNode(res);
        }
        return res;
    }
}
NgGuideStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngGuideStep]',
            },] }
];
/** @nocollapse */
NgGuideStepDirective.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: NgGuideWalkLibService }
];
NgGuideStepDirective.propDecorators = {
    rootElement: [{ type: Input }],
    step: [{ type: Input, args: ['ngGuideStep',] }],
    ngGuideStepContent: [{ type: Input, args: ['ngGuideStepContent',] }],
    ngGuideStepLocation: [{ type: Input, args: ['ngGuideStepLocation',] }],
    ngGuideStepStyle: [{ type: Input, args: ['ngGuideStepStyle',] }],
    ngGuideStepDisplayArrow: [{ type: Input, args: ['ngGuideStepDisplayArrow',] }],
    ngGuideStepOverlay: [{ type: Input, args: ['ngGuideStepOverlay',] }],
    ngGuideStepFocusElement: [{ type: Input, args: ['ngGuideStepFocusElement',] }],
    ngGuideStepStepStatus: [{ type: Output, args: ['ngGuideStepStepStatus',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
class NgGuideWalkLibModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgGuideWalkLibModule,
            providers: [
                {
                    provide: NgGuideWalkLibService,
                    useClass: NgGuideWalkLibService
                }
            ]
        };
    }
}
NgGuideWalkLibModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule,
                ],
                entryComponents: [GuideContentComponent],
                declarations: [NgGuideWalkLibComponent,
                    NgGuideStepDirective,
                    GuideContentComponent],
                exports: [
                    NgGuideWalkLibComponent,
                    NgGuideStepDirective,
                    GuideContentComponent
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */

export { NgGuideWalkLibService, NgGuideWalkLibComponent, NgGuideWalkLibModule, NgGuideStepDirective, GuideContentComponent };

//# sourceMappingURL=ng-guide-walk.js.map