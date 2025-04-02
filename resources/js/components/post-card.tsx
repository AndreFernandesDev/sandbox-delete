import { cn } from '@/lib/utils';
import { Post } from '@/types';
import { Link } from '@inertiajs/react';
import { Bookmark, CircleMinus, LucideEyeOff } from 'lucide-react';
import { useState } from 'react';
import AuthGateDialog from './auth-gate-dialog';
import PostCarousel from './post-carousel';
import StatusButton from './status-button';
import { Button } from './ui/button';

export default function PostCard({ post }: { post: Post }) {
    const [status, setStatus] = useState(post.status);
    // const { auth } = usePage<SharedData>();
    console.log(post);
    return (
        <Link
            href={`/posts/${post.id}`}
            className="group bg-background outline-secondary relative grid h-full w-full gap-2 overflow-hidden p-4 pb-5 text-center outline-1 transition-opacity active:opacity-80 md:p-6 md:pb-10"
        >
            <PostCarousel
                media={post.media}
                pagination="bullet"
            />
            <div>
                <div>
                    <h2 className="text-primary mx-auto max-w-40 truncate font-normal md:max-w-80 md:text-lg">{post.title}</h2>
                    <div className="flex flex-col items-center justify-center gap-1 text-neutral-500 sm:flex-row">
                        <span className="text-xs md:text-lg">
                            {post.crypto} {post.currency}
                        </span>
                        <span className="hidden sm:block sm:text-xs md:text-sm">± (${post.price.toLocaleString()} USD)</span>
                        <div className="hidden md:inline-flex">{/* <CurrencyInfoPopover /> */}</div>
                    </div>
                </div>
            </div>

            <div className="flex w-full items-center justify-between sm:min-h-10">
                <div className="hidden md:block">
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
                </div>
                <div className="mx-auto flex w-full max-w-40 flex-1 items-center justify-center gap-1 text-xs text-neutral-500 md:max-w-64 md:text-sm">
                    <div className="flex-shrink-0">{post.created_at_diff}</div>
                    <div className="truncate">{post.location.label}</div>
                </div>
                <div className="hidden md:block">
                    <AuthGateDialog>
                        <StatusButton
                            type="hide"
                            onChange={(s) => setStatus(s)}
                            id={post.id}
                        >
                            <CircleMinus className="text-secondary hover:text-primary stroke-1.5 size-6" />
                        </StatusButton>
                    </AuthGateDialog>
                </div>

                <div
                    className={cn(
                        'pattern-diagonal-3 ease bg-muted text-muted-foreground/20 absolute -inset-[1px] z-50 grid cursor-default place-items-center overflow-hidden transition-all duration-500',
                        status == 'hide' ? 'translate-y-0' : 'translate-y-full',
                    )}
                >
                    <div className="border-muted bg-muted text-muted-foreground grid max-w-xs place-items-center gap-10 rounded-lg border-2 border-dashed p-10 text-balance">
                        <div className="grid place-items-center gap-4 rounded text-sm">
                            <LucideEyeOff className="size-10 stroke-1" />
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
