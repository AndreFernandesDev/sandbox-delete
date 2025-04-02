import { cn } from '@/lib/utils';

export default function Container({
    children,
    variant = 'default',
    className,
}: {
    children: React.ReactNode;
    variant?: 'default' | 'sm' | 'xs';
    className?: string;
}) {
    return (
        <div
            className={cn(
                'container mx-auto grid gap-12 px-5',
                variant == 'sm' && 'max-w-screen-xl',
                variant == 'xs' && 'max-w-screen-lg',
                className,
            )}
        >
            {children}
        </div>
    );
}
