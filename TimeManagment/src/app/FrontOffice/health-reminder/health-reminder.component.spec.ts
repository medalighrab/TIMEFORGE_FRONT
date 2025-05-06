import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthReminderComponent } from './health-reminder.component';

describe('HealthReminderComponent', () => {
  let component: HealthReminderComponent;
  let fixture: ComponentFixture<HealthReminderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HealthReminderComponent]
    });
    fixture = TestBed.createComponent(HealthReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
