/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, Renderer2, ViewEncapsulation } from '@angular/core';
import * as GuideUtils from '../utils';
import { NgGuideWalkLibService } from '../ng-guide-walk-lib.service';
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
                styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:5px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:5px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:5px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{padding:10px;z-index:0;box-shadow:0 0 0 100vmax rgba(0,0,0,.5)}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLWxpYi8iLCJzb3VyY2VzIjpbImxpYi9ndWlkZS1jb250ZW50L2d1aWRlLWNvbnRlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBYSxVQUFVLEVBQUUsU0FBUyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzlHLE9BQU8sS0FBSyxVQUFVLE1BQU0sVUFBVSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBRXJFLE9BQU8sTUFBTSxNQUFNLFdBQVcsQ0FBQztBQVMvQixNQUFNLE9BQU8scUJBQXFCOzs7Ozs7O0lBc0JoQyxZQUNVLFFBQWlDLEVBQ2pDLFNBQW9CLEVBQ3BCLElBQTZCLEVBQzdCLFlBQW1DO1FBSG5DLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBeUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBekJyQyxrQkFBYSxHQUFvQixNQUFNLENBQUM7UUFDeEMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUVsQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDWix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFNUIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsYUFBUSxHQUFpQixPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUE4QixJQUFJLENBQUM7SUFlckQsQ0FBQzs7Ozs7SUFkRCxJQUFhLElBQUksQ0FBQyxJQUFZO1FBQzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN6QyxDQUFDOzs7O0lBQ0QsSUFBSSxJQUFJO1FBQ04sT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0lBQ3BCLENBQUM7Ozs7SUFXRCxRQUFRO1FBQ04sK0NBQStDOztjQUV6QyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxHQUFHLElBQUk7UUFFbEUsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FDdEIsSUFBSSxDQUFDLE9BQU8sRUFBRSxFQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsRUFDdkQsbUJBQUs7WUFDSCxTQUFTLEVBQUUsUUFBUTtZQUNuQixhQUFhO1lBQ2IsYUFBYTtZQUNiLFNBQVM7U0FDVixFQUFBLENBQ0YsQ0FBQztJQUNKLENBQUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDOzs7O0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFHaEMsQ0FBQzs7OztJQUNELE1BQU07UUFDSixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDOzs7O0lBQ0QsSUFBSTtRQUNGLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUNPLE9BQU87UUFDYixJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDZixJQUFJLE9BQU8sSUFBSSxDQUFDLE1BQU0sS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDNUM7aUJBQU07Z0JBQ0wsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO2FBQ3BCO1NBQ0Y7YUFBTTtZQUNMLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUM7U0FDcEM7SUFDSCxDQUFDOzs7O0lBQ08sS0FBSztRQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQUUsT0FBTztTQUFFO1FBQ3BDLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7SUFDNUMsQ0FBQzs7O1lBbEZGLFNBQVMsU0FBQztnQkFDVCxhQUFhLEVBQUUsaUJBQWlCLENBQUMsSUFBSTtnQkFDckMsUUFBUSxFQUFFLGtCQUFrQjtnQkFDNUIsbWJBQTZDOzthQUU5Qzs7OztZQVo2QyxVQUFVO1lBQUUsU0FBUztZQUFyQixVQUFVO1lBRS9DLHFCQUFxQjs7O2tDQWlCM0IsS0FBSzt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7NEJBQ0wsS0FBSztxQkFDTCxLQUFLO3VCQUNMLEtBQUs7MkJBQ0wsS0FBSzt3QkFDTCxLQUFLO21CQUNMLEtBQUs7Ozs7SUFiTiw4Q0FBZ0Q7O0lBQ2hELHNDQUFrQjs7SUFDbEIsdUNBQXVCOztJQUN2QixxQ0FBWTs7SUFDWiw4Q0FBcUI7O0lBQ3JCLG9EQUFxQzs7SUFDckMsMENBQXFDOztJQUNyQyw4Q0FBK0I7O0lBQy9CLDhDQUE4Qjs7SUFDOUIsdUNBQWtDOztJQUNsQyx5Q0FBMEM7O0lBQzFDLDZDQUFzQzs7SUFDdEMsMENBQXFEOztJQVVuRCx5Q0FBeUM7O0lBQ3pDLDBDQUE0Qjs7SUFDNUIscUNBQXFDOztJQUNyQyw2Q0FBMkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSwgRWxlbWVudFJlZiwgUmVuZGVyZXIyLCBWaWV3RW5jYXBzdWxhdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0ICogYXMgR3VpZGVVdGlscyBmcm9tICcuLi91dGlscyc7XG5pbXBvcnQgeyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UgfSBmcm9tICcuLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IFRvdWNoU2VxdWVuY2UgfSBmcm9tICdzZWxlbml1bS13ZWJkcml2ZXInO1xuaW1wb3J0IFBvcHBlciBmcm9tICdwb3BwZXIuanMnO1xuZXhwb3J0IHR5cGUgV2Fsa0xvY2F0aW9uID0gUG9wcGVyLlBsYWNlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIHNlbGVjdG9yOiAnbmctZ3VpZGUtY29udGVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9ndWlkZS1jb250ZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZ3VpZGUtY29udGVudC5jb21wb25lbnQuc2NzcyddXG59KVxuZXhwb3J0IGNsYXNzIEd1aWRlQ29udGVudENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBjdXJyZW50QWN0aW9uOiAnbmV4dCcgfCAnc3RvcCcgPSAnbmV4dCc7XG4gIHByaXZhdGUgX3N0ZXAgPSAxO1xuICBwcml2YXRlIHBvcHBlcjogUG9wcGVyO1xuICBzaG93ID0gdHJ1ZTtcbiAgb3ZlcmxheU9iamVjdCA9IG51bGw7XG4gIEBJbnB1dCgpIHNob3VsZENyZWF0ZU92ZXJsYXkgPSBmYWxzZTtcbiAgQElucHV0KCkgbW9kaWZpZXJzOiBQb3BwZXIuTW9kaWZpZXJzO1xuICBASW5wdXQoKSBwb3NpdGlvbkZpeGVkID0gZmFsc2U7XG4gIEBJbnB1dCgpIGV2ZW50c0VuYWJsZWQgPSB0cnVlO1xuICBASW5wdXQoKSB0YXJnZXQ6IHN0cmluZyB8IEVsZW1lbnQ7XG4gIEBJbnB1dCgpIGxvY2F0aW9uOiBXYWxrTG9jYXRpb24gPSAncmlnaHQnO1xuICBASW5wdXQoKSBkaXNwbGF5QXJyb3c6IGJvb2xlYW4gPSB0cnVlO1xuICBASW5wdXQoKSBjdXN0b21Dc3M6IHsgW2tleTogc3RyaW5nXTogc3RyaW5nIH0gPSBudWxsO1xuICBASW5wdXQoKSBzZXQgc3RlcChzdGVwOiBudW1iZXIpIHtcbiAgICB0aGlzLl9zdGVwID0gR3VpZGVVdGlscy50b051bWJlcihzdGVwKTtcbiAgfVxuICBnZXQgc3RlcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgfVxuXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICBwcml2YXRlIGhvc3Q6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgZ3VpZGVTZXJ2aWNlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UpIHtcblxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gdG9kbyA6IG1vdmUgdG8gYW4gYWN0aW9uIHRyaWdnZXIgd2hlbiBuZWVkZWRcblxuICAgIGNvbnN0IHsgbG9jYXRpb24sIHBvc2l0aW9uRml4ZWQsIGV2ZW50c0VuYWJsZWQsIG1vZGlmaWVycyB9ID0gdGhpcztcbiAgXG4gICAgdGhpcy5wb3BwZXIgPSBuZXcgUG9wcGVyKFxuICAgICAgdGhpcy5nZXROb2RlKCksXG4gICAgICB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcignLm5neC1ndWlkZScpLFxuICAgICAgPGFueT57XG4gICAgICAgIHBsYWNlbWVudDogbG9jYXRpb24sXG4gICAgICAgIHBvc2l0aW9uRml4ZWQsXG4gICAgICAgIGV2ZW50c0VuYWJsZWQsXG4gICAgICAgIG1vZGlmaWVyc1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLnBvcHBlci5kZXN0cm95KCk7XG4gICAgdGhpcy5jbGVhbigpO1xuICB9XG4gIG5leHQoKSB7XG4gICAgdGhpcy5ndWlkZVNlcnZpY2UubmV4dEd1aWRlKCk7XG5cblxuICB9XG4gIGlzTGFzdCgpIHtcbiAgICByZXR1cm4gdGhpcy5ndWlkZVNlcnZpY2UuaXNMYXN0KHRoaXMuc3RlcCk7XG4gIH1cbiAgZG9uZSgpIHtcbiAgICB0aGlzLmd1aWRlU2VydmljZS5zdG9wR3VpZGUoKTtcbiAgfVxuICBwcml2YXRlIGdldE5vZGUoKTogRWxlbWVudCB7XG4gICAgaWYgKHRoaXMudGFyZ2V0KSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMudGFyZ2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0aGlzLnRhcmdldCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy50YXJnZXQ7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgfVxuICB9XG4gIHByaXZhdGUgY2xlYW4oKSB7XG4gICAgaWYgKCF0aGlzLm92ZXJsYXlPYmplY3QpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5vdmVybGF5T2JqZWN0LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbn1cbiJdfQ==