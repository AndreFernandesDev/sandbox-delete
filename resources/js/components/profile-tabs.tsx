import { cn } from '@/lib/utils';
import { Link, usePage } from '@inertiajs/react';

const links = [
    {
        title: 'Posts',
        href: '/profile',
    },
    {
        title: 'Bookmark',
        href: '/profile/bookmark',
    },
    {
        title: 'Archive',
        href: '/profile/archive',
    },
];

export default function ProfileTabs() {
    const { url } = usePage();

    return (
        <div className="mx-auto grid max-w-xl grid-cols-3">
            {links.map((l) => (
                <Link
                    key={l.href}
                    href={l.href}
                    className={cn(
                        'text-primary outline-secondary grid min-h-14 place-items-center text-sm outline-1 transition-all md:text-base',
                        url == l.href && 'bg-primary outline-primary text-primary-foreground z-20',
                    )}
                >
                    {l.title}
                </Link>
            ))}
        </div>
    );
}
