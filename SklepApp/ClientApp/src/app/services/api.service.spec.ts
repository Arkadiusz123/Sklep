import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';
import { Product } from '../product-form/product-form.component';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiService<Product> = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});
