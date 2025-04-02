import PostCard from '@/components/post-card';
import { cn } from '@/lib/utils';
import { Post } from '@/types';

export default function PostList({ posts, variant = 'default' }: { posts: Post[]; variant?: 'default' | 'sm' }) {
    return (
        <div className={cn('mx-auto w-full', variant == 'sm' && 'max-w-screen-xl')}>
            <div className="listing-grid relative">
                {posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                    />
                ))}

                {posts.length < 5 && [...Array(5)].map((_, i) => <div key={i}></div>)}
            </div>
        </div>
    );
}
