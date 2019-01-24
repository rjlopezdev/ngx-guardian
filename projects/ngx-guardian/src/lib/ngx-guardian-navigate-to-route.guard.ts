import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { NgxGuardianService } from './ngx-guardian.service';

@Injectable({
  providedIn: 'root'
})
export class NgxGuardianNavigateToRouteGuard implements CanActivate {

  constructor(private permissionManager: NgxGuardianService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.permissionManager.canNavigateTo(next.url.toString());
  }
}
