import { NgxGuardianManager } from 'ngx-guardian';
import { NgxGuardianRole } from './roles';
import { FOO } from './resources';
import { NgxGuardianAction } from './actions';


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
