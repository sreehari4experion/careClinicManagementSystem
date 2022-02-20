import { TestBed } from '@angular/core/testing';

import { LabtTestService } from './labt-test.service';

describe('LabtTestService', () => {
  let service: LabtTestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LabtTestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
