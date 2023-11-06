import { TestBed } from '@angular/core/testing';

import { ValidMessagesService } from './valid-messages.service';

describe('ValidMessagesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValidMessagesService = TestBed.get(ValidMessagesService);
    expect(service).toBeTruthy();
  });
});
