export enum Civility {
    MRS = 'mrs',
    MR = 'mr'
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
}