import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCurrentOrdersComponent } from './admin-current-orders.component';

describe('AdminCurrentOrdersComponent', () => {
  let component: AdminCurrentOrdersComponent;
  let fixture: ComponentFixture<AdminCurrentOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCurrentOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCurrentOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
