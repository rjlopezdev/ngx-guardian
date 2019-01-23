<p align="center">
  <img src="ngx-guardian-logo.svg" width="200" height="200">
  <p align="center"> Logo designed by <a href="https://www.behance.net/yomissmar"> Yomissmar </a> </p>
</p>

<h1 align="center"> Ngx Guardian </h1>

<p align="center">
  Empowering your Angular project using a powerful Permission Manager.
  <br>
  <a href="">
    <strong> Explore Wiki » </strong>
  </a>
  <br>
  <br>
  <img src="https://circleci.com/gh/rjlopezdev/ngx-guardian/tree/master.svg?style=svg&circle-token=d5b1a0cd93487254c574765be086e61cc0574b48">
  <br>
  <br>
  <img src="https://img.shields.io/badge/maintainer-rjlopezdev-orange.svg?link=https://github.com/rjlopezdev">
  <img src="https://img.shields.io/badge/ng%20add-compatible-ff69b4.svg">
  <img src="https://img.shields.io/badge/license-MIT-green.svg">
  <br>
  <br>
  <a href="CONTRIBUTING.md"> Contributing </a>
  .
  <a href="LICENSE"> License </a>
</p>

# Summary

* [Installation](#installation)
* [Setup](#setup)
* [Directives Usage](#directives-usage)
* [Service Usage](#service-usage)

# Installation

## Using Angular CLI

    ng add ngx-guardian

## Using npm

* `npm install ngx-guardian --save`

* Follow the [Setup](#setup) & [Permission Specification](#permission-specification) sections

# Setup

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
            // Set a manager by localStorage value (see below)
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
| managers | NgxGuardianManager[] | - | :heavy_check_mark: | Permission Managers for application (with roles & actions over resources)
| defaultRole | string | - | - | Default role to set its manager (if no provided, manager is disabled)
| setFromStorage | boolean | false | - | Set role by localStorage value
| unauthorizedRoute | string | //TO SPECIFY | - | Route to navigate if no manager set
| noGrantedRoute | string | //TO SPECIFY | - | Route to navigate if user has no permissions

# Proposed files structure

```bash
├── src
    └── ngx-guardian
        ├── ngx-roles.ts
        ├── ngx-permissions.ts
        ├── ngx-resources.ts
        ├── ngx-foo-manager.ts
        ├── ...
        └── ngx-other-foo-manager.ts
```

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

2. Define your actions
```typescript
// ngx-permisssions.ts

export enum NgxGuardianAction {
    CREATE = 'CREATE',
    READ = 'READ',
    UPDATE = 'UPDATE',
    DELETE = 'DELETE',
    APPROVE = 'APPROVE',
    REJECT = 'REJECT'
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
import { NgxGuardianAction } from './ngx-permissions';

export const defaultManager: NgxGuardianManager = {
    role: NgxGuardianRole.ADMIN,
    permissions: [
        {
            resource: NgxGuardianResourceType.PASTA,
            actions: [
                NgxGuardianAction.CREATE,
                NgxGuardianAction.READ
            ]
        },
        {
            resource: NgxGuardianResourceType.PIZZA,
            actions: [
                NgxGuardianAction.CREATE,
                NgxGuardianAction.READ
            ]
        }
    ]
}
```

# Directives usage

___The purpose__ of ngx-guardian directives is to simplify the logic of the templates designed to __show, hide or modify the components or HTML code blocks__ according to permissions or user roles.

## ShowIfGranted

This directive __shows or hides__ a html block or component depending on whether a user has permission over a specific resource.

```html
<!-- This component will be shown ONLY IF user has CREATE permission over PIZZA resource -->
<component-to-show-or-hide *ngxShowIfGranted="CREATE - PIZZA">
</component-to-show-or-hide>

<!-- This html block will be shown ONLY IF user has READ permission over PIZZA resource -->
<div *ngxShowIfGranted="READ - PIZZA">
    <p> Paragraph intended for users with READ permissions over pizza </p>
</div>
```

## DisableIfNoGranted

This directive __enable or disable__ a html block or component depending on whether a user has permission over a specific resource.


```html
<!-- This component will be set disabled IF user HAS NOT CREATE permission over PIZZA resource -->
<component-to-show-or-hide *ngxDisableIfNoGranted="READ - PIZZA">
</component-to-show-or-hide>

<!-- This html block will be set disabled IF user HAS NOT READ permission over PIZZA resource -->
<button *ngxShowIfGranted="UPDATE - PIZZA">
    Update pizza toppings
</button>
```


# Service usage

__The purpose__ of the Permission Service is to __offer an interface for communication__ with the permission manager.
