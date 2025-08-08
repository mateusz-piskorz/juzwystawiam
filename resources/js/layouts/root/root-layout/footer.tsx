import dayjs from 'dayjs';

export const Footer = () => {
    return <footer className="py-4 text-center">© Juz Wysylam {dayjs().format('YYYY')}, All Rights Reserved</footer>;
};
