import { TestBed } from '@angular/core/testing';

import { TimeManagementTechniquesService } from './time-management-techniques.service';

describe('TimeManagementTechniquesService', () => {
  let service: TimeManagementTechniquesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeManagementTechniquesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
