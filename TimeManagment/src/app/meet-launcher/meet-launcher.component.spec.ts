import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetLauncherComponent } from './meet-launcher.component';

describe('MeetLauncherComponent', () => {
  let component: MeetLauncherComponent;
  let fixture: ComponentFixture<MeetLauncherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MeetLauncherComponent]
    });
    fixture = TestBed.createComponent(MeetLauncherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
