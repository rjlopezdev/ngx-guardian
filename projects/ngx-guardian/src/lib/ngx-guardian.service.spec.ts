import { TestBed } from '@angular/core/testing';

import { NgxGuardianService } from './ngx-guardian.service';

xdescribe('NgxGuardianService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxGuardianService = TestBed.get(NgxGuardianService);
    expect(service).toBeTruthy();
  });
});
