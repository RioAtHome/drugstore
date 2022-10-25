import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivedOrdersComponent } from './archived-orders.component';

describe('ArchivedOrdersComponent', () => {
  let component: ArchivedOrdersComponent;
  let fixture: ComponentFixture<ArchivedOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivedOrdersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivedOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
