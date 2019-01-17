import { Injectable, Optional } from '@angular/core';
import { PermissionManager } from './model/permission-manager';
import { Permission } from './model/permission';
import { Resource } from './model/resource';
import { ManagerCollection } from './model/manager-collection';
import { Role } from './model/role';
import { NGX_GUARDIAN_CONFIG, NgxGuardianConfig } from './config';

/**
 * Service for permissions management
 */
@Injectable({
  providedIn: 'root'
})
export class NgxGuardianService {

  /**
   * Collection of managers
   */
  private managerCollection: ManagerCollection;
  /**
   * Current manager set
   */
  private currentManager: PermissionManager;
  /**
   * Flag that determines if manager is enabled
   */
  private isEnabled: boolean;
  /**
   * Route to navigate if no manager set
   */
  protected unauthorizedRoute = '/no-auth';
  /**
   * Route to navigate if user hasn't permissions
   */
  protected noGrantedRoute = '/no-granted';


  /**
   * Creates a singleton Permission Manager with config provided
   * @param config permission manager configuration
   */
  constructor(@Optional() config: NgxGuardianConfig) {
    this.loadConfig(config);
    console.warn(this.currentManager);
  }

  /**
   * Set manager for role provided
   * If role doesn't match, return null
   * @param role role name
   * @returns if manager is set successfully
   */
  public setManagerByRole(role: Role): boolean {
    throw new Error('no implemented');
  }

  /**
   * Disable permission manager
   */
  public disableManager() {
    this.isEnabled = false;
  }

  /**
   * Add permission to the resource provided
   * Return true if permission added successfully, else false
   * @param permission permission to add
   * @returns if permission added
   */
  public addPermission(permission: Permission, resourceName: string): boolean {
    throw new Error('no implemented');
  }

  /**
   * Add to manager the resource provided
   * Return true if resource added successfully, else false
   * @param resource resource to add
   * @returns if resource added
   */
  public addResource(resource: Resource): boolean {
    throw new Error('no implemented');
  }

  /**
   * Return a list of permissions in JSON format
   * @returns JSON list of permissions
   */
  public getPermissions(): JSON {
    return JSON.parse(this.currentManager.getPermissions().toString());
  }

  /**
   * Set initial configuration for Permission Manager:
   * 1. Set available Permission Manager's
   * 2. Set current manager following the strategy below:
   *  - If defaultRole is provided
   * @param config 
   */
  private loadConfig(config: NgxGuardianConfig) {

    if (config.unauthorizedRoute) {
      // Set unauthorized route
      this.unauthorizedRoute = config.unauthorizedRoute;
    }

    if (config.noGrantedRoute) {
      // Set no granted route
      this.noGrantedRoute = config.noGrantedRoute;
    }

    // Set @managerCollection
    if (config.managers) {
      this.managerCollection = new ManagerCollection(config.managers);
    } else {
      throw new Error('No managers provided');
    }

    // Set @currentManager from _defaultRole_
    if (config.defaultRole) {
      this.currentManager = this.managerCollection.getManagerByRoleName(config.defaultRole);
      return;
    }

    // Set @currentManager from _setByCookie_
    if (config.setByCookie) {
      // Set role from localStorage 'ngx-guardian-role' variable
      const role = localStorage.getItem('ngx-guardian-role');
      this.currentManager = this.managerCollection.getManagerByRoleName(role);
    } else {
      this.isEnabled = false;
      console.warn('No default manager was provided. Please, consider configuring some with defaultRole or setByCookie strategies');
    }

  }
}
