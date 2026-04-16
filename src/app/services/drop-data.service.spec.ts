import { TestBed } from '@angular/core/testing';

import { DropDataService } from './drop-data.service';

describe('DropDataService', () => {
  let service: DropDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DropDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
