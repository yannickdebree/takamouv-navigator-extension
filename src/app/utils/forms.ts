import { DancerInformations, Civility } from "../domain";
import { MissingDomElementError } from "../errors";
import { StorageService } from "../services";
import { Failable, StorageKeys } from "./types";

const fillFormFromData = (form: HTMLFormElement) => (dancerInformations: DancerInformations): Failable => {
    for (const key of Object.keys(dancerInformations)) {
        const querySelector = `[name="${key}"]`;
        const field = form.querySelector<HTMLInputElement>(querySelector);
        if (!field) {
            return new MissingDomElementError(querySelector)
        }
        field.value = (dancerInformations as any)[key];
    }
}

export const fillFormIfNeeded = (storageService: StorageService) => (form: HTMLFormElement): Failable => {
    const dancerInformations = storageService.get(StorageKeys.formData);
    if (dancerInformations) {
        return fillFormFromData(form)(dancerInformations);
    }
}

export const translateFormToDancerInformations = (form: HTMLFormElement): DancerInformations => {
    const data: DancerInformations = {
        lastName: '',
        firstName: '',
        address: '',
        city: '',
        postalCode: '',
        civility: Civility.MRS,
        email: '',
        memberCode: '',
        phoneNumber: ''
    }
    const formData = new FormData(form);

    for (const key of Object.keys(data)) {
        const formElement = formData.get(key);
        const value = formElement?.toString();
        if (value) {
            (data as any)[key] = value;
        }
    }

    return data;
}