import { Injectable, Optional } from '@angular/core';
import { PermissionManager } from './model/permission-manager';
import { Action } from './model/action';
import { Resource } from './model/resource';
import { ManagerCollection } from './model/manager-collection';
import { Role } from './model/role';
import { NGX_GUARDIAN_CONFIG, NgxGuardianConfig } from './config';
import { NgxGuardianPermission, NgxGuardianResource } from './ngx-guardian-interfaces';

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
  private unauthorizedRoute = '/no-auth';
  /**
   * Route to navigate if user hasn't permissions
   */
  private noGrantedRoute = '/no-granted';


  /**
   * Creates a singleton Permission Manager with config provided
   * @param config permission manager configuration
   */
  constructor(@Optional() config: NgxGuardianConfig) {
    this.isEnabled = false;
    this.loadConfig(config);
    console.warn(this.currentManager);
  }

  /**
   * Returns if user has the permission for the resource provided
   * If granted returns true else false
   * @param resource resource to check
   * @param permission permission to check
   */
  public isGranted(resource: string, action: string) {
    if (!this.isEnabled) {
      console.warn(`The manager for <${this.currentManager.getRoleName()}> is disabled`);
      return false;
    }
    return this.currentManager.isGranted(resource, action);
  }

  /**
   * Set manager for role provided
   * If role doesn't match, return null
   * @param role role name
   * @returns if manager is set successfully
   */
  public setManagerByRole(role: string): boolean {
    const managerToSet = this.managerCollection.getManagerByRoleName(role);
    if (managerToSet) {
      this.currentManager = managerToSet;
      return true;
    } else {
      throw new Error(`No manager set for role: ${role}`);
    }
  }

  /**
   * Disable permission manager
   */
  public disableManager() {
    this.isEnabled = false;
  }

  /**
   * Add action to the resource provided
   * Return true if action added successfully, else false
   * @param permission permission to add
   * @param resourceName the of the resource to add permission
   * @returns if permission added
   */
  // public addActionToResource(action: string, resourceName: string): boolean {
  //  throw new Error('no implemented');
  // }

  /**
   * Add to manager the resource provided
   * Return true if resource added successfully, else false
   * @param resource resource to add
   * @returns if resource added
   */
  // public addResource(resource: NgxGuardianResource): boolean {
  //  throw new Error('no implemented');
  // }

  /**
   * Return a list of permissions in JSON format
   * @returns JSON list of permissions
   */
  public getPermissions(): JSON {
    return JSON.parse(this.currentManager.getPermissions().toString());
  }

  /**
   * Return true if user can navigate to requested url
   * @param url requested url to navigate
   */
  public canNavigateTo(url: string): boolean {
    return this.currentManager.canNavigateTo(url);
  }

  /**
   * Set initial configuration for Permission Manager:
   * 1. Set available Permission Manager's
   * 2. Set current manager following the strategy below:
   *  - If defaultRole is provided
   * @param config a congiguration of permission manager
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
    if (config.managers && config.managers.length) {
      this.managerCollection = new ManagerCollection(config.managers);
    } else {
      throw new Error('No managers provided');
    }

    // Set @currentManager from _setFromStorage_
    if (config.setFromStorage) {
      // Set role from localStorage 'ngx-guardian-role' variable
      const roleToSet = localStorage.getItem('ngx-guardian-role');
      if (roleToSet) {
        this.setManagerByRole(roleToSet);
        this.isEnabled = true;
        return;
      } else {
        console.warn(`No manager found in localStorage.`);
      }
    }

    // Set @currentManager from _defaultRole_
    if (config.defaultRole) {
      const managerToSet = this.managerCollection.getManagerByRoleName(config.defaultRole);
      if (managerToSet) {
        this.currentManager = this.managerCollection.getManagerByRoleName(config.defaultRole);
        this.isEnabled = true;
      } else {
        this.isEnabled = false;
        console.warn(`No manager found for role: <${config.defaultRole}>`);
      }
    } else {
      console.warn('No default manager was provided. Please, consider configuring some with defaultRole or setFromLocalStorage strategies');
    }

  }
}
