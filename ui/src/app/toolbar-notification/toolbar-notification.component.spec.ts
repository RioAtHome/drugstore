import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarNotificationComponent } from './toolbar-notification.component';

describe('ToolbarNotificationComponent', () => {
  let component: ToolbarNotificationComponent;
  let fixture: ComponentFixture<ToolbarNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarNotificationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
