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
import { strings, normalize } from '@angular-devkit/core';
import { buildDefaultPath, getWorkspace } from 'schematics-utilities';

function setupOptions(host: Tree, options: any): Tree {
  const workspace = getWorkspace(host);
  if (!options.project) {
    options.project = Object.keys(workspace.projects)[0];
  }
  const project = workspace.projects[options.project];

  if (options.path === undefined) {
    options.path = buildDefaultPath(project);
  }

  return host;
}

export default function(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
      setupOptions(tree, options);

      const templateOptions = {
        ...strings,
        ...options,
      };

      const movePath = normalize(options.path);

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
