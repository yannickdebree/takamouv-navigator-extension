import { DancerInformations } from "../domain";

export function parseStringToDancerInformations(dataAsString: string): DancerInformations {
    const { lastName, firstName, address, postalCode, city, civility, email, memberCode, phoneNumber } = JSON.parse(dataAsString);
    return {
        lastName,
        firstName,
        address,
        city,
        postalCode,
        civility,
        email,
        memberCode,
        phoneNumber
    }
}