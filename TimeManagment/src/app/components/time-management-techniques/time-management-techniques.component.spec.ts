import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeManagementTechniquesComponent } from './time-management-techniques.component';

describe('TimeManagementTechniquesComponent', () => {
  let component: TimeManagementTechniquesComponent;
  let fixture: ComponentFixture<TimeManagementTechniquesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeManagementTechniquesComponent]
    });
    fixture = TestBed.createComponent(TimeManagementTechniquesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
