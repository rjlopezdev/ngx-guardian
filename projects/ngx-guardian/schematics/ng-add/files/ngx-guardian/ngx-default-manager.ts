import { NgxGuardianManager } from 'ngx-guardian';
import { NgxGuardianRole } from './ngx-guardian-roles';
import { NgxGuardianResourceType } from './ngx-guardian-resources';
import { NgxGuardianAction } from './ngx-actions';


export const defaultManager: NgxGuardianManager = {
    role: NgxGuardianRole.DEFAULT,
    permissions: [
        {
            resource: NgxGuardianResourceType.FOO,
            actions: [
                NgxGuardianAction.CREATE,
                NgxGuardianAction.READ
            ]
        }
    ]
};
