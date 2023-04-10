export enum Civility {
    MRS,
    MR
}

export enum Status {
    individual,
    organism
}

export type FormData = {
    lastName: string;
    firstName: string;
    civility: Civility;
    email: string;
    address: string;
    city: string;
    country: string;
    phoneNumber: string;
    memberCode: string;
    status: Status;
}