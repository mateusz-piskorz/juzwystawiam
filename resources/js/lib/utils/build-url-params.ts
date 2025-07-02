type Args = {
    [key: string]: string | number | string[] | number[] | undefined | undefined[];
};

export const buildURLParams = (args: Args) => {
    return Object.entries(args)
        .map((arg) => {
            const [key, value] = arg;
            if (Array.isArray(value)) {
                const myArr = [];
                for (const singleValue of value) {
                    myArr.push(`${key}[]=${singleValue}`);
                }
                return myArr.join('&');
            } else {
                return `${key}=${value}`;
            }
        })
        .filter((e) => e)
        .join('&');
};
