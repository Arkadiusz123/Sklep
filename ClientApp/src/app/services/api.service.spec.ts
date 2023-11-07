import { TestBed } from '@angular/core/testing';

import { ApiService, Product } from './api.service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiService<Product> = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
