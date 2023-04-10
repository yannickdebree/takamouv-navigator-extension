import { MissingDomElementError } from "../../errors";
import { Handler, HandlerNextCallback, StorageKeys } from "../../utils";
import StorageService from "../storage.service";

export default class TrimTriggeHandlerService implements Handler<void, void> {
    constructor(private document: Document, private form: HTMLFormElement, private storageService: StorageService) { }

    handle(next: HandlerNextCallback<void, void>) {
        const querySelector = "#trim-trigger"
        const trimButton = this.document.querySelector<HTMLButtonElement>(querySelector);

        if (!trimButton) {
            return new MissingDomElementError(querySelector);
        }
        trimButton.addEventListener('click', () => {
            return next();
        });
    }

    resolve() {
        this.form.reset();
        this.storageService.delete(StorageKeys.formData);
        return Promise.resolve();
    }
}