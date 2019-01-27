import { Resource } from '../lib/model/resource';

describe('Resource class', () => {

    it('#construstor should instantiate a resource with @name equals to "PIZZA" and @routes equals to ["/pizza", "/pizza/edit"]', () => {
        const resource: any = new Resource('PIZZA', ['/pizza', '/pizza/edit']);
        expect(resource.name).toBe('PIZZA');
        expect(resource.routes).toEqual(['/pizza', '/pizza/edit']);
    });

    it('#hasRoute should return "true" if @route provided equals to "/pizza"', () => {
        const resource = new Resource('PIZZA', ['/pizza', '/pizza/edit']);
        expect(resource.hasRoute('/pizza')).toBeTruthy();
    });

    it('#hasRoute should return "false" if @route provided equals to "null"', () => {
        const resource = new Resource('PIZZA', ['/pizza', '/pizza/edit']);
        expect(resource.hasRoute(null)).toBeFalsy();
    });

    it('#hasRoute should return "false" if @route provided equals to "/unknown"', () => {
        const resource = new Resource('PIZZA', ['/pizza', '/pizza/edit']);
        expect(resource.hasRoute('/unknown')).toBeFalsy();
    });
});
