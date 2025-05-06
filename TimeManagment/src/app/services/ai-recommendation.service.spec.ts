import { TestBed } from '@angular/core/testing';

import { AiRecommendationService } from './ai-recommendation.service';

describe('AiRecommendationService', () => {
  let service: AiRecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AiRecommendationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
