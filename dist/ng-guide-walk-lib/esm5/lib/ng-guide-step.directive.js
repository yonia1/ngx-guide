/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
        this.rootElement = 'body';
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
     * @return {?}
     */
    NgGuideStepDirective.prototype.closeComponent = /**
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
     * @return {?}
     */
    NgGuideStepDirective.prototype.generateComponent = /**
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
     * @return {?}
     */
    NgGuideStepDirective.prototype.createComponent = /**
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
     * @param {?} element
     * @return {?}
     */
    NgGuideStepDirective.prototype.getOffset = /**
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
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleOverlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (toBoolean(this.ngGuideStepOverlay)) {
            this.overlay = this.renderer.createElement('div');
            // this.overlay.className = 'overlay';
            this.renderer.addClass(this.overlay, 'overlay');
            this.renderer.appendChild(this.getRootElement(), this.overlay);
            /** @type {?} */
            var targetElm = this.elementRef.nativeElement;
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
            this.componentRef.onDestroy(function () {
                _this.renderer.removeChild(_this.getRootElement(), _this.overlay);
                _this.renderer.removeClass(_this.elementRef.nativeElement, 'helperLayer');
            });
            // this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
            // this.componentRef.onDestroy(() => {
            //  this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
            // });
        }
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleFocus = /**
     * @return {?}
     */
    function () {
        if (toBoolean(this.ngGuideStepFocusElement)) {
            this.elementRef.nativeElement.focus();
        }
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.getRootElement = /**
     * @return {?}
     */
    function () {
        return this.document ? this.document.body : this.getRootOfAllElement();
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.getRootOfAllElement = /**
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
    /** @type {?} */
    NgGuideStepDirective.prototype.overlay;
    /** @type {?} */
    NgGuideStepDirective.prototype.position;
    /** @type {?} */
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
    /** @type {?} */
    NgGuideStepDirective.prototype.componentRef;
    /** @type {?} */
    NgGuideStepDirective.prototype.document;
    /** @type {?} */
    NgGuideStepDirective.prototype.elementRef;
    /** @type {?} */
    NgGuideStepDirective.prototype.viewContainerRef;
    /** @type {?} */
    NgGuideStepDirective.prototype.renderer;
    /** @type {?} */
    NgGuideStepDirective.prototype.injector;
    /** @type {?} */
    NgGuideStepDirective.prototype.resolver;
    /** @type {?} */
    NgGuideStepDirective.prototype.walkLibService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFFWCxZQUFZLEVBRVosd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxFQUFFLE1BQU0sRUFDakYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBZ0IsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFHM0M7SUEwQkUsOEJBQzRCLFFBQWEsRUFDL0IsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLFFBQW1CLEVBQ25CLFFBQWtCLEVBQ2xCLFFBQWtDLEVBQ2xDLGNBQXFDO1FBTm5CLGFBQVEsR0FBUixRQUFRLENBQUs7UUFDL0IsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUE3QnZDLFlBQU8sR0FBRyxJQUFJLENBQUM7UUFDdkIsYUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNYLFVBQUssR0FBVyxD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LEdBQUcsSUFBSSxDQUFDO1lBQ1gsSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3RDO1FBQ0QsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDOztnQkE5SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxlQUFlO2lCQUMxQjs7OztnREF5QkksTUFBTSxTQUFDLFFBQVE7Z0JBM0NsQixVQUFVO2dCQURWLGdCQUFnQjtnQkFPVSxTQUFTO2dCQUFFLFFBQVE7Z0JBQTdDLHdCQUF3QjtnQkFFakIscUJBQXFCOzs7OEJBZ0IzQixLQUFLO3VCQUVMLEtBQUssU0FBQyxhQUFhO3FDQU1uQixLQUFLLFNBQUMsb0JBQW9CO3NDQUMxQixLQUFLLFNBQUMscUJBQXFCO21DQUMzQixLQUFLLFNBQUMsa0JBQWtCOzBDQUN4QixLQUFLLFNBQUMseUJBQXlCO3FDQUMvQixLQUFLLFNBQUMsb0JBQW9COzBDQUMxQixLQUFLLFNBQUMseUJBQXlCO3dDQUUvQixNQUFNLFNBQUMsdUJBQXVCOztJQTBJakMsMkJBQUM7Q0FBQSxBQWpLRCxJQWlLQztTQTlKWSxvQkFBb0I7OztJQUMvQix1Q0FBdUI7O0lBQ3ZCLHdDQUFtQjs7SUFDbkIscUNBQTBCOztJQUUxQiwyQ0FBOEI7O0lBUTlCLGtEQUF1Rjs7SUFDdkYsbURBQTJFOztJQUMzRSxnREFBcUY7O0lBQ3JGLHVEQUEwRTs7SUFDMUUsa0RBQXlFOztJQUN6RSx1REFBMEU7O0lBRTFFLHFEQUFzRzs7SUFFdEcsNENBQTBEOztJQUV4RCx3Q0FBdUM7O0lBQ3ZDLDBDQUE4Qjs7SUFDOUIsZ0RBQTBDOztJQUMxQyx3Q0FBMkI7O0lBQzNCLHdDQUEwQjs7SUFDMUIsd0NBQTBDOztJQUMxQyw4Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBDb21wb25lbnRSZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlciwgUmVuZGVyZXIyLCBJbmplY3RvciwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgSW5qZWN0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IHRvTnVtYmVyLCB1bnNpZ25lZE9uRGVzdHJveWVkLCB0b0Jvb2xlYW4gfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFdhbGtFdmVudCB9IGZyb20gJy4vbmctZ3VpZGUudHlwZXMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR3VpZGVDb250ZW50Q29tcG9uZW50LCBXYWxrTG9jYXRpb24gfSBmcm9tICcuL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuZXhwb3J0IHR5cGUgU3RlcFN0YXR1cyA9ICdCZWZvcmVPcGVuJyB8ICdPcGVuJyB8ICdCZWZvcmVDbG9zZScgfCAnQWZ0ZXJDbG9zZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0d1aWRlU3RlcF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlU3RlcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBvdmVybGF5ID0gbnVsbDtcbiAgcG9zaXRpb24gPSAnYmVsb3cnO1xuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gIEBJbnB1dCgpIHJvb3RFbGVtZW50ID0gJ2JvZHknO1xuXG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXAnKSBzZXQgc3RlcChzdGVwTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdGVwID0gdG9OdW1iZXIoc3RlcE51bWJlcik7XG4gIH1cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBASW5wdXQoJ25nR3VpZGVTdGVwQ29udGVudCcpIG5nR3VpZGVTdGVwQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PjtcbiAgQElucHV0KCduZ0d1aWRlU3RlcExvY2F0aW9uJykgbmdHdWlkZVN0ZXBMb2NhdGlvbjogV2Fsa0xvY2F0aW9uID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBTdHlsZScpIG5nR3VpZGVTdGVwU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCduZ0d1aWRlU3RlcERpc3BsYXlBcnJvdycpIG5nR3VpZGVTdGVwRGlzcGxheUFycm93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCduZ0d1aWRlU3RlcE92ZXJsYXknKSBuZ0d1aWRlU3RlcE92ZXJsYXk6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRm9jdXNFbGVtZW50JykgbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoJ25nR3VpZGVTdGVwU3RlcFN0YXR1cycpIG5nR3VpZGVTdGVwU3RlcFN0YXR1czogRXZlbnRFbWl0dGVyPFN0ZXBTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8R3VpZGVDb250ZW50Q29tcG9uZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogYW55LFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHdhbGtMaWJTZXJ2aWNlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMuc3RlcCBhcyBudW1iZXIpO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VDb21wb25lbnQoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5zdGVwIGFzIG51bWJlcik7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50UmVmKSB7IHJldHVybjsgfVxuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ0JlZm9yZUNsb3NlJyk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcbiAgICB0aGlzLm5nR3VpZGVTdGVwU3RlcFN0YXR1cy5lbWl0KCdBZnRlckNsb3NlJyk7XG5cbiAgfVxuICBwcml2YXRlIGdlbmVyYXRlQ29tcG9uZW50KCkge1xuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ0JlZm9yZU9wZW4nKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShHdWlkZUNvbnRlbnRDb21wb25lbnQpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdlbmVyYXRlTmdDb250ZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIG51bGwsIGNvbnRlbnQpO1xuICAgIHRoaXMuc2V0SW5wdXRzKCk7XG4gICAgdGhpcy5oYW5kbGVGb2N1cygpO1xuICAgIHRoaXMuaGFuZGxlT3ZlcmxheSgpO1xuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ09wZW4nKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50KCkge1xuICAgIHRoaXMuZ2VuZXJhdGVDb21wb25lbnQoKTtcbiAgfVxuXG4gIGdlbmVyYXRlTmdDb250ZW50KCkge1xuICAgIC8vIENvbnRlbnQgaXMgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLm5nR3VpZGVTdGVwQ29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgICAgcmV0dXJuIFtbZWxlbWVudF1dO1xuICAgIH1cbiAgICAvLyBDb250ZW50IGlzIFRlbXBsYXRlXG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBDb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWZUZW1wbGF0ZSA9IHRoaXMubmdHdWlkZVN0ZXBDb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyh7fSk7XG4gICAgICByZXR1cm4gW3ZpZXdSZWZUZW1wbGF0ZS5yb290Tm9kZXNdO1xuICAgIH1cblxuICAgIC8vIEVsc2UgaXQncyBhIGNvbXBvbmVudFxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICBjb25zdCB2aWV3UmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgcmV0dXJuIFtbdmlld1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV07XG4gIH1cbiAgcHJpdmF0ZSBzZXRJbnB1dHMoKSB7XG4gICAgY29uc3QgaW5zdGFuY2VSZWYgPSB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICBpbnN0YW5jZVJlZi5zdGVwID0gdGhpcy5zdGVwIGFzIG51bWJlcjtcbiAgICBpbnN0YW5jZVJlZi50YXJnZXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpbnN0YW5jZVJlZi5sb2NhdGlvbiA9IHRoaXMubmdHdWlkZVN0ZXBMb2NhdGlvbiB8fCAnYm90dG9tJztcbiAgICBpbnN0YW5jZVJlZi5kaXNwbGF5QXJyb3cgPSB0aGlzLm5nR3VpZGVTdGVwRGlzcGxheUFycm93O1xuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwU3R5bGUpIHtcbiAgICAgIGluc3RhbmNlUmVmLmN1c3RvbUNzcyA9IHRoaXMubmdHdWlkZVN0ZXBTdHlsZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpIHtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLmdldFN0ZXBPYnNlcnZhYmxlKDxudW1iZXI+dGhpcy5zdGVwKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHVuc2lnbmVkT25EZXN0cm95ZWQodGhpcykpKVxuICAgICAgLnN1YnNjcmliZSgod2Fsa0V2ZW50OiBXYWxrRXZlbnQpID0+IHdhbGtFdmVudC5ldmVudCA9PT0gJ29wZW4nID8gdGhpcy5jcmVhdGVDb21wb25lbnQoKSA6IHRoaXMuY2xvc2VDb21wb25lbnQoKSk7XG4gIH1cbiAgcHJpdmF0ZSBnZXRPZmZzZXQoZWxlbWVudCkge1xuICAgIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IGRvY0VsID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICAgIGNvbnN0IHNjcm9sbFRvcCA9IHdpbmRvdy5wYWdlWU9mZnNldCB8fCBkb2NFbC5zY3JvbGxUb3AgfHwgYm9keS5zY3JvbGxUb3A7XG4gICAgY29uc3Qgc2Nyb2xsTGVmdCA9IHdpbmRvdy5wYWdlWE9mZnNldCB8fCBkb2NFbC5zY3JvbGxMZWZ0IHx8IGJvZHkuc2Nyb2xsTGVmdDtcbiAgICBjb25zdCB4ID0gZWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiB4LnRvcCArIHNjcm9sbFRvcCxcbiAgICAgIHdpZHRoOiB4LndpZHRoLFxuICAgICAgaGVpZ2h0OiB4LmhlaWdodCxcbiAgICAgIGxlZnQ6IHgubGVmdCArIHNjcm9sbExlZnRcbiAgICB9O1xuICB9XG4gIHByaXZhdGUgaGFuZGxlT3ZlcmxheSgpIHtcbiAgICBpZiAodG9Cb29sZWFuKHRoaXMubmdHdWlkZVN0ZXBPdmVybGF5KSkge1xuICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIC8vIHRoaXMub3ZlcmxheS5jbGFzc05hbWUgPSAnb3ZlcmxheSc7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMub3ZlcmxheSwgJ292ZXJsYXknKTtcbiAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLCB0aGlzLm92ZXJsYXkpO1xuICAgICAgY29uc3QgdGFyZ2V0RWxtID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAvLyBpZiAoIXRhcmdldEVsbS50YWdOYW1lIHx8IHRhcmdldEVsbS50YWdOYW1lLnRvTG93ZXJDYXNlKCkgPT09ICdib2R5Jykge1xuICAgICAgLy8gICBjb25zdCBzdHlsZVRleHQgPSAndG9wOiAwO2JvdHRvbTogMDsgbGVmdDogMDtyaWdodDogMDtwb3NpdGlvbjogZml4ZWQ7JztcbiAgICAgIC8vICAgdGhpcy5vdmVybGF5LnN0eWxlLmNzc1RleHQgPSBzdHlsZVRleHQ7XG4gICAgICAvLyB9IGVsc2Uge1xuICAgICAgLy8gICAvLyBzZXQgb3ZlcmxheSBsYXllciBwb3NpdGlvblxuICAgICAgLy8gICBjb25zdCBlbGVtZW50UG9zaXRpb24gPSB0aGlzLmdldE9mZnNldCh0YXJnZXRFbG0pO1xuICAgICAgLy8gICBpZiAoZWxlbWVudFBvc2l0aW9uKSB7XG4gICAgICAvLyAgICAgY29uc3Qgc3R5bGVUZXh0ID0gJ3dpZHRoOiAnICsgZWxlbWVudFBvc2l0aW9uLndpZHRoICsgJ3B4OyBoZWlnaHQ6JyBcbiAgICAgIC8vICAgICArIGVsZW1lbnRQb3NpdGlvbi5oZWlnaHQgKyAncHg7IHRvcDonICsgZWxlbWVudFBvc2l0aW9uLnRvcCArICdweDtsZWZ0OiAnICsgZWxlbWVudFBvc2l0aW9uLmxlZnQgKyAncHg7JztcbiAgICAgIC8vICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuY3NzVGV4dCA9IHN0eWxlVGV4dDtcbiAgICAgIC8vICAgIH1cbiAgICAgIC8vIH1cbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdoZWxwZXJMYXllcicpO1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmdldFJvb3RFbGVtZW50KCksIHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2hlbHBlckxheWVyJyk7XG4gICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgICAvLyB0aGlzLmNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgLy8gIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgICAvLyB9KTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVGb2N1cygpIHtcbiAgICBpZiAodG9Cb29sZWFuKHRoaXMubmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQpKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGdldFJvb3RFbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLmRvY3VtZW50ID8gdGhpcy5kb2N1bWVudC5ib2R5IDogdGhpcy5nZXRSb290T2ZBbGxFbGVtZW50KCk7XG4gIH1cbiAgcHJpdmF0ZSBnZXRSb290T2ZBbGxFbGVtZW50KCkge1xuICAgIGxldCBsYXN0ID0gdGhpcy5yZW5kZXJlci5wYXJlbnROb2RlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50KTtcbiAgICBsZXQgcmVzID0gbnVsbDtcbiAgICB3aGlsZSAobGFzdCAmJiBsYXN0LmxvY2FsTmFtZSAhPT0gdGhpcy5yb290RWxlbWVudCl7XG4gICAgICByZXMgPSBsYXN0O1xuICAgICAgbGFzdCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZShyZXMpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzO1xuICB9XG5cblxufVxuIl19