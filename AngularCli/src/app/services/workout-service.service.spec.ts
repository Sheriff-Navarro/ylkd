import { TestBed, inject } from '@angular/core/testing';

import { WorkoutServiceService } from './workout-service.service';

describe('WorkoutServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkoutServiceService]
    });
  });

  it('should be created', inject([WorkoutServiceService], (service: WorkoutServiceService) => {
    expect(service).toBeTruthy();
  }));
});
