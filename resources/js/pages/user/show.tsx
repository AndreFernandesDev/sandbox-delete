import { CardInfo } from '@/components/card-info';
import Container from '@/components/container';
import PostList from '@/components/post-list';
import { Button } from '@/components/ui/button';
import UserAvatar from '@/components/user-avatar';
import MainLayout from '@/layouts/main-layout';
import { Post, User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { X } from 'lucide-react';

export default function UserShow({ user, posts }: { user: User; posts: { data: Post[] } }) {
    console.log(user);
    return (
        <MainLayout>
            <Head title="Profile" />
            <div className="border-secondary space-y-8 border-b px-5 py-8">
                <UserAvatar user={user} />

                <div className="mx-auto grid max-w-sm">
                    <Button asChild>
                        <a
                            href="#"
                            target="_blank"
                        >
                            Message
                            <X />
                        </a>
                    </Button>
                </div>
            </div>

            <Container
                variant="sm"
                className="px-0"
            >
                {posts.data.length ? (
                    <PostList posts={posts.data} />
                ) : (
                    <CardInfo
                        title="No active posts"
                        description="Seems like everything has been sold for now"
                    >
                        <Button
                            asChild
                            variant="outline"
                        >
                            <Link href="/">Back home</Link>
                        </Button>
                    </CardInfo>
                )}
            </Container>
        </MainLayout>
    );
}
