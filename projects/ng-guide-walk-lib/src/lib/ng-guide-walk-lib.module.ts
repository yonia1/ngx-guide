import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';
import { NgGuideStepDirective } from './ng-guide-step.directive';
import { GuideContentComponent } from './guide-content/guide-content.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';

@NgModule({
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
    GuideContentComponent]
})
export class NgGuideWalkLibModule {
  static forRoot(): ModuleWithProviders {
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
