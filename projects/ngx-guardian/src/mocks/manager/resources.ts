import { NgxGuardianResource } from '../../lib/ngx-guardian-interfaces';

export const FOO: NgxGuardianResource = {
    name: 'FOO',
    routes: []
};

export const PIZZA: NgxGuardianResource = {
    name: 'PIZZA',
    routes: [
        '/pizza'
    ]
};

export const TACO: NgxGuardianResource = {
    name: 'TACO',
    routes: [
        '/taco'
    ]
};
