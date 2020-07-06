import { Action } from '../lib/model/action';

describe('Action class', () => {
  it('#construstor should instantiate an action with @name equals to "READ" ', () => {
    const action: any = new Action('CREATE');
    expect(action.name).toBe('CREATE');
  });

  it('#construstor should instantiate a role with @name equals to "DEFAULT" ', () => {
    const action = new Action('CREATE');
    expect(action.getName()).toBe('CREATE');
  });
});
