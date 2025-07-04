import { QueryValue } from '../types';

type Args = {
    [key: string]: QueryValue;
};

export const buildURLParams = (args: Args) => {
    const step1 = Object.entries(args).map(([key, value]) => {
        if (Array.isArray(value)) {
            const myArr = [];
            for (const singleValue of value) {
                if (singleValue !== undefined) {
                    myArr.push(`${key}[]=${singleValue}`);
                }
            }
            return myArr.join('&');
        } else {
            return `${key}=${value}`;
        }
    });

    const step2 = step1.filter((val) => {
        const [key, value] = val.split('=');
        return key && value !== 'undefined';
    });

    const step3 = step2.join('&');

    return step3;
};
