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
export { NgGuideStepDirective };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFHWCx3QkFBd0IsRUFBRSxTQUFTLEVBQUUsUUFBUSxFQUM5QyxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sU0FBUyxDQUFDO0FBRXhELE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUscUJBQXFCLEVBQWdCLE1BQU0seUNBQXlDLENBQUM7QUFJOUY7SUF5QkUsOEJBQ1UsVUFBc0IsRUFDdEIsZ0JBQWtDLEVBQ2xDLFFBQW1CLEVBQ25CLFFBQWtCLEVBQ2xCLFFBQWtDLEVBQ2xDLGNBQXFDO1FBTHJDLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUNsQyxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQ25CLGFBQVEsR0FBUixRQUFRLENBQVU7UUFDbEIsYUFBUSxHQUFSLFFBQVEsQ0FBMEI7UUFDbEMsbUJBQWMsR0FBZCxjQUFjLENBQXVCO1FBMUIvQyxhQUFRLEdBQUcsT0FBTyxDQUFDO1FBRVgsVUFBSyxHQUFXLENBQUMsQ0FBQztRQWFJLHdCQUFtQixHQUFpQixRQUFRLENBQUM7UUFDaEQscUJBQWdCLEdBQXFDLElBQUksQ0FBQztRQUNuRCw0QkFBdUIsR0FBWSxJQUFJLENBQUM7UUFDeEMsNEJBQXVCLEdBQVksSUFBSSxDQUFDO0lBUXZCLENBQUM7SUF0QnBELHNCQUEwQixz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Q0FBNkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBUZW1wbGF0ZVJlZixcbiAgVHlwZSxcbiAgQ29tcG9uZW50UmVmLFxuICBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIFJlbmRlcmVyMiwgSW5qZWN0b3IsIE9uRGVzdHJveSwgT25Jbml0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IHRvTnVtYmVyLCB1bnNpZ25lZE9uRGVzdHJveWVkIH0gZnJvbSAnLi91dGlscyc7XG5pbXBvcnQgeyBXYWxrRXZlbnQgfSBmcm9tICcuL25nLWd1aWRlLnR5cGVzJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEd1aWRlQ29udGVudENvbXBvbmVudCwgV2Fsa0xvY2F0aW9uIH0gZnJvbSAnLi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50JztcblxuXG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1tuZ0d1aWRlU3RlcF0nLFxufSlcbmV4cG9ydCBjbGFzcyBOZ0d1aWRlU3RlcERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICBwb3NpdGlvbiA9ICdiZWxvdyc7XG5cbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwJykgc2V0IHN0ZXAoc3RlcE51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RlcCA9IHRvTnVtYmVyKHN0ZXBOdW1iZXIpO1xuICB9XG4gIGdldCBzdGVwKCk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuICBiZWZvcmVTdGVwUnVuOiAobmV4dDogKCkgPT4gbnVsbCB8IHZvaWQgfCBhbnksIGNhbmNlbDogKCkgPT4gbnVsbCB8IHZvaWQgfCBhbnkpID0+IG51bGw7XG4gIGFmdGVyU3RlcFJ1bjogKG5leHQ6ICgpID0+IG51bGwgfCB2b2lkIHwgYW55LCBjYW5jZWw6ICgpID0+IG51bGwgfCB2b2lkIHwgYW55KSA9PiBudWxsO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwQ29udGVudCcpIG5nR3VpZGVTdGVwQ29udGVudDogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PiB8IFR5cGU8YW55PjtcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwTG9jYXRpb24nKSBuZ0d1aWRlU3RlcExvY2F0aW9uOiBXYWxrTG9jYXRpb24gPSAnYm90dG9tJztcbiAgQElucHV0KCduZ0d1aWRlU3RlcFN0eWxlJykgbmdHdWlkZVN0ZXBTdHlsZTogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRGlzcGxheUFycm93JykgbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwRm9jdXNFbGVtZW50JykgbmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEd1aWRlQ29udGVudENvbXBvbmVudD47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHdhbGtMaWJTZXJ2aWNlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMuc3RlcCBhcyBudW1iZXIpO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VDb21wb25lbnQoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5zdGVwIGFzIG51bWJlcik7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50UmVmKSB7IHJldHVybjsgfVxuICAgIGlmICh0aGlzLmFmdGVyU3RlcFJ1bikge1xuICAgICAgdGhpcy5hZnRlclN0ZXBSdW4oKCkgPT4ge1xuICAgICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgICAgIHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcbiAgICAgIH0sICgpID0+IHRoaXMud2Fsa0xpYlNlcnZpY2Uuc3RvcEd1aWRlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNvbXBvbmVudFJlZi5kZXN0cm95KCk7XG4gICAgICB0aGlzLmNvbXBvbmVudFJlZiA9IG51bGw7XG4gICAgfVxuXG4gIH1cbiAgcHJpdmF0ZSBnZW5lcmF0ZUNvbXBvbmVudCgpIHtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShHdWlkZUNvbnRlbnRDb21wb25lbnQpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdlbmVyYXRlTmdDb250ZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIG51bGwsIGNvbnRlbnQpO1xuICAgIHRoaXMuc2V0SW5wdXRzKCk7XG4gICAgdGhpcy5oYW5kbGVGb2N1cygpO1xuICAgIHRoaXMuaGFuZGxlT3ZlcmxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDb21wb25lbnQoKSB7XG4gICAgaWYgKHRoaXMuYWZ0ZXJTdGVwUnVuKSB7XG4gICAgICB0aGlzLmFmdGVyU3RlcFJ1bigoKSA9PiB0aGlzLmdlbmVyYXRlQ29tcG9uZW50KCksXG4gICAgICAgICgpID0+IHRoaXMud2Fsa0xpYlNlcnZpY2Uuc3RvcEd1aWRlKCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdlbmVyYXRlQ29tcG9uZW50KCk7XG4gICAgfVxuXG4gIH1cblxuICBnZW5lcmF0ZU5nQ29udGVudCgpIHtcbiAgICAvLyBDb250ZW50IGlzIHN0cmluZ1xuICAgIGlmICh0eXBlb2YgdGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQgPT09ICdzdHJpbmcnKSB7XG4gICAgICBjb25zdCBlbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICAgIHJldHVybiBbW2VsZW1lbnRdXTtcbiAgICB9XG4gICAgLy8gQ29udGVudCBpcyBUZW1wbGF0ZVxuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmKSB7XG4gICAgICBjb25zdCB2aWV3UmVmVGVtcGxhdGUgPSB0aGlzLm5nR3VpZGVTdGVwQ29udGVudC5jcmVhdGVFbWJlZGRlZFZpZXcoe30pO1xuICAgICAgcmV0dXJuIFt2aWV3UmVmVGVtcGxhdGUucm9vdE5vZGVzXTtcbiAgICB9XG5cbiAgICAvLyBFbHNlIGl0J3MgYSBjb21wb25lbnRcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeSh0aGlzLm5nR3VpZGVTdGVwQ29udGVudCk7XG4gICAgY29uc3Qgdmlld1JlZiA9IGZhY3RvcnkuY3JlYXRlKHRoaXMuaW5qZWN0b3IpO1xuICAgIHJldHVybiBbW3ZpZXdSZWYubG9jYXRpb24ubmF0aXZlRWxlbWVudF1dO1xuICB9XG4gIHByaXZhdGUgc2V0SW5wdXRzKCkge1xuICAgIGNvbnN0IGluc3RhbmNlUmVmID0gdGhpcy5jb21wb25lbnRSZWYuaW5zdGFuY2U7XG4gICAgaW5zdGFuY2VSZWYuc3RlcCA9IHRoaXMuc3RlcCBhcyBudW1iZXI7XG4gICAgaW5zdGFuY2VSZWYudGFyZ2V0ID0gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaW5zdGFuY2VSZWYubG9jYXRpb24gPSB0aGlzLm5nR3VpZGVTdGVwTG9jYXRpb24gfHwgJ2JvdHRvbSc7XG4gICAgaW5zdGFuY2VSZWYuZGlzcGxheUFycm93ID0gdGhpcy5uZ0d1aWRlU3RlcERpc3BsYXlBcnJvdztcbiAgICBpZiAodGhpcy5uZ0d1aWRlU3RlcFN0eWxlKSB7XG4gICAgICBpbnN0YW5jZVJlZi5jdXN0b21Dc3MgPSB0aGlzLm5nR3VpZGVTdGVwU3R5bGU7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKSB7XG4gICAgdGhpcy53YWxrTGliU2VydmljZS5nZXRTdGVwT2JzZXJ2YWJsZSg8bnVtYmVyPnRoaXMuc3RlcClcbiAgICAgIC5waXBlKHRha2VVbnRpbCh1bnNpZ25lZE9uRGVzdHJveWVkKHRoaXMpKSlcbiAgICAgIC5zdWJzY3JpYmUoKHdhbGtFdmVudDogV2Fsa0V2ZW50KSA9PiB3YWxrRXZlbnQuZXZlbnQgPT09ICdvcGVuJyA/IHRoaXMuY3JlYXRlQ29tcG9uZW50KCkgOiB0aGlzLmNsb3NlQ29tcG9uZW50KCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVPdmVybGF5KCkge1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgLy8gdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3ZlcmxheScpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmLm9uRGVzdHJveSgoKSA9PiB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmxheScpO1xuICAgIH0pO1xuICB9XG4gIHByaXZhdGUgaGFuZGxlRm9jdXMoKSB7XG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBGb2N1c0VsZW1lbnQpIHtcbiAgICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgfVxuICB9XG5cblxuXG59XG4iXX0=