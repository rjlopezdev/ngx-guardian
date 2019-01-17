import { Directive } from '@angular/core';

/**
 * Set block attribute disabled if user role is no granted for the permission for a resource provided
 */
@Directive({
  selector: '[ngxDisableIfNoGranted]'
})
export class DisableIfNoGrantedDirective {

  constructor() { }

}
