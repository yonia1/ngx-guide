/**
 * @fileoverview added by tsickle
 * Generated from: lib/guide-content/guide-content.component.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import * as GuideUtils from '../utils';
import { NgGuideWalkLibService } from '../ng-guide-walk-lib.service';
import 'popper.js';
import Popper from 'popper.js';
export class GuideContentComponent {
    /**
     * @param {?} _element
     * @param {?} _renderer
     * @param {?} host
     * @param {?} guideService
     */
    constructor(_element, _renderer, host, guideService) {
        this._element = _element;
        this._renderer = _renderer;
        this.host = host;
        this.guideService = guideService;
        this.currentAction = 'next';
        this._step = 1;
        this.show = true;
        this.overlayObject = null;
        this.shouldCreateOverlay = false;
        this.positionFixed = false;
        this.eventsEnabled = true;
        this.location = 'right';
        this.displayArrow = true;
        this.customCss = null;
    }
    /**
     * @param {?} step
     * @return {?}
     */
    set step(step) {
        this._step = GuideUtils.toNumber(step);
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
        // todo : move to an action trigger when needed
        // todo : move to an action trigger when needed
        const { location, positionFixed, eventsEnabled, modifiers } = this;
        this.popper = new Popper(this.getNode(), this._element.nativeElement.querySelector('.ngx-guide'), (/** @type {?} */ ({
            placement: location,
            positionFixed,
            eventsEnabled,
            modifiers
        })));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.popper.destroy();
        this.clean();
    }
    /**
     * @return {?}
     */
    next() {
        this.guideService.nextGuide();
    }
    /**
     * @return {?}
     */
    isLast() {
        return this.guideService.isLast(this.step);
    }
    /**
     * @return {?}
     */
    done() {
        this.guideService.stopGuide();
    }
    /**
     * @private
     * @return {?}
     */
    getNode() {
        if (this.target) {
            if (typeof this.target === 'string') {
                return document.querySelector(this.target);
            }
            else {
                return this.target;
            }
        }
        else {
            return this._element.nativeElement;
        }
    }
    /**
     * @private
     * @return {?}
     */
    clean() {
        if (!this.overlayObject) {
            return;
        }
        this.overlayObject.style.display = 'none';
    }
}
GuideContentComponent.decorators = [
    { type: Component, args: [{
                encapsulation: ViewEncapsulation.None,
                selector: 'ng-guide-content',
                template: "<div class=\"ngx-guide\"\n[ngStyle]=\"customCss\"\n[class.visible]=\"show\">\n \n  <ng-content></ng-content>\n  <hr>\n  \n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"next()\">\n    next\n  </button>\n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"done()\">\n    done\n  </button>\n  \n  <div *ngIf=\"displayArrow\" [ngStyle]=\"customCss\" class=\"ngx-guide__arrow\" x-arrow></div>\n</div>",
                styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:10px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:10px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:10px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{top:0;bottom:0;left:0;right:0;opacity:.8;position:absolute;box-sizing:content-box;z-index:99;background-color:#000;opacity:.55;background:radial-gradient(center,ellipse farthest-corner,rgba(0,0,0,.4) 0,rgba(0,0,0,.9) 100%);-webkit-transition:.3s ease-out;transition:.3s ease-out}.helperLayer{padding:2px;box-sizing:content-box;position:absolute;z-index:9999998;background-color:rgba(255,255,255,.9);border:1px solid rgba(0,0,0,.5);border-radius:4px;box-shadow:0 2px 15px rgba(0,0,0,.4);-webkit-transition:.3s ease-out;transition:.3s ease-out}"]
            }] }
];
/** @nocollapse */
GuideContentComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: ElementRef },
    { type: NgGuideWalkLibService }
];
GuideContentComponent.propDecorators = {
    shouldCreateOverlay: [{ type: Input }],
    modifiers: [{ type: Input }],
    positionFixed: [{ type: Input }],
    eventsEnabled: [{ type: Input }],
    target: [{ type: Input }],
    location: [{ type: Input }],
    displayArrow: [{ type: Input }],
    customCss: [{ type: Input }],
    step: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.currentAction;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype._step;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.popper;
    /** @type {?} */
    GuideContentComponent.prototype.show;
    /** @type {?} */
    GuideContentComponent.prototype.overlayObject;
    /** @type {?} */
    GuideContentComponent.prototype.shouldCreateOverlay;
    /** @type {?} */
    GuideContentComponent.prototype.modifiers;
    /** @type {?} */
    GuideContentComponent.prototype.positionFixed;
    /** @type {?} */
    GuideContentComponent.prototype.eventsEnabled;
    /** @type {?} */
    GuideContentComponent.prototype.target;
    /** @type {?} */
    GuideContentComponent.prototype.location;
    /** @type {?} */
    GuideContentComponent.prototype.displayArrow;
    /** @type {?} */
    GuideContentComponent.prototype.customCss;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype._element;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype._renderer;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.host;
    /**
     * @type {?}
     * @private
     */
    GuideContentComponent.prototype.guideService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sV0FBVyxDQUFDO0FBQ25CLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQztBQVMvQixNQUFNLE9BQU8scUJBQXFCOzs7Ozs7O0lBc0JoQyxZQUNVLFFBQWlDLEVBQ2pDLFNBQW9CLEVBQ3BCLElBQTZCLEVBQzdCLFlBQW1DO1FBSG5DLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBeUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBekJyQyxrQkFBYSxHQUFvQixNQUFNLENBQUM7UUFDeEMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUVsQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDWix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFNUIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsYUFBUSxHQUFpQixPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUE4QixJQUFJLENBQUM7SUFlckQsQ0FBQzs7Ozs7SUFkRCxJQUFhLElBQUksQ0FBQyxJQUFZO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFXRCxRQUFRO1FBQ04sK0NBQStDOztjQUV6QyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUk7UUFFbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFDdkQsbUJBQUs7WUFDSCxTQUFTLEVBQUUsUUFBUTtZQUNuQixhQUFhO1lBQ2IsYUFBYTtZQUNiLFNBQVM7U0FDVixFQUFBLENBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDOzs7O0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFHaEMsQ0FBQzs7OztJQUNELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7Ozs7SUFDTyxPQUFPO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ2YsSUFBSSxPQUFPLElBQUksQ0FBQyxNQUFNLEtBQUssUUFBUSxFQUFFO2dCQUNuQyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQzthQUNwQjtTQUNGO2FBQU07WUFDTCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDO1NBQ3BDO0lBQ0gsQ0FBQzs7Ozs7SUFDTyxLQUFLO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM1QyxDQUFDOzs7WUFsRkYsU0FBUyxTQUFDO2dCQUNULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO2dCQUNyQyxRQUFRLEVBQUUsa0JBQWtCO2dCQUM1QixtYkFBNkM7O2FBRTlDOzs7O1lBYjZDLFVBQVU7WUFBRSxTQUFTO1lBQXJCLFVBQVU7WUFFL0MscUJBQXFCOzs7a0NBa0IzQixLQUFLO3dCQUNMLEtBQUs7NEJBQ0wsS0FBSzs0QkFDTCxLQUFLO3FCQUNMLEtBQUs7dUJBQ0wsS0FBSzsyQkFDTCxLQUFLO3dCQUNMLEtBQUs7bUJBQ0wsS0FBSzs7Ozs7OztJQWJOLDhDQUFnRDs7Ozs7SUFDaEQsc0NBQWtCOzs7OztJQUNsQix1Q0FBdUI7O0lBQ3ZCLHFDQUFZOztJQUNaLDhDQUFxQjs7SUFDckIsb0RBQXFDOztJQUNyQywwQ0FBcUM7O0lBQ3JDLDhDQUErQjs7SUFDL0IsOENBQThCOztJQUM5Qix1Q0FBa0M7O0lBQ2xDLHlDQUEwQzs7SUFDMUMsNkNBQXNDOztJQUN0QywwQ0FBcUQ7Ozs7O0lBVW5ELHlDQUF5Qzs7Ozs7SUFDekMsMENBQTRCOzs7OztJQUM1QixxQ0FBcUM7Ozs7O0lBQ3JDLDZDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBHdWlkZVV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliU2VydmljZSB9IGZyb20gJy4uL25nLWd1aWRlLXdhbGstbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG91Y2hTZXF1ZW5jZSB9IGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlcic7XG5pbXBvcnQgJ3BvcHBlci5qcyc7XG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XG5leHBvcnQgdHlwZSBXYWxrTG9jYXRpb24gPSBQb3BwZXIuUGxhY2VtZW50O1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduZy1ndWlkZS1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2d1aWRlLWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ndWlkZS1jb250ZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3VpZGVDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGN1cnJlbnRBY3Rpb246ICduZXh0JyB8ICdzdG9wJyA9ICduZXh0JztcbiAgcHJpdmF0ZSBfc3RlcCA9IDE7XG4gIHByaXZhdGUgcG9wcGVyOiBQb3BwZXI7XG4gIHNob3cgPSB0cnVlO1xuICBvdmVybGF5T2JqZWN0ID0gbnVsbDtcbiAgQElucHV0KCkgc2hvdWxkQ3JlYXRlT3ZlcmxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBtb2RpZmllcnM6IFBvcHBlci5Nb2RpZmllcnM7XG4gIEBJbnB1dCgpIHBvc2l0aW9uRml4ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZXZlbnRzRW5hYmxlZCA9IHRydWU7XG4gIEBJbnB1dCgpIHRhcmdldDogc3RyaW5nIHwgRWxlbWVudDtcbiAgQElucHV0KCkgbG9jYXRpb246IFdhbGtMb2NhdGlvbiA9ICdyaWdodCc7XG4gIEBJbnB1dCgpIGRpc3BsYXlBcnJvdzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbUNzczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IG51bGw7XG4gIEBJbnB1dCgpIHNldCBzdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBHdWlkZVV0aWxzLnRvTnVtYmVyKHN0ZXApO1xuICB9XG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaG9zdDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBndWlkZVNlcnZpY2U6IE5nR3VpZGVXYWxrTGliU2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0b2RvIDogbW92ZSB0byBhbiBhY3Rpb24gdHJpZ2dlciB3aGVuIG5lZWRlZFxuXG4gICAgY29uc3QgeyBsb2NhdGlvbiwgcG9zaXRpb25GaXhlZCwgZXZlbnRzRW5hYmxlZCwgbW9kaWZpZXJzIH0gPSB0aGlzO1xuICBcbiAgICB0aGlzLnBvcHBlciA9IG5ldyBQb3BwZXIoXG4gICAgICB0aGlzLmdldE5vZGUoKSxcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmd4LWd1aWRlJyksXG4gICAgICA8YW55PntcbiAgICAgICAgcGxhY2VtZW50OiBsb2NhdGlvbixcbiAgICAgICAgcG9zaXRpb25GaXhlZCxcbiAgICAgICAgZXZlbnRzRW5hYmxlZCxcbiAgICAgICAgbW9kaWZpZXJzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucG9wcGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNsZWFuKCk7XG4gIH1cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmd1aWRlU2VydmljZS5uZXh0R3VpZGUoKTtcblxuXG4gIH1cbiAgaXNMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmd1aWRlU2VydmljZS5pc0xhc3QodGhpcy5zdGVwKTtcbiAgfVxuICBkb25lKCkge1xuICAgIHRoaXMuZ3VpZGVTZXJ2aWNlLnN0b3BHdWlkZSgpO1xuICB9XG4gIHByaXZhdGUgZ2V0Tm9kZSgpOiBFbGVtZW50IHtcbiAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjbGVhbigpIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheU9iamVjdCkgeyByZXR1cm47IH1cbiAgICB0aGlzLm92ZXJsYXlPYmplY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuIl19