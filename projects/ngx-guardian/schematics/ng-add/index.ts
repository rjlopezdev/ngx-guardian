import {
  Rule,
  SchematicContext,
  Tree,
  chain,
  mergeWith,
  template,
  move,
  MergeStrategy,
  apply,
  url,
  noop,
  filter
} from '@angular-devkit/schematics';
import {
  getWorkspace,
  addPackageJsonDependency,
  addModuleImportToRootModule,
  getProjectFromWorkspace,
  NodeDependency,
  NodeDependencyType,
  buildDefaultPath
} from 'schematics-utilities';
import { strings, normalize } from '@angular-devkit/core';

export default function(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {

      const workspace = getWorkspace(tree);

      const project = getProjectFromWorkspace(
        workspace,
        options.project || workspace.defaultProject
      );

      const templateOptions = {
        ...strings,
        ...options,
      };

      const movePath = normalize(buildDefaultPath(project));

      addDependencies(tree);

      addModuleImportToRootModule(
        tree,
        'NgxGuardianModule.forRoot(ngxGuardianConfig)',
        'ngx-guardian',
        project
      );

      const rule = chain([
        mergeWith(apply(url('./files'), [
          options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
          template(templateOptions),
          move(movePath),
        ]), MergeStrategy.Default)
      ]);

      return rule(tree, _context);
    };
}

function addDependencies(host: Tree): Tree {
  const dependencies: NodeDependency[] = [
    { type: NodeDependencyType.Default, version: '1.0.2', name: 'ngx-guardian' }
  ];

  dependencies.forEach(dependency => addPackageJsonDependency(host, dependency));

  return host;
}
