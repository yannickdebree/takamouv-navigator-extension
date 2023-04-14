export default class MonitoringService {
    constructor(private document: Document, private console: Console) { }

    throwInternalError(error: Error): void {
        this.document.body.innerText = `Une erreur interne est survenue. Veuillez contacter l\'administrateur.`;
        this.console.error(error);
    }
}