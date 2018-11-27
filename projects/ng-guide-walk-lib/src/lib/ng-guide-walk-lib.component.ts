import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ng-guide-walk',
  template: `
    <p>
      ng-guide-walk-lib works!
    </p>
    <ng-content></ng-content>
  `,
  styles: []
})
export class NgGuideWalkLibComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
