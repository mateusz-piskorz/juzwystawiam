import { Appearance, useAppearance } from '@/lib/hooks/use-appearance';
import { useLocale } from '@/lib/hooks/use-locale';
import { cn } from '@/lib/utils/cn';
import { LucideIcon, Monitor, Moon, Sun } from 'lucide-react';
import { HTMLAttributes } from 'react';

export function AppearanceTabs({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
    const { locale } = useLocale();
    const { appearance, updateAppearance } = useAppearance();
    const { dark, light, system } = locale.data.enum.THEME;

    const tabs: { value: Appearance; icon: LucideIcon; label: string }[] = [
        { value: 'light', icon: Sun, label: light },
        { value: 'dark', icon: Moon, label: dark },
        { value: 'system', icon: Monitor, label: system },
    ];

    return (
        <div>
            <h4 className="mb-2">{locale.data['dashboard/settings'].appearance.Theme}</h4>
            <div className={cn('inline-flex gap-1 rounded bg-neutral-100 p-1 dark:bg-neutral-800', className)} {...props}>
                {tabs.map(({ value, icon: Icon, label }) => (
                    <button
                        key={value}
                        onClick={() => updateAppearance(value)}
                        className={cn(
                            'flex items-center rounded px-3.5 py-1.5 transition-colors',
                            appearance === value
                                ? 'bg-white shadow-xs dark:bg-neutral-700 dark:text-neutral-100'
                                : 'text-neutral-500 hover:bg-neutral-200/60 hover:text-black dark:text-neutral-400 dark:hover:bg-neutral-700/60',
                        )}
                    >
                        <Icon className="-ml-1 h-4 w-4" />
                        <span className="ml-1.5 text-sm">{label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
