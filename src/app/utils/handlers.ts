import { AutocompletionService, FormChangesHandlerService, StorageService, TrimTriggeHandlerService, FormSubmitHandlerService } from "../services";
import { Handler } from "./types";

export const startHandlers = (storageService: StorageService) => async (form: HTMLFormElement) => {
    const autocompletionService = new AutocompletionService(document);
    const handlers: Handler<unknown, void | Error>[] = [
        new FormChangesHandlerService(form, storageService),
        new TrimTriggeHandlerService(document, form, storageService),
        new FormSubmitHandlerService(form, storageService, autocompletionService)
    ];
    for (const handler of handlers) {
        const result = handler.handle(async (data) => {
            const resolution = await handler.resolve(data);
            if (resolution instanceof Error) {
                return resolution;
            }
        });
        if (result instanceof Error) {
            return result;
        }
    }
}