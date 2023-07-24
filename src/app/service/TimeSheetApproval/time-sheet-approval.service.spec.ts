import { TestBed } from '@angular/core/testing';

import { TimeSheetApprovalService } from './time-sheet-approval.service';

describe('TimeSheetApprovalService', () => {
  let service: TimeSheetApprovalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimeSheetApprovalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
