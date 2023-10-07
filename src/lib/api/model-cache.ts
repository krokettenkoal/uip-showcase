type ApiModel = {id: number};

/**
 * A cache for API models.
 */
export class ModelCache<T extends ApiModel> extends Map<number, T> {
    /**
     * Adds the given instances to the cache, returning an array of booleans indicating whether or not each instance was added.
     * @param instances The instances to add to the cache.
     * @returns An array of booleans indicating whether or not each instance was added.
     */
    add(...instances: T[]): boolean[] {
        return instances.map(instance => {
            if(!instance?.id)
                return false;

            const didExist = this.has(instance.id);
            this.set(instance.id, instance);
            return !didExist;
        });
    }

    /**
     * Checks whether or not the cache contains an instance
     * @param instance The instance to check for.
     * @returns Whether or not the cache contains the instance.
     */
    contains(instance: T): boolean {
        return this.has(instance.id);
    }
}