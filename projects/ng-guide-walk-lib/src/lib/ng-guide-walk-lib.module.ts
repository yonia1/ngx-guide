import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';
import { NgGuideStepDirective } from './ng-guide-step.directive';
import { GuideContentComponent } from './guide-content/guide-content.component';

@NgModule({
  imports: [
    CommonModule
  ],
  entryComponents: [GuideContentComponent],
  declarations: [NgGuideWalkLibComponent,
    NgGuideStepDirective,
    GuideContentComponent],
  exports: [
    NgGuideWalkLibComponent,
    NgGuideStepDirective,
    GuideContentComponent]
})
export class NgGuideWalkLibModule { }
