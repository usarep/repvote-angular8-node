import { TestBed, inject } from '@angular/core/testing';

import { RepVotesService } from './rep-votes.service';

describe('RepVotesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RepVotesService]
    });
  });

  it('should be created', inject([RepVotesService], (service: RepVotesService) => {
    expect(service).toBeTruthy();
  }));
});
