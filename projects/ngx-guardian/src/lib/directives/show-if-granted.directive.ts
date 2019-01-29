import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { NgxGuardianService } from '../ngx-guardian.service';

/**
 * Show component or html block if role has the permission for the resource provided
 */
@Directive({
  selector: '[ngxShowIfGranted]'
})
export class ShowIfGrantedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionManagerService: NgxGuardianService
  ) { }

  /**
   * Set value for directive input ( 'PERMISSION - RESOURCE' )
   */
  @Input() set ngxShowIfGranted(permission: string) {
    console.warn(permission.split('-'));
    const permissionFormated = permission.split('-').map((i) => i.trim());
    this.isGranted(permissionFormated[1], permissionFormated[0]);
  }

  /**
   * If user has the provided permission for the provider resource, show html block
   * If not, the block is destroyed
   * @param resourceName the name of resource
   * @param action the name of permission
   */
  private isGranted(action: string, resourceName: string) {
    if (this.permissionManagerService.isGranted(action, resourceName)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
