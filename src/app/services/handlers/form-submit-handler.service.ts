import { Handler, HandlerNextCallback, StorageKeys } from "../../utils";
import AutocompletionService from "../autocompletion.service";
import StorageService from "../storage.service";

export const getTabId = async () => {
    // TODO: move in a service and use env util
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const tab = tabs[0];

    const tabId = tab.id;
    if (!tabId) {
        throw new Error("Current tab is not available");
    }
    return tabId;
}

export default class FormSubmitHandlerService implements Handler<void, void> {
    constructor(private form: HTMLFormElement, private storageService: StorageService, private autocompletionService: AutocompletionService) { }

    handle(next: HandlerNextCallback<void, void>) {
        this.form.addEventListener('submit', async event => {
            event.preventDefault();
            next();
        });
    }

    async resolve() {
        const dancerInformations = this.storageService.get(StorageKeys.formData);
        if (dancerInformations) {
            const tabId = await getTabId();
            chrome.scripting.executeScript({
                target: { tabId },
                func: this.autocompletionService.autocompleteTrainingForm.bind(this.autocompletionService),
                args: [dancerInformations]
            });
        }
    }
}