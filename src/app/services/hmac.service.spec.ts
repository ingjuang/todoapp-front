import { TestBed } from '@angular/core/testing';

import { HmacService } from './hmac.service';

describe('HmacService', () => {
  let service: HmacService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HmacService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
