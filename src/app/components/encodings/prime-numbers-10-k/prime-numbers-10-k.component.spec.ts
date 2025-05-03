import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNumbers10KComponent } from './prime-numbers-10-k.component';

describe('PrimeNumbers10KComponent', () => {
  let component: PrimeNumbers10KComponent;
  let fixture: ComponentFixture<PrimeNumbers10KComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNumbers10KComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeNumbers10KComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
