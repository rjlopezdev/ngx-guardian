import { NgxGuardianConfig } from '../../lib/config';
import { NgxGuardianRole } from './roles';
import { defaultManager } from './default-manager';

export const ngxGuardianConfig: NgxGuardianConfig = {
    managers: [
        defaultManager
    ],
    defaultRole: NgxGuardianRole.DEFAULT
};
