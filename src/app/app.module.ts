import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgGuideWalkLibModule } from 'projects/ng-guide-walk-lib/src/public_api';
import { TestCompComponent } from './test-comp/test-comp.component';


@NgModule({
  declarations: [
    AppComponent,
    TestCompComponent
  ],
  imports: [
    BrowserModule,
    NgGuideWalkLibModule
  ],
  entryComponents:[TestCompComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  
 }
