import { Injectable, ɵɵdefineInjectable, Component, ViewEncapsulation, ElementRef, Renderer2, Input, EventEmitter, TemplateRef, Directive, Inject, ViewContainerRef, Injector, ComponentFactoryResolver, Output, NgModule } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import Popper from 'popper.js';
import { DOCUMENT, CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-walk-lib.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
        this.activeSteps = this.activeSteps.filter((/**
         * @param {?} stepNumber
         * @return {?}
         */
        function (stepNumber) { return stepNumber !== step; }));
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
     * @private
     * @return {?}
     */
    NgGuideWalkLibService.prototype.closeCurrentStep = /**
     * @private
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
        if (this.isLast(this.currentStep)) {
            this.currentStep = undefined;
            return; // and we are done for this tour
        }
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
        return this.eventWalkSubject
            .asObservable()
            .pipe(filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.step === stepNum; })));
    };
    NgGuideWalkLibService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgGuideWalkLibService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgGuideWalkLibService.ngInjectableDef = ɵɵdefineInjectable({ factory: function NgGuideWalkLibService_Factory() { return new NgGuideWalkLibService(); }, token: NgGuideWalkLibService, providedIn: "root" });
    return NgGuideWalkLibService;
}());
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

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-walk-lib.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * Generated from: lib/utils/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
    component.ngOnDestroy = (/**
     * @return {?}
     */
    function () {
        oldNgOnDestroy.apply(component);
        onDestroySubject$.next(undefined);
        onDestroySubject$.complete();
    });
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
 * Generated from: lib/guide-content/guide-content.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
     * @private
     * @return {?}
     */
    GuideContentComponent.prototype.getNode = /**
     * @private
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
     * @private
     * @return {?}
     */
    GuideContentComponent.prototype.clean = /**
     * @private
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
                    styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:10px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:10px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:10px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{top:0;bottom:0;left:0;right:0;opacity:.8;position:absolute;box-sizing:content-box;z-index:99;background-color:#000;opacity:.55;background:radial-gradient(center,ellipse farthest-corner,rgba(0,0,0,.4) 0,rgba(0,0,0,.9) 100%);-webkit-transition:.3s ease-out;transition:.3s ease-out}.helperLayer{padding:2px;box-sizing:content-box;position:absolute;z-index:9999998;background-color:rgba(255,255,255,.9);border:1px solid rgba(0,0,0,.5);border-radius:4px;box-shadow:0 2px 15px rgba(0,0,0,.4);-webkit-transition:.3s ease-out;transition:.3s ease-out}"]
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
if (false) {
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.currentAction;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype._step;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.popper;
    /** @type {?} */
    GuideContentComponent.prototype.show;
    /** @type {?} */
    GuideContentComponent.prototype.overlayObject;
    /** @type {?} */
    GuideContentComponent.prototype.shouldCreateOverlay;
    /** @type {?} */
    GuideContentComponent.prototype.modifiers;
    /** @type {?} */
    GuideContentComponent.prototype.positionFixed;
    /** @type {?} */
    GuideContentComponent.prototype.eventsEnabled;
    /** @type {?} */
    GuideContentComponent.prototype.target;
    /** @type {?} */
    GuideContentComponent.prototype.location;
    /** @type {?} */
    GuideContentComponent.prototype.displayArrow;
    /** @type {?} */
    GuideContentComponent.prototype.customCss;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.host;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.guideService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-step.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NgGuideStepDirective = /** @class */ (function () {
    function NgGuideStepDirective(document, elementRef, viewContainerRef, renderer, injector, resolver, walkLibService) {
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
        this.rootElement = 'app-root';
        this.ngGuideStepLocation = 'bottom';
        this.ngGuideStepStyle = null;
        this.ngGuideStepDisplayArrow = true;
        this.ngGuideStepOverlay = true;
        this.ngGuideStepFocusElement = true;
        this.ngGuideStepStepStatus = new EventEmitter();
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
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.closeComponent = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.componentRef) {
            return;
        }
        this.ngGuideStepStepStatus.emit('BeforeClose');
        this.componentRef.destroy();
        this.componentRef = null;
        this.ngGuideStepStepStatus.emit('AfterClose');
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.generateComponent = /**
     * @private
     * @return {?}
     */
    function () {
        this.ngGuideStepStepStatus.emit('BeforeOpen');
        /** @type {?} */
        var factory = this.resolver.resolveComponentFactory(GuideContentComponent);
        /** @type {?} */
        var content = this.generateNgContent();
        this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
        this.setInputs();
        this.handleFocus();
        this.handleOverlay();
        this.ngGuideStepStepStatus.emit('Open');
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.createComponent = /**
     * @private
     * @return {?}
     */
    function () {
        this.generateComponent();
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
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.setInputs = /**
     * @private
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
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.subscribeToGuideRequest = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.walkLibService.getStepObservable((/** @type {?} */ (this.step)))
            .pipe(takeUntil(unsignedOnDestroyed(this)))
            .subscribe((/**
         * @param {?} walkEvent
         * @return {?}
         */
        function (walkEvent) { return walkEvent.event === 'open' ? _this.createComponent() : _this.closeComponent(); }));
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    NgGuideStepDirective.prototype.getOffset = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var body = document.body;
        /** @type {?} */
        var docEl = document.documentElement;
        /** @type {?} */
        var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
        /** @type {?} */
        var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
        /** @type {?} */
        var x = element.getBoundingClientRect();
        return {
            top: x.top + scrollTop,
            width: x.width,
            height: x.height,
            left: x.left + scrollLeft
        };
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (toBoolean(this.ngGuideStepOverlay)) {
            this.overlay = this.renderer.createElement('div');
            // this.overlay.className = 'overlay';
            this.renderer.addClass(this.overlay, 'overlay');
            this.tryAddOverlay();
            /** @type {?} */
            var targetElm = this.elementRef.nativeElement;
            this.renderer.addClass(targetElm, 'helperLayer');
            this.componentRef.onDestroy((/**
             * @return {?}
             */
            function () {
                _this.renderer.removeChild(_this.getRootElement(), _this.overlay);
                _this.renderer.removeClass(_this.elementRef.nativeElement, 'helperLayer');
            }));
            // this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
            // this.componentRef.onDestroy(() => {
            //  this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
            // });
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.tryAddOverlay = /**
     * @private
     * @return {?}
     */
    function () {
        try {
            this.renderer.appendChild(this.getRootElement(), this.overlay);
        }
        catch (e) { }
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleFocus = /**
     * @private
     * @return {?}
     */
    function () {
        if (toBoolean(this.ngGuideStepFocusElement)) {
            this.elementRef.nativeElement.focus();
        }
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.getRootElement = /**
     * @private
     * @return {?}
     */
    function () {
        return !this.document ? this.document.body : this.getRootOfAllElement();
    };
    /**
     * @private
     * @return {?}
     */
    NgGuideStepDirective.prototype.getRootOfAllElement = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var last = this.renderer.parentNode(this.elementRef.nativeElement);
        /** @type {?} */
        var res = null;
        while (last && last.localName !== this.rootElement) {
            res = last;
            last = this.renderer.parentNode(res);
        }
        if (last) {
            res = last;
        }
        return res;
    };
    NgGuideStepDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ngGuideStep]',
                },] }
    ];
    /** @nocollapse */
    NgGuideStepDirective.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: ElementRef },
        { type: ViewContainerRef },
        { type: Renderer2 },
        { type: Injector },
        { type: ComponentFactoryResolver },
        { type: NgGuideWalkLibService }
    ]; };
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
    return NgGuideStepDirective;
}());
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.overlay;
    /** @type {?} */
    NgGuideStepDirective.prototype.position;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype._step;
    /** @type {?} */
    NgGuideStepDirective.prototype.rootElement;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepContent;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepLocation;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepStyle;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepDisplayArrow;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepOverlay;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepFocusElement;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepStepStatus;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.componentRef;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.document;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.viewContainerRef;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.injector;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.resolver;
    /**
     * @type {?}
     * @private
     */
    NgGuideStepDirective.prototype.walkLibService;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-walk-lib.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * Generated from: public_api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: ng-guide-walk.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { GuideContentComponent, NgGuideStepDirective, NgGuideWalkLibComponent, NgGuideWalkLibModule, NgGuideWalkLibService };
//# sourceMappingURL=ng-guide-walk.js.map
