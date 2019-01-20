/**
 * Represents a permission
 */
export class Action {

    /**
     * Name of permission
     */
    private name: string;

    /**
     * Creates a new permission with the name provided
     * @param name permission name
     */
    constructor(name: string) {
        this.name = name;
    }

    /**
     * Return permission name
     * @returns permission name
     */
    public getName(): string {
        return this.name;
    }
}
