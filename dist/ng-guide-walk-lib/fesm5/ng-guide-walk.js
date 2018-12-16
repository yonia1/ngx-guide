import { Subject, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Injectable, Component, NgModule, Input, ElementRef, Renderer2, ViewEncapsulation, Directive, ViewContainerRef, TemplateRef, ComponentFactoryResolver, Injector, defineInjectable } from '@angular/core';
import Popper from 'popper.js';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = defineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });
    return NgGuideWalkLibService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgGuideWalkLibComponent = /** @class */ (function () {
    function NgGuideWalkLibComponent() {
    }
    /**
     * @return {?}
     */
    NgGuideWalkLibComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    NgGuideWalkLibComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ng-guide-walk',
                    template: "\n    <p>\n      ng-guide-walk-lib works!\n    </p>\n    <ng-content></ng-content>\n  "
                }] }
    ];
    /** @nocollapse */
    NgGuideWalkLibComponent.ctorParameters = function () { return []; };
    return NgGuideWalkLibComponent;
}());

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
    var oldNgOnDestroy = component.ngOnDestroy;
    /** @type {?} */
    var onDestroySubject$ = new ReplaySubject(1);
    component.ngOnDestroy = function () {
        oldNgOnDestroy.apply(component);
        onDestroySubject$.next(undefined);
        onDestroySubject$.complete();
    };
    return onDestroySubject$;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var GuideContentComponent = /** @class */ (function () {
    function GuideContentComponent(_element, _renderer, host, guideService) {
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
    Object.defineProperty(GuideContentComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._step = toNumber(step);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // todo : move to an action trigger when needed
        // todo : move to an action trigger when needed
        var _a = this, location = _a.location, positionFixed = _a.positionFixed, eventsEnabled = _a.eventsEnabled, modifiers = _a.modifiers;
        this.popper = new Popper(this.getNode(), this._element.nativeElement.querySelector('.ngx-guide'), (/** @type {?} */ ({
            placement: location,
            positionFixed: positionFixed,
            eventsEnabled: eventsEnabled,
            modifiers: modifiers
        })));
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.popper.destroy();
        this.clean();
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.guideService.nextGuide();
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.isLast = /**
     * @return {?}
     */
    function () {
        return this.guideService.isLast(this.step);
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.done = /**
     * @return {?}
     */
    function () {
        this.guideService.stopGuide();
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.getNode = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.clean = /**
     * @return {?}
     */
    function () {
        if (!this.overlayObject) {
            return;
        }
        this.overlayObject.style.display = 'none';
    };
    GuideContentComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'ng-guide-content',
                    template: "<div class=\"ngx-guide\"\n[ngStyle]=\"customCss\"\n[class.visible]=\"show\">\n \n  <ng-content></ng-content>\n  <hr>\n  \n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"next()\">\n    next\n  </button>\n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"done()\">\n    done\n  </button>\n  \n  <div *ngIf=\"displayArrow\" [ngStyle]=\"customCss\" class=\"ngx-guide__arrow\" x-arrow></div>\n</div>",
                    styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:5px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:5px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:5px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{padding:10px;z-index:0;box-shadow:0 0 0 100vmax rgba(0,0,0,.5)}"]
                }] }
    ];
    /** @nocollapse */
    GuideContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgGuideWalkLibService }
    ]; };
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
    return GuideContentComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgGuideStepDirective = /** @class */ (function () {
    function NgGuideStepDirective(elementRef, viewContainerRef, renderer, injector, resolver, walkLibService) {
        this.elementRef = elementRef;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.injector = injector;
        this.resolver = resolver;
        this.walkLibService = walkLibService;
        this.position = 'below';
        this._step = 1;
        this.ngGuideStepLocation = 'bottom';
        this.ngGuideStepStyle = null;
        this.ngGuideStepDisplayArrow = true;
        this.ngGuideStepFocusElement = true;
    }
    Object.defineProperty(NgGuideStepDirective.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} stepNumber
         * @return {?}
         */
        function (stepNumber) {
            this._step = toNumber(stepNumber);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.subscribeToGuideRequest();
        this.walkLibService.register((/** @type {?} */ (this.step)));
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.closeComponent();
        this.walkLibService.unregister((/** @type {?} */ (this.step)));
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.closeComponent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.componentRef) {
            return;
        }
        if (this.afterStepRun) {
            this.afterStepRun(function () {
                _this.componentRef.destroy();
                _this.componentRef = null;
            }, function () { return _this.walkLibService.stopGuide(); });
        }
        else {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.generateComponent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory(GuideContentComponent);
        /** @type {?} */
        var content = this.generateNgContent();
        this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
        this.setInputs();
        this.handleFocus();
        this.handleOverlay();
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.createComponent = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.afterStepRun) {
            this.afterStepRun(function () { return _this.generateComponent(); }, function () { return _this.walkLibService.stopGuide(); });
        }
        else {
            this.generateComponent();
        }
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.generateNgContent = /**
     * @return {?}
     */
    function () {
        // Content is string
        if (typeof this.ngGuideStepContent === 'string') {
            /** @type {?} */
            var element = this.renderer.createText(this.ngGuideStepContent);
            return [[element]];
        }
        // Content is Template
        if (this.ngGuideStepContent instanceof TemplateRef) {
            /** @type {?} */
            var viewRefTemplate = this.ngGuideStepContent.createEmbeddedView({});
            return [viewRefTemplate.rootNodes];
        }
        // Else it's a component
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory(this.ngGuideStepContent);
        /** @type {?} */
        var viewRef = factory.create(this.injector);
        return [[viewRef.location.nativeElement]];
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.setInputs = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var instanceRef = this.componentRef.instance;
        instanceRef.step = (/** @type {?} */ (this.step));
        instanceRef.target = this.elementRef.nativeElement;
        instanceRef.location = this.ngGuideStepLocation || 'bottom';
        instanceRef.displayArrow = this.ngGuideStepDisplayArrow;
        if (this.ngGuideStepStyle) {
            instanceRef.customCss = this.ngGuideStepStyle;
        }
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.subscribeToGuideRequest = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.walkLibService.getStepObservable((/** @type {?} */ (this.step)))
            .pipe(takeUntil(unsignedOnDestroyed(this)))
            .subscribe(function (walkEvent) { return walkEvent.event === 'open' ? _this.createComponent() : _this.closeComponent(); });
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleOverlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
        // this.elementRef.nativeElement.classList.add('overlay');
        this.componentRef.onDestroy(function () {
            _this.renderer.removeClass(_this.elementRef.nativeElement, 'overlay');
        });
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        if (this.ngGuideStepFocusElement) {
            this.elementRef.nativeElement.focus();
        }
    };
    NgGuideStepDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngGuideStep]',
                },] }
    ];
    /** @nocollapse */
    NgGuideStepDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: NgGuideWalkLibService }
    ]; };
    NgGuideStepDirective.propDecorators = {
        step: [{ type: Input, args: ['ngGuideStep',] }],
        ngGuideStepContent: [{ type: Input, args: ['ngGuideStepContent',] }],
        ngGuideStepLocation: [{ type: Input, args: ['ngGuideStepLocation',] }],
        ngGuideStepStyle: [{ type: Input, args: ['ngGuideStepStyle',] }],
        ngGuideStepDisplayArrow: [{ type: Input, args: ['ngGuideStepDisplayArrow',] }],
        ngGuideStepFocusElement: [{ type: Input, args: ['ngGuideStepFocusElement',] }]
    };
    return NgGuideStepDirective;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
var NgGuideWalkLibModule = /** @class */ (function () {
    function NgGuideWalkLibModule() {
    }
    /**
     * @return {?}
     */
    NgGuideWalkLibModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgGuideWalkLibModule,
            providers: [
                {
                    provide: NgGuideWalkLibService,
                    useClass: NgGuideWalkLibService
                }
            ]
        };
    };
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
    return NgGuideWalkLibModule;
}());

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