import { cn } from '@/lib/utils';

export function BannerInfo({
    title,
    description,
    className,
    children,
}: {
    title: string;
    description: string;
    className?: string;
    children: React.ReactNode;
}) {
    return (
        <div className={cn('bg-primary/5 border-secondary m-10 space-y-6 rounded border p-8 py-20 text-center', className)}>
            <div className="space-y-2">
                <h1 className="text-primary text-2xl text-balance">{title}</h1>
                <p> {description}</p>
            </div>
            {children}
        </div>
    );
}
