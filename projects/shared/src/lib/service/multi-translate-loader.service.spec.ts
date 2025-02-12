import { TestBed } from '@angular/core/testing';

import { MultiTranslateLoaderService } from './multi-translate-loader.service';

describe('MultiTranslateLoaderService', () => {
  let service: MultiTranslateLoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MultiTranslateLoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
