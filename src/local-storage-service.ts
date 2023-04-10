import { Civility, FormData, Status } from "./types";

interface LocalStorageItems {
    "form-data": FormData;
}

function formatLocalStorageItemKey(key: keyof LocalStorageItems) {
    const localStoragePrefix = 'takamouv';
    return `${localStoragePrefix}_${key}`;
}

function parseStringToFormData(str: string): FormData {
    // TODO: implement
    return {
        lastName: '',
        firstName: '',
        address: '',
        city: '',
        country: '',
        civility: Civility.MR,
        email: '',
        memberCode: '',
        phoneNumber: '',
        status: Status.individual
    }
}

export default class LocalStorageService {
    get<K extends keyof LocalStorageItems>(key: K): LocalStorageItems[K] | null {
        const formatedKey = formatLocalStorageItemKey(key);
        const encodedValue = localStorage.getItem(formatedKey);
        if (!encodedValue) {
            return null;
        }
        const valueAsString = atob(encodedValue);

        if (key === "form-data") {
            return parseStringToFormData(valueAsString)
        }
        return null;
    }

    set<K extends keyof LocalStorageItems>(key: K, value: LocalStorageItems[K]) {
        const formatedKey = formatLocalStorageItemKey(key);
        return localStorage.setItem(formatedKey, btoa(JSON.stringify(value)));
    }
}