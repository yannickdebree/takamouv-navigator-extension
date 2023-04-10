export type HandlerNextCallback<H, R> = (data: H) => Promise<R>;

export interface Handler<H, R> {
    handle(next: HandlerNextCallback<H, R>): void | Error;
    resolve(data: H): Promise<R | Error>;
}

export enum StorageKeys {
    formData = "form-data"
}