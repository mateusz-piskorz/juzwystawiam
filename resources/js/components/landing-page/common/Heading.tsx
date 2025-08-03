type Props = {
    title: string;
    description?: string | React.ReactNode;
};

export function Heading({ title, description }: Props) {
    return (
        <div className="flex flex-col items-center gap-6 text-center md:items-start md:text-left">
            <h1 className="-mb-[10px] max-w-[500px] text-4xl leading-[1.3] font-semibold md:max-w-[650px] md:text-4xl lg:max-w-[950px]">{title}</h1>
            <p className="text-muted-foreground max-w-[800px] text-sm md:text-base lg:max-w-[1000px] lg:text-xl">{description}</p>
        </div>
    );
}
