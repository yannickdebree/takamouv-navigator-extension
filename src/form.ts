import { DancerInformations, Civility, Status } from "./types";

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

    Object.keys(data).forEach(key => {
        const value = formData.get(key)?.toString();
        if (value) {
            (data as any)[key] = value;
        }
    });

    return data;
}

export const fillFormFromData = (form: HTMLFormElement) => (dancerInformations: DancerInformations) => {
    Object.keys(dancerInformations).forEach(key => {
        const field = form.querySelector<HTMLInputElement>(`[name="${key}"]`);
        if (field) {
            field.value = (dancerInformations as any)[key];
        }
    })
}