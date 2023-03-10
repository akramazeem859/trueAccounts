import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierbalanceComponent } from './supplierbalance.component';

describe('SupplierbalanceComponent', () => {
  let component: SupplierbalanceComponent;
  let fixture: ComponentFixture<SupplierbalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierbalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierbalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
