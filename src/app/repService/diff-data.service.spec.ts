import { TestBed, inject } from '@angular/core/testing';

import { DiffDataService } from './diff-data.service';

describe('DiffDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiffDataService]
    });
  });

  it('should be created', inject([DiffDataService], (service: DiffDataService) => {
    expect(service).toBeTruthy();
  }));
});
