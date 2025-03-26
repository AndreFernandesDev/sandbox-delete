import InputError from '@/components/input-error';
import InputUploader, { UploaderItem } from '@/components/input-uploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { Post, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/dashboard/post',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

type Form = {
    title: string;
    description: string;
    uploads: UploaderItem[];
    deletes: string[];
};

export default function PostEdit({ post }: { post: Post }) {
    const [status, setStatus] = useState('');
    const { data, setData, processing, errors, ...form } = useForm<Form>({
        title: post.title,
        description: post.description,
        uploads: [],
        deletes: [],
    });

    function submit(e: any) {
        e.preventDefault();

        form.post(route('post.update', [post.id]));
    }

    console.log(status);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <form onSubmit={submit}>
                        <div className="grid gap-6 p-10">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Title</Label>
                                <InputUploader
                                    value={post.media}
                                    name="uploads"
                                    maxFiles={10}
                                    onChange={(uploads) => setData('uploads', uploads)}
                                    onDelete={(deletes) => setData('deletes', deletes)}
                                    onStatus={(status) => setStatus(status)}
                                />
                                <InputError message={errors.uploads} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Title</Label>
                                <Input
                                    id="title"
                                    required
                                    autoFocus
                                    tabIndex={2}
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
                                    placeholder="Write post here"
                                />
                                <InputError message={errors.title} />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="description">Descripiton</Label>
                                <Input
                                    id="description"
                                    required
                                    tabIndex={3}
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                />
                                <InputError message={errors.title} />
                            </div>

                            <Button type="submit" className="mt-4 w-full" tabIndex={4} disabled={processing || status === 'processing'}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                                Post
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
