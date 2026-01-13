import { TestBed } from '@angular/core/testing';

import { OnetomanyService } from './onetomany.service';

describe('OnetomanyService', () => {
  let service: OnetomanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnetomanyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
