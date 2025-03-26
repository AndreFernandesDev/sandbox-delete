import PostDelete from '@/components/post-delete';
import { Button } from '@/components/ui/button';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Eye, Pencil, Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function DashboardPost({ posts }: { posts: Post[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-10">
                        <div className="text-md mb-4">Total posts:</div>
                        <div className="text-5xl font-bold">{posts.length}</div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border p-10">
                        <div className="text-md mb-4">New post:</div>
                        <Button asChild>
                            <Link href={route('post.create')}>Post</Link>
                        </Button>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="grid grid-cols-1 gap-2 p-10">
                        {posts.map((p) => (
                            <div key={p.id} className="flex items-center justify-between rounded-md border px-3 py-2">
                                <div>{p.title}</div>
                                <div className="flex gap-2">
                                    <Button variant="ghost" asChild>
                                        <Link href={route('post.show', [p.id])}>
                                            <Eye />
                                        </Link>
                                    </Button>

                                    <Button variant="secondary" asChild>
                                        <Link href={route('post.edit', [p.id])}>
                                            <Pencil />
                                        </Link>
                                    </Button>

                                    <PostDelete id={p.id}>
                                        <Button variant="destructive">
                                            <Trash />
                                            Delete
                                        </Button>
                                    </PostDelete>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
