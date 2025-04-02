import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Base64ToStringComponent } from './base64-to-string.component';

describe('Base64ToStringComponent', () => {
  let component: Base64ToStringComponent;
  let fixture: ComponentFixture<Base64ToStringComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Base64ToStringComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Base64ToStringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
