import { Moon, Sun } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useAppearance } from '@/lib/hooks/use-appearance';
import { useLocale } from '@/lib/hooks/use-locale';

type Props = {
    variant?: 'icon' | 'default';
    align?: 'start' | 'center' | 'end';
};

export function AppearanceToggle({ variant = 'default', align = 'start' }: Props) {
    const l = useLocale().locale;
    const locale = { ...l['dashboard/settings'].appearance, enum: l.enum.THEME };
    const { updateAppearance, appearance } = useAppearance();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size={variant}>
                    {appearance === 'dark' ? <Moon /> : <Sun />}
                    {variant === 'default' && <span>{locale.enum[appearance]}</span>}
                    <span className="sr-only">{locale['Toggle theme']}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align={align}>
                <DropdownMenuItem onClick={() => updateAppearance('light')}>
                    <Sun />
                    {locale.enum.light}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('dark')}>
                    <Moon />
                    {locale.enum.dark}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => updateAppearance('system')}>{locale.enum.system}</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
