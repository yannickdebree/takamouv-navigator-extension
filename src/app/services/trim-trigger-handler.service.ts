import { MissingDomElementError } from "../errors";
import { Handler, HandlerNextCallback, StorageKeys } from "../utils";

export default class TrimTriggeHandlerService implements Handler<unknown, void> {
    constructor(private document: Document, private form: HTMLFormElement, private storage: Storage) { }

    handle(next: HandlerNextCallback<unknown, void>) {
        const querySelector = "#trim-trigger"
        const trimButton = this.document.querySelector<HTMLButtonElement>(querySelector);

        if (!trimButton) {
            return new MissingDomElementError(querySelector);
        }
        trimButton.addEventListener('click', () => {
            return next(void 0);
        });
    }

    resolve() {
        this.form.reset();
        this.storage.delete(StorageKeys.formData);
    }
}