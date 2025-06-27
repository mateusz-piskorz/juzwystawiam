export enum TYPE_OF_BUSINESS {
    PRIVATE_PERSON = 'PRIVATE_PERSON',
    SELF_EMPLOYED = 'SELF_EMPLOYED',
    OTHER_BUSINESS = 'OTHER_BUSINESS',
}

export const TypeOfBusinessTranslation = {
    [TYPE_OF_BUSINESS.PRIVATE_PERSON]: 'osoba prywatna',
    [TYPE_OF_BUSINESS.SELF_EMPLOYED]: 'jednoosobowa działalność gospodarcza',
    [TYPE_OF_BUSINESS.OTHER_BUSINESS]: 'inna forma działalności',
};
