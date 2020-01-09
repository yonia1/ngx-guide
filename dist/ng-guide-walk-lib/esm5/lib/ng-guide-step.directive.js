/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-step.directive.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, TemplateRef, EventEmitter, ComponentFactoryResolver, Renderer2, Injector, Output, Inject } from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed, toBoolean } from './utils';
import { takeUntil } from 'rxjs/operators';
import { GuideContentComponent } from './guide-content/guide-content.component';
import { DOCUMENT } from '@angular/common';
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
export { NgGuideStepDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBRVgsWUFBWSxFQUVaLHdCQUF3QixFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQXFCLE1BQU0sRUFBRSxNQUFNLEVBQ2pGLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ3BFLE9BQU8sRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRW5FLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7QUFDOUYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBRzNDO0lBMEJFLDhCQUM0QixRQUFhLEVBQy9CLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNuQixRQUFrQixFQUNsQixRQUFrQyxFQUNsQyxjQUFxQztRQU5uQixhQUFRLEdBQVIsUUFBUSxDQUFLO1FBQy9CLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBN0J2QyxZQUFPLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDWCxVQUFLLEdBQVcs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SUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLElBQUksRUFBRTtZQUNSLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDWjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQzs7Z0JBNUpGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZUFBZTtpQkFDMUI7Ozs7Z0RBeUJJLE1BQU0sU0FBQyxRQUFRO2dCQTNDbEIsVUFBVTtnQkFEVixnQkFBZ0I7Z0JBT1UsU0FBUztnQkFBRSxRQUFRO2dCQUE3Qyx3QkFBd0I7Z0JBRWpCLHFCQUFxQjs7OzhCQWdCM0IsS0FBSzt1QkFFTCxLQUFLLFNBQUMsYUFBYTtxQ0FNbkIsS0FBSyxTQUFDLG9CQUFvQjtzQ0FDMUIsS0FBSyxTQUFDLHFCQUFxQjttQ0FDM0IsS0FBSyxTQUFDLGtCQUFrQjswQ0FDeEIsS0FBSyxTQUFDLHlCQUF5QjtxQ0FDL0IsS0FBSyxTQUFDLG9CQUFvQjswQ0FDMUIsS0FBSyxTQUFDLHlCQUF5Qjt3Q0FFL0IsTUFBTSxTQUFDLHVCQUF1Qjs7SUF3SWpDLDJCQUFDO0NBQUEsQUEvSkQsSUErSkM7U0E1Slksb0JBQW9COzs7Ozs7SUFDL0IsdUNBQXVCOztJQUN2Qix3Q0FBbUI7Ozs7O0lBQ25CLHFDQUEwQjs7SUFFMUIsMkNBQWtDOztJQVFsQyxrREFBdUY7O0lBQ3ZGLG1EQUEyRTs7SUFDM0UsZ0RBQXFGOztJQUNyRix1REFBMEU7O0lBQzFFLGtEQUF5RTs7SUFDekUsdURBQTBFOztJQUUxRSxxREFBc0c7Ozs7O0lBRXRHLDRDQUEwRDs7Ozs7SUFFeEQsd0NBQXVDOzs7OztJQUN2QywwQ0FBOEI7Ozs7O0lBQzlCLGdEQUEwQzs7Ozs7SUFDMUMsd0NBQTJCOzs7OztJQUMzQix3Q0FBMEI7Ozs7O0lBQzFCLHdDQUEwQzs7Ozs7SUFDMUMsOENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliU2VydmljZSB9IGZyb20gJy4vbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZSc7XG5pbXBvcnQgeyB0b051bWJlciwgdW5zaWduZWRPbkRlc3Ryb3llZCwgdG9Cb29sZWFuIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEd1aWRlQ29udGVudENvbXBvbmVudCwgV2Fsa0xvY2F0aW9uIH0gZnJvbSAnLi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmV4cG9ydCB0eXBlIFN0ZXBTdGF0dXMgPSAnQmVmb3JlT3BlbicgfCAnT3BlbicgfCAnQmVmb3JlQ2xvc2UnIHwgJ0FmdGVyQ2xvc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdHdWlkZVN0ZXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVN0ZXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgb3ZlcmxheSA9IG51bGw7XG4gIHBvc2l0aW9uID0gJ2JlbG93JztcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoKSByb290RWxlbWVudCA9ICdhcHAtcm9vdCc7XG5cbiAgQElucHV0KCduZ0d1aWRlU3RlcCcpIHNldCBzdGVwKHN0ZXBOdW1iZXI6IG51bWJlciB8IHN0cmluZykge1xuICAgIHRoaXMuX3N0ZXAgPSB0b051bWJlcihzdGVwTnVtYmVyKTtcbiAgfVxuICBnZXQgc3RlcCgpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBDb250ZW50JykgbmdHdWlkZVN0ZXBDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuICBASW5wdXQoJ25nR3VpZGVTdGVwTG9jYXRpb24nKSBuZ0d1aWRlU3RlcExvY2F0aW9uOiBXYWxrTG9jYXRpb24gPSAnYm90dG9tJztcbiAgQElucHV0KCduZ0d1aWRlU3RlcFN0eWxlJykgbmdHdWlkZVN0ZXBTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRGlzcGxheUFycm93JykgbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwT3ZlcmxheScpIG5nR3VpZGVTdGVwT3ZlcmxheTogYm9vbGVhbiB8IHN0cmluZyA9IHRydWU7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQnKSBuZ0d1aWRlU3RlcEZvY3VzRWxlbWVudDogYm9vbGVhbiA9IHRydWU7XG5cbiAgQE91dHB1dCgnbmdHdWlkZVN0ZXBTdGVwU3RhdHVzJykgbmdHdWlkZVN0ZXBTdGVwU3RhdHVzOiBFdmVudEVtaXR0ZXI8U3RlcFN0YXR1cz4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxHdWlkZUNvbnRlbnRDb21wb25lbnQ+O1xuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBhbnksXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgd2Fsa0xpYlNlcnZpY2U6IE5nR3VpZGVXYWxrTGliU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UucmVnaXN0ZXIodGhpcy5zdGVwIGFzIG51bWJlcik7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUNvbXBvbmVudCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLnN0ZXAgYXMgbnVtYmVyKTtcbiAgfVxuICBwcml2YXRlIGNsb3NlQ29tcG9uZW50KCkge1xuICAgIGlmICghdGhpcy5jb21wb25lbnRSZWYpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnQmVmb3JlQ2xvc2UnKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ0FmdGVyQ2xvc2UnKTtcblxuICB9XG4gIHByaXZhdGUgZ2VuZXJhdGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnQmVmb3JlT3BlbicpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEd1aWRlQ29udGVudENvbXBvbmVudCk7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2VuZXJhdGVOZ0NvbnRlbnQoKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgMCwgbnVsbCwgY29udGVudCk7XG4gICAgdGhpcy5zZXRJbnB1dHMoKTtcbiAgICB0aGlzLmhhbmRsZUZvY3VzKCk7XG4gICAgdGhpcy5oYW5kbGVPdmVybGF5KCk7XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnT3BlbicpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5nZW5lcmF0ZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgZ2VuZXJhdGVOZ0NvbnRlbnQoKSB7XG4gICAgLy8gQ29udGVudCBpcyBzdHJpbmdcbiAgICBpZiAodHlwZW9mIHRoaXMubmdHdWlkZVN0ZXBDb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCk7XG4gICAgICByZXR1cm4gW1tlbGVtZW50XV07XG4gICAgfVxuICAgIC8vIENvbnRlbnQgaXMgVGVtcGxhdGVcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgY29uc3Qgdmlld1JlZlRlbXBsYXRlID0gdGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KHt9KTtcbiAgICAgIHJldHVybiBbdmlld1JlZlRlbXBsYXRlLnJvb3ROb2Rlc107XG4gICAgfVxuXG4gICAgLy8gRWxzZSBpdCdzIGEgY29tcG9uZW50XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgIGNvbnN0IHZpZXdSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICByZXR1cm4gW1t2aWV3UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXTtcbiAgfVxuICBwcml2YXRlIHNldElucHV0cygpIHtcbiAgICBjb25zdCBpbnN0YW5jZVJlZiA9IHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIGluc3RhbmNlUmVmLnN0ZXAgPSB0aGlzLnN0ZXAgYXMgbnVtYmVyO1xuICAgIGluc3RhbmNlUmVmLnRhcmdldCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGluc3RhbmNlUmVmLmxvY2F0aW9uID0gdGhpcy5uZ0d1aWRlU3RlcExvY2F0aW9uIHx8ICdib3R0b20nO1xuICAgIGluc3RhbmNlUmVmLmRpc3BsYXlBcnJvdyA9IHRoaXMubmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3c7XG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBTdHlsZSkge1xuICAgICAgaW5zdGFuY2VSZWYuY3VzdG9tQ3NzID0gdGhpcy5uZ0d1aWRlU3RlcFN0eWxlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvR3VpZGVSZXF1ZXN0KCkge1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UuZ2V0U3RlcE9ic2VydmFibGUoPG51bWJlcj50aGlzLnN0ZXApXG4gICAgICAucGlwZSh0YWtlVW50aWwodW5zaWduZWRPbkRlc3Ryb3llZCh0aGlzKSkpXG4gICAgICAuc3Vic2NyaWJlKCh3YWxrRXZlbnQ6IFdhbGtFdmVudCkgPT4gd2Fsa0V2ZW50LmV2ZW50ID09PSAnb3BlbicgPyB0aGlzLmNyZWF0ZUNvbXBvbmVudCgpIDogdGhpcy5jbG9zZUNvbXBvbmVudCgpKTtcbiAgfVxuICBwcml2YXRlIGdldE9mZnNldChlbGVtZW50KSB7XG4gICAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gICAgY29uc3QgZG9jRWwgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gICAgY29uc3Qgc2Nyb2xsVG9wID0gd2luZG93LnBhZ2VZT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbFRvcCB8fCBib2R5LnNjcm9sbFRvcDtcbiAgICBjb25zdCBzY3JvbGxMZWZ0ID0gd2luZG93LnBhZ2VYT2Zmc2V0IHx8IGRvY0VsLnNjcm9sbExlZnQgfHwgYm9keS5zY3JvbGxMZWZ0O1xuICAgIGNvbnN0IHggPSBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB0b3A6IHgudG9wICsgc2Nyb2xsVG9wLFxuICAgICAgd2lkdGg6IHgud2lkdGgsXG4gICAgICBoZWlnaHQ6IHguaGVpZ2h0LFxuICAgICAgbGVmdDogeC5sZWZ0ICsgc2Nyb2xsTGVmdFxuICAgIH07XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVPdmVybGF5KCkge1xuICAgIGlmICh0b0Jvb2xlYW4odGhpcy5uZ0d1aWRlU3RlcE92ZXJsYXkpKSB7XG4gICAgICB0aGlzLm92ZXJsYXkgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgLy8gdGhpcy5vdmVybGF5LmNsYXNzTmFtZSA9ICdvdmVybGF5JztcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5vdmVybGF5LCAnb3ZlcmxheScpO1xuICAgICAgdGhpcy50cnlBZGRPdmVybGF5KCk7XG4gICAgICBjb25zdCB0YXJnZXRFbG0gPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICAgIFxuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0YXJnZXRFbG0sICdoZWxwZXJMYXllcicpO1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmdldFJvb3RFbGVtZW50KCksIHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlbHBlckxheWVyJyk7XG4gICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgICAvLyB0aGlzLmNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgLy8gIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgICAvLyB9KTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSB0cnlBZGRPdmVybGF5KCkge1xuICAgIHRyeSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwgdGhpcy5vdmVybGF5KTtcbiAgICB9IGNhdGNoIChlKSB7fVxuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVGb2N1cygpIHtcbiAgICBpZiAodG9Cb29sZWFuKHRoaXMubmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQpKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGdldFJvb3RFbGVtZW50KCkge1xuICAgIHJldHVybiAhdGhpcy5kb2N1bWVudCA/IHRoaXMuZG9jdW1lbnQuYm9keSA6IHRoaXMuZ2V0Um9vdE9mQWxsRWxlbWVudCgpO1xuICB9XG4gIHByaXZhdGUgZ2V0Um9vdE9mQWxsRWxlbWVudCgpIHtcbiAgICBsZXQgbGFzdCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgbGV0IHJlcyA9IG51bGw7XG4gICAgd2hpbGUgKGxhc3QgJiYgbGFzdC5sb2NhbE5hbWUgIT09IHRoaXMucm9vdEVsZW1lbnQpe1xuICAgICAgcmVzID0gbGFzdDtcbiAgICAgIGxhc3QgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUocmVzKTtcbiAgICB9XG4gICAgaWYgKGxhc3QpIHtcbiAgICAgIHJlcyA9IGxhc3Q7XG4gICAgfVxuICAgIHJldHVybiByZXM7XG4gIH1cblxuXG59XG4iXX0=