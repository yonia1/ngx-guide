/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';
import { NgGuideStepDirective } from './ng-guide-step.directive';
import { GuideContentComponent } from './guide-content/guide-content.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
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
                        BrowserModule,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZ3VpZGUtd2Fsay8iLCJzb3VyY2VzIjpbImxpYi9uZy1ndWlkZS13YWxrLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUNoRixPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDMUQsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sNkJBQTZCLENBQUM7QUFFcEU7SUFBQTtJQThCQSxDQUFDOzs7O0lBZlEsNEJBQU87OztJQUFkO1FBQ0UsT0FBTztZQUVMLFFBQVEsRUFBRSxvQkFBb0I7WUFFOUIsU0FBUyxFQUFFO2dCQUVUO29CQUNFLE9BQU8sRUFBRSxxQkFBcUI7b0JBQzlCLFFBQVEsRUFBRSxxQkFBcUI7aUJBQ2hDO2FBRUY7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBN0JGLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsWUFBWTt3QkFDWixhQUFhO3FCQUNkO29CQUNELGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO29CQUN4QyxZQUFZLEVBQUUsQ0FBQyx1QkFBdUI7d0JBQ3BDLG9CQUFvQjt3QkFDcEIscUJBQXFCLENBQUM7b0JBQ3hCLE9BQU8sRUFBRTt3QkFDUCx1QkFBdUI7d0JBQ3ZCLG9CQUFvQjt3QkFDcEIscUJBQXFCO3FCQUFDO2lCQUN6Qjs7SUFpQkQsMkJBQUM7Q0FBQSxBQTlCRCxJQThCQztTQWhCWSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSwgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nR3VpZGVXYWxrTGliQ29tcG9uZW50IH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgTmdHdWlkZVN0ZXBEaXJlY3RpdmUgfSBmcm9tICcuL25nLWd1aWRlLXN0ZXAuZGlyZWN0aXZlJztcbmltcG9ydCB7IEd1aWRlQ29udGVudENvbXBvbmVudCB9IGZyb20gJy4vZ3VpZGUtY29udGVudC9ndWlkZS1jb250ZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBCcm93c2VyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UgfSBmcm9tICcuL25nLWd1aWRlLXdhbGstbGliLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEJyb3dzZXJNb2R1bGUsXG4gIF0sXG4gIGVudHJ5Q29tcG9uZW50czogW0d1aWRlQ29udGVudENvbXBvbmVudF0sXG4gIGRlY2xhcmF0aW9uczogW05nR3VpZGVXYWxrTGliQ29tcG9uZW50LFxuICAgIE5nR3VpZGVTdGVwRGlyZWN0aXZlLFxuICAgIEd1aWRlQ29udGVudENvbXBvbmVudF0sXG4gIGV4cG9ydHM6IFtcbiAgICBOZ0d1aWRlV2Fsa0xpYkNvbXBvbmVudCxcbiAgICBOZ0d1aWRlU3RlcERpcmVjdGl2ZSxcbiAgICBHdWlkZUNvbnRlbnRDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5nR3VpZGVXYWxrTGliTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVycyB7XG4gICAgcmV0dXJuIHtcblxuICAgICAgbmdNb2R1bGU6IE5nR3VpZGVXYWxrTGliTW9kdWxlLFxuXG4gICAgICBwcm92aWRlcnM6IFtcblxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogTmdHdWlkZVdhbGtMaWJTZXJ2aWNlLFxuICAgICAgICAgIHVzZUNsYXNzOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2VcbiAgICAgICAgfVxuXG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19