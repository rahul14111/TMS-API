import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevTasksComponent } from './dev-tasks.component';

describe('DevTasksComponent', () => {
  let component: DevTasksComponent;
  let fixture: ComponentFixture<DevTasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DevTasksComponent]
    });
    fixture = TestBed.createComponent(DevTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
