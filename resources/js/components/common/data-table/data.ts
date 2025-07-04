import { ArrowDown, ArrowRight, ArrowUp, CheckCircle, Circle, CircleOff, HelpCircle, Timer } from 'lucide-react';
import { z } from 'zod';

export const labels = [
    {
        value: 'bug',
        label: 'Bug',
    },
    {
        value: 'feature',
        label: 'Feature',
    },
    {
        value: 'documentation',
        label: 'Documentation',
    },
];

export const statuses = [
    {
        value: 'backlog',
        label: 'Backlog',
        icon: HelpCircle,
    },
    {
        value: 'todo',
        label: 'Todo',
        icon: Circle,
    },
    {
        value: 'in progress',
        label: 'In Progress',
        icon: Timer,
    },
    {
        value: 'done',
        label: 'Done',
        icon: CheckCircle,
    },
    {
        value: 'canceled',
        label: 'Canceled',
        icon: CircleOff,
    },
];

export const priorities = [
    {
        label: 'Low',
        value: 'low',
        icon: ArrowDown,
    },
    {
        label: 'Medium',
        value: 'medium',
        icon: ArrowRight,
    },
    {
        label: 'High',
        value: 'high',
        icon: ArrowUp,
    },
];

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
    id: z.string(),
    title: z.string(),
    status: z.string(),
    label: z.string(),
    priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;
