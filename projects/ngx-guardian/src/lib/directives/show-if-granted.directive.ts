import { Directive } from '@angular/core';

/**
 * Show component or html block if role has the permission for the resource provided
 */
@Directive({
  selector: '[ngxShowIfGranted]'
})
export class ShowIfGrantedDirective {

  constructor() { }

}
