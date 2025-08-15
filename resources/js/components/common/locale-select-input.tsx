import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { LOCALE_CODE } from '@/lib/constants/enums/locale-code';
import { useLocale } from '@/lib/hooks/use-locale';

type Props = {
    variant?: 'icon' | 'default';

    align?: 'start' | 'center' | 'end';
};

export const LocaleSelectInput = ({ variant = 'default', align = 'start' }: Props) => {
    const { locale, setPreferredLocale, languageCode } = useLocale();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={variant}>
                    {/* <ReactCountryFlag
                        style={{
                            fontSize: '1.5rem',
                            lineHeight: '1.5rem',
                        }}
                        countryCode={COUNTRY_CODE[languageCode.toUpperCase() as unknown as keyof typeof COUNTRY_CODE]}
                    /> */}
                    {variant === 'default' && <span>{locale.enum.LOCALE_CODE[languageCode]}</span>}
                    <span className="sr-only">{locale['dashboard/settings'].appearance['Select language']}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align}>
                {Object.values(LOCALE_CODE).map((val) => {
                    return (
                        <DropdownMenuItem className="flex items-center" key={val} onClick={() => setPreferredLocale(val)}>
                            {/* <ReactCountryFlag
                                style={{
                                    fontSize: '1.2rem',
                                    lineHeight: '1.2rem',
                                }}
                                countryCode={COUNTRY_CODE[val.toUpperCase() as unknown as keyof typeof COUNTRY_CODE]}
                            /> */}
                            {locale.enum.LOCALE_CODE[val]}
                        </DropdownMenuItem>
                    );
                })}
                <DropdownMenuItem onClick={() => setPreferredLocale('system')}>{locale.enum.LOCALE_CODE.system}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
