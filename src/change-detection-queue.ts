type OnChangesDetectedCallback<Change> = (change: Change) => void;

export default class ChangeDetectionQueue<Change> {
    private callbacks = new Array<OnChangesDetectedCallback<Change>>();
    private timeOut: number | undefined = undefined;

    constructor(private options: { debounceTime: number }) { }

    onChangesDetected(callback: OnChangesDetectedCallback<Change>) {
        this.callbacks.push(callback);
    }

    registerChangeDetection(change: Change) {
        if (this.timeOut) {
            clearTimeout(this.timeOut);
        }
        this.timeOut = setTimeout(() => {
            this.callbacks.forEach(callback => callback(change));
            this.timeOut = undefined;
        }, this.options.debounceTime);
    }
}