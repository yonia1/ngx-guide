import { Component } from '@angular/core';
import { NgGuideWalkLibService } from 'projects/ng-guide-walk-lib/src/public_api';
import { TestCompComponent } from './test-comp/test-comp.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(private guideSerivce: NgGuideWalkLibService) {
    setTimeout(() => this.guideSerivce.startGuide(), 2000);
  }
  getComp(){
    return TestCompComponent
  }
}
