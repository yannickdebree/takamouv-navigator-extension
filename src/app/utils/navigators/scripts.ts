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

    const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    const setCountryAsDefaultValue = () => {
        const defaultCountryListItemQuerySelector = '.nice-select.country.formitem [data-value="66"]';
        const defaultCountryListItem = document.querySelector<HTMLLIElement>(defaultCountryListItemQuerySelector);
        if (!defaultCountryListItem) {
            throw new MissingDomElementError(defaultCountryListItemQuerySelector);
        }
        defaultCountryListItem.click();
        return Promise.resolve();
    };

    const setStatusAsDefaultValue = () => {
        const statusInputQuerySelector = '[for="P2_PERSONNEPHYSIQUE_0"]';
        const statusInputElement = document.querySelector<HTMLLabelElement>(statusInputQuerySelector);
        if (!statusInputElement) {
            throw new MissingDomElementError(statusInputQuerySelector);
        }
        statusInputElement.click();
        return Promise.resolve();
    }

    const timeOut = 100;

    const setFieldsFromUserData = async () => {
        for (let querySelector of Object.keys(inputElementsMapping)) {
            const inputElement = document.querySelector<HTMLInputElement>(querySelector);

            if (!inputElement) {
                throw new MissingDomElementError(querySelector);
            }

            inputElement.value = (dancerInformations as any)[inputElementsMapping[querySelector]];
            inputElement.dispatchEvent(new Event("change"))

            await wait(timeOut);
        }
    }

    const setCivilityFromUserData = () => {
        const mrsInputQuerySelector = '[for="F04_4_1_0"]';
        const mrsInputElement = document.querySelector<HTMLLabelElement>(mrsInputQuerySelector);
        if (!mrsInputElement) {
            throw new MissingDomElementError(mrsInputQuerySelector);
        }

        const mrInputQuerySelector = '[for="F04_4_1_1"]';
        const mrInputElement = document.querySelector<HTMLLabelElement>(mrInputQuerySelector);
        if (!mrInputElement) {
            throw new MissingDomElementError(mrsInputQuerySelector);
        }

        if (dancerInformations.civility === "mrs") {
            mrsInputElement.click();
            return Promise.resolve();
        }
        mrInputElement.click();
        return Promise.resolve();
    }

    const wrapActions = async (actions: Array<() => Promise<void>>) => {
        for (const action of actions) {
            await action();
            await wait(timeOut);
        }
    }

    return wrapActions([
        setCountryAsDefaultValue,
        setStatusAsDefaultValue,
        setCivilityFromUserData,
        setFieldsFromUserData
    ]);
}