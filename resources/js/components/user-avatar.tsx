import { SharedData, User } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LucideEllipsis } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

export default function UserAvatar({ user }: { user: User }) {
    const { auth } = usePage<SharedData>().props;
    const isMe = user.id === auth.user?.id;
    const isAdmin = auth.user?.role == 'admin';

    return (
        <div className="mx-auto grid max-w-sm gap-4">
            <div className="flex justify-between gap-4">
                <Link
                    href={isMe ? '/profile' : `/user/${user.id}`}
                    className="text-muted-foreground group flex gap-4"
                >
                    <Avatar className="border-secondary size-20 border text-3xl transition-opacity group-hover:opacity-90">
                        <AvatarImage src={user.profile_image_url} />
                        <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
                    </Avatar>
                    <div className="my-auto flex-1">
                        <h2 className="text-primary text-lg leading-snug">{user.name}</h2>
                        <div className="group-hover:text-primary leading-snug transition-colors">{`@${user.nickname}`}</div>
                        <div className="mt-2 text-xs">Joined {user.created_at_humans}</div>
                    </div>
                </Link>
                <div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size="inline"
                                variant="ghost"
                            >
                                <LucideEllipsis className="size-8" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48"
                            align="end"
                        >
                            {isMe && isAdmin && (
                                <DropdownMenuItem asChild>
                                    <Link href="/dashboard">Manage App</Link>
                                </DropdownMenuItem>
                            )}
                            {isMe ? (
                                <DropdownMenuItem
                                    className="w-full"
                                    asChild
                                >
                                    <Link
                                        method="post"
                                        href={route('auth.logout')}
                                    >
                                        Logout
                                    </Link>
                                </DropdownMenuItem>
                            ) : (
                                <DropdownMenuItem asChild>
                                    <a
                                        href="links.share"
                                        target="_blank"
                                    >
                                        Share
                                    </a>
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <div className="text-muted-foreground">{user.description}</div>
        </div>
    );
}
