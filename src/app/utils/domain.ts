import { DancerInformations } from "../domain";

export function parseStringToDancerInformations(dataAsString: string) {
    const { lastName, firstName, address, postalCode, city, civility, email, memberCode, phoneNumber, status } = JSON.parse(dataAsString);
    return {
        lastName,
        firstName,
        address,
        city,
        postalCode,
        civility,
        email,
        memberCode,
        phoneNumber,
        status
    } as DancerInformations
}