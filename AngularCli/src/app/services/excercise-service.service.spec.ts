import { TestBed, inject } from '@angular/core/testing';

import { ExcerciseServiceService } from './excercise-service.service';

describe('ExcerciseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ExcerciseServiceService]
    });
  });

  it('should be created', inject([ExcerciseServiceService], (service: ExcerciseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
