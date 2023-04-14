import { FormChangesHandlerService, StorageService, TrimTriggeHandlerService, FormSubmitHandlerService } from "../services";
import { navigatorProxyFactory } from "./navigators";
import { Failable, Handler } from "./types";

export const startHandlers = (storageService: StorageService) => (form: HTMLFormElement): Promise<Failable> => {
    const navigatorProxy = navigatorProxyFactory();

    const handlers: Handler<unknown, Failable>[] = [
        new FormChangesHandlerService(form, storageService),
        new TrimTriggeHandlerService(document, form, storageService),
        new FormSubmitHandlerService(form, storageService, navigatorProxy)
    ];
    return new Promise((resolve) => {
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