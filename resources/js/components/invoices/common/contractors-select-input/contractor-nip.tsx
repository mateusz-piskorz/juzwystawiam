type Props = {
    nip: string;
};

export const ContractorNip = ({ nip }: Props) => {
    return <p className="text-muted-foreground text-sm">NIP: {nip}</p>;
};
