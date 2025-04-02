import { Post } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from './ui/button';

export default function ArchiveItem({ data }: { data: Post }) {
    return (
        <div className="hover:bg-primary/5 block w-full">
            <div className="relative mx-auto flex min-h-20 w-full max-w-screen-lg items-center gap-x-10 p-6">
                <h2 className="text-primary flex flex-1 truncate sm:max-w-32 md:text-lg">{data.title}</h2>
                <div className="text-primary flex-1 md:text-lg">{`${data.crypto} ${data.currency}`}</div>
                <div className="text-muted-foreground hidden text-sm md:block">Expired</div>
                <Button variant="ghost">
                    <Link href={route('post.edit', { id: data.id, renew: 'true' })}>Renew</Link>
                </Button>
            </div>
        </div>
    );
}
