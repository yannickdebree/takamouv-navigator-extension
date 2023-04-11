import { FormChangesHandlerService, StorageService, TrimTriggeHandlerService, FormSubmitHandlerService } from "../services";
import { navigatorProxyFactory } from "./navigators";
import { Handler } from "./types";

export const startHandlers = (storageService: StorageService) => (form: HTMLFormElement) => {
    const navigatorProxy = navigatorProxyFactory();

    const handlers: Handler<unknown, void | Error>[] = [
        new FormChangesHandlerService(form, storageService),
        new TrimTriggeHandlerService(document, form, storageService),
        new FormSubmitHandlerService(form, storageService, navigatorProxy)
    ];
    return new Promise<void | Error>((resolve) => {
        for (const handler of handlers) {
            const result = handler.handle(async (data) => {
                const resolution = await handler.resolve(data);
                if (resolution instanceof Error) {
                    return resolve(resolution);
                }
            });
            if (result instanceof Error) {
                return resolve(result);
            }
        }
    })
}