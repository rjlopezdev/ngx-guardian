import { NgxGuardianResource } from 'ngx-guardian';

export enum NgxGuardianResourceType {
    FOO = 'FOO',
}

export const resources: NgxGuardianResource[] = [
    {
        name: NgxGuardianResourceType.FOO,
        routes: []
    }
];
