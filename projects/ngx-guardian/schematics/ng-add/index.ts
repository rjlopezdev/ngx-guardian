import { Rule, SchematicContext, Tree } from '@angular-devkit/schematics';


export default function(options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
      // TODO: Implement ng-add behaviour
      return tree;
    };
}
