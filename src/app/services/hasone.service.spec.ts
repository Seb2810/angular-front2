import { TestBed } from '@angular/core/testing';

import { HasoneService } from './hasone.service';

describe('HasoneService', () => {
  let service: HasoneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HasoneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
