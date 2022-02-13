import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackInitFormComponent } from './feedback-init-form.component';

describe('FeedbackInitFormComponent', () => {
  let component: FeedbackInitFormComponent;
  let fixture: ComponentFixture<FeedbackInitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeedbackInitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackInitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
