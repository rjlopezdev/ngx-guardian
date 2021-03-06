import { Resource } from './resource';
import { Action } from './action';
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
     * A Map that links resource name with its available actions
     */
    private permissions: Map<string, string[]> = new Map<string, string[]>();
    /**
     * A list of available resources
     */
    private resources: Resource[] = [];
    /**
     * A list of available actions
     */
    private actions: Action[] = [];
    /**
     * A list of forbidden routes
     */
    private forbiddenRoutes: string[] = [];

    /**
     * Creates a new permission manager with permissions for a role provided
     * @param role Role for manager
     * @param permissions Permissions for manager
     */
    constructor(role: string, permissions: NgxGuardianPermission[]) {
        this.role = new Role(role);
        if (permissions) {
            for (const permission of permissions) {
                for (const action of permission.actions) {
                    this.actions.push(new Action(action));
                }
                if (permission.forbiddenRoutes) {
                    for (const forbiddenRoute of permission.forbiddenRoutes) {
                        this.forbiddenRoutes.push(forbiddenRoute);
                    }
                }
                this.resources.push(new Resource(permission.resource.name, permission.resource.routes));
                this.permissions.set(permission.resource.name, permission.actions);
            }
        }
    }

    /**
     * Return permission Map (resourceName, Permission)
     */
    public getPermissions(): Map<string, string[]> {
        return this.permissions;
    }

    /**
     * Return a role name
     */
    public getRoleName(): string {
        return this.role.getName();
    }

    /**
     * Return permissions
     * @returns a list of permissions
     */
    public getResources(): Resource[] {
        return this.resources;
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
            for (const permission of this.permissions.get(resourceName)) {
                if (permission === permissionName) {
                    isGranted = true;
                    break;
                }
            }
        }
        return isGranted;
    }

    public canNavigateTo(url: string) {
        if (this.forbiddenRoutes.includes(url)) {
            return false;
        }
        for (const resource of this.resources) {
            if (resource.hasRoute(url)) {
                return true;
            }
        }
        return false;
    }
}
