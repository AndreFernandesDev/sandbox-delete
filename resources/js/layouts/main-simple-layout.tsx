import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';
import { Link } from '@inertiajs/react';
import { ChevronLeft } from 'lucide-react';

export default function MainSimpleLayout({
    children,
    title,
    actions,
    cancelLink,
    backLink,
}: {
    children: React.ReactNode;
    actions?: React.ReactNode;
    title?: string;
    cancelLink?: string;
    backLink?: string;
}) {
    return (
        <div>
            <header className="bg-background border-b">
                <div className="container mx-auto grid min-h-20 grid-cols-3 items-center gap-5 px-5">
                    <Button
                        size="inline"
                        variant="ghost"
                        asChild
                    >
                        <Link href={backLink ?? '/'}>
                            <ChevronLeft className="size-5" />
                        </Link>
                    </Button>
                    <div>
                        <h1 className="text-primary text-center text-lg font-medium">{title ?? 'For Crypto'}</h1>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="text-muted-foreground"
                            asChild
                        >
                            <Link href={cancelLink ?? '/'}>Cancel</Link>
                        </Button>
                        {actions}
                    </div>
                </div>
            </header>
            <div className="px-5 py-10">{children}</div>
            <Toaster />
        </div>
    );
}
