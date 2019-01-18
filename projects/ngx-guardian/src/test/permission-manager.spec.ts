import { PermissionManager } from '../lib/model/permission-manager';
import { Role } from '../lib/model/role';
import { NgxGuardianPermission } from '../lib/ngx-guardian-interfaces';

describe('PermissionManager class', () => {

    let manager: PermissionManager;
    let permissions: NgxGuardianPermission[];
    let role: Role;

    beforeEach(() => {
        permissions = [
            {
                resource: 'BURGER',
                actions: [
                    'EAT',
                    'BUY'
                ]
            },
            {
                resource: 'TACO',
                actions: [
                    'COOK',
                    'EAT'
                ]
            },
            {
                resource: 'HOT-DOG',
                actions: [
                    'THROW',
                    'CLEAN'
                ]
            }
        ];
        role = new Role('DUMMY');
        manager = new PermissionManager(role, permissions);
    });

    it('#constructor should create a PermissionManager instance with role name equals to DUMMY', () => {
        const mng = new PermissionManager(role, permissions);
        expect(mng.getRoleName()).toBe('DUMMY');
    });

    it('#constructor should create a PermissionManager instance with permissions equals to empty Map', () => {
        const mng = new PermissionManager(role, null);
        expect(mng.getPermissions().size).toBe(0);
    });

    it('#getPermissions should return an empty Map', () => {
        manager = new PermissionManager(role, null);
        expect(manager.getPermissions().size).toBe(0);
    });

    it('#getPermissions should return a Map with size equals to 3', () => {
        expect(manager.getPermissions().size).toBe(3);
    });

    it('#getRoleName should return DUMMY', () => {
        expect(manager.getRoleName()).toBe('DUMMY');
    });

    it('#isGranted should return true', () => {
        expect(manager.isGranted('BURGER', 'EAT')).toBeTruthy();
    });

    it('#isGranted should return false', () => {
        expect(manager.isGranted('BURGUER', 'FOO')).toBeFalsy();
    });
});
