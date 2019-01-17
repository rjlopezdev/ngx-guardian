import { Resource } from './resource';
import { Permission } from './permission';
import { Role } from './role';
import { NgxGuardianPermission } from '../ngx-guardian-interfaces';

/**
 * Represents a Manager of permissions for a role
 */
export class PermissionManager {

    /**
     * Role for manager
     */
    private role: Role;
    /**
     * A list of available permissions for a @property role
     */
    private permissions: Map<string, Permission[]> = new Map<string, Permission[]>();

    /**
     * Creates a new permission manager with permissions for a role provided
     * @param role Role for manager
     * @param permissions Permissions for manager
     */
    constructor(role: Role, permissions: NgxGuardianPermission[]) {
        this.role = role;
        for (const permission of permissions) {
            const permissionsToAdd: Permission[] = [];
            for (const action of permission.actions) {
                permissionsToAdd.push(new Permission(action));
            }
            this.permissions.set(permission.resource, permissionsToAdd);
        }
    }

    /**
     * Return permission Map (resourceName, Permission)
     */
    public getPermissions(): Map<string, Permission[]> {
        return this.permissions;
    }

    /**
     * Return a role name
     */
    public getRoleName(): string {
        return this.role.getName();
    }

    /**
     * If user is granted for the permission of the resource provided returns true
     * If not, return false
     * @param resourceName name of resource
     * @param permissionName name of permission
     */
    public isGranted(resourceName: string, permissionName: string): boolean {
        let isGranted = false;
        if (this.permissions.get(resourceName)) {
            for (const permission of this.permissions.get(resourceName) as Permission[]) {
                if (permission.getName() === permissionName) {
                    isGranted = true;
                    break;
                }
            }
        }
        return isGranted;
    }
}
