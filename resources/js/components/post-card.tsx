import { cn } from '@/lib/utils';
import { Post, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Bookmark, CircleMinus, LucideEyeOff } from 'lucide-react';
import { useState } from 'react';
import AuthGateDialog from './auth-gate-dialog';
import PostCarousel from './post-carousel';
import StatusButton from './status-button';
import { Button } from './ui/button';

export default function PostCard({ post }: { post: Post }) {
    const [status, setStatus] = useState(post.status);
    const { auth } = usePage<SharedData>().props;
    const isMe = post.user.id === auth.user?.id;

    return (
        <Link
            href={`/posts/${post.id}`}
            className="relative grid w-full h-full gap-2 p-4 pb-5 overflow-hidden text-center transition-opacity group bg-background outline-secondary outline-1 active:opacity-80 md:p-6 md:pb-10"
        >
            <PostCarousel
                media={post.media}
                pagination="bullet"
            />
            <div>
                <div>
                    <h2 className="mx-auto font-normal truncate text-primary max-w-40 md:max-w-80 md:text-lg">{post.title}</h2>
                    <div className="flex flex-col items-center justify-center gap-1 text-neutral-500 sm:flex-row">
                        <span className="text-xs md:text-lg">
                            {post.crypto} {post.currency}
                        </span>
                        <span className="hidden sm:block sm:text-xs md:text-sm">± (${post.price.toLocaleString()} USD)</span>
                        <div className="hidden md:inline-flex">{/* <CurrencyInfoPopover /> */}</div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-between w-full sm:min-h-10">
                <div className="hidden md:block">
                    {!isMe && (
                        <AuthGateDialog>
                            <StatusButton
                                type="bookmark"
                                onChange={(s) => setStatus(s)}
                                id={post.id}
                            >
                                <Bookmark
                                    className={cn('text-secondary hover:text-primary size-6', status === 'bookmark' && 'text-primary fill-primary')}
                                />
                            </StatusButton>
                        </AuthGateDialog>
                    )}
                </div>
                <div className="flex items-center justify-center flex-1 w-full gap-1 mx-auto text-xs max-w-40 text-neutral-500 md:max-w-64 md:text-sm">
                    <div className="flex-shrink-0">{post.created_at_diff}</div>
                    <div className="truncate">{post.location.label}</div>
                </div>
                <div className="hidden md:block">
                    {!isMe && (
                        <AuthGateDialog>
                            <StatusButton
                                type="hide"
                                onChange={(s) => setStatus(s)}
                                id={post.id}
                            >
                                <CircleMinus className="text-secondary hover:text-primary stroke-1.5 size-6" />
                            </StatusButton>
                        </AuthGateDialog>
                    )}
                </div>

                <div
                    className={cn(
                        'pattern-diagonal-3 ease bg-muted text-muted-foreground/20 absolute -inset-[1px] z-50 grid cursor-default place-items-center overflow-hidden transition-all duration-500',
                        status == 'hide' ? 'translate-y-0' : 'translate-y-full',
                    )}
                >
                    <div className="grid max-w-xs gap-10 p-10 border-2 border-dashed rounded-lg border-muted bg-muted text-muted-foreground place-items-center text-balance">
                        <div className="grid gap-4 text-sm rounded place-items-center">
                            <LucideEyeOff className="stroke-1 size-10" />
                            <p>Content hidden</p>
                        </div>
                        <div className="bg-muted-foreground/20 h-0.5 w-full rounded"></div>
                        <div className="space-y-2">
                            <p className="text-xs">In case you want to revert this action, please click the button below.</p>

                            <StatusButton
                                type="hide"
                                onChange={(s) => setStatus(s)}
                                id={post.id}
                            >
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-foreground"
                                >
                                    Undo action
                                </Button>
                            </StatusButton>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
