export enum TypeOfBusiness {
    PRIVATE_PERSON = 'PRIVATE_PERSON',
    SELF_EMPLOYED = 'SELF_EMPLOYED',
    OTHER_BUSINESS = 'OTHER_BUSINESS',
}

export const TypeOfBusinessTranslation = {
    [TypeOfBusiness.PRIVATE_PERSON]: 'osoba prywatna',
    [TypeOfBusiness.SELF_EMPLOYED]: 'jednoosobowa działalność gospodarcza',
    [TypeOfBusiness.OTHER_BUSINESS]: 'inna forma działalności',
};
