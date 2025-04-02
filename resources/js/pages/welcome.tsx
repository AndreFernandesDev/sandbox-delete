import { CardInfo } from '@/components/card-info';
import ListFilter from '@/components/list-filter';
import PostList from '@/components/post-list';
import MainLayout from '@/layouts/main-layout';
import { Post, Tag } from '@/types';

export default function Welcome({ posts, tags }: { posts: { data: Post[] }; tags: { data: Tag[] } }) {
    return (
        <MainLayout bannerVariant="lg">
            <ListFilter
                tags={tags.data}
                type="post"
            />
            {posts.data.length ? (
                <PostList posts={posts.data} />
            ) : (
                <CardInfo
                    title="No items found."
                    description="Unfortunately we can't find something for you this time."
                />
            )}
        </MainLayout>
    );
}
