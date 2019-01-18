<p align="center">
  <img src="ngx-guardian-logo.png">
</p>

<h1 align="center"> Ngx Guardian </h1>

<p align="center">
  Empowering your Angular project using a powerful Permission Manager.
  <br>
  <a href="https://getbootstrap.com/docs/4.2/"><strong>Explore Wiki »</strong></a>
</p>

# Installation

`npm install ngx-guardian --save`

# Set up

In your App Module:

```typescript
@NgModule({
    declarations: [. . .],
    providers: [. . .],
    imports: [
        NgxGuardianModule.forRoot({
            // Set up your managers here (see Permission specification)
            managers: [
                fooPermissionManager,
                otherFooPermissionManager,
                ...
            ],
            // Manager role to set its manager as default
            defaultRole: Role.ROLE_NAME,
            // Set a manager by cookie value (see below)
            setFromStorage: true,
            // Navigate to this route if no role set
            unauthorizedRoute: '/no-auth',
            // Navigate to this route if user is no granted for route
            noGrantedRoute: '/no-granted'
        })
    ],
    exports: [. . .]
})
export class AppModule { }
```

You can delegate default manager setup to NgxGuardian setting a role in localStorage:

```typescript
localStorage.setItem('ngx-guardian-role', 'ROLE_NAME');
```

## forRoot() Config

| Name | Type | Default | Required | Description |
| --- | --- | :---: | :---: | --- |
| managers | NgxGuardianManager[] | - | :heavy_check_mark: | Permission Managers for application (with roles & permissions over resources)
| defaultRole | string | - | - | Default role to set its manager (if no provided, manager is disabled)
| setFromStorage | boolean | false | - | Set role by cookie value
| unauthorizedRoute | string | //TO SPECIFY | - | Route to navigate if no manager set
| noGrantedRoute | string | //TO SPECIFY | - | Route to navigate if user has no permissions


# Permission specification

1. Define your roles
```typescript
// ngx-roles.ts

export enum NgxGuardianRole {
    ADMIN = 'ADMIN',
    DEFAULT = 'DEFAULT',
    ONLY_VIEW = 'ONLY_VIEW'
}
```

2. Define your permissions
```typescript
// ngx-permisssions.ts

export enum NgxGuardianPermissionType {
    CREATE = 'CREATE',
    READ = 'READ'
}
```

3. Define your resources
```typescript
// ngx-resources.ts

import { NgxGuardianResource } from 'ngx-guardian';

export enum NgxGuardianResourceType {
    PIZZA = 'PIZZA',
    PASTA = 'PASTA',
}

export const resources: NgxGuardianResource[] = [
    {
        name: NgxGuardianResourceType.PASTA,
        routes: []
    },
        {
        name: NgxGuardianResourceType.PIZZA,
        routes: []
    }
]
```

4. Define your permission managers
```typescript
//ngx-foo-manager.ts

import { NgxGuardianManager } from 'ngx-guardian';
import { NgxGuardianRole } from './ngx-role';
import { NgxGuardianResourceType } from './ngx-resources';
import { NgxGuardianPermissionType } from './ngx-permissions';

export const defaultManager: NgxGuardianManager = {
    role: NgxGuardianRole.ADMIN,
    permissions: [
        {
            resource: NgxGuardianResourceType.PASTA,
            actions: [
                NgxGuardianPermissionType.CREATE,
                NgxGuardianPermissionType.READ
            ]
        },
        {
            resource: NgxGuardianResourceType.PIZZA,
            actions: [
                NgxGuardianPermissionType.CREATE,
                NgxGuardianPermissionType.READ
            ]
        }
    ]
}
```
