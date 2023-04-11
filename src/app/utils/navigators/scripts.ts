import { DancerInformations } from "../../domain";

export function autocompleteTrainingForm(dancerInformations: DancerInformations) {
    const inputElementsMapping: { [querySelector: string]: keyof DancerInformations } = {
        "#F02_2_1": "lastName",
        "#F03_3_1": "firstName",
        "#F05_5_1": "email",
        "#F06_6_1": "address",
        "#F07_7_1": "postalCode",
        "#F08_8_1": "city",
        "#F10_10_1display": "phoneNumber",
        "#F11_11_1": "memberCode"
    }

    class MissingDomElementError extends Error {
        constructor(querySelector: string) {
            super(`"${querySelector}" element is missing in DOM.`);
        }
    }

    const setCountryAsDefaultValue = () => {
        const countrySelectQuerySelector = '#F09_9_1';
        const countrySelectElement = document.querySelector<HTMLSelectElement>(countrySelectQuerySelector);
        if (!countrySelectElement) {
            return new MissingDomElementError(countrySelectQuerySelector);
        }
        countrySelectElement.value = "66";
        const countrySelectSpanQuerySelector = '.nice-select.country.formitem span.current';
        const countrySelectSpan = document.querySelector<HTMLSpanElement>(countrySelectSpanQuerySelector);
        if (!countrySelectSpan) {
            return new MissingDomElementError(countrySelectSpanQuerySelector);
        }
        countrySelectSpan.innerText = "France";
    };

    const setStatusAsDefaultValue = () => {
        const statusInputQuerySelector = '[for="P2_PERSONNEPHYSIQUE_0"]';
        const statusInputElement = document.querySelector<HTMLLabelElement>(statusInputQuerySelector);
        if (!statusInputElement) {
            return new MissingDomElementError(statusInputQuerySelector);
        }
        statusInputElement.click();
    }

    const setFieldsFromUserData = () => {
        for (let querySelector of Object.keys(inputElementsMapping)) {
            const inputElement = document.querySelector<HTMLInputElement>(querySelector);

            if (!inputElement) {
                return new MissingDomElementError(querySelector);
            }

            inputElement.value = (dancerInformations as any)[inputElementsMapping[querySelector]];
        }
    }

    const setCivilityFromUserData = () => {
        const mrsInputQuerySelector = '[for="F04_4_1_0"]';
        const mrsInputElement = document.querySelector<HTMLLabelElement>(mrsInputQuerySelector);
        if (!mrsInputElement) {
            return new MissingDomElementError(mrsInputQuerySelector);
        }

        const mrInputQuerySelector = '[for="F04_4_1_1"]';
        const mrInputElement = document.querySelector<HTMLLabelElement>(mrInputQuerySelector);
        if (!mrInputElement) {
            return new MissingDomElementError(mrsInputQuerySelector);
        }

        if (dancerInformations.civility === "mrs") {
            mrsInputElement.click();
            return;
        }
        mrInputElement.click();
    }

    const wrapActions = (actions: Array<() => Error | undefined>) => {
        let result: Error | undefined;
        for (const action of actions) {
            result = action();
            if (result instanceof Error) {
                return result;
            }
        }
    }

    return wrapActions([
        setFieldsFromUserData,
        setCountryAsDefaultValue,
        setStatusAsDefaultValue,
        setCivilityFromUserData
    ]);
}