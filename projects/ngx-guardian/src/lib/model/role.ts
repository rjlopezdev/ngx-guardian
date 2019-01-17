/**
 * Represents the role for a manager
 */
export class Role {

    /**
     * Name of the role
     */
    private name: string;

    /**
     * Creates a new role with the name provided
     * @param name role name
     */
    constructor(name: string) {
        this.name = name;
    }

    public getName() {
        return this.name;
    }
}
