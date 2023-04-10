import { AutocompletionService, MonitoringService, StorageService } from "./services";
import { fillFormIfNeeded, startHandlers, StorageKeys } from "./utils";
import { getTabId } from "./chrome";
import { MissingDomElementError } from "./errors";

function main() {
    const monitoringService = new MonitoringService(document, console);

    const form = document.querySelector('form');
    if (!form) {
        return monitoringService.throwInternalError(new MissingDomElementError('form'));
    }

    const storageService = new StorageService(localStorage);
    const fillFormResult = fillFormIfNeeded(storageService)(form);
    if (fillFormResult instanceof Error) {
        return monitoringService.throwInternalError(fillFormResult);
    }

    // TODO: move in a handler
    const autocompletionService = new AutocompletionService(document);
    form.addEventListener('submit', async event => {
        event.preventDefault();
        const dancerInformations = storageService.get(StorageKeys.formData);
        if (dancerInformations) {
            const tabId = await getTabId();
            chrome.scripting.executeScript({
                target: { tabId },
                func: autocompletionService.autocompleteTrainingForm.bind(autocompletionService),
                args: [dancerInformations]
            });
        }
    });

    const startHandlersResult = startHandlers(form);
    if (startHandlersResult instanceof Error) {
        return monitoringService.throwInternalError(startHandlersResult);
    }
}

main();