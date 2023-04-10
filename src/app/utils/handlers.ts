import { FormChangesHandlerService, TrimTriggeHandlerService } from "../services";
import { Handler } from "./types";

export function startHandlers(form: HTMLFormElement) {
    const handlers: Handler<unknown, void | Error>[] = [
        new FormChangesHandlerService(form),
        new TrimTriggeHandlerService(document, form, localStorage)
    ];
    for (const handler of handlers) {
        const result = handler.handle((data) => {
            const resolution = handler.resolve(data);
            if (resolution instanceof Error) {
                return resolution;
            }
        });
        if (result instanceof Error) {
            return result;
        }
    }
}