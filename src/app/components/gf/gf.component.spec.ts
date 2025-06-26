import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GfComponent } from './gf.component';

describe('GfComponent', () => {
  let component: GfComponent;
  let fixture: ComponentFixture<GfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GfComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
