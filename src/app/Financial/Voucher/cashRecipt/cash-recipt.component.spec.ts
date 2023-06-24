import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReciptComponent } from './cash-recipt.component';

describe('CashReciptComponent', () => {
  let component: CashReciptComponent;
  let fixture: ComponentFixture<CashReciptComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashReciptComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashReciptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
