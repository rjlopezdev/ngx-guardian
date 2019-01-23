import { NgxGuardianManager } from 'ngx-guardian';
import { NgxGuardianRole } from './ngx-guardian-roles';
import { FOO } from './ngx-guardian-resources';
import { NgxGuardianAction } from './ngx-actions';


export const defaultManager: NgxGuardianManager = {
    role: NgxGuardianRole.DEFAULT,
    permissions: [
        {
            resource: FOO,
            actions: [
                NgxGuardianAction.CREATE,
                NgxGuardianAction.READ
            ]
        }
    ]
};
