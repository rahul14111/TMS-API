import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSheetCreateComponent } from './time-sheet-create.component';

describe('TimeSheetCreateComponent', () => {
  let component: TimeSheetCreateComponent;
  let fixture: ComponentFixture<TimeSheetCreateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimeSheetCreateComponent]
    });
    fixture = TestBed.createComponent(TimeSheetCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
