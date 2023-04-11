import { DancerInformations } from "../../domain";
import { MissingDomElementError } from "../../errors";

export function autocompleteTrainingForm(dancerInformations: DancerInformations) {
    const setCountryAsDefaultValue = (inputElement: HTMLInputElement) => {
        inputElement.value = "66";
        const countrySelectSpanQuerySelector = '.nice-select.country.formitem span.current';
        const countrySelectSpan = document.querySelector<HTMLSpanElement>(countrySelectSpanQuerySelector);
        if (!countrySelectSpan) {
            return new MissingDomElementError(countrySelectSpanQuerySelector);
        }
        countrySelectSpan.innerText = "France";
    };

    const inputElementsMapping: { [querySelector: string]: string } = {
        "#F02_2_1": "lastName",
        "#F03_3_1": "firstName",
        "#F05_5_1": "email",
        "#F06_6_1": "address",
        "#F07_7_1": "postalCode",
        "#F08_8_1": "city",
        "#F09_9_1": 'country',
        "#F10_10_1display": "phoneNumber",
        "#F11_11_1": "memberCode"
    }

    for (let querySelector of Object.keys(inputElementsMapping)) {
        const inputElement = document.querySelector<HTMLInputElement>(querySelector);

        if (!inputElement) {
            return new MissingDomElementError(querySelector);
        }

        switch (inputElementsMapping[querySelector]) {
            case "country":
                setCountryAsDefaultValue(inputElement);
                break;
            default:
                inputElement.value = (dancerInformations as any)[inputElementsMapping[querySelector]];
                break;
        }
    }
}