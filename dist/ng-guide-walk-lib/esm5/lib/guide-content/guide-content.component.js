/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import * as GuideUtils from '../utils';
import { NgGuideWalkLibService } from '../ng-guide-walk-lib.service';
import Popper from 'popper.js';
var GuideContentComponent = /** @class */ (function () {
    function GuideContentComponent(_element, _renderer, host, guideService) {
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
    Object.defineProperty(GuideContentComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} step
         * @return {?}
         */
        function (step) {
            this._step = GuideUtils.toNumber(step);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        // todo : move to an action trigger when needed
        // todo : move to an action trigger when needed
        var _a = this, location = _a.location, positionFixed = _a.positionFixed, eventsEnabled = _a.eventsEnabled, modifiers = _a.modifiers;
        this.popper = new Popper(this.getNode(), this._element.nativeElement.querySelector('.ngx-guide'), (/** @type {?} */ ({
            placement: location,
            positionFixed: positionFixed,
            eventsEnabled: eventsEnabled,
            modifiers: modifiers
        })));
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.popper.destroy();
        this.clean();
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.guideService.nextGuide();
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.isLast = /**
     * @return {?}
     */
    function () {
        return this.guideService.isLast(this.step);
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.done = /**
     * @return {?}
     */
    function () {
        this.guideService.stopGuide();
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.getNode = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    GuideContentComponent.prototype.clean = /**
     * @return {?}
     */
    function () {
        if (!this.overlayObject) {
            return;
        }
        this.overlayObject.style.display = 'none';
    };
    GuideContentComponent.decorators = [
        { type: Component, args: [{
                    encapsulation: ViewEncapsulation.None,
                    selector: 'ng-guide-content',
                    template: "<div class=\"ngx-guide\"\n[ngStyle]=\"customCss\"\n[class.visible]=\"show\">\n \n  <ng-content></ng-content>\n  <hr>\n  \n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"next()\">\n    next\n  </button>\n  <button type=\"button\" class=\"ngx-guide__close\" (click)=\"done()\">\n    done\n  </button>\n  \n  <div *ngIf=\"displayArrow\" [ngStyle]=\"customCss\" class=\"ngx-guide__arrow\" x-arrow></div>\n</div>",
                    styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:5px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:5px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:5px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{padding:10px;z-index:0;box-shadow:0 0 0 100vmax rgba(0,0,0,.5)}"]
                }] }
    ];
    /** @nocollapse */
    GuideContentComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: ElementRef },
        { type: NgGuideWalkLibService }
    ]; };
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
    return GuideContentComponent;
}());
export { GuideContentComponent };
if (false) {
    /** @type {?} */
    GuideContentComponent.prototype.currentAction;
    /** @type {?} */
    GuideContentComponent.prototype._step;
    /** @type {?} */
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
    /** @type {?} */
    GuideContentComponent.prototype._element;
    /** @type {?} */
    GuideContentComponent.prototype._renderer;
    /** @type {?} */
    GuideContentComponent.prototype.host;
    /** @type {?} */
    GuideContentComponent.prototype.guideService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQztBQUcvQjtJQTRCRSwrQkFDVSxRQUFpQyxFQUNqQyxTQUFvQixFQUNwQixJQUE2QixFQUM3QixZQUFtQztRQUhuQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQXlCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQXpCckMsa0JBQWEsR0FBb0IsTUFBTSxDQUFDO1FBQ3hDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFFbEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ1osd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBRTVCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXJCLGFBQVEsR0FBaUIsT0FBTyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGNBQVMsR0FBOEIsSUFBSSxDQUFDO0lBZXJELENBQUM7SUFkRCxzQkFBYSx1Q0FBSTs7OztRQUdqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7OztRQUxELFVBQWtCLElBQVk7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBOzs7O0lBY0Qsd0NBQVE7OztJQUFSO1FBQ0UsK0NBQStDOztRQUV6QyxJQUFBLFNBQTRELEVBQTFELHNCQUFRLEVBQUUsZ0NBQWEsRUFBRSxnQ0FBYSxFQUFFLHdCQUFrQjtRQUVsRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUN2RCxtQkFBSztZQUNILFNBQVMsRUFBRSxRQUFRO1lBQ25CLGFBQWEsZUFBQTtZQUNiLGFBQWEsZUFBQTtZQUNiLFNBQVMsV0FBQTtTQUNWLEVBQUEsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7OztJQUNELG9DQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFHaEMsQ0FBQzs7OztJQUNELHNDQUFNOzs7SUFBTjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFDRCxvQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7SUFDTyx1Q0FBTzs7O0lBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3BCO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7O0lBQ08scUNBQUs7OztJQUFiO1FBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFBRSxPQUFPO1NBQUU7UUFDcEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztJQUM1QyxDQUFDOztnQkFsRkYsU0FBUyxTQUFDO29CQUNULGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJO29CQUNyQyxRQUFRLEVBQUUsa0JBQWtCO29CQUM1QixtYkFBNkM7O2lCQUU5Qzs7OztnQkFaNkMsVUFBVTtnQkFBRSxTQUFTO2dCQUFyQixVQUFVO2dCQUUvQyxxQkFBcUI7OztzQ0FpQjNCLEtBQUs7NEJBQ0wsS0FBSztnQ0FDTCxLQUFLO2dDQUNMLEtBQUs7eUJBQ0wsS0FBSzsyQkFDTCxLQUFLOytCQUNMLEtBQUs7NEJBQ0wsS0FBSzt1QkFDTCxLQUFLOztJQStEUiw0QkFBQztDQUFBLEFBbkZELElBbUZDO1NBN0VZLHFCQUFxQjs7O0lBQ2hDLDhDQUFnRDs7SUFDaEQsc0NBQWtCOztJQUNsQix1Q0FBdUI7O0lBQ3ZCLHFDQUFZOztJQUNaLDhDQUFxQjs7SUFDckIsb0RBQXFDOztJQUNyQywwQ0FBcUM7O0lBQ3JDLDhDQUErQjs7SUFDL0IsOENBQThCOztJQUM5Qix1Q0FBa0M7O0lBQ2xDLHlDQUEwQzs7SUFDMUMsNkNBQXNDOztJQUN0QywwQ0FBcUQ7O0lBVW5ELHlDQUF5Qzs7SUFDekMsMENBQTRCOztJQUM1QixxQ0FBcUM7O0lBQ3JDLDZDQUEyQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95LCBFbGVtZW50UmVmLCBSZW5kZXJlcjIsIFZpZXdFbmNhcHN1bGF0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgKiBhcyBHdWlkZVV0aWxzIGZyb20gJy4uL3V0aWxzJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliU2VydmljZSB9IGZyb20gJy4uL25nLWd1aWRlLXdhbGstbGliLnNlcnZpY2UnO1xuaW1wb3J0IHsgVG91Y2hTZXF1ZW5jZSB9IGZyb20gJ3NlbGVuaXVtLXdlYmRyaXZlcic7XG5pbXBvcnQgUG9wcGVyIGZyb20gJ3BvcHBlci5qcyc7XG5leHBvcnQgdHlwZSBXYWxrTG9jYXRpb24gPSBQb3BwZXIuUGxhY2VtZW50O1xuXG5AQ29tcG9uZW50KHtcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgc2VsZWN0b3I6ICduZy1ndWlkZS1jb250ZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2d1aWRlLWNvbnRlbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ndWlkZS1jb250ZW50LmNvbXBvbmVudC5zY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgR3VpZGVDb250ZW50Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBwcml2YXRlIGN1cnJlbnRBY3Rpb246ICduZXh0JyB8ICdzdG9wJyA9ICduZXh0JztcbiAgcHJpdmF0ZSBfc3RlcCA9IDE7XG4gIHByaXZhdGUgcG9wcGVyOiBQb3BwZXI7XG4gIHNob3cgPSB0cnVlO1xuICBvdmVybGF5T2JqZWN0ID0gbnVsbDtcbiAgQElucHV0KCkgc2hvdWxkQ3JlYXRlT3ZlcmxheSA9IGZhbHNlO1xuICBASW5wdXQoKSBtb2RpZmllcnM6IFBvcHBlci5Nb2RpZmllcnM7XG4gIEBJbnB1dCgpIHBvc2l0aW9uRml4ZWQgPSBmYWxzZTtcbiAgQElucHV0KCkgZXZlbnRzRW5hYmxlZCA9IHRydWU7XG4gIEBJbnB1dCgpIHRhcmdldDogc3RyaW5nIHwgRWxlbWVudDtcbiAgQElucHV0KCkgbG9jYXRpb246IFdhbGtMb2NhdGlvbiA9ICdyaWdodCc7XG4gIEBJbnB1dCgpIGRpc3BsYXlBcnJvdzogYm9vbGVhbiA9IHRydWU7XG4gIEBJbnB1dCgpIGN1c3RvbUNzczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IG51bGw7XG4gIEBJbnB1dCgpIHNldCBzdGVwKHN0ZXA6IG51bWJlcikge1xuICAgIHRoaXMuX3N0ZXAgPSBHdWlkZVV0aWxzLnRvTnVtYmVyKHN0ZXApO1xuICB9XG4gIGdldCBzdGVwKCkge1xuICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICB9XG5cblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgaG9zdDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBndWlkZVNlcnZpY2U6IE5nR3VpZGVXYWxrTGliU2VydmljZSkge1xuXG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyB0b2RvIDogbW92ZSB0byBhbiBhY3Rpb24gdHJpZ2dlciB3aGVuIG5lZWRlZFxuXG4gICAgY29uc3QgeyBsb2NhdGlvbiwgcG9zaXRpb25GaXhlZCwgZXZlbnRzRW5hYmxlZCwgbW9kaWZpZXJzIH0gPSB0aGlzO1xuICBcbiAgICB0aGlzLnBvcHBlciA9IG5ldyBQb3BwZXIoXG4gICAgICB0aGlzLmdldE5vZGUoKSxcbiAgICAgIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubmd4LWd1aWRlJyksXG4gICAgICA8YW55PntcbiAgICAgICAgcGxhY2VtZW50OiBsb2NhdGlvbixcbiAgICAgICAgcG9zaXRpb25GaXhlZCxcbiAgICAgICAgZXZlbnRzRW5hYmxlZCxcbiAgICAgICAgbW9kaWZpZXJzXG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMucG9wcGVyLmRlc3Ryb3koKTtcbiAgICB0aGlzLmNsZWFuKCk7XG4gIH1cbiAgbmV4dCgpIHtcbiAgICB0aGlzLmd1aWRlU2VydmljZS5uZXh0R3VpZGUoKTtcblxuXG4gIH1cbiAgaXNMYXN0KCkge1xuICAgIHJldHVybiB0aGlzLmd1aWRlU2VydmljZS5pc0xhc3QodGhpcy5zdGVwKTtcbiAgfVxuICBkb25lKCkge1xuICAgIHRoaXMuZ3VpZGVTZXJ2aWNlLnN0b3BHdWlkZSgpO1xuICB9XG4gIHByaXZhdGUgZ2V0Tm9kZSgpOiBFbGVtZW50IHtcbiAgICBpZiAodGhpcy50YXJnZXQpIHtcbiAgICAgIGlmICh0eXBlb2YgdGhpcy50YXJnZXQgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRoaXMudGFyZ2V0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRhcmdldDtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIHRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudDtcbiAgICB9XG4gIH1cbiAgcHJpdmF0ZSBjbGVhbigpIHtcbiAgICBpZiAoIXRoaXMub3ZlcmxheU9iamVjdCkgeyByZXR1cm47IH1cbiAgICB0aGlzLm92ZXJsYXlPYmplY3Quc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxufVxuIl19