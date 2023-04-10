import { DancerInformations } from "../domain";
import { MissingDomElementError } from "../errors";

export default class AutocompletionService {
    constructor(private document: Document) { }

    autocompleteTrainingForm(dancerInformations: DancerInformations) {
        const inputElementsMapping: { [key: string]: keyof DancerInformations } = {
            "#F02_2_1": "lastName",
            "#F03_3_1": "firstName",
            "#F05_5_1": "email",
            "#F06_6_1": "address",
            "#F07_7_1": "postalCode",
            "#F08_8_1": "city",
            "#F09_9_1": 'country',
            "#F10_10_1display": "phoneNumber",
            "#F11_11_1": "memberCode",
        }

        for (let querySelector of Object.keys(inputElementsMapping)) {
            const element = this.document.querySelector<HTMLInputElement>(querySelector);

            if (!element) {
                return new MissingDomElementError(querySelector);
            }

            switch (querySelector) {
                case "#F09_9_1":
                    return element.value = "66";
                default:
                    return element.value = (dancerInformations as any)[inputElementsMapping[querySelector]];
            }
        }
    }
}