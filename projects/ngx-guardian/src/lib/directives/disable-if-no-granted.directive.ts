import { Directive, ViewContainerRef, TemplateRef, Input, ElementRef } from '@angular/core';
import { NgxGuardianService } from '../ngx-guardian.service';
import { Renderer2 } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

enum DisabledTags {
  BUTTON = 'BUTTON',
  FIELDSET = 'FIELDSET',
  INPUT = 'INPUT',
  OPTGROUP  = 'OPTGROUP',
  OPTION = 'OPTION',
  SELECT = 'SELECT',
  TEXTAREA = 'TEXTAREA'
}

/**
 * Set block attribute disabled if user role is no granted for the permission for a resource provided
 */
@Directive({
  selector: '[ngxDisableIfNoGranted]'
})
export class DisableIfNoGrantedDirective {

  constructor(
    private viewContainer: ViewContainerRef,
    private element: ElementRef,
    private renderer: Renderer2,
    private permissionManagerService: NgxGuardianService
  ) { }

  /**
   * Set value for directive input ( 'ACTION - RESOURCE' )
   */
  @Input() set ngxDisableIfNoGranted(permission: string) {
    const permissionFormated = permission.split('-').map((i) => i.trim());
    this.isGranted(permissionFormated[0], permissionFormated[1]);
  }

  /**
   * If user has the provided permission for the provider resource, disable element and set title message
   * If not, element will be enabled
   * @param resourceName the name of resource
   * @param action the name of action
   */
  private isGranted(resourceName: string, action: string) {
    if (this.permissionManagerService.isGranted(resourceName, action)) {
      this.renderer.removeAttribute(this.element.nativeElement, 'disabled');
      this.renderer.removeAttribute(this.element.nativeElement, 'title');
    } else {
      this.renderer.setAttribute(this.element.nativeElement, 'disabled', 'disabled');
      this.setTitleForTag(this.element.nativeElement.tagName);
    }
  }

  /**
   * Set title property to the element.
   * If attribute not equals to BUTTON or INPUT, set <Perfom action message>
   * If attribute equals to BUTTON or INPUT and type equals to 'submit' or 'button', set <Edit field message>
   * else set <Perfom action message>
   * @param tag html tag of element
   */
  private setTitleForTag(tag: string) {
    if (Object.values(DisabledTags).includes(DisabledTags.BUTTON) || Object.values(DisabledTags).includes(DisabledTags.INPUT)) {
      const type = this.element.nativeElement.getAttribute('type');
      if (type === 'button' || type === 'submit') {
        this.renderer.setAttribute(this.element.nativeElement, 'title', 'You are not authorized to edit this field');
        this.renderer.setStyle(this.element.nativeElement, 'cursor', 'not-allowed');
      } else {
        this.renderer.setAttribute(this.element.nativeElement, 'title', 'You are not authorized to perform this action');
        this.renderer.setStyle(this.element.nativeElement, 'cursor', 'not-allowed');
      }
    } else {
      this.renderer.setAttribute(this.element.nativeElement, 'title', 'You are not authorized to edit this field');
      this.renderer.setStyle(this.element.nativeElement, 'cursor', 'not-allowed');
    }
  }

}
