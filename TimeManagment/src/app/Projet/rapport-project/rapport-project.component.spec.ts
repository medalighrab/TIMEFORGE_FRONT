import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportProjectComponent } from './rapport-project.component';

describe('RapportProjectComponent', () => {
  let component: RapportProjectComponent;
  let fixture: ComponentFixture<RapportProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RapportProjectComponent]
    });
    fixture = TestBed.createComponent(RapportProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
