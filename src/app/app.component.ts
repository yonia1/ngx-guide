import { Component } from '@angular/core';
import { TestCompComponent } from './test-comp/test-comp.component';
import { NgGuideWalkLibService } from 'ng-guide-walk';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  customStyle = {
    'background-color': 'red',
    'color' : 'green',
    'border-radius': '50%'
  };
  constructor(private guideSerivce: NgGuideWalkLibService) {
    setTimeout(() => this.guideSerivce.startGuide(), 2000);
  }
  getComp(){
    return TestCompComponent
  }
  
}
