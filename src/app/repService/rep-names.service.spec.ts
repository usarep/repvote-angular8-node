import { TestBed, inject } from '@angular/core/testing';

import { RepNamesService } from './rep-names.service';

describe('RepNamesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepNamesService]
    });
  });

  it('should be created', inject([RepNamesService], (service: RepNamesService) => {
    expect(service).toBeTruthy();
  }));
});
