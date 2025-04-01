import PostList from '@/components/post-list';
import MainLayout from '@/layouts/main-layout';
import { Post, type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Welcome({ posts }: { posts: { data: Post[] } }) {
    const { auth } = usePage<SharedData>().props;

    return (
        <MainLayout>
            <PostList posts={posts.data} />
        </MainLayout>
    );
}
