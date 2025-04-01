import AuthGateDialog from '@/components/auth-gate-dialog';
import PostCarousel from '@/components/post-carousel';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/main-layout';
import { cn } from '@/lib/utils';
import { Post, SharedData, type BreadcrumbItem } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { Bookmark, CircleMinus, LinkIcon, LucideEdit, X } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/dashboard/post',
    },
];

export default function DashboardPost({ post }: { post: Post }) {
    const { auth } = usePage<SharedData>().props;
    const isMe = auth.user.id === post.user.id;

    console.log(post);

    return (
        <MainLayout>
            <Head title={post.title} />
            <div className="container mx-auto grid max-w-screen-xl gap-12 pt-12 pb-24">
                <div className="flex flex-col-reverse gap-12 md:flex-row">
                    <div className="max-w-sm flex-1 space-y-10">
                        <div className="space-y-2">
                            <div className="grid gap-5">
                                <Link
                                    href={isMe ? '/profile' : `/user/${post.user.nickname}`}
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
                                        post.price.toString().length > 5 && post.price.toString().length <= 10 && 'flex-col items-start sm:flex-row',
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

                                {/* <template v-if="isMounted && isMe">
                    <div className="flex items-center h-6 gap-1 text-xs">
                      <div>{{ renewTime }} -</div>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button
                              @click="handleRenew"
                              size="inline"
                              variant="ghost"
                              :disabled="!isReadyToRenew"
                              >Renew</Button
                            >
                          </TooltipTrigger>
                          <TooltipContent>
                            <div class="text-xs text-center max-w-32">
                              <template v-if="isReadyToRenew">
                                <p>Renew your post for the next 30 days.</p>
                              </template>

                              <template v-if="!isReadyToRenew">
                                <p>
                                  You can renew your post within 7 days before
                                  expiration.
                                </p>
                              </template>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </template> */}
                            </div>
                        </div>
                        <div className="space-y-6">
                            <div className="grid gap-4">
                                {isMe ? (
                                    <Button
                                        variant="primary"
                                        asChild
                                    >
                                        <Link href={`/posts/${post.id}/edit`}>
                                            Edit
                                            <LucideEdit className="!size-5" />
                                        </Link>
                                    </Button>
                                ) : (
                                    <AuthGateDialog>
                                        <Button
                                            className="w-full"
                                            asChild
                                        >
                                            <a
                                                href="#"
                                                target="_blank"
                                            >
                                                Reply
                                                <X className="!size-5" />
                                            </a>
                                        </Button>
                                    </AuthGateDialog>
                                )}

                                <AuthGateDialog>
                                    <Button
                                        className="w-full"
                                        asChild
                                    >
                                        <a
                                            href="#"
                                            target="_blank"
                                        >
                                            Post
                                            <X className="!size-5" />
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
                                            <Button
                                                variant="ghost"
                                                className="w-full"
                                                size="icon"
                                            >
                                                <Bookmark />
                                                <span>Bookmark</span>
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                className="w-full"
                                                size="icon"
                                            >
                                                <CircleMinus />
                                                <span>Hide</span>
                                            </Button>
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

                <div className="bg-secondary mt-4 h-[1px] w-full"></div>

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
        </MainLayout>
    );
}
