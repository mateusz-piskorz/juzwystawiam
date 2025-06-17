export enum TypeOfBusiness {
    PRIVATE_PERSON = 'private_person',
    SELF_EMPLOYED = 'self_employed',
    OTHER_BUSINESS = 'other_business',
}

export const TypeOfBusinessTranslation = {
    [TypeOfBusiness.PRIVATE_PERSON]: 'osoba prywatna',
    [TypeOfBusiness.SELF_EMPLOYED]: 'jednoosobowa działalność gospodarcza',
    [TypeOfBusiness.OTHER_BUSINESS]: 'inna forma działalności',
};
