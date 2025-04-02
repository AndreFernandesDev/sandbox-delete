import { Banner } from '@/types';
import BannerThumbnail from './banner-thumbnail';
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from './ui/drawer';

export type BannerThumbnailVariant = 'default' | 'header' | 'lg';

export default function BannerThumbnailPreview({ banner, children }: { banner: Banner; children: React.ReactNode }) {
    return (
        <Drawer>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
            <DrawerContent className="w-full max-w-full">
                <DrawerTitle className="sr-only">Banner preview</DrawerTitle>
                <DrawerDescription className="sr-only">Use this as a guide for your desing.</DrawerDescription>
                <BannerThumbnail
                    banner={banner}
                    variant="lg"
                />
            </DrawerContent>
        </Drawer>
    );
}
