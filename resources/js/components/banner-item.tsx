import { Banner } from '@/types';
import { Link } from '@inertiajs/react';
import axios from 'axios';
import { Eye, LucideEdit, LucideTrash } from 'lucide-react';
import { useState } from 'react';
import BannerThumbnailPreview from './banner-thumbnail-preview';
import { DeleteBanner } from './delete-banner';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

export function BannerItem({ banner }: { banner: Banner }) {
    const [active, setActive] = useState(banner.is_active);

    const handleActive = async (state: boolean) => {
        try {
            await axios.post(route('banner.active', { id: banner.id, state }));
            setActive(state);
        } catch {}
    };

    return (
        <div className="bg-background flex items-center gap-4 rounded border p-4">
            <div className="flex items-center gap-2">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="size-6 rounded border"
                                style={{ background: banner.background }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Background</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <div
                                className="size-6 rounded border"
                                style={{ background: banner.foreground }}
                            ></div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Foreground</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <h2 className="flex-1">{banner.title}</h2>
            <div className="flex items-center gap-6">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div className="flex">
                                <Switch
                                    checked={active}
                                    onCheckedChange={(state) => handleActive(state)}
                                />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Active</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <BannerThumbnailPreview banner={banner}>
                    <Button
                        size="icon-sm"
                        variant="ghost"
                    >
                        <Eye />
                    </Button>
                </BannerThumbnailPreview>

                <Button
                    size="icon-sm"
                    variant="ghost"
                >
                    <Link href={`/banners/${banner.id}/edit`}>
                        <LucideEdit />
                    </Link>
                </Button>

                <DeleteBanner id={banner.id}>
                    <Button
                        size="icon-sm"
                        variant="ghost"
                    >
                        <LucideTrash />
                    </Button>
                </DeleteBanner>
            </div>
        </div>
    );
}
