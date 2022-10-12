import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewDrugsComponent } from './admin-view-drugs.component';

describe('AdminViewDrugsComponent', () => {
  let component: AdminViewDrugsComponent;
  let fixture: ComponentFixture<AdminViewDrugsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminViewDrugsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewDrugsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
