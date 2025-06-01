import { ReactSelectInput } from '@/components/common/react-select-input';
import { getContractors } from '@/lib/data/contractors';
import { Contractor } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

type onChangeValue = (Contractor & { __isNew__: undefined }) | { label: string; value: string; __isNew__: true };

type Props = {
    onChange: (val: onChangeValue) => void;
    value: string;
    highlighted?: boolean;
};

export const ContractorsSelectInput = ({ onChange, value, highlighted }: Props) => {
    const { data, isLoading } = useQuery<Contractor[]>({
        queryKey: ['invoice-list'],
        queryFn: () => getContractors({ limit: String(1000) }).then((res) => res.data.map((c) => ({ label: c.name, ...c }))),
    });

    return (
        <ReactSelectInput
            allowCreateWhileLoading
            highlighted={highlighted}
            options={data}
            isLoading={isLoading}
            onChange={(val) => onChange(val as onChangeValue)}
            value={data?.find((contractor) => contractor.name === value)}
        />
    );
};
