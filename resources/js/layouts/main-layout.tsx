import AuthGateDialog from '@/components/auth-gate-dialog';
import BannerThumbnail, { BannerThumbnailVariant } from '@/components/banner-thumbnail';
import InputLocation from '@/components/input-location';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LucideEdit, LucideSearch, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';

export default function MainLayout({ children, bannerVariant = 'header' }: { children: React.ReactNode; bannerVariant?: BannerThumbnailVariant }) {
    const { auth, banner } = usePage<SharedData>().props;

    return (
        <div>
            <div className={cn('block', bannerVariant == 'header' && 'hidden md:block')}>
                <header className="bg-background header relative z-40 grid grid-cols-2 items-center gap-3 border-b px-5 pt-6 pb-3 md:gap-3 md:px-8 md:pb-6">
                    <Link href="/">
                        <img
                            src="/brand.svg"
                            className="h-12 w-36"
                        />
                    </Link>

                    <InputSearch />

                    <div className="order-2 grid md:order-none">
                        <AuthGateDialog>
                            <Button
                                variant="outline"
                                className="w-full xl:min-w-48"
                                asChild
                            >
                                <Link href="/posts/create">
                                    <span className="md:hidden xl:block">Post</span>
                                    <LucideEdit />
                                </Link>
                            </Button>
                        </AuthGateDialog>
                    </div>

                    <div className="order-3 grid md:order-none">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full xl:min-w-48"
                                >
                                    <span className="md:hidden xl:block">Resources</span>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-56 lg:w-72"
                                align="end"
                            >
                                <DropdownMenuItem asChild>
                                    <Link href="/resources/why">Why For Crypto?</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/resources/advertise">Advertise with us</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/resources/legal">Terms & Policies</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/resources/feedback">Feedback</Link>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem asChild>
                                    <Link href="/resources/help">Help</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="order-1 flex justify-end md:order-none">
                        {auth.user ? (
                            <Link href="/profile">
                                <Avatar>
                                    <AvatarImage src={auth.user.profile_image_url} />
                                    <AvatarFallback>FC</AvatarFallback>
                                </Avatar>
                            </Link>
                        ) : (
                            <Button
                                className="w-full lg:min-w-48"
                                asChild
                            >
                                <a href="/auth/redirect">
                                    <span className="md:hidden lg:block">Connect</span>
                                    <X />
                                </a>
                            </Button>
                        )}
                    </div>
                </header>
            </div>
            {banner && (
                <BannerThumbnail
                    banner={banner}
                    variant={bannerVariant}
                />
            )}
            {children}
        </div>
    );
}

const InputSearch = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="relative order-last col-span-2 grid items-center gap-4 md:order-none md:col-span-1 xl:max-w-2xl">
            <div className="relative">
                <Input
                    placeholder="Search"
                    className="border-secondary h-14 py-3 pr-12 pl-12 md:pr-36"
                />
                <span className="absolute inset-y-0 start-0 flex items-center justify-center px-4">
                    <LucideSearch className="text-primary size-6" />
                </span>

                <div className="absolute inset-y-0 right-48 flex items-center rounded-full"></div>
            </div>

            <div className="bg-background right-4 flex items-center justify-center gap-2 md:absolute md:justify-end md:pl-4 [&_[data-location='label']]:max-w-28 [&_[data-location='label']]:truncate">
                <div className="absolute top-0 right-4 flex h-14 items-center justify-center md:static md:mr-2 md:h-auto">
                    <Button
                        size="icon-xs"
                        variant="secondary"
                        className={cn('rounded-full transition-all', !!search.length ? 'opacity-100' : 'pointer-events-none opacity-0')}
                    >
                        <X />
                    </Button>
                </div>

                <InputLocation />
                <Button
                    size="inline"
                    variant="ghost"
                    className="text-muted-foreground"
                >
                    <RotateCcw />
                </Button>
            </div>
        </div>
    );
};
