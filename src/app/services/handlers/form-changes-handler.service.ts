import { ChangeDetectionQueue, Handler, HandlerNextCallback, StorageKeys, translateFormToDancerInformations } from "../../utils";
import StorageService from "../storage.service";

export default class FormChangesHandlerService implements Handler<void, void> {
    constructor(private form: HTMLFormElement, private storageService: StorageService) { }

    handle(next: HandlerNextCallback<void, void>) {
        const changeDetectionQueue = new ChangeDetectionQueue<Event>({ debounceTime: 500 });

        this.form.addEventListener('change', event => {
            if (!(event.target instanceof HTMLSelectElement)) {
                return void 0;
            }
            return changeDetectionQueue.registerChangeDetection(event);
        });

        this.form.addEventListener('keydown', (event: KeyboardEvent) => {
            const keyDownCodeBlackList = ['Tab', 'Space', 'ShiftLeft', 'ShiftRight'];
            if (keyDownCodeBlackList.includes(event.code)) {
                return void 0;
            }
            return changeDetectionQueue.registerChangeDetection(event);
        });

        changeDetectionQueue.onChangesDetected(() => {
            next();
        });
    }

    resolve() {
        const value = translateFormToDancerInformations(this.form);
        if (value instanceof Error) {
            return Promise.resolve(value);
        }

        this.storageService.set(StorageKeys.formData, value);
        return Promise.resolve();
    }
}