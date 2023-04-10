export default class MonitoringService {
    constructor(private document: Document, private console: Console) { }

    throwInternalError(error: Error) {
        this.document.body.innerText = 'Une erreur interne est survenue. Veuillez contacter l\'administrateur de cette extension.';
        this.console.error(error);
    }
}