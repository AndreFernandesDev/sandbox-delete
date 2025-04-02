import { BannerInfo } from '@/components/banner-info';
import Container from '@/components/container';
import PostList from '@/components/post-list';
import ProfileTabs from '@/components/profile-tabs';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/user-avatar';
import MainLayout from '@/layouts/main-layout';
import { Post, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function ProfilePage({ posts }: { posts: { data: Post[] } }) {
    const { auth } = usePage<SharedData>().props;

    if (!auth.user) return <></>;

    return (
        <MainLayout>
            <Head title="Profile" />
            <div className="border-secondary space-y-8 border-b px-5 py-8">
                <UserAvatar user={auth.user} />
                <ProfileTabs />
            </div>

            <Container
                variant="sm"
                className="px-0"
            >
                {posts.data.length ? (
                    <PostList posts={posts.data} />
                ) : (
                    <BannerInfo
                        title="No active posts"
                        description="Seems like it is time to start your journey!"
                    >
                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href="/posts/create">Start new post</Link>
                        </Button>
                    </BannerInfo>
                )}
            </Container>
        </MainLayout>
    );
}
