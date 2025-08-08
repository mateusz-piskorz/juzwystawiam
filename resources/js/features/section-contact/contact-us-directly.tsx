import { Button } from '@/components/ui/button';
import { useLocale } from '@/lib/hooks/use-locale';
import { Mail, Phone } from 'lucide-react';

export const ContactUsDirectly = () => {
    const locale = useLocale().locale.root;
    return (
        <div className="flex w-full flex-col items-center gap-8 md:flex-row">
            <div className="flex w-full max-w-[400px] flex-col items-center rounded border-2 py-8">
                <Phone />
                <p className="text-muted-foreground mt-2 text-lg">{locale.Phone}</p>
                <Button variant="link">
                    <a href="tel:123456789" className="text-lg">
                        123 456 789
                    </a>
                </Button>
            </div>
            <div className="flex w-full max-w-[400px] flex-col items-center rounded border-2 py-8">
                <Mail />
                <p className="text-muted-foreground mt-2 text-lg">E-mail</p>
                <Button variant="link">
                    <a href="mailto:invoice@juzwystawiam.pl" className="text-lg">
                        invoice@juzwystawiam.pl
                    </a>
                </Button>
            </div>
        </div>
    );
};
