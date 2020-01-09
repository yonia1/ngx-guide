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
     * @private
     * @return {?}
     */
    GuideContentComponent.prototype.getNode = /**
     * @private
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
     * @private
     * @return {?}
     */
    GuideContentComponent.prototype.clean = /**
     * @private
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
                    styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:10px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:10px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:10px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{top:0;bottom:0;left:0;right:0;opacity:.8;position:absolute;box-sizing:content-box;z-index:99;background-color:#000;opacity:.55;background:radial-gradient(center,ellipse farthest-corner,rgba(0,0,0,.4) 0,rgba(0,0,0,.9) 100%);-webkit-transition:.3s ease-out;transition:.3s ease-out}.helperLayer{padding:2px;box-sizing:content-box;position:absolute;z-index:9999998;background-color:rgba(255,255,255,.9);border:1px solid rgba(0,0,0,.5);border-radius:4px;box-shadow:0 2px 15px rgba(0,0,0,.4);-webkit-transition:.3s ease-out;transition:.3s ease-out}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sV0FBVyxDQUFDO0FBQ25CLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQztBQUcvQjtJQTRCRSwrQkFDVSxRQUFpQyxFQUNqQyxTQUFvQixFQUNwQixJQUE2QixFQUM3QixZQUFtQztRQUhuQyxhQUFRLEdBQVIsUUFBUSxDQUF5QjtRQUNqQyxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLFNBQUksR0FBSixJQUFJLENBQXlCO1FBQzdCLGlCQUFZLEdBQVosWUFBWSxDQUF1QjtRQXpCckMsa0JBQWEsR0FBb0IsTUFBTSxDQUFDO1FBQ3hDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFFbEIsU0FBSSxHQUFHLElBQUksQ0FBQztRQUNaLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ1osd0JBQW1CLEdBQUcsS0FBSyxDQUFDO1FBRTVCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLGtCQUFhLEdBQUcsSUFBSSxDQUFDO1FBRXJCLGFBQVEsR0FBaUIsT0FBTyxDQUFDO1FBQ2pDLGlCQUFZLEdBQVksSUFBSSxDQUFDO1FBQzdCLGNBQVMsR0FBOEIsSUFBSSxDQUFDO0lBZXJELENBQUM7SUFkRCxzQkFBYSx1Q0FBSTs7OztRQUdqQjtZQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNwQixDQUFDOzs7OztRQUxELFVBQWtCLElBQVk7WUFDNUIsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3pDLENBQUM7OztPQUFBOzs7O0lBY0Qsd0NBQVE7OztJQUFSO1FBQ0UsK0NBQStDOztRQUV6QyxJQUFBLFNBQTRELEVBQTFELHNCQUFRLEVBQUUsZ0NBQWEsRUFBRSxnQ0FBYSxFQUFFLHdCQUFrQjtRQUVsRSxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksTUFBTSxDQUN0QixJQUFJLENBQUMsT0FBTyxFQUFFLEVBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxFQUN2RCxtQkFBSztZQUNILFNBQVMsRUFBRSxRQUFRO1lBQ25CLGFBQWEsZUFBQTtZQUNiLGFBQWEsZUFBQTtZQUNiLFNBQVMsV0FBQTtTQUNWLEVBQUEsQ0FDRixDQUFDO0lBQ0osQ0FBQzs7OztJQUVELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDdEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQ2YsQ0FBQzs7OztJQUNELG9DQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFHaEMsQ0FBQzs7OztJQUNELHNDQUFNOzs7SUFBTjtRQUNFLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Ozs7SUFDRCxvQ0FBSTs7O0lBQUo7UUFDRSxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsRUFBRSxDQUFDO0lBQ2hDLENBQUM7Ozs7O0lBQ08sdUNBQU87Ozs7SUFBZjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7O0lBQ08scUNBQUs7Ozs7SUFBYjtRQUNFLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDNUMsQ0FBQzs7Z0JBbEZGLFNBQVMsU0FBQztvQkFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtvQkFDckMsUUFBUSxFQUFFLGtCQUFrQjtvQkFDNUIsbWJBQTZDOztpQkFFOUM7Ozs7Z0JBYjZDLFVBQVU7Z0JBQUUsU0FBUztnQkFBckIsVUFBVTtnQkFFL0MscUJBQXFCOzs7c0NBa0IzQixLQUFLOzRCQUNMLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSzsrQkFDTCxLQUFLOzRCQUNMLEtBQUs7dUJBQ0wsS0FBSzs7SUErRFIsNEJBQUM7Q0FBQSxBQW5GRCxJQW1GQztTQTdFWSxxQkFBcUI7Ozs7OztJQUNoQyw4Q0FBZ0Q7Ozs7O0lBQ2hELHNDQUFrQjs7Ozs7SUFDbEIsdUNBQXVCOztJQUN2QixxQ0FBWTs7SUFDWiw4Q0FBcUI7O0lBQ3JCLG9EQUFxQzs7SUFDckMsMENBQXFDOztJQUNyQyw4Q0FBK0I7O0lBQy9CLDhDQUE4Qjs7SUFDOUIsdUNBQWtDOztJQUNsQyx5Q0FBMEM7O0lBQzFDLDZDQUFzQzs7SUFDdEMsMENBQXFEOzs7OztJQVVuRCx5Q0FBeUM7Ozs7O0lBQ3pDLDBDQUE0Qjs7Ozs7SUFDNUIscUNBQXFDOzs7OztJQUNyQyw2Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgR3VpZGVVdGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UgfSBmcm9tICcuLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvdWNoU2VxdWVuY2UgfSBmcm9tICdzZWxlbml1bS13ZWJkcml2ZXInO1xuaW1wb3J0ICdwb3BwZXIuanMnO1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xuZXhwb3J0IHR5cGUgV2Fsa0xvY2F0aW9uID0gUG9wcGVyLlBsYWNlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbmctZ3VpZGUtY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ndWlkZS1jb250ZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3VpZGUtY29udGVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEd1aWRlQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBjdXJyZW50QWN0aW9uOiAnbmV4dCcgfCAnc3RvcCcgPSAnbmV4dCc7XG4gIHByaXZhdGUgX3N0ZXAgPSAxO1xuICBwcml2YXRlIHBvcHBlcjogUG9wcGVyO1xuICBzaG93ID0gdHJ1ZTtcbiAgb3ZlcmxheU9iamVjdCA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3VsZENyZWF0ZU92ZXJsYXkgPSBmYWxzZTtcbiAgQElucHV0KCkgbW9kaWZpZXJzOiBQb3BwZXIuTW9kaWZpZXJzO1xuICBASW5wdXQoKSBwb3NpdGlvbkZpeGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGV2ZW50c0VuYWJsZWQgPSB0cnVlO1xuICBASW5wdXQoKSB0YXJnZXQ6IHN0cmluZyB8IEVsZW1lbnQ7XG4gIEBJbnB1dCgpIGxvY2F0aW9uOiBXYWxrTG9jYXRpb24gPSAncmlnaHQnO1xuICBASW5wdXQoKSBkaXNwbGF5QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjdXN0b21Dc3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSBudWxsO1xuICBASW5wdXQoKSBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gR3VpZGVVdGlscy50b051bWJlcihzdGVwKTtcbiAgfVxuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgZ3VpZGVTZXJ2aWNlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gdG9kbyA6IG1vdmUgdG8gYW4gYWN0aW9uIHRyaWdnZXIgd2hlbiBuZWVkZWRcblxuICAgIGNvbnN0IHsgbG9jYXRpb24sIHBvc2l0aW9uRml4ZWQsIGV2ZW50c0VuYWJsZWQsIG1vZGlmaWVycyB9ID0gdGhpcztcbiAgXG4gICAgdGhpcy5wb3BwZXIgPSBuZXcgUG9wcGVyKFxuICAgICAgdGhpcy5nZXROb2RlKCksXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5neC1ndWlkZScpLFxuICAgICAgPGFueT57XG4gICAgICAgIHBsYWNlbWVudDogbG9jYXRpb24sXG4gICAgICAgIHBvc2l0aW9uRml4ZWQsXG4gICAgICAgIGV2ZW50c0VuYWJsZWQsXG4gICAgICAgIG1vZGlmaWVyc1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBvcHBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5jbGVhbigpO1xuICB9XG4gIG5leHQoKSB7XG4gICAgdGhpcy5ndWlkZVNlcnZpY2UubmV4dEd1aWRlKCk7XG5cblxuICB9XG4gIGlzTGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5ndWlkZVNlcnZpY2UuaXNMYXN0KHRoaXMuc3RlcCk7XG4gIH1cbiAgZG9uZSgpIHtcbiAgICB0aGlzLmd1aWRlU2VydmljZS5zdG9wR3VpZGUoKTtcbiAgfVxuICBwcml2YXRlIGdldE5vZGUoKTogRWxlbWVudCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgY2xlYW4oKSB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlPYmplY3QpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5vdmVybGF5T2JqZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cbiJdfQ==