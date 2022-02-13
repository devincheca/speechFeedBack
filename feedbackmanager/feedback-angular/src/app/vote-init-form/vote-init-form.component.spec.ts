import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteInitFormComponent } from './vote-init-form.component';

describe('VoteInitFormComponent', () => {
  let component: VoteInitFormComponent;
  let fixture: ComponentFixture<VoteInitFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VoteInitFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteInitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
