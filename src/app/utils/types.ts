export type HandlerNextCallback<H, R> = (data: H) => R;

export interface Handler<H, R> {
    handle(next: HandlerNextCallback<H, R>): R | Error;
    resolve(data: H): void | Error;
}

export enum StorageKeys {
    formData = "form-data"
}

export interface IStorageService<IStorageItems> {
    get<K extends StorageKeys.formData>(key: K): IStorageItems[K] | null;
}