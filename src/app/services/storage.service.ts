import { DancerInformations } from "../domain";
import { parseStringToDancerInformations, StorageKeys } from "../utils";

interface StorageItems {
    [StorageKeys.formData]: DancerInformations;
}

export default class StorageService {
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

    set<K extends keyof StorageItems>(key: K, value: StorageItems[K]) {
        const formatedKey = this.formatStorageItemKey(key);
        return this.storage.setItem(formatedKey, btoa(JSON.stringify(value)));
    }

    delete<K extends keyof StorageItems>(key: K) {
        const formatedKey = this.formatStorageItemKey(key);
        return this.storage.removeItem(formatedKey);
    }

    private formatStorageItemKey(key: keyof StorageItems) {
        const storagePrefix = 'takamouv';
        return `${storagePrefix}_${key}`;
    }
}