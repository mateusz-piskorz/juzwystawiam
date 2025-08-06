import { Button } from '@/components/ui/button';

import { Edit2 } from 'lucide-react';
import { useState } from 'react';
import { UpdateDialog } from './UpdateDialog';

type Props = {
    value: string;
    onChange: (val: string) => void;
};

export const IssueNumberField = ({ onChange, value }: Props) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <UpdateDialog
                open={open}
                setOpen={setOpen}
                onSubmit={({ issue_number }) => onChange(issue_number)}
                defaultValues={{ issue_number: value }}
            />
            <div className="flex items-center gap-2">
                <span className="text-muted-foreground">Numer:</span>
                <span>{value}</span>
                <Button aria-label="edit invoice issue number" type="button" variant="ghost" size="sm" onClick={() => setOpen(true)}>
                    <Edit2 />
                </Button>
            </div>
        </>
    );
};
