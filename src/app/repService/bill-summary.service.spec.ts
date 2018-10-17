import { TestBed, inject } from '@angular/core/testing';

import { BillSummaryService } from './bill-summary.service';

describe('BillSummaryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BillSummaryService]
    });
  });

  it('should be created', inject([BillSummaryService], (service: BillSummaryService) => {
    expect(service).toBeTruthy();
  }));
});
