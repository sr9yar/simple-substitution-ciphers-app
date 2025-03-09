import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffineRecurrentComponent } from './affine-recurrent.component';

describe('AffineRecurrentComponent', () => {
  let component: AffineRecurrentComponent;
  let fixture: ComponentFixture<AffineRecurrentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffineRecurrentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffineRecurrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
