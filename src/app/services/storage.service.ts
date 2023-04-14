import { parseStringToDancerInformations, StorageKeys, StorageProxy, StorageItems } from "../utils";

export default class StorageService implements StorageProxy {
    constructor(private storage: Storage) { }

    get<K extends keyof StorageItems>(key: K): StorageItems[K] | null {
        const formatedKey = this.formatStorageItemKey(key);
        const encodedValue = this.storage.getItem(formatedKey);
        if (!encodedValue) {
            return null;
        }
        const valueAsString = atob(encodedValue);

        if (key === StorageKeys.formData) {
            return parseStringToDancerInformations(valueAsString)
        }
        return null;
    }

    set<K extends keyof StorageItems>(key: K, value: StorageItems[K]): void {
        const formatedKey = this.formatStorageItemKey(key);
        return this.storage.setItem(formatedKey, btoa(JSON.stringify(value)));
    }

    delete<K extends keyof StorageItems>(key: K): void {
        const formatedKey = this.formatStorageItemKey(key);
        return this.storage.removeItem(formatedKey);
    }

    private formatStorageItemKey(key: keyof StorageItems): string {
        const storagePrefix = 'takamouv';
        return `${storagePrefix}_${key}`;
    }
}