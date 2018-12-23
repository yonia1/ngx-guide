/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
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
                    styles: [".ngx-guide{position:absolute;background:#ffc107;color:#fff;opacity:.85;width:150px;border-radius:3px;box-shadow:0 0 2px rgba(0,0,0,.5);padding:10px;text-align:center;z-index:9999}.ngx-guide:not(.visible){display:none}.ngx-guide .ngx-guide__arrow{width:0;height:0;border-style:solid;border-color:#ffc107;position:absolute;margin:5px}.ngx-guide[x-placement^=top]{margin-bottom:5px}.ngx-guide[x-placement^=top] .ngx-guide__arrow{border-width:5px 5px 0;border-left-color:transparent;border-right-color:transparent;border-bottom-color:transparent;bottom:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=bottom]{margin-top:10px}.ngx-guide[x-placement^=bottom] .ngx-guide__arrow{border-width:0 5px 5px;border-left-color:transparent;border-right-color:transparent;border-top-color:transparent;top:-5px;left:calc(50% - 5px);margin-top:0;margin-bottom:0}.ngx-guide[x-placement^=right]{margin-left:10px}.ngx-guide[x-placement^=right] .ngx-guide__arrow{border-width:5px 5px 5px 0;border-left-color:transparent;border-top-color:transparent;border-bottom-color:transparent;left:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.ngx-guide[x-placement^=left]{margin-right:10px}.ngx-guide[x-placement^=left] .ngx-guide__arrow{border-width:5px 0 5px 5px;border-top-color:transparent;border-right-color:transparent;border-bottom-color:transparent;right:-5px;top:calc(50% - 5px);margin-left:0;margin-right:0}.overlay{top:0;bottom:0;left:0;right:0;opacity:.8;position:absolute;box-sizing:content-box;z-index:99;background-color:#000;opacity:.55;background:radial-gradient(center,ellipse farthest-corner,rgba(0,0,0,.4) 0,rgba(0,0,0,.9) 100%);transition:.3s ease-out}.helperLayer{padding:2px;box-sizing:content-box;position:absolute;z-index:9999998;background-color:rgba(255,255,255,.9);border:1px solid rgba(0,0,0,.5);border-radius:4px;box-shadow:0 2px 15px rgba(0,0,0,.4);transition:.3s ease-out}"]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3VpZGUtY29udGVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZy1ndWlkZS13YWxrLyIsInNvdXJjZXMiOlsibGliL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLFVBQVUsRUFBRSxTQUFTLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDOUcsT0FBTyxLQUFLLFVBQVUsTUFBTSxVQUFVLENBQUM7QUFDdkMsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFFckUsT0FBTyxXQUFXLENBQUM7QUFDbkIsT0FBTyxNQUFNLE1BQU0sV0FBVyxDQUFDO0FBRy9CO0lBNEJFLCtCQUNVLFFBQWlDLEVBQ2pDLFNBQW9CLEVBQ3BCLElBQTZCLEVBQzdCLFlBQW1DO1FBSG5DLGFBQVEsR0FBUixRQUFRLENBQXlCO1FBQ2pDLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsU0FBSSxHQUFKLElBQUksQ0FBeUI7UUFDN0IsaUJBQVksR0FBWixZQUFZLENBQXVCO1FBekJyQyxrQkFBYSxHQUFvQixNQUFNLENBQUM7UUFDeEMsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUVsQixTQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ1osa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFDWix3QkFBbUIsR0FBRyxLQUFLLENBQUM7UUFFNUIsa0JBQWEsR0FBRyxLQUFLLENBQUM7UUFDdEIsa0JBQWEsR0FBRyxJQUFJLENBQUM7UUFFckIsYUFBUSxHQUFpQixPQUFPLENBQUM7UUFDakMsaUJBQVksR0FBWSxJQUFJLENBQUM7UUFDN0IsY0FBUyxHQUE4QixJQUFJLENBQUM7SUFlckQsQ0FBQztJQWRELHNCQUFhLHVDQUFJOzs7O1FBR2pCO1lBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ3BCLENBQUM7Ozs7O1FBTEQsVUFBa0IsSUFBWTtZQUM1QixJQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7Ozs7SUFjRCx3Q0FBUTs7O0lBQVI7UUFDRSwrQ0FBK0M7O1FBRXpDLElBQUEsU0FBNEQsRUFBMUQsc0JBQVEsRUFBRSxnQ0FBYSxFQUFFLGdDQUFhLEVBQUUsd0JBQWtCO1FBRWxFLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQ3RCLElBQUksQ0FBQyxPQUFPLEVBQUUsRUFDZCxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEVBQ3ZELG1CQUFLO1lBQ0gsU0FBUyxFQUFFLFFBQVE7WUFDbkIsYUFBYSxlQUFBO1lBQ2IsYUFBYSxlQUFBO1lBQ2IsU0FBUyxXQUFBO1NBQ1YsRUFBQSxDQUNGLENBQUM7SUFDSixDQUFDOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDOzs7O0lBQ0Qsb0NBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUdoQyxDQUFDOzs7O0lBQ0Qsc0NBQU07OztJQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0MsQ0FBQzs7OztJQUNELG9DQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDaEMsQ0FBQzs7OztJQUNPLHVDQUFPOzs7SUFBZjtRQUNFLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFFBQVEsRUFBRTtnQkFDbkMsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDTCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDcEI7U0FDRjthQUFNO1lBQ0wsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQztTQUNwQztJQUNILENBQUM7Ozs7SUFDTyxxQ0FBSzs7O0lBQWI7UUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUFFLE9BQU87U0FBRTtRQUNwQyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQzVDLENBQUM7O2dCQWxGRixTQUFTLFNBQUM7b0JBQ1QsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7b0JBQ3JDLFFBQVEsRUFBRSxrQkFBa0I7b0JBQzVCLG1iQUE2Qzs7aUJBRTlDOzs7O2dCQWI2QyxVQUFVO2dCQUFFLFNBQVM7Z0JBQXJCLFVBQVU7Z0JBRS9DLHFCQUFxQjs7O3NDQWtCM0IsS0FBSzs0QkFDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSzt5QkFDTCxLQUFLOzJCQUNMLEtBQUs7K0JBQ0wsS0FBSzs0QkFDTCxLQUFLO3VCQUNMLEtBQUs7O0lBK0RSLDRCQUFDO0NBQUEsQUFuRkQsSUFtRkM7U0E3RVkscUJBQXFCOzs7SUFDaEMsOENBQWdEOztJQUNoRCxzQ0FBa0I7O0lBQ2xCLHVDQUF1Qjs7SUFDdkIscUNBQVk7O0lBQ1osOENBQXFCOztJQUNyQixvREFBcUM7O0lBQ3JDLDBDQUFxQzs7SUFDckMsOENBQStCOztJQUMvQiw4Q0FBOEI7O0lBQzlCLHVDQUFrQzs7SUFDbEMseUNBQTBDOztJQUMxQyw2Q0FBc0M7O0lBQ3RDLDBDQUFxRDs7SUFVbkQseUNBQXlDOztJQUN6QywwQ0FBNEI7O0lBQzVCLHFDQUFxQzs7SUFDckMsNkNBQTJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3ksIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgVmlld0VuY2Fwc3VsYXRpb24gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCAqIGFzIEd1aWRlVXRpbHMgZnJvbSAnLi4vdXRpbHMnO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi4vbmctZ3VpZGUtd2Fsay1saWIuc2VydmljZSc7XG5pbXBvcnQgeyBUb3VjaFNlcXVlbmNlIH0gZnJvbSAnc2VsZW5pdW0td2ViZHJpdmVyJztcbmltcG9ydCAncG9wcGVyLmpzJztcbmltcG9ydCBQb3BwZXIgZnJvbSAncG9wcGVyLmpzJztcbmV4cG9ydCB0eXBlIFdhbGtMb2NhdGlvbiA9IFBvcHBlci5QbGFjZW1lbnQ7XG5cbkBDb21wb25lbnQoe1xuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBzZWxlY3RvcjogJ25nLWd1aWRlLWNvbnRlbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZ3VpZGUtY29udGVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2d1aWRlLWNvbnRlbnQuY29tcG9uZW50LnNjc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBHdWlkZUNvbnRlbnRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgY3VycmVudEFjdGlvbjogJ25leHQnIHwgJ3N0b3AnID0gJ25leHQnO1xuICBwcml2YXRlIF9zdGVwID0gMTtcbiAgcHJpdmF0ZSBwb3BwZXI6IFBvcHBlcjtcbiAgc2hvdyA9IHRydWU7XG4gIG92ZXJsYXlPYmplY3QgPSBudWxsO1xuICBASW5wdXQoKSBzaG91bGRDcmVhdGVPdmVybGF5ID0gZmFsc2U7XG4gIEBJbnB1dCgpIG1vZGlmaWVyczogUG9wcGVyLk1vZGlmaWVycztcbiAgQElucHV0KCkgcG9zaXRpb25GaXhlZCA9IGZhbHNlO1xuICBASW5wdXQoKSBldmVudHNFbmFibGVkID0gdHJ1ZTtcbiAgQElucHV0KCkgdGFyZ2V0OiBzdHJpbmcgfCBFbGVtZW50O1xuICBASW5wdXQoKSBsb2NhdGlvbjogV2Fsa0xvY2F0aW9uID0gJ3JpZ2h0JztcbiAgQElucHV0KCkgZGlzcGxheUFycm93OiBib29sZWFuID0gdHJ1ZTtcbiAgQElucHV0KCkgY3VzdG9tQ3NzOiB7IFtrZXk6IHN0cmluZ106IHN0cmluZyB9ID0gbnVsbDtcbiAgQElucHV0KCkgc2V0IHN0ZXAoc3RlcDogbnVtYmVyKSB7XG4gICAgdGhpcy5fc3RlcCA9IEd1aWRlVXRpbHMudG9OdW1iZXIoc3RlcCk7XG4gIH1cbiAgZ2V0IHN0ZXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gIH1cblxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWY8SFRNTEVsZW1lbnQ+LFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICAgcHJpdmF0ZSBob3N0OiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PixcbiAgICBwcml2YXRlIGd1aWRlU2VydmljZTogTmdHdWlkZVdhbGtMaWJTZXJ2aWNlKSB7XG5cbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIHRvZG8gOiBtb3ZlIHRvIGFuIGFjdGlvbiB0cmlnZ2VyIHdoZW4gbmVlZGVkXG5cbiAgICBjb25zdCB7IGxvY2F0aW9uLCBwb3NpdGlvbkZpeGVkLCBldmVudHNFbmFibGVkLCBtb2RpZmllcnMgfSA9IHRoaXM7XG4gIFxuICAgIHRoaXMucG9wcGVyID0gbmV3IFBvcHBlcihcbiAgICAgIHRoaXMuZ2V0Tm9kZSgpLFxuICAgICAgdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uZ3gtZ3VpZGUnKSxcbiAgICAgIDxhbnk+e1xuICAgICAgICBwbGFjZW1lbnQ6IGxvY2F0aW9uLFxuICAgICAgICBwb3NpdGlvbkZpeGVkLFxuICAgICAgICBldmVudHNFbmFibGVkLFxuICAgICAgICBtb2RpZmllcnNcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5wb3BwZXIuZGVzdHJveSgpO1xuICAgIHRoaXMuY2xlYW4oKTtcbiAgfVxuICBuZXh0KCkge1xuICAgIHRoaXMuZ3VpZGVTZXJ2aWNlLm5leHRHdWlkZSgpO1xuXG5cbiAgfVxuICBpc0xhc3QoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ3VpZGVTZXJ2aWNlLmlzTGFzdCh0aGlzLnN0ZXApO1xuICB9XG4gIGRvbmUoKSB7XG4gICAgdGhpcy5ndWlkZVNlcnZpY2Uuc3RvcEd1aWRlKCk7XG4gIH1cbiAgcHJpdmF0ZSBnZXROb2RlKCk6IEVsZW1lbnQge1xuICAgIGlmICh0aGlzLnRhcmdldCkge1xuICAgICAgaWYgKHR5cGVvZiB0aGlzLnRhcmdldCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGhpcy50YXJnZXQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudGFyZ2V0O1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50O1xuICAgIH1cbiAgfVxuICBwcml2YXRlIGNsZWFuKCkge1xuICAgIGlmICghdGhpcy5vdmVybGF5T2JqZWN0KSB7IHJldHVybjsgfVxuICAgIHRoaXMub3ZlcmxheU9iamVjdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG59XG4iXX0=