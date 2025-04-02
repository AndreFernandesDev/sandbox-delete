import ArchiveItem from '@/components/archive-item';
import { CardInfo } from '@/components/card-info';
import Container from '@/components/container';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/user-avatar';
import MainLayout from '@/layouts/main-layout';
import { cn } from '@/lib/utils';
import { Post, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

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

export default function ProfileArchivePage({ posts }: { posts: { data: Post[] } }) {
    const { url } = usePage();
    const { auth } = usePage<SharedData>().props;

    if (!auth.user) return <></>;

    return (
        <MainLayout>
            <Head title="Bookmarks" />
            <div className="border-secondary space-y-8 border-b px-5 py-8">
                <UserAvatar user={auth.user} />

                <div className="mx-auto grid max-w-xl grid-cols-3">
                    {links.map((l) => (
                        <Link
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
            </div>

            {posts.data.length ? (
                <div className="divide-secondary border-secondary grid divide-y border-b">
                    {posts.data.map((post) => (
                        <ArchiveItem
                            key={post.id}
                            data={post}
                        />
                    ))}
                </div>
            ) : (
                <Container
                    variant="sm"
                    className="px-0"
                >
                    <CardInfo
                        title="Empty archive"
                        description="Seems like it is time to start a new post!"
                    >
                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href={route('post.create')}>Start new post</Link>
                        </Button>
                    </CardInfo>
                </Container>
            )}
        </MainLayout>
    );
}
