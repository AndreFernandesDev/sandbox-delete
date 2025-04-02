import PostList from '@/components/post-list';
import MainLayout from '@/layouts/main-layout';
import { Post } from '@/types';

export default function Welcome({ posts }: { posts: { data: Post[] } }) {
    return (
        <MainLayout>
            <PostList posts={posts.data} />
        </MainLayout>
    );
}
