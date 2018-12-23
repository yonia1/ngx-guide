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
export class NgGuideStepDirective {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFFWCxZQUFZLEVBRVosd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxFQUFFLE1BQU0sRUFDakYsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxTQUFTLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbkUsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxxQkFBcUIsRUFBZ0IsTUFBTSx5Q0FBeUMsQ0FBQztBQUM5RixPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFNM0MsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7OztJQXVCL0IsWUFDNEIsUUFBYSxFQUMvQixVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsUUFBbUIsRUFDbkIsUUFBa0IsRUFDbEIsUUFBa0MsRUFDbEMsY0FBcUM7UUFObkIsYUFBUSxHQUFSLFFBQVEsQ0FBSztRQUMvQixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQTdCdkMsWUFBTyxHQUFHLElBQUksQ0FBQztRQUN2QixhQUFRLEdBQUcs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LENBQUM7OztZQTlKRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGVBQWU7YUFDMUI7Ozs7NENBeUJJLE1BQU0sU0FBQyxRQUFRO1lBM0NsQixVQUFVO1lBRFYsZ0JBQWdCO1lBT1UsU0FBUztZQUFFLFFBQVE7WUFBN0Msd0JBQXdCO1lBRWpCLHFCQUFxQjs7OzBCQWdCM0IsS0FBSzttQkFFTCxLQUFLLFNBQUMsYUFBYTtpQ0FNbkIsS0FBSyxTQUFDLG9CQUFvQjtrQ0FDMUIsS0FBSyxTQUFDLHFCQUFxQjsrQkFDM0IsS0FBSyxTQUFDLGtCQUFrQjtzQ0FDeEIsS0FBSyxTQUFDLHlCQUF5QjtpQ0FDL0IsS0FBSyxTQUFDLG9CQUFvQjtzQ0FDMUIsS0FBSyxTQUFDLHlCQUF5QjtvQ0FFL0IsTUFBTSxTQUFDLHVCQUF1Qjs7OztJQW5CL0IsdUNBQXVCOztJQUN2Qix3Q0FBbUI7O0lBQ25CLHFDQUEwQjs7SUFFMUIsMkNBQThCOztJQVE5QixrREFBdUY7O0lBQ3ZGLG1EQUEyRTs7SUFDM0UsZ0RBQXFGOztJQUNyRix1REFBMEU7O0lBQzFFLGtEQUF5RTs7SUFDekUsdURBQTBFOztJQUUxRSxxREFBc0c7O0lBRXRHLDRDQUEwRDs7SUFFeEQsd0NBQXVDOztJQUN2QywwQ0FBOEI7O0lBQzlCLGdEQUEwQzs7SUFDMUMsd0NBQTJCOztJQUMzQix3Q0FBMEI7O0lBQzFCLHdDQUEwQzs7SUFDMUMsOENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIEluamVjdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliU2VydmljZSB9IGZyb20gJy4vbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZSc7XG5pbXBvcnQgeyB0b051bWJlciwgdW5zaWduZWRPbkRlc3Ryb3llZCwgdG9Cb29sZWFuIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEd1aWRlQ29udGVudENvbXBvbmVudCwgV2Fsa0xvY2F0aW9uIH0gZnJvbSAnLi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50JztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmV4cG9ydCB0eXBlIFN0ZXBTdGF0dXMgPSAnQmVmb3JlT3BlbicgfCAnT3BlbicgfCAnQmVmb3JlQ2xvc2UnIHwgJ0FmdGVyQ2xvc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdHdWlkZVN0ZXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVN0ZXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgb3ZlcmxheSA9IG51bGw7XG4gIHBvc2l0aW9uID0gJ2JlbG93JztcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoKSByb290RWxlbWVudCA9ICdib2R5JztcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwJykgc2V0IHN0ZXAoc3RlcE51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RlcCA9IHRvTnVtYmVyKHN0ZXBOdW1iZXIpO1xuICB9XG4gIGdldCBzdGVwKCk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgQElucHV0KCduZ0d1aWRlU3RlcENvbnRlbnQnKSBuZ0d1aWRlU3RlcENvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBMb2NhdGlvbicpIG5nR3VpZGVTdGVwTG9jYXRpb246IFdhbGtMb2NhdGlvbiA9ICdib3R0b20nO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwU3R5bGUnKSBuZ0d1aWRlU3RlcFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3cnKSBuZ0d1aWRlU3RlcERpc3BsYXlBcnJvdzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBPdmVybGF5JykgbmdHdWlkZVN0ZXBPdmVybGF5OiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcbiAgQElucHV0KCduZ0d1aWRlU3RlcEZvY3VzRWxlbWVudCcpIG5nR3VpZGVTdGVwRm9jdXNFbGVtZW50OiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCduZ0d1aWRlU3RlcFN0ZXBTdGF0dXMnKSBuZ0d1aWRlU3RlcFN0ZXBTdGF0dXM6IEV2ZW50RW1pdHRlcjxTdGVwU3RhdHVzPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEd1aWRlQ29udGVudENvbXBvbmVudD47XG4gIGNvbnN0cnVjdG9yKFxuICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IGFueSxcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB3YWxrTGliU2VydmljZTogTmdHdWlkZVdhbGtMaWJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvR3VpZGVSZXF1ZXN0KCk7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS5yZWdpc3Rlcih0aGlzLnN0ZXAgYXMgbnVtYmVyKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQ29tcG9uZW50KCk7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS51bnJlZ2lzdGVyKHRoaXMuc3RlcCBhcyBudW1iZXIpO1xuICB9XG4gIHByaXZhdGUgY2xvc2VDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudFJlZikgeyByZXR1cm47IH1cbiAgICB0aGlzLm5nR3VpZGVTdGVwU3RlcFN0YXR1cy5lbWl0KCdCZWZvcmVDbG9zZScpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnQWZ0ZXJDbG9zZScpO1xuXG4gIH1cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLm5nR3VpZGVTdGVwU3RlcFN0YXR1cy5lbWl0KCdCZWZvcmVPcGVuJyk7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3VpZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZW5lcmF0ZU5nQ29udGVudCgpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBudWxsLCBjb250ZW50KTtcbiAgICB0aGlzLnNldElucHV0cygpO1xuICAgIHRoaXMuaGFuZGxlRm9jdXMoKTtcbiAgICB0aGlzLmhhbmRsZU92ZXJsYXkoKTtcbiAgICB0aGlzLm5nR3VpZGVTdGVwU3RlcFN0YXR1cy5lbWl0KCdPcGVuJyk7XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZUNvbXBvbmVudCgpIHtcbiAgICB0aGlzLmdlbmVyYXRlQ29tcG9uZW50KCk7XG4gIH1cblxuICBnZW5lcmF0ZU5nQ29udGVudCgpIHtcbiAgICAvLyBDb250ZW50IGlzIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICAgIHJldHVybiBbW2VsZW1lbnRdXTtcbiAgICB9XG4gICAgLy8gQ29udGVudCBpcyBUZW1wbGF0ZVxuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb25zdCB2aWV3UmVmVGVtcGxhdGUgPSB0aGlzLm5nR3VpZGVTdGVwQ29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoe30pO1xuICAgICAgcmV0dXJuIFt2aWV3UmVmVGVtcGxhdGUucm9vdE5vZGVzXTtcbiAgICB9XG5cbiAgICAvLyBFbHNlIGl0J3MgYSBjb21wb25lbnRcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCk7XG4gICAgY29uc3Qgdmlld1JlZiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgIHJldHVybiBbW3ZpZXdSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dO1xuICB9XG4gIHByaXZhdGUgc2V0SW5wdXRzKCkge1xuICAgIGNvbnN0IGluc3RhbmNlUmVmID0gdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgaW5zdGFuY2VSZWYuc3RlcCA9IHRoaXMuc3RlcCBhcyBudW1iZXI7XG4gICAgaW5zdGFuY2VSZWYudGFyZ2V0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaW5zdGFuY2VSZWYubG9jYXRpb24gPSB0aGlzLm5nR3VpZGVTdGVwTG9jYXRpb24gfHwgJ2JvdHRvbSc7XG4gICAgaW5zdGFuY2VSZWYuZGlzcGxheUFycm93ID0gdGhpcy5uZ0d1aWRlU3RlcERpc3BsYXlBcnJvdztcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcFN0eWxlKSB7XG4gICAgICBpbnN0YW5jZVJlZi5jdXN0b21Dc3MgPSB0aGlzLm5nR3VpZGVTdGVwU3R5bGU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKSB7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS5nZXRTdGVwT2JzZXJ2YWJsZSg8bnVtYmVyPnRoaXMuc3RlcClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh1bnNpZ25lZE9uRGVzdHJveWVkKHRoaXMpKSlcbiAgICAgIC5zdWJzY3JpYmUoKHdhbGtFdmVudDogV2Fsa0V2ZW50KSA9PiB3YWxrRXZlbnQuZXZlbnQgPT09ICdvcGVuJyA/IHRoaXMuY3JlYXRlQ29tcG9uZW50KCkgOiB0aGlzLmNsb3NlQ29tcG9uZW50KCkpO1xuICB9XG4gIHByaXZhdGUgZ2V0T2Zmc2V0KGVsZW1lbnQpIHtcbiAgICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCBkb2NFbCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgICBjb25zdCBzY3JvbGxUb3AgPSB3aW5kb3cucGFnZVlPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsVG9wIHx8IGJvZHkuc2Nyb2xsVG9wO1xuICAgIGNvbnN0IHNjcm9sbExlZnQgPSB3aW5kb3cucGFnZVhPZmZzZXQgfHwgZG9jRWwuc2Nyb2xsTGVmdCB8fCBib2R5LnNjcm9sbExlZnQ7XG4gICAgY29uc3QgeCA9IGVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHRvcDogeC50b3AgKyBzY3JvbGxUb3AsXG4gICAgICB3aWR0aDogeC53aWR0aCxcbiAgICAgIGhlaWdodDogeC5oZWlnaHQsXG4gICAgICBsZWZ0OiB4LmxlZnQgKyBzY3JvbGxMZWZ0XG4gICAgfTtcbiAgfVxuICBwcml2YXRlIGhhbmRsZU92ZXJsYXkoKSB7XG4gICAgaWYgKHRvQm9vbGVhbih0aGlzLm5nR3VpZGVTdGVwT3ZlcmxheSkpIHtcbiAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAvLyB0aGlzLm92ZXJsYXkuY2xhc3NOYW1lID0gJ292ZXJsYXknO1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLm92ZXJsYXksICdvdmVybGF5Jyk7XG4gICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZ2V0Um9vdEVsZW1lbnQoKSwgdGhpcy5vdmVybGF5KTtcbiAgICAgIGNvbnN0IHRhcmdldEVsbSA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgICAgLy8gaWYgKCF0YXJnZXRFbG0udGFnTmFtZSB8fCB0YXJnZXRFbG0udGFnTmFtZS50b0xvd2VyQ2FzZSgpID09PSAnYm9keScpIHtcbiAgICAgIC8vICAgY29uc3Qgc3R5bGVUZXh0ID0gJ3RvcDogMDtib3R0b206IDA7IGxlZnQ6IDA7cmlnaHQ6IDA7cG9zaXRpb246IGZpeGVkOyc7XG4gICAgICAvLyAgIHRoaXMub3ZlcmxheS5zdHlsZS5jc3NUZXh0ID0gc3R5bGVUZXh0O1xuICAgICAgLy8gfSBlbHNlIHtcbiAgICAgIC8vICAgLy8gc2V0IG92ZXJsYXkgbGF5ZXIgcG9zaXRpb25cbiAgICAgIC8vICAgY29uc3QgZWxlbWVudFBvc2l0aW9uID0gdGhpcy5nZXRPZmZzZXQodGFyZ2V0RWxtKTtcbiAgICAgIC8vICAgaWYgKGVsZW1lbnRQb3NpdGlvbikge1xuICAgICAgLy8gICAgIGNvbnN0IHN0eWxlVGV4dCA9ICd3aWR0aDogJyArIGVsZW1lbnRQb3NpdGlvbi53aWR0aCArICdweDsgaGVpZ2h0OicgXG4gICAgICAvLyAgICAgKyBlbGVtZW50UG9zaXRpb24uaGVpZ2h0ICsgJ3B4OyB0b3A6JyArIGVsZW1lbnRQb3NpdGlvbi50b3AgKyAncHg7bGVmdDogJyArIGVsZW1lbnRQb3NpdGlvbi5sZWZ0ICsgJ3B4Oyc7XG4gICAgICAvLyAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmNzc1RleHQgPSBzdHlsZVRleHQ7XG4gICAgICAvLyAgICB9XG4gICAgICAvLyB9XG4gICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnaGVscGVyTGF5ZXInKTtcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5nZXRSb290RWxlbWVudCgpLCB0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdoZWxwZXJMYXllcicpO1xuICAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmxheScpO1xuICAgICAgLy8gdGhpcy5jb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgIC8vICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmxheScpO1xuICAgICAgLy8gfSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgaGFuZGxlRm9jdXMoKSB7XG4gICAgaWYgKHRvQm9vbGVhbih0aGlzLm5nR3VpZGVTdGVwRm9jdXNFbGVtZW50KSkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBnZXRSb290RWxlbWVudCgpIHtcbiAgICByZXR1cm4gdGhpcy5kb2N1bWVudCA/IHRoaXMuZG9jdW1lbnQuYm9keSA6IHRoaXMuZ2V0Um9vdE9mQWxsRWxlbWVudCgpO1xuICB9XG4gIHByaXZhdGUgZ2V0Um9vdE9mQWxsRWxlbWVudCgpIHtcbiAgICBsZXQgbGFzdCA9IHRoaXMucmVuZGVyZXIucGFyZW50Tm9kZSh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCk7XG4gICAgbGV0IHJlcyA9IG51bGw7XG4gICAgd2hpbGUgKGxhc3QgJiYgbGFzdC5sb2NhbE5hbWUgIT09IHRoaXMucm9vdEVsZW1lbnQpe1xuICAgICAgcmVzID0gbGFzdDtcbiAgICAgIGxhc3QgPSB0aGlzLnJlbmRlcmVyLnBhcmVudE5vZGUocmVzKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG5cbn1cbiJdfQ==