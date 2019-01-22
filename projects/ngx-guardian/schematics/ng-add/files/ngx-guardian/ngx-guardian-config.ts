import { NgxGuardianConfig } from 'ngx-guardian';
import { NgxGuardianRole } from './ngx-guardian-roles';

export const ngxGuardianConfig: NgxGuardianConfig = {
    managers: [],
    defaultRole: NgxGuardianRole.DEFAULT,
    /**
     * Remove this comment to set a default role from localStorage variable 'ngx-guardian-role'
     */
    // setFromStorage: true,
    /**
     * Remove this comment to set route to navigate if user is no auth (default: '/no-auth')
     */
    // unauthorizedRoute: '',
    /**
     * Remove this comment to set route to navigate if user has no permissions (default: '/no-granted')
     */
    // noGrantedRoute: ''
};
