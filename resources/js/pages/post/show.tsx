import PostDelete from '@/components/post-delete';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Trash } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/dashboard/post',
    },
];

export default function DashboardPost({ post }: { post: Post }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="grid grid-cols-6 gap-6 p-10">
                        {post.media.map((m) => (
                            <div key={m.id}>
                                <img className="h-full w-full object-cover" src={m.src} />
                            </div>
                        ))}
                    </div>

                    <div className="grid gap-6 p-10">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Title</Label>
                            {post.title}
                        </div>

                        <div className="grid gap-2">
                            <Label htmlFor="email">Description</Label>
                            {post.description}
                        </div>

                        <PostDelete id={post.id}>
                            <Button variant="destructive">
                                <Trash />
                                Delete
                            </Button>
                        </PostDelete>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
