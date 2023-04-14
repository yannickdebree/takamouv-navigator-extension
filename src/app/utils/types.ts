import { DancerInformations } from "../domain";

export type Failable<T = void> = T | Error;

export type HandlerNextCallback<H, R> = (data: H) => Promise<R>;

export interface Handler<H, R> {
    handle(next: HandlerNextCallback<H, R>): Failable;
    resolve(data: H): Promise<Failable<R>>;
}

export enum StorageKeys {
    formData = "form-data"
}


export interface StorageItems {
    [StorageKeys.formData]: DancerInformations;
}

export interface StorageProxy {
    get<K extends keyof StorageItems>(key: K): StorageItems[K] | null;
    set<K extends StorageKeys.formData>(key: K, value: StorageItems[K]): void;
    delete<K extends StorageKeys.formData>(key: K): void;
}

export type CommandRunnerParams<Args extends any[]> = {
    func: (...args: Args) => void;
    args: Args;
}

export interface NavigatorProxy {
    runCommand<Args extends any[]>(commandRunnerParams: CommandRunnerParams<Args>): Promise<Failable>;
}