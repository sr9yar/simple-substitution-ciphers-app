import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeFactorsComponent } from './prime-factors.component';

describe('PrimeFactorsComponent', () => {
  let component: PrimeFactorsComponent;
  let fixture: ComponentFixture<PrimeFactorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeFactorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeFactorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
