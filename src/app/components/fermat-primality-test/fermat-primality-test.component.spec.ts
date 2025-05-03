import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FermatPrimalityTestComponent } from './fermat-primality-test.component';

describe('FermatPrimalityTestComponent', () => {
  let component: FermatPrimalityTestComponent;
  let fixture: ComponentFixture<FermatPrimalityTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FermatPrimalityTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FermatPrimalityTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
