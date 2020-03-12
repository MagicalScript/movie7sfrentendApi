import { TestBed, inject } from '@angular/core/testing';

import { IntercopService } from './intercop.service';

describe('IntercopService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IntercopService]
    });
  });

  it('should be created', inject([IntercopService], (service: IntercopService) => {
    expect(service).toBeTruthy();
  }));
});
