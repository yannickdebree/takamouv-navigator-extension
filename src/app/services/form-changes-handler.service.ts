import { ChangeDetectionQueue, Handler, HandlerNextCallback } from "../utils";

export default class FormChangesHandlerService implements Handler<unknown, void> {
    constructor(private form: HTMLFormElement) { }

    handle(next: HandlerNextCallback<unknown, void>) {
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
            next(void 0);
        });
    }

    resolve() {
        // TODO: uncomment
        // const value = translateFormToDancerInformations(form);
        // if (value instanceof Error) {
        //     return value;
        // }
        // storageService.set(StorageKeys.formData, value);
    }
}