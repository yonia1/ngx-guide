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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9uZy1ndWlkZS1zdGVwLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUNMLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBR1gsd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFDOUMsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUV4RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixNQUFNLHlDQUF5QyxDQUFDO0FBSTlGO0lBc0JFLDhCQUNVLFVBQXNCLEVBQ3RCLGdCQUFrQyxFQUNsQyxRQUFtQixFQUNuQixRQUFrQixFQUNsQixRQUFrQyxFQUNsQyxjQUFxQztRQUxyQyxlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsYUFBUSxHQUFSLFFBQVEsQ0FBVztRQUNuQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGFBQVEsR0FBUixRQUFRLENBQTBCO1FBQ2xDLG1CQUFjLEdBQWQsY0FBYyxDQUF1QjtRQXZCL0MsYUFBUSxHQUFHLE9BQU8sQ0FBQztRQUVYLFVBQUssR0FBVyxDQUFDLENBQUM7UUFVSSx3QkFBbUIsR0FBaUIsUUFBUSxDQUFDO1FBQ2hELHFCQUFnQixHQUFxQyxJQUFJLENBQUM7UUFDbkQsNEJBQXVCLEdBQVksSUFBSSxDQUFDO1FBQ3hDLDRCQUF1QixHQUFZLElBQUksQ0FBQztJQVF2QixDQUFDO0lBbkJwRCxzQkFB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QkFBcUI7bUNBQzNCLEtBQUssU0FBQyxrQkFBa0I7MENBQ3hCLEtBQUssU0FBQyx5QkFBeUI7MENBQy9CLEtBQUssU0FBQyx5QkFBeUI7O0lBaUZsQywyQkFBQztDQUFBLEFBckdELElBcUdDO1NBbEdZLG9CQUFvQjs7O0lBRS9CLHdDQUFtQjs7SUFFbkIscUNBQTBCOztJQVExQixrREFBdUY7O0lBRXZGLG1EQUEyRTs7SUFDM0UsZ0RBQXFGOztJQUNyRix1REFBMEU7O0lBQzFFLHVEQUEwRTs7SUFDMUUsNENBQTBEOztJQUV4RCwwQ0FBOEI7O0lBQzlCLGdEQUEwQzs7SUFDMUMsd0NBQTJCOztJQUMzQix3Q0FBMEI7O0lBQzFCLHdDQUEwQzs7SUFDMUMsOENBQTZDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgVGVtcGxhdGVSZWYsXG4gIFR5cGUsXG4gIENvbXBvbmVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBSZW5kZXJlcjIsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliU2VydmljZSB9IGZyb20gJy4vbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZSc7XG5pbXBvcnQgeyB0b051bWJlciwgdW5zaWduZWRPbkRlc3Ryb3llZCB9IGZyb20gJy4vdXRpbHMnO1xuaW1wb3J0IHsgV2Fsa0V2ZW50IH0gZnJvbSAnLi9uZy1ndWlkZS50eXBlcyc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBHdWlkZUNvbnRlbnRDb21wb25lbnQsIFdhbGtMb2NhdGlvbiB9IGZyb20gJy4vZ3VpZGUtY29udGVudC9ndWlkZS1jb250ZW50LmNvbXBvbmVudCc7XG5cblxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbbmdHdWlkZVN0ZXBdJyxcbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVN0ZXBEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgcG9zaXRpb24gPSAnYmVsb3cnO1xuXG4gIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDE7XG5cbiAgQElucHV0KCduZ0d1aWRlU3RlcCcpIHNldCBzdGVwKHN0ZXBOdW1iZXI6IG51bWJlciB8IHN0cmluZykge1xuICAgIHRoaXMuX3N0ZXAgPSB0b051bWJlcihzdGVwTnVtYmVyKTtcbiAgfVxuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuICBASW5wdXQoJ25nR3VpZGVTdGVwQ29udGVudCcpIG5nR3VpZGVTdGVwQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PjtcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwTG9jYXRpb24nKSBuZ0d1aWRlU3RlcExvY2F0aW9uOiBXYWxrTG9jYXRpb24gPSAnYm90dG9tJztcbiAgQElucHV0KCduZ0d1aWRlU3RlcFN0eWxlJykgbmdHdWlkZVN0ZXBTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRGlzcGxheUFycm93JykgbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRm9jdXNFbGVtZW50JykgbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEd1aWRlQ29udGVudENvbXBvbmVudD47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHdhbGtMaWJTZXJ2aWNlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnJlZ2lzdGVyKCk7XG4gIH1cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5jbG9zZUNvbXBvbmVudCgpO1xuICAgIHRoaXMud2Fsa0xpYlNlcnZpY2UudW5yZWdpc3RlcigpO1xuICB9XG4gIHByaXZhdGUgY2xvc2VDb21wb25lbnQoKSB7XG4gICAgaWYgKCF0aGlzLmNvbXBvbmVudFJlZikgeyByZXR1cm47IH1cbiAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSBudWxsO1xuICB9XG4gIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50KCkge1xuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KEd1aWRlQ29udGVudENvbXBvbmVudCk7XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuZ2VuZXJhdGVOZ0NvbnRlbnQoKTtcbiAgICB0aGlzLmNvbXBvbmVudFJlZiA9IHRoaXMudmlld0NvbnRhaW5lclJlZi5jcmVhdGVDb21wb25lbnQoZmFjdG9yeSwgMCwgbnVsbCwgY29udGVudCk7XG4gICAgdGhpcy5zZXRJbnB1dHMoKTtcbiAgICBcbiAgICB0aGlzLmhhbmRsZUZvY3VzKCk7XG4gICAgdGhpcy5oYW5kbGVPdmVybGF5KCk7XG4gIH1cblxuICBnZW5lcmF0ZU5nQ29udGVudCgpIHtcbiAgICAvLyBDb250ZW50IGlzIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICAgIHJldHVybiBbW2VsZW1lbnRdXTtcbiAgICB9XG4gICAgLy8gQ29udGVudCBpcyBUZW1wbGF0ZVxuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb25zdCB2aWV3UmVmVGVtcGxhdGUgPSB0aGlzLm5nR3VpZGVTdGVwQ29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoe30pO1xuICAgICAgcmV0dXJuIFt2aWV3UmVmVGVtcGxhdGUucm9vdE5vZGVzXTtcbiAgICB9XG5cbiAgICAvLyBFbHNlIGl0J3MgYSBjb21wb25lbnRcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCk7XG4gICAgY29uc3Qgdmlld1JlZiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgIHJldHVybiBbW3ZpZXdSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dO1xuICB9XG4gIHByaXZhdGUgc2V0SW5wdXRzKCkge1xuICAgIGNvbnN0IGluc3RhbmNlUmVmID0gdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgaW5zdGFuY2VSZWYuc3RlcCA9IHRoaXMuc3RlcCBhcyBudW1iZXI7XG4gICAgaW5zdGFuY2VSZWYudGFyZ2V0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaW5zdGFuY2VSZWYubG9jYXRpb24gPSB0aGlzLm5nR3VpZGVTdGVwTG9jYXRpb24gfHwgJ2JvdHRvbSc7XG4gICAgaW5zdGFuY2VSZWYuZGlzcGxheUFycm93ID0gdGhpcy5uZ0d1aWRlU3RlcERpc3BsYXlBcnJvdztcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcFN0eWxlKSB7XG4gICAgICBpbnN0YW5jZVJlZi5jdXN0b21Dc3MgPSB0aGlzLm5nR3VpZGVTdGVwU3R5bGU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKSB7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS5nZXRTdGVwT2JzZXJ2YWJsZSg8bnVtYmVyPnRoaXMuc3RlcClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh1bnNpZ25lZE9uRGVzdHJveWVkKHRoaXMpKSlcbiAgICAgIC5zdWJzY3JpYmUoKHdhbGtFdmVudDogV2Fsa0V2ZW50KSA9PiB3YWxrRXZlbnQuZXZlbnQgPT09ICdvcGVuJyA/IHRoaXMuY3JlYXRlQ29tcG9uZW50KCkgOiB0aGlzLmNsb3NlQ29tcG9uZW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVPdmVybGF5KCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgLy8gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmxheScpO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cblxuXG59XG4iXX0=