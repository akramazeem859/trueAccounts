import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleReciptComponent } from './sale-recipt.component';

describe('SaleReciptComponent', () => {
  let component: SaleReciptComponent;
  let fixture: ComponentFixture<SaleReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaleReciptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
