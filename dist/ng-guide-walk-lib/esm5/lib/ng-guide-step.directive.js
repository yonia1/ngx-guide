/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, TemplateRef, EventEmitter, ComponentFactoryResolver, Renderer2, Injector, Output } from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed, toBoolean } from './utils';
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
     * @return {?}
     */
    NgGuideStepDirective.prototype.handleOverlay = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (toBoolean(this.ngGuideStepOverlay)) {
            this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
            this.componentRef.onDestroy(function () {
                _this.renderer.removeClass(_this.elementRef.nativeElement, 'overlay');
            });
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
        ngGuideStepOverlay: [{ type: Input, args: ['ngGuideStepOverlay',] }],
        ngGuideStepFocusElement: [{ type: Input, args: ['ngGuideStepFocusElement',] }],
        ngGuideStepStepStatus: [{ type: Output, args: ['ngGuideStepStepStatus',] }]
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
    NgGuideStepDirective.prototype.ngGuideStepOverlay;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepFocusElement;
    /** @type {?} */
    NgGuideStepDirective.prototype.ngGuideStepStepStatus;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFFWCxZQUFZLEVBRVosd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixNQUFNLHlDQUF5QyxDQUFDO0FBSTlGO0lBd0JFLDhCQUNVLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNuQixRQUFrQixFQUNsQixRQUFrQyxFQUNsQyxjQUFxQztRQUxyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQXpCL0MsYUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNYLFVBQUssR0FBVyxDQUFDLENBQUM7UUFTSSx3QkFBbUIsR0FBaUIsUUFBUSxDQUFDO1FBQ2hELHFCQUFnQixHQUFxQyxJQUFJLENBQUM7UUFDbkQsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBQzdDLHVCQUFrQixHQUFxQixJQUFJ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bnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIEV2ZW50RW1pdHRlcixcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UgfSBmcm9tICcuL25nLWd1aWRlLXdhbGstbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgdG9OdW1iZXIsIHVuc2lnbmVkT25EZXN0cm95ZWQsIHRvQm9vbGVhbiB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgV2Fsa0V2ZW50IH0gZnJvbSAnLi9uZy1ndWlkZS50eXBlcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHdWlkZUNvbnRlbnRDb21wb25lbnQsIFdhbGtMb2NhdGlvbiB9IGZyb20gJy4vZ3VpZGUtY29udGVudC9ndWlkZS1jb250ZW50LmNvbXBvbmVudCc7XG5cbmV4cG9ydCB0eXBlIFN0ZXBTdGF0dXMgPSAnQmVmb3JlT3BlbicgfCAnT3BlbicgfCAnQmVmb3JlQ2xvc2UnIHwgJ0FmdGVyQ2xvc2UnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdHdWlkZVN0ZXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVN0ZXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcG9zaXRpb24gPSAnYmVsb3cnO1xuICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAxO1xuXG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXAnKSBzZXQgc3RlcChzdGVwTnVtYmVyOiBudW1iZXIgfCBzdHJpbmcpIHtcbiAgICB0aGlzLl9zdGVwID0gdG9OdW1iZXIoc3RlcE51bWJlcik7XG4gIH1cbiAgZ2V0IHN0ZXAoKTogbnVtYmVyIHwgc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBASW5wdXQoJ25nR3VpZGVTdGVwQ29udGVudCcpIG5nR3VpZGVTdGVwQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PjtcbiAgQElucHV0KCduZ0d1aWRlU3RlcExvY2F0aW9uJykgbmdHdWlkZVN0ZXBMb2NhdGlvbjogV2Fsa0xvY2F0aW9uID0gJ2JvdHRvbSc7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBTdHlsZScpIG5nR3VpZGVTdGVwU3R5bGU6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCduZ0d1aWRlU3RlcERpc3BsYXlBcnJvdycpIG5nR3VpZGVTdGVwRGlzcGxheUFycm93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCduZ0d1aWRlU3RlcE92ZXJsYXknKSBuZ0d1aWRlU3RlcE92ZXJsYXk6IGJvb2xlYW4gfCBzdHJpbmcgPSB0cnVlO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRm9jdXNFbGVtZW50JykgbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuXG4gIEBPdXRwdXQoJ25nR3VpZGVTdGVwU3RlcFN0YXR1cycpIG5nR3VpZGVTdGVwU3RlcFN0YXR1czogRXZlbnRFbWl0dGVyPFN0ZXBTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgY29tcG9uZW50UmVmOiBDb21wb25lbnRSZWY8R3VpZGVDb250ZW50Q29tcG9uZW50PjtcbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLFxuICAgIHByaXZhdGUgdmlld0NvbnRhaW5lclJlZjogVmlld0NvbnRhaW5lclJlZixcbiAgICBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSByZXNvbHZlcjogQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLFxuICAgIHByaXZhdGUgd2Fsa0xpYlNlcnZpY2U6IE5nR3VpZGVXYWxrTGliU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5zdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UucmVnaXN0ZXIodGhpcy5zdGVwIGFzIG51bWJlcik7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUNvbXBvbmVudCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UudW5yZWdpc3Rlcih0aGlzLnN0ZXAgYXMgbnVtYmVyKTtcbiAgfVxuICBwcml2YXRlIGNsb3NlQ29tcG9uZW50KCkge1xuICAgIGlmICghdGhpcy5jb21wb25lbnRSZWYpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnQmVmb3JlQ2xvc2UnKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ0FmdGVyQ2xvc2UnKTtcblxuICB9XG4gIHByaXZhdGUgZ2VuZXJhdGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnQmVmb3JlT3BlbicpO1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEd1aWRlQ29udGVudENvbXBvbmVudCk7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2VuZXJhdGVOZ0NvbnRlbnQoKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgMCwgbnVsbCwgY29udGVudCk7XG4gICAgdGhpcy5zZXRJbnB1dHMoKTtcbiAgICB0aGlzLmhhbmRsZUZvY3VzKCk7XG4gICAgdGhpcy5oYW5kbGVPdmVybGF5KCk7XG4gICAgdGhpcy5uZ0d1aWRlU3RlcFN0ZXBTdGF0dXMuZW1pdCgnT3BlbicpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoKSB7XG4gICAgdGhpcy5nZW5lcmF0ZUNvbXBvbmVudCgpO1xuICB9XG5cbiAgZ2VuZXJhdGVOZ0NvbnRlbnQoKSB7XG4gICAgLy8gQ29udGVudCBpcyBzdHJpbmdcbiAgICBpZiAodHlwZW9mIHRoaXMubmdHdWlkZVN0ZXBDb250ZW50ID09PSAnc3RyaW5nJykge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMucmVuZGVyZXIuY3JlYXRlVGV4dCh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCk7XG4gICAgICByZXR1cm4gW1tlbGVtZW50XV07XG4gICAgfVxuICAgIC8vIENvbnRlbnQgaXMgVGVtcGxhdGVcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQgaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZikge1xuICAgICAgY29uc3Qgdmlld1JlZlRlbXBsYXRlID0gdGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQuY3JlYXRlRW1iZWRkZWRWaWV3KHt9KTtcbiAgICAgIHJldHVybiBbdmlld1JlZlRlbXBsYXRlLnJvb3ROb2Rlc107XG4gICAgfVxuXG4gICAgLy8gRWxzZSBpdCdzIGEgY29tcG9uZW50XG4gICAgY29uc3QgZmFjdG9yeSA9IHRoaXMucmVzb2x2ZXIucmVzb2x2ZUNvbXBvbmVudEZhY3RvcnkodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgIGNvbnN0IHZpZXdSZWYgPSBmYWN0b3J5LmNyZWF0ZSh0aGlzLmluamVjdG9yKTtcbiAgICByZXR1cm4gW1t2aWV3UmVmLmxvY2F0aW9uLm5hdGl2ZUVsZW1lbnRdXTtcbiAgfVxuICBwcml2YXRlIHNldElucHV0cygpIHtcbiAgICBjb25zdCBpbnN0YW5jZVJlZiA9IHRoaXMuY29tcG9uZW50UmVmLmluc3RhbmNlO1xuICAgIGluc3RhbmNlUmVmLnN0ZXAgPSB0aGlzLnN0ZXAgYXMgbnVtYmVyO1xuICAgIGluc3RhbmNlUmVmLnRhcmdldCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICAgIGluc3RhbmNlUmVmLmxvY2F0aW9uID0gdGhpcy5uZ0d1aWRlU3RlcExvY2F0aW9uIHx8ICdib3R0b20nO1xuICAgIGluc3RhbmNlUmVmLmRpc3BsYXlBcnJvdyA9IHRoaXMubmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3c7XG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBTdHlsZSkge1xuICAgICAgaW5zdGFuY2VSZWYuY3VzdG9tQ3NzID0gdGhpcy5uZ0d1aWRlU3RlcFN0eWxlO1xuICAgIH1cbiAgfVxuICBwcml2YXRlIHN1YnNjcmliZVRvR3VpZGVSZXF1ZXN0KCkge1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UuZ2V0U3RlcE9ic2VydmFibGUoPG51bWJlcj50aGlzLnN0ZXApXG4gICAgICAucGlwZSh0YWtlVW50aWwodW5zaWduZWRPbkRlc3Ryb3llZCh0aGlzKSkpXG4gICAgICAuc3Vic2NyaWJlKCh3YWxrRXZlbnQ6IFdhbGtFdmVudCkgPT4gd2Fsa0V2ZW50LmV2ZW50ID09PSAnb3BlbicgPyB0aGlzLmNyZWF0ZUNvbXBvbmVudCgpIDogdGhpcy5jbG9zZUNvbXBvbmVudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgaGFuZGxlT3ZlcmxheSgpIHtcbiAgICBpZiAodG9Cb29sZWFuKHRoaXMubmdHdWlkZVN0ZXBPdmVybGF5KSkge1xuICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyh0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ292ZXJsYXknKTtcbiAgICAgIHRoaXMuY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBoYW5kbGVGb2N1cygpIHtcbiAgICBpZiAodG9Cb29sZWFuKHRoaXMubmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQpKSB7XG4gICAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cbiAgfVxuXG5cblxufVxuIl19