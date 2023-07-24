import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAssignmentComponent } from './task-assignment.component';

describe('TaskAssignmentComponent', () => {
  let component: TaskAssignmentComponent;
  let fixture: ComponentFixture<TaskAssignmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskAssignmentComponent]
    });
    fixture = TestBed.createComponent(TaskAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
