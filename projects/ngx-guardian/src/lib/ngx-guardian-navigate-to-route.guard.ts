import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxGuardianService } from './ngx-guardian.service';
import { Statement } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class NgxGuardianNavigateToRouteGuard implements CanActivate {

  constructor(
    private permissionManager: NgxGuardianService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.permissionManager.isEnabled) {
      if (this.isGranted(state.url)) {
        return true;
      } else {
        this.router.navigate(['/no-granted']);
        return false;
      }
    } else if (this.isGranted(state.url)) {
      return true;
    } else {
      this.router.navigate(['/no-auth']);
      return false;
    }
  }

  isGranted(url): boolean {
    return this.permissionManager.canNavigateTo(url)
    || this.permissionManager.noGrantedRoute === url
    || this.permissionManager.unauthorizedRoute === url;
  }
}
