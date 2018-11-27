import { TestBed, inject } from '@angular/core/testing';

import { NgGuideWalkLibService } from './ng-guide-walk-lib.service';

describe('NgGuideWalkLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgGuideWalkLibService]
    });
  });

  it('should be created', inject([NgGuideWalkLibService], (service: NgGuideWalkLibService) => {
    expect(service).toBeTruthy();
  }));
});
