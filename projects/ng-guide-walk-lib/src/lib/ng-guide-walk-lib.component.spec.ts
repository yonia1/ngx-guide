import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgGuideWalkLibComponent } from './ng-guide-walk-lib.component';

describe('NgGuideWalkLibComponent', () => {
  let component: NgGuideWalkLibComponent;
  let fixture: ComponentFixture<NgGuideWalkLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgGuideWalkLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgGuideWalkLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
