import { Link } from '@inertiajs/react';
import { Button } from './ui/button';

export type UploaderItem = {
    id: string;
    src?: string;
    file?: File;
};

const links = [
    { type: 'post', label: 'Item', href: '/posts/create', disabled: false },
    { type: 'service', label: 'Service', href: '/services/create', disabled: true },
    { type: 'job', label: 'Job', href: '/jobs/create', disabled: true },
];

export default function LinksCategories({ type, disabled }: { type?: string; disabled?: boolean }) {
    return (
        <div className="flex flex-col gap-2 sm:flex-row">
            <div className="flex items-center space-x-2">
                {links.map((l) => (
                    <Button
                        key={l.href}
                        variant={type == l.type ? 'primary' : 'outline'}
                        onClick={(e) => {
                            if (type == l.type) {
                                e.preventDefault();
                            }
                        }}
                        disabled={disabled || l.disabled}
                        asChild={!disabled && !l.disabled}
                    >
                        {!disabled && !l.disabled ? <Link href={l.href}>{l.label}</Link> : l.label}
                    </Button>
                ))}
            </div>
        </div>
    );
}
