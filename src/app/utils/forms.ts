import { DancerInformations, Civility, Status } from "../domain";
import { MissingDomElementError } from "../errors";
import { StorageService } from "../services";
import { StorageKeys } from "./types";

const fillFormFromData = (form: HTMLFormElement) => (dancerInformations: DancerInformations) => {
    for (const key of Object.keys(dancerInformations)) {
        const querySelector = `[name="${key}"]`;
        const field = form.querySelector<HTMLInputElement>(querySelector);
        if (!field) {
            return new MissingDomElementError(querySelector)
        }
        field.value = (dancerInformations as any)[key];
    }
}

export const fillFormIfNeeded = (storageService: StorageService) => (form: HTMLFormElement) => {
    const dancerInformations = storageService.get(StorageKeys.formData);
    if (dancerInformations) {
        return fillFormFromData(form)(dancerInformations);
    }
}


export const translateFormToDancerInformations = (form: HTMLFormElement) => {
    const data: DancerInformations = {
        lastName: '',
        firstName: '',
        address: '',
        city: '',
        country: '',
        postalCode: '',
        civility: Civility.MRS,
        email: '',
        memberCode: '',
        phoneNumber: '',
        status: Status.individual
    }
    const formData = new FormData(form);

    for (const key of Object.keys(data)) {
        const value = formData.get(key)?.toString();
        if (!value) {
            return new Error(`"${key}" field is missing in form`);
        }
        (data as any)[key] = value;
    }

    return data;
}