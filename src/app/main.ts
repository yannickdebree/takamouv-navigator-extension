import { MonitoringService, StorageService } from "./services";
import { fillFormIfNeeded, startHandlers } from "./utils";
import { MissingDomElementError } from "./errors";

async function main() {
    // TODO: check interfaces import
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

    const startHandlersResult = await startHandlers(storageService)(form);
    if (startHandlersResult instanceof Error) {
        return monitoringService.throwInternalError(startHandlersResult);
    }
}

main();