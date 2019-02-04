# Contributing to Ngx Guardian

## Setup environment

* Fork repository
* Clone repo:

    `git clone <yor_fork_repo_url>`

* Setup project:

    `npm install`

    `ng build --watch`

    _Now project is running_

* Init testing app:
    * Download [demo app](TODO) from Stackblitz
    * Setup as a normal Angular Project
    * Remove __ngx-guardian__ from package.json dependencies
    * Run `npm link ngx-guardian` to link dev library

    _Now testing app is running and listening changes from ngx-guardian dev environment_

## Commit Format & Rules

In favor of readability, please follow the following rules & formats:

    prefix(scope): <descriptive message>

### Prefixes

| Prefix | Description |
| :---: | --- |
| __feat__ | A new feature
| __fix__ | A bug fix
| __docs__ | A change over project documentation
| __style__ | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
| __test__ | Adding missing tests or correcting existing tests
| __perf__ | A code change that improves performance
| __refact__ | Impprove code quality
| __ci__ | Changes over Cicle CI configuration

### Scopes

| Scope | Description |
| :---: | --- |
| __model__ | Changes over `/models`
| __directive__ | Changes over `/directives` 
| __service__ | Changes over `ngx-guardian.service.ts`
| __guard__ | Changes over `ng-guardian-navigate-to-route.guard.ts`
| __schematic__ | Changes over `/schematics`
| __config__ | Project configuration (`package.json`, `config.yml` or other config files)
| __readme__ | Changes over README.md
| __contrib__ | Changes over CONTRIBUTING.md

### Examples

* `feat(model): add property 'hide' to Role class`

* `fix(directive): expected behavior for null values`

* `docs(service): impprove foo method documentation`

* `ci(config): new step to build proccess`

## Submitting a Pull Request

1. Apply changes and commit

    _Notice that project is configured with the following pre-hooks:_
    * __pre-commit__: before commit changes, TSLint is executed _(ng lint)_
    * __pre-push__: before push changes to origin, unit testing are executed _(ng test)_

2. Open new _Pull Request_ to `rjlopezdev/ngx-guardian > origin/v1.x.x` with the following considerations:
    * Pull Request title __must be concise & understandable__
    * Description should be according the following format _(Markdown)_:
        ```markdown
        _The main purpose of this PR is <explanation>_

        # Docs | Model | Directive | Service | Guard | Component | Test | CI

        * Feature | Fix | Performance | Refactor | Test : <descriptive_message>
        * ...
        ...
        ```
        Example:
        ```markdown
        _The main purpose of this PR is to add a new awesome thing to the FooDirective_

        # Directives

        * Feature : add new method for do new awesome thing to FooDirective
        * Refactor: extract method doCommomSomething() from FooClass

        # Docs

        * Feature : add new docs for new awesome thing
        * Fix : spelling error in README.md
        ```
