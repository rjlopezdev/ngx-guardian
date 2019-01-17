import { Role } from './model/role';
import { InjectionToken } from '@angular/core';
import { NgxGuardianManager } from './ngx-guardian-interfaces';

export class NgxGuardianConfig {
    managers: NgxGuardianManager[];
    defaultRole?: string;
    setByCookie?: boolean;
    unauthorizedRoute?: string;
    noGrantedRoute?: string;
}

export const NGX_GUARDIAN_CONFIG = new InjectionToken<NgxGuardianConfig>('NgxGuardianConfig');
