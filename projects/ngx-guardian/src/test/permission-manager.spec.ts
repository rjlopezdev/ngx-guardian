import { PermissionManager } from '../lib/model/permission-manager';
import { Role } from '../lib/model/role';
import { NgxGuardianPermission } from '../lib/ngx-guardian-interfaces';

describe('PermissionManager class', () => {

    let manager: any;
    let permissions: NgxGuardianPermission[];
    let role: Role;

    beforeEach(() => {
        permissions = [
            {
                resource: {
                    name: 'BURGER',
                    routes: ['/burger']
                },
                actions: [
                    'EAT',
                    'BUY'
                ],
                forbiddenRoutes: ['/forbidden']
            },
            {
                resource: {
                    name: 'TACO',
                    routes: []
                },
                actions: [
                    'COOK',
                    'EAT'
                ]
            },
            {
                resource: {
                    name: 'HOT-DOG',
                    routes: []
                },
                actions: [
                    'THROW',
                    'CLEAN'
                ]
            }
        ];
        role = new Role('DUMMY');
        manager = new PermissionManager(role.getName(), permissions);
    });

    it('#constructor should create a PermissionManager instance with role name equals to DUMMY', () => {
        const mng = new PermissionManager(role.getName(), permissions);
        expect(mng.getRoleName()).toBe('DUMMY');
    });

    it('#constructor should create a PermissionManager instance with permissions equals to empty Map', () => {
        const mng = new PermissionManager(role.getName(), null);
        expect(mng.getPermissions().size).toBe(0);
    });

    it('#getPermissions should return an empty Map', () => {
        manager = new PermissionManager(role.getName(), null);
        expect(manager.getPermissions().size).toBe(0);
    });

    it('#getPermissions should return a Map with size equals to 3', () => {
        expect(manager.getPermissions().size).toBe(3);
    });

    it('#getRoleName should return DUMMY', () => {
        expect(manager.getRoleName()).toBe('DUMMY');
    });

    it('#getPermissions should return permissions set', () => {
        expect(manager.getPermissions()).toEqual(manager.permissions);
    });

    it('#getResources should return resources set', () => {
        expect(manager.getResources()).toEqual(manager.resources);
    });

    it('#isGranted should return true', () => {
        expect(manager.isGranted('BURGER', 'EAT')).toBeTruthy();
    });

    it('#isGranted should return false', () => {
        expect(manager.isGranted('BURGUER', 'FOO')).toBeFalsy();
    });

    it('#canNavigateTo should return "true" when @url equals to "/burger"', () => {
        expect(manager.canNavigateTo('/burger')).toBeTruthy();
    });

    it('#canNavigateTo should return false when @url equals to "/forbidden"', () => {
        expect(manager.canNavigateTo('/forbidden')).toBeFalsy();
    });

    it('#canNavigateTo should return false when @url equals to "/UNKNOWN"', () => {
        expect(manager.canNavigateTo('/UNKNOWN')).toBeFalsy();
    });

    it('#canNavigateTo should return false when @url equals to null', () => {
        expect(manager.canNavigateTo('/UNKNOWN')).toBeFalsy();
    });
});
