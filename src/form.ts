import { FormData, Civility, Status } from "./types";

export function translateFormToFormData(form: HTMLFormElement): FormData {
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

export function fillFormFromData(form: HTMLFormElement, value: FormData) {
    // TODO: implement
}