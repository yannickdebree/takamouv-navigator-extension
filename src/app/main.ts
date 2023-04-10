import ChangeDetectionQueue from "./change-detection-queue";
import { fillFormFromData, translateFormToDancerInformations } from "./form";
import LocalStorageService from "./local-storage-service";

const throwInternalError = (error: Error) => {
    document.body.innerText = 'Une erreur interne est survenue. Veuillez contacter l\'administrateur de cette extension.';
    console.warn(error);
}

const main = () => {
    const form = document.querySelector('form');

    if (!form) {
        return new Error('"form" element is missing in DOM.');
    }

    const localStorageService = new LocalStorageService();
    const formDataLocalStorageKey = 'form-data';

    const dancerInformations = localStorageService.get(formDataLocalStorageKey);
    if (dancerInformations) {
        fillFormFromData(form)(dancerInformations);
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        // TODO: implement
        console.log('TODO: implement submit');
    });

    const changeDetectionQueue = new ChangeDetectionQueue<Event>({ debounceTime: 500 });

    form.addEventListener('change', event => {
        if (!(event.target instanceof HTMLSelectElement)) {
            return;
        }
        return changeDetectionQueue.registerChangeDetection(event);
    });

    form.addEventListener('keydown', (event: KeyboardEvent) => {
        const keyDownCodeBlackList = ['Tab', 'Space', 'ShiftLeft', 'ShiftRight'];
        if (keyDownCodeBlackList.includes(event.code)) {
            return;
        }
        return changeDetectionQueue.registerChangeDetection(event);
    });

    changeDetectionQueue.onChangesDetected(() => {
        const value = translateFormToDancerInformations(form);
        if (value instanceof Error) {
            throwInternalError(value);
            return;
        }
        localStorageService.set(formDataLocalStorageKey, value);
    });

    const trimButton = form.querySelector<HTMLButtonElement>('#trim-trigger');
    trimButton?.addEventListener('click', () => {
        form.reset();
        localStorageService.delete(formDataLocalStorageKey);
    });
}

const result = main();
if (result instanceof Error) {
    throwInternalError(result);
}