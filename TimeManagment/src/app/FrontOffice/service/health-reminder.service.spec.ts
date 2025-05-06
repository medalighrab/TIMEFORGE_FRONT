import { TestBed } from '@angular/core/testing';

import { HealthReminderService } from './health-reminder.service';

describe('HealthReminderService', () => {
  let service: HealthReminderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HealthReminderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
