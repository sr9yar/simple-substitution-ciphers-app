import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaesarComponent } from './caesar.component';

describe('CaesarComponent', () => {
  let component: CaesarComponent;
  let fixture: ComponentFixture<CaesarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaesarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaesarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
