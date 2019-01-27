/**
 * Represents a resource on which to apply permissions
 */
export class Resource {

    /**
     * Name of resource
     */
    private name: string;
    /**
     * Routes for resource
     */
    private routes: string[];

    /**
     * Creates a new resource with the name and routes provided
     * @param name Creates a new resource with the name provided
     */
    constructor(name: string, routes: string[]) {
        this.name = name;
        this.routes = routes;
    }

    public hasRoute(route: string) {
        if (this.routes.includes(route)) {
            return true;
        } else {
            return false;
        }
    }
}
