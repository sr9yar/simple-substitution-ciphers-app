import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RcrComponent } from './rcr.component';

describe('RcrComponent', () => {
  let component: RcrComponent;
  let fixture: ComponentFixture<RcrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RcrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RcrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
