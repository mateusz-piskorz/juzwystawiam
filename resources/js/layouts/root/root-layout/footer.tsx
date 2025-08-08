import { useLocale } from '@/lib/hooks/use-locale';
import dayjs from 'dayjs';

export const Footer = () => {
    const locale = useLocale().locale.root;
    return (
        <footer className="py-4 text-center">
            © Juz Wystawiam {dayjs().format('YYYY')}, {locale['All Rights Reserved']}
        </footer>
    );
};
