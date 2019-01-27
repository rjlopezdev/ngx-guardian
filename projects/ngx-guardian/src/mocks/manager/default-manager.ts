import { NgxGuardianManager } from '../../lib/ngx-guardian-interfaces';
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
