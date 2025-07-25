import { Select } from '@/components/common/select';
import { LOCALE_CODE } from '@/lib/constants/enums/locale-code';
import { useLocale } from '@/lib/hooks/use-locale';

export const LocaleSelectInput = () => {
    const { localeData, setPreferredLocale } = useLocale();

    return (
        <div>
            <h4 className="mb-2">Locale</h4>
            <Select
                defaultValue={localeData.languageCode}
                onValueChange={(val) => setPreferredLocale(val)}
                options={Object.values(LOCALE_CODE).map((val) => ({ label: val, value: val }))}
            />
        </div>
    );
};
