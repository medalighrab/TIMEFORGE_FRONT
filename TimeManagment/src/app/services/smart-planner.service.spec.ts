import { TestBed } from '@angular/core/testing';

import { SmartPlannerService } from './smart-planner.service';

describe('SmartPlannerService', () => {
  let service: SmartPlannerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartPlannerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
