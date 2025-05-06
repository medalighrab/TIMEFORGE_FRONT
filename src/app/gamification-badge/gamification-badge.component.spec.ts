import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamificationBadgeComponent } from './gamification-badge.component';

describe('GamificationBadgeComponent', () => {
  let component: GamificationBadgeComponent;
  let fixture: ComponentFixture<GamificationBadgeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GamificationBadgeComponent]
    });
    fixture = TestBed.createComponent(GamificationBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
