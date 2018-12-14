/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, TemplateRef, ComponentFactoryResolver, Renderer2, Injector } from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed } from './utils';
import { takeUntil } from 'rxjs/operators';
import { GuideContentComponent } from './guide-content/guide-content.component';
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
        this.walkLibService.register();
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.closeComponent();
        this.walkLibService.unregister();
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
        this.componentRef.destroy();
        this.componentRef = null;
    };
    /**
     * @return {?}
     */
    NgGuideStepDirective.prototype.createComponent = /**
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
export { NgGuideStepDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFHWCx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUM5QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7QUFJOUY7SUFzQkUsOEJBQ1UsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLFFBQW1CLEVBQ25CLFFBQWtCLEVBQ2xCLFFBQWtDLEVBQ2xDLGNBQXFDO1FBTHJDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBdkIvQyxhQUFRLEdBQUcsT0FBTyxDQUFDO1FBRVgsVUFBSyxHQUFXLENBQUMsQ0FBQztRQVVJLHdCQUFtQixHQUFpQixRQUFRLENBQUM7UUFDaEQscUJBQWdCLEdBQXFDLElBQUksQ0FBQztRQUNuRCw0QkFBdUIsR0FBWSxJQUFJLENBQUM7UUFDeEMsNEJBQXVCLEdBQVksSUFBSSxDQUFDO0lBUXZCLENBQUM7SUFuQnBELHNCQUEwQixz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QjttQ0FDM0IsS0FBSyxTQUFDLGtCQUFrQjswQ0FDeEIsS0FBSyxTQUFDLHlCQUF5QjswQ0FDL0IsS0FBSyxTQUFDLHlCQUF5Qjs7SUFnRmxDLDJCQUFDO0NBQUEsQUFwR0QsSUFvR0M7U0FqR1ksb0JBQW9COzs7SUFFL0Isd0NBQW1COztJQUVuQixxQ0FBMEI7O0lBUTFCLGtEQUF1Rjs7SUFFdkYsbURBQTJFOztJQUMzRSxnREFBcUY7O0lBQ3JGLHVEQUEwRTs7SUFDMUUsdURBQTBFOztJQUMxRSw0Q0FBMEQ7O0lBRXhELDBDQUE4Qjs7SUFDOUIsZ0RBQTBDOztJQUMxQyx3Q0FBMkI7O0lBQzNCLHdDQUEwQjs7SUFDMUIsd0NBQTBDOztJQUMxQyw4Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IHRvTnVtYmVyLCB1bnNpZ25lZE9uRGVzdHJveWVkIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEd1aWRlQ29udGVudENvbXBvbmVudCwgV2Fsa0xvY2F0aW9uIH0gZnJvbSAnLi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50JztcblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0d1aWRlU3RlcF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlU3RlcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwb3NpdGlvbiA9ICdiZWxvdyc7XG5cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwJykgc2V0IHN0ZXAoc3RlcE51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RlcCA9IHRvTnVtYmVyKHN0ZXBOdW1iZXIpO1xuICB9XG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBDb250ZW50JykgbmdHdWlkZVN0ZXBDb250ZW50OiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgVHlwZTxhbnk+O1xuXG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBMb2NhdGlvbicpIG5nR3VpZGVTdGVwTG9jYXRpb246IFdhbGtMb2NhdGlvbiA9ICdib3R0b20nO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwU3R5bGUnKSBuZ0d1aWRlU3RlcFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3cnKSBuZ0d1aWRlU3RlcERpc3BsYXlBcnJvdzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQnKSBuZ0d1aWRlU3RlcEZvY3VzRWxlbWVudDogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8R3VpZGVDb250ZW50Q29tcG9uZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgd2Fsa0xpYlNlcnZpY2U6IE5nR3VpZGVXYWxrTGliU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UucmVnaXN0ZXIoKTtcbiAgfVxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLmNsb3NlQ29tcG9uZW50KCk7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS51bnJlZ2lzdGVyKCk7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50UmVmKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY29tcG9uZW50UmVmLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IG51bGw7XG4gIH1cbiAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoKSB7XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkoR3VpZGVDb250ZW50Q29tcG9uZW50KTtcbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5nZW5lcmF0ZU5nQ29udGVudCgpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gdGhpcy52aWV3Q29udGFpbmVyUmVmLmNyZWF0ZUNvbXBvbmVudChmYWN0b3J5LCAwLCBudWxsLCBjb250ZW50KTtcbiAgICB0aGlzLnNldElucHV0cygpO1xuICAgIHRoaXMuaGFuZGxlRm9jdXMoKTtcbiAgICB0aGlzLmhhbmRsZU92ZXJsYXkoKTtcbiAgfVxuXG4gIGdlbmVyYXRlTmdDb250ZW50KCkge1xuICAgIC8vIENvbnRlbnQgaXMgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLm5nR3VpZGVTdGVwQ29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgICAgcmV0dXJuIFtbZWxlbWVudF1dO1xuICAgIH1cbiAgICAvLyBDb250ZW50IGlzIFRlbXBsYXRlXG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBDb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWZUZW1wbGF0ZSA9IHRoaXMubmdHdWlkZVN0ZXBDb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyh7fSk7XG4gICAgICByZXR1cm4gW3ZpZXdSZWZUZW1wbGF0ZS5yb290Tm9kZXNdO1xuICAgIH1cblxuICAgIC8vIEVsc2UgaXQncyBhIGNvbXBvbmVudFxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICBjb25zdCB2aWV3UmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgcmV0dXJuIFtbdmlld1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV07XG4gIH1cbiAgcHJpdmF0ZSBzZXRJbnB1dHMoKSB7XG4gICAgY29uc3QgaW5zdGFuY2VSZWYgPSB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICBpbnN0YW5jZVJlZi5zdGVwID0gdGhpcy5zdGVwIGFzIG51bWJlcjtcbiAgICBpbnN0YW5jZVJlZi50YXJnZXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpbnN0YW5jZVJlZi5sb2NhdGlvbiA9IHRoaXMubmdHdWlkZVN0ZXBMb2NhdGlvbiB8fCAnYm90dG9tJztcbiAgICBpbnN0YW5jZVJlZi5kaXNwbGF5QXJyb3cgPSB0aGlzLm5nR3VpZGVTdGVwRGlzcGxheUFycm93O1xuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwU3R5bGUpIHtcbiAgICAgIGluc3RhbmNlUmVmLmN1c3RvbUNzcyA9IHRoaXMubmdHdWlkZVN0ZXBTdHlsZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpIHtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLmdldFN0ZXBPYnNlcnZhYmxlKDxudW1iZXI+dGhpcy5zdGVwKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHVuc2lnbmVkT25EZXN0cm95ZWQodGhpcykpKVxuICAgICAgLnN1YnNjcmliZSgod2Fsa0V2ZW50OiBXYWxrRXZlbnQpID0+IHdhbGtFdmVudC5ldmVudCA9PT0gJ29wZW4nID8gdGhpcy5jcmVhdGVDb21wb25lbnQoKSA6IHRoaXMuY2xvc2VDb21wb25lbnQoKSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU92ZXJsYXkoKSB7XG4gICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJsYXknKTtcbiAgICAvLyB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvdmVybGF5Jyk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYub25EZXN0cm95KCgpID0+IHtcbiAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgfSk7XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVGb2N1cygpIHtcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcEZvY3VzRWxlbWVudCkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuXG5cbn1cbiJdfQ==