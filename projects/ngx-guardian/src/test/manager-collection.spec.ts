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
                        resource: 'PASTA',
                        actions: [
                            'CREATE',
                            'DELETE'
                        ]
                    },
                    {
                        resource: 'PIZZA',
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
      expect(collection.managers[0].permissions.get('PASTA')[0].name).toBe('CREATE');
      expect(collection.managers[0].permissions.get('PASTA')[1].name).toBe('DELETE');
      expect(collection.managers[0].permissions.get('PIZZA')[0].name).toBe('CREATE');
      expect(collection.managers[0].permissions.get('PIZZA')[1].name).toBe('READ');

      expect(collection.managers[1].role.name).toBe('DUMMY');
      expect(collection.managers[1].permissions.size).toBe(3);
      expect(collection.managers[1].permissions.get('BURGER')[0].name).toBe('EAT');
      expect(collection.managers[1].permissions.get('BURGER')[1].name).toBe('BUY');
      expect(collection.managers[1].permissions.get('TACO')[0].name).toBe('COOK');
      expect(collection.managers[1].permissions.get('TACO')[1].name).toBe('EAT');
      expect(collection.managers[1].permissions.get('HOT-DOG')[0].name).toBe('THROW');
      expect(collection.managers[1].permissions.get('HOT-DOG')[1].name).toBe('CLEAN');
    });

    it('should return an instace of PermissionManager with role name equals to DUMMY', () => {
        expect(collectionManager.getManagerByRoleName('DUMMY').role.name).toBe('DUMMY');
    });

    it('should return null', () => {
        expect(collectionManager.getManagerByRoleName('NO_ROLE_SET')).toBe(null);
    });
});
