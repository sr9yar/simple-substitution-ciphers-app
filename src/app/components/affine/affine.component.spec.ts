import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffineComponent } from './affine.component';

describe('AffineComponent', () => {
  let component: AffineComponent;
  let fixture: ComponentFixture<AffineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AffineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
