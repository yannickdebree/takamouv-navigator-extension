import { DancerInformations } from "./types";

interface LocalStorageItems {
    "form-data": DancerInformations;
}

const formatLocalStorageItemKey = (key: keyof LocalStorageItems) => {
    const localStoragePrefix = 'takamouv';
    return `${localStoragePrefix}_${key}`;
}

const parseStringToFormData = (str: string): DancerInformations => {
    const { lastName, firstName, address, postalCode, city, country, civility, email, memberCode, phoneNumber, status } = JSON.parse(str);
    return {
        lastName,
        firstName,
        address,
        city,
        country,
        postalCode,
        civility,
        email,
        memberCode,
        phoneNumber,
        status
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

    delete<K extends keyof LocalStorageItems>(key: K) {
        const formatedKey = formatLocalStorageItemKey(key);
        return localStorage.removeItem(formatedKey);
    }
}