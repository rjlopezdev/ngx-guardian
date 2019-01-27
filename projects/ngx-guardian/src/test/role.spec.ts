import { Role } from '../lib/model/role';

describe('Role class', () => {

    it('#construstor should instantiate a role with @name equals to "DEFAULT" ', () => {
        const role: any = new Role('DEFAULT');
        expect(role.name).toBe('DEFAULT');
    });

    it('#construstor should instantiate a role with @name equals to "DEFAULT" ', () => {
        const role = new Role('DEFAULT');
        expect(role.getName()).toBe('DEFAULT');
    });
});
