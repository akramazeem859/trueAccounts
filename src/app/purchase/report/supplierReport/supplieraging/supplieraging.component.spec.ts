import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplieragingComponent } from './supplieraging.component';

describe('SupplieragingComponent', () => {
  let component: SupplieragingComponent;
  let fixture: ComponentFixture<SupplieragingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SupplieragingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplieragingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
