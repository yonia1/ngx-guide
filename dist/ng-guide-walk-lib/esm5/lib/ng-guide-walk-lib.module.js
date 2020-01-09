/**
 * @fileoverview added by tsickle
 * Generated from: lib/ng-guide-walk-lib.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';
import { NgGuideStepDirective } from './ng-guide-step.directive';
import { GuideContentComponent } from './guide-content/guide-content.component';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { CommonModule } from '@angular/common';
var NgGuideWalkLibModule = /** @class */ (function () {
    function NgGuideWalkLibModule() {
    }
    /**
     * @return {?}
     */
    NgGuideWalkLibModule.forRoot = /**
     * @return {?}
     */
    function () {
        return {
            ngModule: NgGuideWalkLibModule,
            providers: [
                {
                    provide: NgGuideWalkLibService,
                    useClass: NgGuideWalkLibService
                }
            ]
        };
    };
    NgGuideWalkLibModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                    ],
                    entryComponents: [GuideContentComponent],
                    declarations: [NgGuideWalkLibComponent,
                        NgGuideStepDirective,
                        GuideContentComponent],
                    exports: [
                        NgGuideWalkLibComponent,
                        NgGuideStepDirective,
                        GuideContentComponent
                    ]
                },] }
    ];
    return NgGuideWalkLibModule;
}());
export { NgGuideWalkLibModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZ3VpZGUtd2Fsay8iLCJzb3VyY2VzIjpbImxpYi9uZy1ndWlkZS13YWxrLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLGVBQWUsQ0FBQzs7QUFFOUQsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDeEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDakUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFaEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFDcEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DO0lBQUE7SUE2QkEsQ0FBQzs7OztJQWRRLDRCQUFPOzs7SUFBZDtRQUVFLE9BQU87WUFDTCxRQUFRLEVBQUUsb0JBQW9CO1lBQzlCLFNBQVMsRUFBRTtnQkFFVDtvQkFDRSxPQUFPLEVBQUUscUJBQXFCO29CQUM5QixRQUFRLEVBQUUscUJBQXFCO2lCQUNoQzthQUVGO1NBQ0YsQ0FBQztJQUNKLENBQUM7O2dCQTVCRixRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7cUJBRWI7b0JBQ0QsZUFBZSxFQUFFLENBQUMscUJBQXFCLENBQUM7b0JBQ3hDLFlBQVksRUFBRSxDQUFDLHVCQUF1Qjt3QkFDcEMsb0JBQW9CO3dCQUNwQixxQkFBcUIsQ0FBQztvQkFDeEIsT0FBTyxFQUFFO3dCQUNQLHVCQUF1Qjt3QkFDdkIsb0JBQW9CO3dCQUNwQixxQkFBcUI7cUJBQUM7aUJBQ3pCOztJQWdCRCwyQkFBQztDQUFBLEFBN0JELElBNkJDO1NBZlksb0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ0d1aWRlV2Fsa0xpYkNvbXBvbmVudCB9IGZyb20gJy4vbmctZ3VpZGUtd2Fsay1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IE5nR3VpZGVTdGVwRGlyZWN0aXZlIH0gZnJvbSAnLi9uZy1ndWlkZS1zdGVwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHdWlkZUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIC8vIEJyb3dzZXJNb2R1bGUsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0d1aWRlQ29udGVudENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW05nR3VpZGVXYWxrTGliQ29tcG9uZW50LFxuICAgIE5nR3VpZGVTdGVwRGlyZWN0aXZlLFxuICAgIEd1aWRlQ29udGVudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ0d1aWRlV2Fsa0xpYkNvbXBvbmVudCxcbiAgICBOZ0d1aWRlU3RlcERpcmVjdGl2ZSxcbiAgICBHdWlkZUNvbnRlbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VpZGVXYWxrTGliTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5nR3VpZGVXYWxrTGliTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG5cbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5nR3VpZGVXYWxrTGliU2VydmljZSxcbiAgICAgICAgICB1c2VDbGFzczogTmdHdWlkZVdhbGtMaWJTZXJ2aWNlXG4gICAgICAgIH1cblxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==