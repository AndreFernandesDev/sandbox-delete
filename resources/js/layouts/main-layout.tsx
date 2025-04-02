import AuthGateDialog from '@/components/auth-gate-dialog';
import BannerThumbnail, { BannerThumbnailVariant } from '@/components/banner-thumbnail';
import InputSearch from '@/components/input-search';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown, LucideEdit, X } from 'lucide-react';

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
                                <Avatar className="border-secondary border">
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
