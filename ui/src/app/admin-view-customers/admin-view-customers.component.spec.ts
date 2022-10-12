import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewCustomersComponent } from './admin-view-customers.component';

describe('AdminViewCustomersComponent', () => {
  let component: AdminViewCustomersComponent;
  let fixture: ComponentFixture<AdminViewCustomersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewCustomersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewCustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
