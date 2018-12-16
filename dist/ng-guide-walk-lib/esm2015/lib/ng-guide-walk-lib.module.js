/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,uselessCode} checked by tsc
 */
import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';
import { NgGuideStepDirective } from './ng-guide-step.directive';
import { GuideContentComponent } from './guide-content/guide-content.component';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';
import { CommonModule } from '@angular/common';
export class NgGuideWalkLibModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: NgGuideWalkLibModule,
            providers: [
                {
                    provide: NgGuideWalkLibService,
                    useClass: NgGuideWalkLibService
                }
            ]
        };
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmctZ3VpZGUtd2Fsay1saWIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmctZ3VpZGUtd2Fsay8iLCJzb3VyY2VzIjpbImxpYi9uZy1ndWlkZS13YWxrLWxpYi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQXVCLE1BQU0sZUFBZSxDQUFDOztBQUU5RCxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUN4RSxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNqRSxPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSx5Q0FBeUMsQ0FBQztBQUVoRixPQUFPLEVBQUUscUJBQXFCLEVBQUUsTUFBTSw2QkFBNkIsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFnQi9DLE1BQU0sT0FBTyxvQkFBb0I7Ozs7SUFDL0IsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPO1lBRUwsUUFBUSxFQUFFLG9CQUFvQjtZQUU5QixTQUFTLEVBQUU7Z0JBRVQ7b0JBQ0UsT0FBTyxFQUFFLHFCQUFxQjtvQkFDOUIsUUFBUSxFQUFFLHFCQUFxQjtpQkFDaEM7YUFFRjtTQUNGLENBQUM7SUFDSixDQUFDOzs7WUE3QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZO2lCQUViO2dCQUNELGVBQWUsRUFBRSxDQUFDLHFCQUFxQixDQUFDO2dCQUN4QyxZQUFZLEVBQUUsQ0FBQyx1QkFBdUI7b0JBQ3BDLG9CQUFvQjtvQkFDcEIscUJBQXFCLENBQUM7Z0JBQ3hCLE9BQU8sRUFBRTtvQkFDUCx1QkFBdUI7b0JBQ3ZCLG9CQUFvQjtvQkFDcEIscUJBQXFCO2lCQUFDO2FBQ3pCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbi8vIGltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ0d1aWRlV2Fsa0xpYkNvbXBvbmVudCB9IGZyb20gJy4vbmctZ3VpZGUtd2Fsay1saWIuY29tcG9uZW50JztcbmltcG9ydCB7IE5nR3VpZGVTdGVwRGlyZWN0aXZlIH0gZnJvbSAnLi9uZy1ndWlkZS1zdGVwLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBHdWlkZUNvbnRlbnRDb21wb25lbnQgfSBmcm9tICcuL2d1aWRlLWNvbnRlbnQvZ3VpZGUtY29udGVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJvd3Nlck1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgTmdHdWlkZVdhbGtMaWJTZXJ2aWNlIH0gZnJvbSAnLi9uZy1ndWlkZS13YWxrLWxpYi5zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgLy8gQnJvd3Nlck1vZHVsZSxcbiAgXSxcbiAgZW50cnlDb21wb25lbnRzOiBbR3VpZGVDb250ZW50Q29tcG9uZW50XSxcbiAgZGVjbGFyYXRpb25zOiBbTmdHdWlkZVdhbGtMaWJDb21wb25lbnQsXG4gICAgTmdHdWlkZVN0ZXBEaXJlY3RpdmUsXG4gICAgR3VpZGVDb250ZW50Q29tcG9uZW50XSxcbiAgZXhwb3J0czogW1xuICAgIE5nR3VpZGVXYWxrTGliQ29tcG9uZW50LFxuICAgIE5nR3VpZGVTdGVwRGlyZWN0aXZlLFxuICAgIEd1aWRlQ29udGVudENvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmdHdWlkZVdhbGtMaWJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuXG4gICAgICBuZ01vZHVsZTogTmdHdWlkZVdhbGtMaWJNb2R1bGUsXG5cbiAgICAgIHByb3ZpZGVyczogW1xuXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOZ0d1aWRlV2Fsa0xpYlNlcnZpY2UsXG4gICAgICAgICAgdXNlQ2xhc3M6IE5nR3VpZGVXYWxrTGliU2VydmljZVxuICAgICAgICB9XG5cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=