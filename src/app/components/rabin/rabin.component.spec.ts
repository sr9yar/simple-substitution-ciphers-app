import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RabinComponent } from './rabin.component';

describe('RabinComponent', () => {
  let component: RabinComponent;
  let fixture: ComponentFixture<RabinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RabinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RabinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
