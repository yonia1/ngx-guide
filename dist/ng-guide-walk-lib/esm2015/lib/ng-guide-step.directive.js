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
        this.walkLibService.register();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.closeComponent();
        this.walkLibService.unregister();
    }
    /**
     * @return {?}
     */
    closeComponent() {
        if (!this.componentRef) {
            return;
        }
        this.componentRef.destroy();
        this.componentRef = null;
    }
    /**
     * @return {?}
     */
    createComponent() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFHWCx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUM5QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7QUFPOUYsTUFBTSxPQUFPLG9CQUFvQjs7Ozs7Ozs7O0lBbUIvQixZQUNVLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNuQixRQUFrQixFQUNsQixRQUFrQyxFQUNsQyxjQUFxQztRQUxyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQXZCL0MsYUFBUSxHQUFHLE9BQU8sQ0FBQztRQUVYLFVBQUssR0FBVyxDQUFDLENBQUM7UUFVSSx3QkFBbUIsR0FBaUIsUUFBUSxDQUFDO1FBQ2hELHFCQUFnQixHQUFxQyxJQUFJLENBQUM7UUFDbkQsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBQ3hDLDRCQUF1QixHQUFZLElBQUksQ0FBQztJ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aEMsd0NBQW1COztJQUVuQixxQ0FBMEI7O0lBUTFCLGtEQUF1Rjs7SUFFdkYsbURBQTJFOztJQUMzRSxnREFBcUY7O0lBQ3JGLHVEQUEwRTs7SUFDMUUsdURBQTBFOztJQUMxRSw0Q0FBMEQ7O0lBRXhELDBDQUE4Qjs7SUFDOUIsZ0RBQTBDOztJQUMxQyx3Q0FBMkI7O0lBQzNCLHdDQUEwQjs7SUFDMUIsd0NBQTBDOztJQUMxQyw4Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IHRvTnVtYmVyLCB1bnNpZ25lZE9uRGVzdHJveWVkIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEd1aWRlQ29udGVudENvbXBvbmVudCwgV2Fsa0xvY2F0aW9uIH0gZnJvbSAnLi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50JztcblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0d1aWRlU3RlcF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlU3RlcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwb3NpdGlvbiA9ICdiZWxvdyc7XG5cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwJykgc2V0IHN0ZXAoc3RlcE51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RlcCA9IHRvTnVtYmVyKHN0ZXBOdW1iZXIpO1xuICB9XG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBDb250ZW50JykgbmdHdWlkZVN0ZXBDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuXG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBMb2NhdGlvbicpIG5nR3VpZGVTdGVwTG9jYXRpb246IFdhbGtMb2NhdGlvbiA9ICdib3R0b20nO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwU3R5bGUnKSBuZ0d1aWRlU3RlcFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3cnKSBuZ0d1aWRlU3RlcERpc3BsYXlBcnJvdzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQnKSBuZ0d1aWRlU3RlcEZvY3VzRWxlbWVudDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8R3VpZGVDb250ZW50Q29tcG9uZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgd2Fsa0xpYlNlcnZpY2U6IE5nR3VpZGVXYWxrTGliU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UucmVnaXN0ZXIoKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQ29tcG9uZW50KCk7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS51bnJlZ2lzdGVyKCk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50UmVmKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IG51bGw7XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoKSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3VpZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZW5lcmF0ZU5nQ29udGVudCgpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBudWxsLCBjb250ZW50KTtcbiAgICB0aGlzLnNldElucHV0cygpO1xuICAgIHRoaXMuaGFuZGxlRm9jdXMoKTtcbiAgICB0aGlzLmhhbmRsZU92ZXJsYXkoKTtcbiAgfVxuXG4gIGdlbmVyYXRlTmdDb250ZW50KCkge1xuICAgIC8vIENvbnRlbnQgaXMgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLm5nR3VpZGVTdGVwQ29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgICAgcmV0dXJuIFtbZWxlbWVudF1dO1xuICAgIH1cbiAgICAvLyBDb250ZW50IGlzIFRlbXBsYXRlXG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBDb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWZUZW1wbGF0ZSA9IHRoaXMubmdHdWlkZVN0ZXBDb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyh7fSk7XG4gICAgICByZXR1cm4gW3ZpZXdSZWZUZW1wbGF0ZS5yb290Tm9kZXNdO1xuICAgIH1cblxuICAgIC8vIEVsc2UgaXQncyBhIGNvbXBvbmVudFxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICBjb25zdCB2aWV3UmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgcmV0dXJuIFtbdmlld1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV07XG4gIH1cbiAgcHJpdmF0ZSBzZXRJbnB1dHMoKSB7XG4gICAgY29uc3QgaW5zdGFuY2VSZWYgPSB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICBpbnN0YW5jZVJlZi5zdGVwID0gdGhpcy5zdGVwIGFzIG51bWJlcjtcbiAgICBpbnN0YW5jZVJlZi50YXJnZXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpbnN0YW5jZVJlZi5sb2NhdGlvbiA9IHRoaXMubmdHdWlkZVN0ZXBMb2NhdGlvbiB8fCAnYm90dG9tJztcbiAgICBpbnN0YW5jZVJlZi5kaXNwbGF5QXJyb3cgPSB0aGlzLm5nR3VpZGVTdGVwRGlzcGxheUFycm93O1xuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwU3R5bGUpIHtcbiAgICAgIGluc3RhbmNlUmVmLmN1c3RvbUNzcyA9IHRoaXMubmdHdWlkZVN0ZXBTdHlsZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpIHtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLmdldFN0ZXBPYnNlcnZhYmxlKDxudW1iZXI+dGhpcy5zdGVwKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHVuc2lnbmVkT25EZXN0cm95ZWQodGhpcykpKVxuICAgICAgLnN1YnNjcmliZSgod2Fsa0V2ZW50OiBXYWxrRXZlbnQpID0+IHdhbGtFdmVudC5ldmVudCA9PT0gJ29wZW4nID8gdGhpcy5jcmVhdGVDb21wb25lbnQoKSA6IHRoaXMuY2xvc2VDb21wb25lbnQoKSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU92ZXJsYXkoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJsYXknKTtcbiAgICAvLyB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVGb2N1cygpIHtcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcEZvY3VzRWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuXG5cbn1cbiJdfQ==