import { TestBed } from '@angular/core/testing';

import { MtmService } from './mtm.service';

describe('MtmService', () => {
  let service: MtmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
