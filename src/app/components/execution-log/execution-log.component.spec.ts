import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutionLogComponent } from './execution-log.component';

describe('ExecutionLogComponent', () => {
  let component: ExecutionLogComponent;
  let fixture: ComponentFixture<ExecutionLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutionLogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutionLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
