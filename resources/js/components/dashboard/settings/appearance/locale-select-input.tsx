import { Select } from '@/components/common/select';
import { LOCALE_CODE } from '@/lib/constants/enums/locale-code';
import { useLocale } from '@/lib/hooks/use-locale';

export const LocaleSelectInput = () => {
    const { locale, setPreferredLocale } = useLocale();

    return (
        <div>
            <h4 className="mb-2">{locale.data['dashboard/settings'].appearance.Language}</h4>
            <Select
                defaultValue={locale.languageCode}
                onValueChange={(val) => setPreferredLocale(val)}
                options={Object.values(LOCALE_CODE).map((val) => ({ label: locale.data.enum.LOCALE_CODE[val], value: val }))}
            />
        </div>
    );
};
