export interface NgxGuardianManager {
    role: string;
    permissions: NgxGuardianPermission[];
}

export interface NgxGuardianPermission {
    resource: NgxGuardianResource;
    actions: string[];
    forbiddenRoutes?: string[];
}

export interface NgxGuardianResource {
    name: string;
    routes: string[];
}
