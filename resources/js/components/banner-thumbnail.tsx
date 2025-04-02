import { Banner } from '@/types';
import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export type BannerThumbnailVariant = 'default' | 'header' | 'lg';

export default function BannerThumbnail({ banner, variant = 'default' }: { banner: Banner; variant?: BannerThumbnailVariant }) {
    return (
        <>
            {variant === 'default' && <BannerThumbnailDefault banner={banner} />}
            {variant === 'header' && <BannerThumbnailHeader banner={banner} />}
            {variant === 'lg' && <BannerThumbnailLarge banner={banner} />}
        </>
    );
}

function BannerThumbnailDefault({ banner }: { banner: Banner }) {
    const styles = {
        background: banner.background,
        color: banner.foreground,
    };

    return (
        <div
            style={styles}
            className="border-secondary bg-primary text-primary-foreground flex min-h-44 items-center gap-10 border-t border-b px-5 pt-8 pb-10 md:px-8"
        >
            <img
                src={banner.logo.url}
                className="size-16 object-contain"
            />
            <div className="grid place-items-start gap-2 font-medium">
                <div className="space-y-1">
                    <span className="text-lg">{banner.title}</span>
                    <h2 className="text-2xl">{banner.label}</h2>
                </div>
                <a
                    href={banner.url}
                    target="_blank"
                    className="hover:text-primary-foreground/80 flex cursor-pointer items-center gap-2 text-sm transition-colors"
                >
                    <span>{banner.cta}</span>
                    <ChevronRight className="w-3.5" />
                </a>
            </div>
        </div>
    );
}

function BannerThumbnailHeader({ banner }: { banner: Banner }) {
    const styles = {
        background: banner.background,
        color: banner.foreground,
    };

    return (
        <div className="flex">
            <Link
                href="/"
                className="border-secondary bg-background text-primary active:text-foreground grid w-16 place-items-center border-t border-b transition-all md:hidden"
            >
                <ChevronLeft className="w-6" />
            </Link>
            <div
                style={styles}
                className="border-secondary bg-primary text-primary-foreground flex flex-1 items-center justify-start gap-8 border-t border-b px-5 py-5 md:gap-10 md:px-8 md:py-8"
            >
                <img
                    src={banner.logo.url}
                    className="size-14 object-contain md:size-20"
                />
                <div className="grid place-items-start gap-2 font-medium">
                    <div className="space-y-1">
                        <span className="text-xs md:text-sm xl:text-lg">{banner.title}</span>
                        <h2 className="text-md text-balance md:text-3xl">{banner.label}</h2>
                    </div>
                    <a
                        href={banner.url}
                        target="_blank"
                        className="hover:text-primary-foreground/80 flex cursor-pointer items-center gap-2 text-sm transition-colors"
                    >
                        <span>{banner.cta}</span>
                        <ChevronRight className="w-3.5" />
                    </a>
                </div>
            </div>
        </div>
    );
}

function BannerThumbnailLarge({ banner }: { banner: Banner }) {
    const styles = {
        background: banner.background,
        color: banner.foreground,
    };

    return (
        <div
            style={styles}
            className="border-secondary bg-primary text-primary-foreground flex items-center justify-center gap-10 border-t border-b px-5 py-5 md:px-8 md:py-20"
        >
            <img
                src={banner.logo.url}
                className="size-16 object-contain md:size-24 xl:size-40"
            />
            <div className="grid max-w-3xl flex-1 gap-1 font-semibold md:gap-4">
                <div className="md:space-y-2">
                    <span className="text-xs md:text-sm xl:text-2xl">{banner.title}</span>
                    <h2 className="text-md text-balance md:text-4xl">{banner.label}</h2>
                </div>
                <a
                    href={banner.url}
                    target="_blank"
                    className="flex cursor-pointer items-center gap-1.5 text-lg transition-colors hover:opacity-80"
                >
                    <span>{banner.cta}</span>
                    <ChevronRight className="w-3.5" />
                </a>
            </div>
        </div>
    );
}
