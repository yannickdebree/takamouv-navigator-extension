import ChangeDetectionQueue from "./change-detection-queue";
import { fillFormFromData, translateFormToFormData } from "./form";
import LocalStorageService from "./local-storage-service";

function main(){
    const form = document.querySelector('form');

    if(!form){
        return new Error('"form" element is missing in DOM.');
    }

    const localStorageService = new LocalStorageService();
    const formDataLocalStorageKey = 'form-data';

    const formData = localStorageService.get(formDataLocalStorageKey);
    if (formData) {
        fillFormFromData(form, formData);
    }

    form.addEventListener('submit', event => {
        event.preventDefault();
        // TODO: implement
        console.log('TODO: implement submit');
    });


    const changeDetectionQueue = new ChangeDetectionQueue<Event>({ debounceTime: 500 });
    changeDetectionQueue.onChangesDetected(() => {
        const value = translateFormToFormData(form);
        localStorageService.set(formDataLocalStorageKey, value);
    });

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
}

main();