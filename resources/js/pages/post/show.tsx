import AuthGateDialog from '@/components/auth-gate-dialog';
import Container from '@/components/container';
import IconLib from '@/components/icon-custom';
import PostCarousel from '@/components/post-carousel';
import StatusButton from '@/components/status-button';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useRenew } from '@/hooks/use-renew';
import MainLayout from '@/layouts/main-layout';
import { cn } from '@/lib/utils';
import { Post, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bookmark, CircleMinus, EyeOff, LinkIcon, LucideEdit } from 'lucide-react';
import { useState } from 'react';

export default function ShowPost({ post }: { post: Post }) {
    const [status, setStatus] = useState(post.status);
    const { auth } = usePage<SharedData>().props;
    const isMe = auth.user?.id === post.user.id;

    const { isReadyToRenew, time } = useRenew(post.expires_at);

    return (
        <MainLayout>
            <Head title={post.title}>
                <meta
                    property="og:image"
                    content={post.thumbnail.url}
                />
                <meta
                    name="twitter:card"
                    content="summary_large_image"
                />
            </Head>

            <Container variant="sm">
                <div className="grid gap-12 pt-12 pb-24">
                    <div className="flex flex-col-reverse gap-12 md:flex-row">
                        <div className="max-w-sm flex-1 space-y-10">
                            <div className="space-y-2">
                                <div className="grid gap-5">
                                    <Link
                                        href={isMe ? '/profile' : `/user/${post.user.id}`}
                                        className="flex gap-4"
                                    >
                                        <div className="border-secondary h-20 w-20 overflow-hidden rounded-full border">
                                            <img
                                                loading="lazy"
                                                src={post.user.profile_image_url}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                        <div className="my-auto flex-1">
                                            <h2 className="text-primary text-lg leading-snug">{post.user.name}</h2>
                                            {isMe ? (
                                                <div className="text-muted-foreground hover:text-primary leading-snug">{`@${post.user.nickname}`}</div>
                                            ) : (
                                                <div className="text-muted-foreground hover:text-primary block leading-snug transition-colors">
                                                    {`@${post.user.nickname}`}
                                                </div>
                                            )}

                                            <div className="text-muted-foreground mt-2 text-sm">Joined {post.user.created_at_humans}</div>
                                        </div>
                                    </Link>
                                </div>

                                <div className="grid gap-2">
                                    <h1 className="text-2xl font-medium">{post.title}</h1>
                                    <div
                                        className={cn(
                                            'text-muted-foreground flex gap-2',
                                            post.price.toString().length > 5 &&
                                                post.price.toString().length <= 10 &&
                                                'flex-col items-start sm:flex-row',
                                            post.price.toString().length > 10 && 'sm:flex-col',
                                        )}
                                    >
                                        <span className="text-2xl">
                                            {post.crypto} {post.currency}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <span className="text-lg">± (${post.price.toLocaleString()} USD)</span>
                                            {/* <CurrencyInfoPopover /> */}
                                        </div>
                                    </div>
                                    <div className="text-muted-foreground text-sm">
                                        Posted {post.created_at_diff} in
                                        <span className="text-nowrap"> {post.location.label}</span>
                                    </div>

                                    <div className="flex h-6 items-center gap-1 text-xs">
                                        <div>{time} -</div>
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <span>
                                                        <Button
                                                            size="inline"
                                                            variant="ghost"
                                                            asChild={isReadyToRenew}
                                                            disabled={!isReadyToRenew}
                                                        >
                                                            <Link href={route('post.edit', { id: post.id, renew: 'true' })}>Renew</Link>
                                                        </Button>
                                                    </span>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <div className="max-w-32 text-center text-xs">
                                                        {isReadyToRenew ? (
                                                            <p>Renew your post for the next 30 days.</p>
                                                        ) : (
                                                            <p>You can renew your post within 7 days before expiration.</p>
                                                        )}
                                                    </div>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="grid gap-4">
                                    {isMe ? (
                                        <Button
                                            variant="primary"
                                            className="text-lg"
                                            asChild
                                        >
                                            <Link href={`/posts/${post.id}/edit`}>
                                                Edit
                                                <LucideEdit />
                                            </Link>
                                        </Button>
                                    ) : (
                                        <AuthGateDialog>
                                            <Button
                                                className="w-full text-lg"
                                                asChild
                                            >
                                                <a
                                                    href="#"
                                                    target="_blank"
                                                >
                                                    Reply
                                                    <IconLib type="x" />
                                                </a>
                                            </Button>
                                        </AuthGateDialog>
                                    )}

                                    <AuthGateDialog>
                                        <Button
                                            className="w-full text-lg"
                                            asChild
                                        >
                                            <a
                                                href="#"
                                                target="_blank"
                                            >
                                                Post
                                                <IconLib type="x" />
                                            </a>
                                        </Button>
                                    </AuthGateDialog>
                                </div>
                            </div>

                            <div>
                                <AuthGateDialog>
                                    <div className="flex items-center">
                                        {!isMe && (
                                            <>
                                                <StatusButton
                                                    className="w-full"
                                                    type="bookmark"
                                                    onChange={(s) => setStatus(s)}
                                                    id={post.id}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full"
                                                        size="icon"
                                                    >
                                                        <Bookmark className={cn('', status === 'bookmark' && 'text-primary fill-primary')} />
                                                        <span>Bookmark</span>
                                                    </Button>
                                                </StatusButton>

                                                <StatusButton
                                                    className="w-full"
                                                    type="hide"
                                                    onChange={(s) => setStatus(s)}
                                                    id={post.id}
                                                >
                                                    <Button
                                                        variant="ghost"
                                                        className="w-full"
                                                        size="icon"
                                                    >
                                                        <CircleMinus />
                                                        <span>Hide</span>
                                                    </Button>
                                                </StatusButton>
                                            </>
                                        )}

                                        <Button
                                            variant="ghost"
                                            className="w-full"
                                            size="icon"
                                        >
                                            <LinkIcon />
                                            <span>Share</span>
                                        </Button>
                                    </div>
                                </AuthGateDialog>
                            </div>
                        </div>

                        <div className="grid flex-1">
                            <PostCarousel
                                media={post.media}
                                pagination="media"
                            />
                        </div>
                    </div>

                    <div className="border-secondary flex flex-wrap gap-2 border-y py-8">
                        {post.tags.map((tag) => (
                            <Button
                                key={tag.id}
                                size="xs"
                                variant="outline-muted"
                            >
                                {tag.name}
                            </Button>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <h2 className="text-primary text-2xl">Description</h2>
                        <p className="max-w-prose leading-relaxed">{post.description}</p>
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-primary text-2xl">Map</h2>
                        <div className="bg-muted grid aspect-square place-items-center md:aspect-[16/10]">
                            <iframe
                                className="h-full w-full"
                                style={{ border: 0 }}
                                src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyCLSJNtrw8AswwR5zOxTZ2tDSi-yvgqJh4&center=${post.location.latitude},${post.location.longitude}&zoom=11`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>
                </div>
            </Container>

            <div
                className={cn(
                    'pattern-diagonal-3 ease bg-muted text-muted-foreground/20 fixed -inset-[1px] z-20 grid cursor-default place-items-center overflow-hidden transition-all duration-500',
                    status == 'hide' ? 'translate-y-0' : 'translate-y-full',
                )}
            >
                <div className="border-muted bg-muted text-muted-foreground grid max-w-xs place-items-center gap-10 rounded-lg border-2 border-dashed p-10 text-balance">
                    <div className="grid place-items-center gap-4 rounded text-sm">
                        <EyeOff className="size-10 stroke-1" />
                        <p>Content hidden</p>
                    </div>
                    <div className="bg-muted-foreground/20 h-0.5 w-full rounded"></div>
                    <div className="grid place-items-center space-y-3">
                        <p className="text-foreground text-center text-sm">To see other listings, please click the button below.</p>

                        <Button
                            size="sm"
                            asChild
                        >
                            <Link href="/">Back home</Link>
                        </Button>

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
        </MainLayout>
    );
}
