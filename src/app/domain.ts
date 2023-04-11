export enum Civility {
    MRS = 'mrs',
    MR = 'mr'
}

export enum Status {
    individual = 'individual',
    organism = 'organism'
}

export type DancerInformations = {
    lastName: string;
    firstName: string;
    civility: Civility;
    email: string;
    address: string;
    postalCode: string;
    city: string;
    phoneNumber: string;
    memberCode: string;
    status: Status;
}