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
    const permissionFormated = permission.split('-').map((i) => i.trim());
    this.isGranted(permissionFormated[0], permissionFormated[1]);
  }

  /**
   * If user has the provided permission for the provider resource, show html block
   * If not, the block is destroyed
   * @param resourceName the name of resource
   * @param permissionType the name of permission
   */
  private isGranted(resourceName: string, permissionType: string) {
    if (this.permissionManagerService.isGranted(resourceName, permissionType)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}
