import { TestBed } from '@angular/core/testing';

import { ClassementProviderService } from './classement-provider.service';

describe('ClassementProviderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ClassementProviderService = TestBed.get(ClassementProviderService);
    expect(service).toBeTruthy();
  });
});
