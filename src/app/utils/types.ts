import { DancerInformations } from "../domain";

export type HandlerNextCallback<H, R> = (data: H) => Promise<R>;

export interface Handler<H, R> {
    handle(next: HandlerNextCallback<H, R>): void | Error;
    resolve(data: H): Promise<R | Error>;
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
    runCommand<Args extends any[]>(commandRunnerParams: CommandRunnerParams<Args>): Promise<void | Error>;
}