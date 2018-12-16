/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, TemplateRef, ComponentFactoryResolver, Renderer2, Injector } from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed } from './utils';
import { takeUntil } from 'rxjs/operators';
import { GuideContentComponent } from './guide-content/guide-content.component';
export class NgGuideStepDirective {
    /**
     * @param {?} elementRef
     * @param {?} viewContainerRef
     * @param {?} renderer
     * @param {?} injector
     * @param {?} resolver
     * @param {?} walkLibService
     */
    constructor(elementRef, viewContainerRef, renderer, injector, resolver, walkLibService) {
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
        if (this.afterStepRun) {
            this.afterStepRun(() => {
                this.componentRef.destroy();
                this.componentRef = null;
            }, () => this.walkLibService.stopGuide());
        }
        else {
            this.componentRef.destroy();
            this.componentRef = null;
        }
    }
    /**
     * @return {?}
     */
    generateComponent() {
        /** @type {?} */
        const factory = this.resolver.resolveComponentFactory(GuideContentComponent);
        /** @type {?} */
        const content = this.generateNgContent();
        this.componentRef = this.viewContainerRef.createComponent(factory, 0, null, content);
        this.setInputs();
        this.handleFocus();
        this.handleOverlay();
    }
    /**
     * @return {?}
     */
    createComponent() {
        if (this.afterStepRun) {
            this.afterStepRun(() => this.generateComponent(), () => this.walkLibService.stopGuide());
        }
        else {
            this.generateComponent();
        }
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
     * @return {?}
     */
    handleOverlay() {
        this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
        // this.elementRef.nativeElement.classList.add('overlay');
        this.componentRef.onDestroy(() => {
            this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
        });
    }
    /**
     * @return {?}
     */
    handleFocus() {
        if (this.ngGuideStepFocusElement) {
            this.elementRef.nativeElement.focus();
        }
    }
}
NgGuideStepDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ngGuideStep]',
            },] }
];
/** @nocollapse */
NgGuideStepDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: ViewContainerRef },
    { type: Renderer2 },
    { type: Injector },
    { type: ComponentFactoryResolver },
    { type: NgGuideWalkLibService }
];
NgGuideStepDirective.propDecorators = {
    step: [{ type: Input, args: ['ngGuideStep',] }],
    ngGuideStepContent: [{ type: Input, args: ['ngGuideStepContent',] }],
    ngGuideStepLocation: [{ type: Input, args: ['ngGuideStepLocation',] }],
    ngGuideStepStyle: [{ type: Input, args: ['ngGuideStepStyle',] }],
    ngGuideStepDisplayArrow: [{ type: Input, args: ['ngGuideStepDisplayArrow',] }],
    ngGuideStepFocusElement: [{ type: Input, args: ['ngGuideStepFocusElement',] }]
};
if (false) {
    /** @type {?} */
    NgGuideStepDirective.prototype.position;
    /** @type {?} */
    NgGuideStepDirective.prototype._step;
    /** @type {?} */
    NgGuideStepDirective.prototype.beforeStepRun;
    /** @type {?} */
    NgGuideStepDirective.prototype.afterStepRun;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepContent;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepLocation;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepStyle;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepDisplayArrow;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepFocusElement;
    /** @type {?} */
    NgGuideStepDirective.prototype.componentRef;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFHWCx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUM5QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7QUFPOUYsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7O0lBc0IvQixZQUNVLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNuQixRQUFrQixFQUNsQixRQUFrQyxFQUNsQyxjQUFxQztRQUxyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQTFCL0MsYUFBUSxHQUFHLE9BQU8sQ0FBQztRQUVYLFVBQUssR0FBVyxDQUFDLENBQUM7UUFhSSx3QkFBbUIsR0FBaUIsUUFBUSxDQUFDO1FBQ2hELHFCQUFnQixHQUFxQyxJQUFJLENBQUM7UUFDbkQsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBQ3hDLDRCQUF1QixHQUFZLElBQUksQ0FBQztJ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LFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7OztJQUNPLFdBQVc7UUFDakIsSUFBSSxJQUFJLENBQUMsdUJBQXVCLEVBQUU7WUFDaEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7WUFySEYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxlQUFlO2FBQzFCOzs7O1lBakJDLFVBQVU7WUFEVixnQkFBZ0I7WUFNVSxTQUFTO1lBQUUsUUFBUTtZQUE3Qyx3QkFBd0I7WUFFakIscUJBQXFCOzs7bUJBaUIzQixLQUFLLFNBQUMsYUFBYTtpQ0FTbkIsS0FBSyxTQUFDLG9CQUFvQjtrQ0FFMUIsS0FBSyxTQUFDLHFCQUFxQjsrQkFDM0IsS0FBSyxTQUFDLGtCQUFrQjtzQ0FDeEIsS0FBSyxTQUFDLHlCQUF5QjtzQ0FDL0IsS0FBSyxTQUFDLHlCQUF5Qjs7OztJQWxCaEMsd0NBQW1COztJQUVuQixxQ0FBMEI7O0lBUzFCLDZDQUF3Rjs7SUFDeEYsNENBQXVGOztJQUN2RixrREFBdUY7O0lBRXZGLG1EQUEyRTs7SUFDM0UsZ0RBQXFGOztJQUNyRix1REFBMEU7O0lBQzFFLHVEQUEwRTs7SUFDMUUsNENBQTBEOztJQUV4RCwwQ0FBOEI7O0lBQzlCLGdEQUEwQzs7SUFDMUMsd0NBQTJCOztJQUMzQix3Q0FBMEI7O0lBQzFCLHdDQUEwQzs7SUFDMUMsOENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIENvbXBvbmVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBSZW5kZXJlcjIsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliU2VydmljZSB9IGZyb20gJy4vbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZSc7XG5pbXBvcnQgeyB0b051bWJlciwgdW5zaWduZWRPbkRlc3Ryb3llZCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgV2Fsa0V2ZW50IH0gZnJvbSAnLi9uZy1ndWlkZS50eXBlcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHdWlkZUNvbnRlbnRDb21wb25lbnQsIFdhbGtMb2NhdGlvbiB9IGZyb20gJy4vZ3VpZGUtY29udGVudC9ndWlkZS1jb250ZW50LmNvbXBvbmVudCc7XG5cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdHdWlkZVN0ZXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVN0ZXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcG9zaXRpb24gPSAnYmVsb3cnO1xuXG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgQElucHV0KCduZ0d1aWRlU3RlcCcpIHNldCBzdGVwKHN0ZXBOdW1iZXI6IG51bWJlciB8IHN0cmluZykge1xuICAgIHRoaXMuX3N0ZXAgPSB0b051bWJlcihzdGVwTnVtYmVyKTtcbiAgfVxuICBnZXQgc3RlcCgpOiBudW1iZXIgfCBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cbiAgYmVmb3JlU3RlcFJ1bjogKG5leHQ6ICgpID0+IG51bGwgfCB2b2lkIHwgYW55LCBjYW5jZWw6ICgpID0+IG51bGwgfCB2b2lkIHwgYW55KSA9PiBudWxsO1xuICBhZnRlclN0ZXBSdW46IChuZXh0OiAoKSA9PiBudWxsIHwgdm9pZCB8IGFueSwgY2FuY2VsOiAoKSA9PiBudWxsIHwgdm9pZCB8IGFueSkgPT4gbnVsbDtcbiAgQElucHV0KCduZ0d1aWRlU3RlcENvbnRlbnQnKSBuZ0d1aWRlU3RlcENvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG5cbiAgQElucHV0KCduZ0d1aWRlU3RlcExvY2F0aW9uJykgbmdHdWlkZVN0ZXBMb2NhdGlvbjogV2Fsa0xvY2F0aW9uID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBTdHlsZScpIG5nR3VpZGVTdGVwU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCduZ0d1aWRlU3RlcERpc3BsYXlBcnJvdycpIG5nR3VpZGVTdGVwRGlzcGxheUFycm93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCduZ0d1aWRlU3RlcEZvY3VzRWxlbWVudCcpIG5nR3VpZGVTdGVwRm9jdXNFbGVtZW50OiBib29sZWFuID0gdHJ1ZTtcbiAgcHJpdmF0ZSBjb21wb25lbnRSZWY6IENvbXBvbmVudFJlZjxHdWlkZUNvbnRlbnRDb21wb25lbnQ+O1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSB2aWV3Q29udGFpbmVyUmVmOiBWaWV3Q29udGFpbmVyUmVmLFxuICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGluamVjdG9yOiBJbmplY3RvcixcbiAgICBwcml2YXRlIHJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSB3YWxrTGliU2VydmljZTogTmdHdWlkZVdhbGtMaWJTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN1YnNjcmliZVRvR3VpZGVSZXF1ZXN0KCk7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS5yZWdpc3Rlcih0aGlzLnN0ZXAgYXMgbnVtYmVyKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQ29tcG9uZW50KCk7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS51bnJlZ2lzdGVyKHRoaXMuc3RlcCBhcyBudW1iZXIpO1xuICB9XG4gIHByaXZhdGUgY2xvc2VDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudFJlZikgeyByZXR1cm47IH1cbiAgICBpZiAodGhpcy5hZnRlclN0ZXBSdW4pIHtcbiAgICAgIHRoaXMuYWZ0ZXJTdGVwUnVuKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgICB9LCAoKSA9PiB0aGlzLndhbGtMaWJTZXJ2aWNlLnN0b3BHdWlkZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuICAgIH1cblxuICB9XG4gIHByaXZhdGUgZ2VuZXJhdGVDb21wb25lbnQoKSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3VpZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZW5lcmF0ZU5nQ29udGVudCgpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBudWxsLCBjb250ZW50KTtcbiAgICB0aGlzLnNldElucHV0cygpO1xuICAgIHRoaXMuaGFuZGxlRm9jdXMoKTtcbiAgICB0aGlzLmhhbmRsZU92ZXJsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50KCkge1xuICAgIGlmICh0aGlzLmFmdGVyU3RlcFJ1bikge1xuICAgICAgdGhpcy5hZnRlclN0ZXBSdW4oKCkgPT4gdGhpcy5nZW5lcmF0ZUNvbXBvbmVudCgpLFxuICAgICAgICAoKSA9PiB0aGlzLndhbGtMaWJTZXJ2aWNlLnN0b3BHdWlkZSgpKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5nZW5lcmF0ZUNvbXBvbmVudCgpO1xuICAgIH1cblxuICB9XG5cbiAgZ2VuZXJhdGVOZ0NvbnRlbnQoKSB7XG4gICAgLy8gQ29udGVudCBpcyBzdHJpbmdcbiAgICBpZiAodHlwZW9mIHRoaXMubmdHdWlkZVN0ZXBDb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCk7XG4gICAgICByZXR1cm4gW1tlbGVtZW50XV07XG4gICAgfVxuICAgIC8vIENvbnRlbnQgaXMgVGVtcGxhdGVcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgY29uc3Qgdmlld1JlZlRlbXBsYXRlID0gdGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KHt9KTtcbiAgICAgIHJldHVybiBbdmlld1JlZlRlbXBsYXRlLnJvb3ROb2Rlc107XG4gICAgfVxuXG4gICAgLy8gRWxzZSBpdCdzIGEgY29tcG9uZW50XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgIGNvbnN0IHZpZXdSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICByZXR1cm4gW1t2aWV3UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXTtcbiAgfVxuICBwcml2YXRlIHNldElucHV0cygpIHtcbiAgICBjb25zdCBpbnN0YW5jZVJlZiA9IHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIGluc3RhbmNlUmVmLnN0ZXAgPSB0aGlzLnN0ZXAgYXMgbnVtYmVyO1xuICAgIGluc3RhbmNlUmVmLnRhcmdldCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGluc3RhbmNlUmVmLmxvY2F0aW9uID0gdGhpcy5uZ0d1aWRlU3RlcExvY2F0aW9uIHx8ICdib3R0b20nO1xuICAgIGluc3RhbmNlUmVmLmRpc3BsYXlBcnJvdyA9IHRoaXMubmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3c7XG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBTdHlsZSkge1xuICAgICAgaW5zdGFuY2VSZWYuY3VzdG9tQ3NzID0gdGhpcy5uZ0d1aWRlU3RlcFN0eWxlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvR3VpZGVSZXF1ZXN0KCkge1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UuZ2V0U3RlcE9ic2VydmFibGUoPG51bWJlcj50aGlzLnN0ZXApXG4gICAgICAucGlwZSh0YWtlVW50aWwodW5zaWduZWRPbkRlc3Ryb3llZCh0aGlzKSkpXG4gICAgICAuc3Vic2NyaWJlKCh3YWxrRXZlbnQ6IFdhbGtFdmVudCkgPT4gd2Fsa0V2ZW50LmV2ZW50ID09PSAnb3BlbicgPyB0aGlzLmNyZWF0ZUNvbXBvbmVudCgpIDogdGhpcy5jbG9zZUNvbXBvbmVudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlT3ZlcmxheSgpIHtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmxheScpO1xuICAgIC8vIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ292ZXJsYXknKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJsYXknKTtcbiAgICB9KTtcbiAgfVxuICBwcml2YXRlIGhhbmRsZUZvY3VzKCkge1xuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwRm9jdXNFbGVtZW50KSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG5cblxufVxuIl19