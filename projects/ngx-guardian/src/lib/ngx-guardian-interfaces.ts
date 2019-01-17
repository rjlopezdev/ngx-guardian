export interface NgxGuardianManager {
    role: string;
    permissions: NgxGuardianPermission[];
}

export interface NgxGuardianPermission {
    resource: string;
    actions: string[];
}

export interface NgxGuardianResource {
    name: string;
    routes: string[];
}
