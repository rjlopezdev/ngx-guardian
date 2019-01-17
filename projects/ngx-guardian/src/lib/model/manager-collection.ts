import { PermissionManager } from './permission-manager';
import { Role } from './role';
import { NgxGuardianManager } from 'ngx-guardian/public_api';

/**
 * Collection of available managers
 */
export class ManagerCollection {

    /**
     * Permission Manager list
     */
    private managers: PermissionManager[] = [];

    /**
     * Creates a new collection of PermissionManager's
     * @param managers list of PermissionManager's
     */
    constructor(managers: NgxGuardianManager[]) {
        for (const manager of managers) {
            this.managers.push(
                new PermissionManager(new Role(manager.role), manager.permissions)
            );
        }
    }

    /**
     * Return a PermissionManager whose Role is provided
     * If no role matched, return null
     * @param role Role name
     * @returns PermissionManager
     */
    public getManagerByRoleName(role: string): PermissionManager {
        const manager = this.managers.filter((mng) => mng.getRoleName() === role);
        return (manager.length) ? manager[0] : null;
    }
}
