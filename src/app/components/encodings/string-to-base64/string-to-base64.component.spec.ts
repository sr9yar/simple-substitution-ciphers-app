import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringToBase64Component } from './string-to-base64.component';

describe('StringToBase64Component', () => {
  let component: StringToBase64Component;
  let fixture: ComponentFixture<StringToBase64Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StringToBase64Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringToBase64Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
