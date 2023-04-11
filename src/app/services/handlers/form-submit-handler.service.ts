import { autocompleteTrainingForm, Handler, HandlerNextCallback, NavigatorProxy, StorageKeys, StorageProxy } from "../../utils";

export default class FormSubmitHandlerService implements Handler<void, void> {
    constructor(
        private form: HTMLFormElement,
        private storageProxy: StorageProxy,
        private navigatorProxy: NavigatorProxy
    ) { }

    handle(next: HandlerNextCallback<void, void>) {
        this.form.addEventListener('submit', async event => {
            event.preventDefault();
            next();
        });
    }

    async resolve() {
        const dancerInformations = this.storageProxy.get(StorageKeys.formData);
        if (dancerInformations) {
            return this.navigatorProxy.runCommand({
                func: autocompleteTrainingForm,
                args: [
                    dancerInformations,
                ]
            });
        }
        return Promise.resolve();
    }
}