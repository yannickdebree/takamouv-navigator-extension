export default class MissingDomElementError extends Error {
    constructor(querySelector: string) {
        super(`"${querySelector}" element is missing in DOM.`);
    }
}