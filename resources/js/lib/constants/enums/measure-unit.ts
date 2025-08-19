// todo: check if we are using it

export enum MEASURE_UNIT {
    PCS = 'PCS',
    HOUR = 'HOUR',
    SERVICE = 'SERVICE',
}

export const TypeOfBusinessTranslation = {
    [MEASURE_UNIT.PCS]: 'szt.',
    [MEASURE_UNIT.HOUR]: 'godzina',
    [MEASURE_UNIT.SERVICE]: 'usługa',
};
