import { TestBed, async, inject } from '@angular/core/testing';

import { NgxGuardianNavigateToRouteGuard } from './ngx-guardian-navigate-to-route.guard';

xdescribe('NgxGuardianNavigateToRouteGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxGuardianNavigateToRouteGuard]
    });
  });

  it('should ...', inject([NgxGuardianNavigateToRouteGuard], (guard: NgxGuardianNavigateToRouteGuard) => {
    expect(guard).toBeTruthy();
  }));
});
