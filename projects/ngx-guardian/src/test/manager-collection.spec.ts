import { NgxGuardianManager } from '../lib/ngx-guardian-interfaces';
import { ManagerCollection } from '../lib/model/manager-collection';

let managerData: NgxGuardianManager[];
let collectionManager: any;

describe('ManagerCollecion class', () => {

    beforeEach(() => {
        managerData = [
            {
                role: 'ADMIN',
                permissions: [
                    {
                        resource: {
                            name: 'PASTA',
                            routes: []
                        },
                        actions: [
                            'CREATE',
                            'DELETE'
                        ]
                    },
                    {
                        resource: {
                            name: 'PIZZA',
                            routes: []
                        },
                        actions: [
                            'CREATE',
                            'READ'
                        ]
                    }
                ]
            },
            {
                role: 'DUMMY',
                permissions: [
                    {
                        resource: {
                            name: 'BURGER',
                            routes: []
                        },
                        actions: [
                            'EAT',
                            'BUY'
                        ]
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
                ]
            }
          ];
          collectionManager = new ManagerCollection(managerData);
    });

    it('should create a new ManagerCollection as specification', () => {
      const collection: any = new ManagerCollection(managerData);

      expect(collection.managers.length).toBe(2);

      expect(collection.managers[0].role.name).toBe('ADMIN');
      expect(collection.managers[0].permissions.size).toBe(2);
      expect(collection.managers[0].permissions.get('PASTA')[0]).toBe('CREATE');
      expect(collection.managers[0].permissions.get('PASTA')[1]).toBe('DELETE');
      expect(collection.managers[0].permissions.get('PIZZA')[0]).toBe('CREATE');
      expect(collection.managers[0].permissions.get('PIZZA')[1]).toBe('READ');

      expect(collection.managers[1].role.name).toBe('DUMMY');
      expect(collection.managers[1].permissions.size).toBe(3);
      expect(collection.managers[1].permissions.get('BURGER')[0]).toBe('EAT');
      expect(collection.managers[1].permissions.get('BURGER')[1]).toBe('BUY');
      expect(collection.managers[1].permissions.get('TACO')[0]).toBe('COOK');
      expect(collection.managers[1].permissions.get('TACO')[1]).toBe('EAT');
      expect(collection.managers[1].permissions.get('HOT-DOG')[0]).toBe('THROW');
      expect(collection.managers[1].permissions.get('HOT-DOG')[1]).toBe('CLEAN');
    });

    it('should return an instace of PermissionManager with role name equals to DUMMY', () => {
        expect(collectionManager.getManagerByRoleName('DUMMY').role.name).toBe('DUMMY');
    });

    it('should return null', () => {
        expect(collectionManager.getManagerByRoleName('NO_ROLE_SET')).toBe(null);
    });
});
