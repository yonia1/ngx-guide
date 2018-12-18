/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Directive, ViewContainerRef, ElementRef, Input, TemplateRef, EventEmitter, ComponentFactoryResolver, Renderer2, Injector, Output } from '@angular/core';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { toNumber, unsignedOnDestroyed, toBoolean } from './utils';
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
     * @return {?}
     */
    handleOverlay() {
        if (toBoolean(this.ngGuideStepOverlay)) {
            this.renderer.addClass(this.elementRef.nativeElement, 'overlay');
            this.componentRef.onDestroy(() => {
                this.renderer.removeClass(this.elementRef.nativeElement, 'overlay');
            });
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
    ngGuideStepOverlay: [{ type: Input, args: ['ngGuideStepOverlay',] }],
    ngGuideStepFocusElement: [{ type: Input, args: ['ngGuideStepFocusElement',] }],
    ngGuideStepStepStatus: [{ type: Output, args: ['ngGuideStepStepStatus',] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtc3RlcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULGdCQUFnQixFQUNoQixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFFWCxZQUFZLEVBRVosd0JBQXdCLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBcUIsTUFBTSxFQUN6RSxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFFLFNBQVMsRUFBRSxNQUFNLFNBQVMsQ0FBQztBQUVuRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLHFCQUFxQixFQUFnQixNQUFNLHlDQUF5QyxDQUFDO0FBTzlGLE1BQU0sT0FBTyxvQkFBb0I7Ozs7Ozs7OztJQXFCL0IsWUFDVSxVQUFzQixFQUN0QixnQkFBa0MsRUFDbEMsUUFBbUIsRUFDbkIsUUFBa0IsRUFDbEIsUUFBa0MsRUFDbEMsY0FBcUM7UUFMckMsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUN0QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLGFBQVEsR0FBUixRQUFRLENBQVc7UUFDbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixhQUFRLEdBQVIsUUFBUSxDQUEwQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBdUI7UUF6Qi9DLGFBQVEsR0FBRyxPQUFPLENBQUM7UUFDWCxVQUFLLEdBQVcsQ0FBQyxDQUFDO1FBU0ksd0JBQW1CLEdBQWlCLFFBQVEsQ0FBQztRQUNoRCxxQkFBZ0IsR0FBcUMsSUFBSSxDQUFDO1FBQ25ELDRCQUF1QixHQUFZLElBQUksQ0FB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QyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Ozs7SUFDTyxXQUFXO1FBQ2pCLElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO1lBQzNDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQzs7O1lBNUdGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsZUFBZTthQUMxQjs7OztZQWxCQyxVQUFVO1lBRFYsZ0JBQWdCO1lBT1UsU0FBUztZQUFFLFFBQVE7WUFBN0Msd0JBQXdCO1lBRWpCLHFCQUFxQjs7O21CQWdCM0IsS0FBSyxTQUFDLGFBQWE7aUNBTW5CLEtBQUssU0FBQyxvQkFBb0I7a0NBQzFCLEtBQUssU0FBQyxxQkFBcUI7K0JBQzNCLEtBQUssU0FBQyxrQkFBa0I7c0NBQ3hCLEtBQUssU0FBQyx5QkFBeUI7aUNBQy9CLEtBQUssU0FBQyxvQkFBb0I7c0NBQzFCLEtBQUssU0FBQyx5QkFBeUI7b0NBRS9CLE1BQU0sU0FBQyx1QkFBdUI7Ozs7SUFoQi9CLHdDQUFtQjs7SUFDbkIscUNBQTBCOztJQVExQixrREFBdUY7O0lBQ3ZGLG1EQUEyRTs7SUFDM0UsZ0RBQXFGOztJQUNyRix1REFBMEU7O0lBQzFFLGtEQUF5RTs7SUFDekUsdURBQTBFOztJQUUxRSxxREFBc0c7O0lBRXRHLDRDQUEwRDs7SUFFeEQsMENBQThCOztJQUM5QixnREFBMEM7O0lBQzFDLHdDQUEyQjs7SUFDM0Isd0NBQTBCOztJQUMxQix3Q0FBMEM7O0lBQzFDLDhDQUE2QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIERpcmVjdGl2ZSxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgRWxlbWVudFJlZixcbiAgSW5wdXQsXG4gIFRlbXBsYXRlUmVmLFxuICBUeXBlLFxuICBFdmVudEVtaXR0ZXIsXG4gIENvbXBvbmVudFJlZixcbiAgQ29tcG9uZW50RmFjdG9yeVJlc29sdmVyLCBSZW5kZXJlcjIsIEluamVjdG9yLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IHRvTnVtYmVyLCB1bnNpZ25lZE9uRGVzdHJveWVkLCB0b0Jvb2xlYW4gfSBmcm9tICcuL3V0aWxzJztcbmltcG9ydCB7IFdhbGtFdmVudCB9IGZyb20gJy4vbmctZ3VpZGUudHlwZXMnO1xuaW1wb3J0IHsgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR3VpZGVDb250ZW50Q29tcG9uZW50LCBXYWxrTG9jYXRpb24gfSBmcm9tICcuL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQnO1xuXG5leHBvcnQgdHlwZSBTdGVwU3RhdHVzID0gJ0JlZm9yZU9wZW4nIHwgJ09wZW4nIHwgJ0JlZm9yZUNsb3NlJyB8ICdBZnRlckNsb3NlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW25nR3VpZGVTdGVwXScsXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VpZGVTdGVwRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuXG4gIHBvc2l0aW9uID0gJ2JlbG93JztcbiAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMTtcblxuICBASW5wdXQoJ25nR3VpZGVTdGVwJykgc2V0IHN0ZXAoc3RlcE51bWJlcjogbnVtYmVyIHwgc3RyaW5nKSB7XG4gICAgdGhpcy5fc3RlcCA9IHRvTnVtYmVyKHN0ZXBOdW1iZXIpO1xuICB9XG4gIGdldCBzdGVwKCk6IG51bWJlciB8IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cbiAgQElucHV0KCduZ0d1aWRlU3RlcENvbnRlbnQnKSBuZ0d1aWRlU3RlcENvbnRlbnQ6IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT4gfCBUeXBlPGFueT47XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBMb2NhdGlvbicpIG5nR3VpZGVTdGVwTG9jYXRpb246IFdhbGtMb2NhdGlvbiA9ICdib3R0b20nO1xuICBASW5wdXQoJ25nR3VpZGVTdGVwU3R5bGUnKSBuZ0d1aWRlU3RlcFN0eWxlOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBEaXNwbGF5QXJyb3cnKSBuZ0d1aWRlU3RlcERpc3BsYXlBcnJvdzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgnbmdHdWlkZVN0ZXBPdmVybGF5JykgbmdHdWlkZVN0ZXBPdmVybGF5OiBib29sZWFuIHwgc3RyaW5nID0gdHJ1ZTtcbiAgQElucHV0KCduZ0d1aWRlU3RlcEZvY3VzRWxlbWVudCcpIG5nR3VpZGVTdGVwRm9jdXNFbGVtZW50OiBib29sZWFuID0gdHJ1ZTtcblxuICBAT3V0cHV0KCduZ0d1aWRlU3RlcFN0ZXBTdGF0dXMnKSBuZ0d1aWRlU3RlcFN0ZXBTdGF0dXM6IEV2ZW50RW1pdHRlcjxTdGVwU3RhdHVzPiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBwcml2YXRlIGNvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPEd1aWRlQ29udGVudENvbXBvbmVudD47XG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZWxlbWVudFJlZjogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIHZpZXdDb250YWluZXJSZWY6IFZpZXdDb250YWluZXJSZWYsXG4gICAgcHJpdmF0ZSByZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLFxuICAgIHByaXZhdGUgcmVzb2x2ZXI6IENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgICBwcml2YXRlIHdhbGtMaWJTZXJ2aWNlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuc3Vic2NyaWJlVG9HdWlkZVJlcXVlc3QoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnJlZ2lzdGVyKHRoaXMuc3RlcCBhcyBudW1iZXIpO1xuICB9XG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuY2xvc2VDb21wb25lbnQoKTtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLnVucmVnaXN0ZXIodGhpcy5zdGVwIGFzIG51bWJlcik7XG4gIH1cbiAgcHJpdmF0ZSBjbG9zZUNvbXBvbmVudCgpIHtcbiAgICBpZiAoIXRoaXMuY29tcG9uZW50UmVmKSB7IHJldHVybjsgfVxuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ0JlZm9yZUNsb3NlJyk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYuZGVzdHJveSgpO1xuICAgIHRoaXMuY29tcG9uZW50UmVmID0gbnVsbDtcbiAgICB0aGlzLm5nR3VpZGVTdGVwU3RlcFN0YXR1cy5lbWl0KCdBZnRlckNsb3NlJyk7XG5cbiAgfVxuICBwcml2YXRlIGdlbmVyYXRlQ29tcG9uZW50KCkge1xuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ0JlZm9yZU9wZW4nKTtcbiAgICBjb25zdCBmYWN0b3J5ID0gdGhpcy5yZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShHdWlkZUNvbnRlbnRDb21wb25lbnQpO1xuICAgIGNvbnN0IGNvbnRlbnQgPSB0aGlzLmdlbmVyYXRlTmdDb250ZW50KCk7XG4gICAgdGhpcy5jb21wb25lbnRSZWYgPSB0aGlzLnZpZXdDb250YWluZXJSZWYuY3JlYXRlQ29tcG9uZW50KGZhY3RvcnksIDAsIG51bGwsIGNvbnRlbnQpO1xuICAgIHRoaXMuc2V0SW5wdXRzKCk7XG4gICAgdGhpcy5oYW5kbGVGb2N1cygpO1xuICAgIHRoaXMuaGFuZGxlT3ZlcmxheSgpO1xuICAgIHRoaXMubmdHdWlkZVN0ZXBTdGVwU3RhdHVzLmVtaXQoJ09wZW4nKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ29tcG9uZW50KCkge1xuICAgIHRoaXMuZ2VuZXJhdGVDb21wb25lbnQoKTtcbiAgfVxuXG4gIGdlbmVyYXRlTmdDb250ZW50KCkge1xuICAgIC8vIENvbnRlbnQgaXMgc3RyaW5nXG4gICAgaWYgKHR5cGVvZiB0aGlzLm5nR3VpZGVTdGVwQ29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQodGhpcy5uZ0d1aWRlU3RlcENvbnRlbnQpO1xuICAgICAgcmV0dXJuIFtbZWxlbWVudF1dO1xuICAgIH1cbiAgICAvLyBDb250ZW50IGlzIFRlbXBsYXRlXG4gICAgaWYgKHRoaXMubmdHdWlkZVN0ZXBDb250ZW50IGluc3RhbmNlb2YgVGVtcGxhdGVSZWYpIHtcbiAgICAgIGNvbnN0IHZpZXdSZWZUZW1wbGF0ZSA9IHRoaXMubmdHdWlkZVN0ZXBDb250ZW50LmNyZWF0ZUVtYmVkZGVkVmlldyh7fSk7XG4gICAgICByZXR1cm4gW3ZpZXdSZWZUZW1wbGF0ZS5yb290Tm9kZXNdO1xuICAgIH1cblxuICAgIC8vIEVsc2UgaXQncyBhIGNvbXBvbmVudFxuICAgIGNvbnN0IGZhY3RvcnkgPSB0aGlzLnJlc29sdmVyLnJlc29sdmVDb21wb25lbnRGYWN0b3J5KHRoaXMubmdHdWlkZVN0ZXBDb250ZW50KTtcbiAgICBjb25zdCB2aWV3UmVmID0gZmFjdG9yeS5jcmVhdGUodGhpcy5pbmplY3Rvcik7XG4gICAgcmV0dXJuIFtbdmlld1JlZi5sb2NhdGlvbi5uYXRpdmVFbGVtZW50XV07XG4gIH1cbiAgcHJpdmF0ZSBzZXRJbnB1dHMoKSB7XG4gICAgY29uc3QgaW5zdGFuY2VSZWYgPSB0aGlzLmNvbXBvbmVudFJlZi5pbnN0YW5jZTtcbiAgICBpbnN0YW5jZVJlZi5zdGVwID0gdGhpcy5zdGVwIGFzIG51bWJlcjtcbiAgICBpbnN0YW5jZVJlZi50YXJnZXQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgICBpbnN0YW5jZVJlZi5sb2NhdGlvbiA9IHRoaXMubmdHdWlkZVN0ZXBMb2NhdGlvbiB8fCAnYm90dG9tJztcbiAgICBpbnN0YW5jZVJlZi5kaXNwbGF5QXJyb3cgPSB0aGlzLm5nR3VpZGVTdGVwRGlzcGxheUFycm93O1xuICAgIGlmICh0aGlzLm5nR3VpZGVTdGVwU3R5bGUpIHtcbiAgICAgIGluc3RhbmNlUmVmLmN1c3RvbUNzcyA9IHRoaXMubmdHdWlkZVN0ZXBTdHlsZTtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBzdWJzY3JpYmVUb0d1aWRlUmVxdWVzdCgpIHtcbiAgICB0aGlzLndhbGtMaWJTZXJ2aWNlLmdldFN0ZXBPYnNlcnZhYmxlKDxudW1iZXI+dGhpcy5zdGVwKVxuICAgICAgLnBpcGUodGFrZVVudGlsKHVuc2lnbmVkT25EZXN0cm95ZWQodGhpcykpKVxuICAgICAgLnN1YnNjcmliZSgod2Fsa0V2ZW50OiBXYWxrRXZlbnQpID0+IHdhbGtFdmVudC5ldmVudCA9PT0gJ29wZW4nID8gdGhpcy5jcmVhdGVDb21wb25lbnQoKSA6IHRoaXMuY2xvc2VDb21wb25lbnQoKSk7XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZU92ZXJsYXkoKSB7XG4gICAgaWYgKHRvQm9vbGVhbih0aGlzLm5nR3VpZGVTdGVwT3ZlcmxheSkpIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdvdmVybGF5Jyk7XG4gICAgICB0aGlzLmNvbXBvbmVudFJlZi5vbkRlc3Ryb3koKCkgPT4ge1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUNsYXNzKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnb3ZlcmxheScpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgaGFuZGxlRm9jdXMoKSB7XG4gICAgaWYgKHRvQm9vbGVhbih0aGlzLm5nR3VpZGVTdGVwRm9jdXNFbGVtZW50KSkge1xuICAgICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG4gIH1cblxuXG5cbn1cbiJdfQ==