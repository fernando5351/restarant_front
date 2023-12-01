import { TestBed } from '@angular/core/testing';

import { PrintsaleService } from './printsale.service';

describe('PrintsaleService', () => {
  let service: PrintsaleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrintsaleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
