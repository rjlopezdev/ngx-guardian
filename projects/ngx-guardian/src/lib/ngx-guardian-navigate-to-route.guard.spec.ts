import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';
import { Location } from '@angular/common';
import { NgxGuardianNavigateToRouteGuard } from './ngx-guardian-navigate-to-route.guard';
import { NgxGuardianModule } from './ngx-guardian.module';
import { ngxGuardianConfig } from '../mocks/manager/config';
import { routes } from '../mocks/router/routes';
import { RouterTestingModule } from '@angular/router/testing';
import { EditPizzaComponent } from '../mocks/components/edit-pizza.component';
import { EatTacoComponent } from '../mocks/components/eat-taco.component';
import { Router } from '@angular/router';
import { NgxGuardianService } from './ngx-guardian.service';

describe('NgxGuardianNavigateToRouteGuard', () => {

  let fixture;
  let location: Location;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxGuardianNavigateToRouteGuard],
      declarations: [
        EditPizzaComponent,
        EatTacoComponent,
      ],
      imports: [
        NgxGuardianModule.forRoot(ngxGuardianConfig),
        RouterTestingModule.withRoutes(routes)
      ]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(EditPizzaComponent);
    router.initialNavigation();
  });

  it('should ...', inject([NgxGuardianNavigateToRouteGuard], (guard: NgxGuardianNavigateToRouteGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('should navigate to "/taco"', fakeAsync(() => {
    router.navigate(['/taco']);
    tick();
    expect(location.path()).toBe('/taco');
  }));

  it('should no navigate to "/forbidden" and redirect to "/no-granted"', fakeAsync(() => {
    router.navigate(['/forbidden']);
    tick();
    expect(location.path()).toBe('/no-granted');
  }));

  it('should no navigate to "/forbidden" and redirect to "/no-auth"', fakeAsync(() => {
    const service: NgxGuardianService = TestBed.get(NgxGuardianService);
    service.disableManager();
    router.navigate(['/forbidden']);
    tick();
    expect(location.path()).toBe('/no-auth');
  }));

});
