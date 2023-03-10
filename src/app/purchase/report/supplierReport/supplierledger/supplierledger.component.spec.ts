import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierledgerComponent } from './supplierledger.component';

describe('SupplierledgerComponent', () => {
  let component: SupplierledgerComponent;
  let fixture: ComponentFixture<SupplierledgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplierledgerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplierledgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
