import { BannerItem } from '@/components/banner-item';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { Banner, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Banners',
        href: '/dashboard/banners',
    },
];

export default function DashboardBanner({ banners }: { banners: { data: Banner[] } }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <div className="grid grid-cols-1 gap-8 p-10">
                        <div className="flex items-center justify-between">
                            <h1 className="text-2xl font-medium">Banners</h1>
                            <Button
                                variant="primary"
                                size="sm"
                                asChild
                            >
                                <Link href="/banners/create">Add new banner</Link>
                            </Button>
                        </div>

                        <div className="grid gap-2">
                            {banners.data.map((banner) => (
                                <BannerItem
                                    key={banner.id}
                                    banner={banner}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
