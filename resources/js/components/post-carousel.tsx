import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { Media } from '@/types';
import { LucideChevronLeft, LucideChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PostCarousel({ media, pagination, styles }: { media: Media[]; pagination: 'bullet' | 'media'; styles?: { media?: string } }) {
    const [carouselApi, setCarouselApi] = useState<CarouselApi>();
    const [thumbnailApi, setThumbnailApi] = useState<CarouselApi>();

    const [selectedIndex, setSelectedIndex] = useState(0);

    const handleSelect = () => {
        if (!carouselApi || !thumbnailApi) return;

        setSelectedIndex(carouselApi.selectedScrollSnap());
        thumbnailApi.scrollTo(carouselApi.selectedScrollSnap());
    };

    const handleThumbnailClick = (index: number) => {
        if (!carouselApi || !thumbnailApi) return;
        carouselApi.scrollTo(index);
    };

    useEffect(() => {
        if (!carouselApi) {
            return;
        }

        handleSelect();
        carouselApi.on('select', handleSelect);
        carouselApi.on('reInit', handleSelect);
    }, [carouselApi]);

    return (
        <div className="grid gap-4">
            <Carousel
                setApi={setCarouselApi}
                className="relative w-full"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {media.map((m) => (
                        <CarouselItem key={`main-${m.id}`}>
                            <div className={cn('aspect-video h-full w-full', styles?.media)}>
                                <img
                                    src={m.url}
                                    className="h-full w-full object-contain"
                                    loading="lazy"
                                />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {media.length > 1 && (
                    <>
                        <span onClick={(e) => e.preventDefault()}>
                            <CarouselPrevious variant="ghost">
                                <LucideChevronLeft className="hidden !size-5 sm:block" />
                            </CarouselPrevious>
                        </span>
                        <span onClick={(e) => e.preventDefault()}>
                            <CarouselNext variant="ghost">
                                <LucideChevronRight className="hidden !size-5 sm:block" />
                            </CarouselNext>
                        </span>
                    </>
                )}
            </Carousel>

            <Carousel
                setApi={setThumbnailApi}
                className="relative min-h-2 w-full sm:min-h-4"
                onClick={(e) => e.preventDefault()}
            >
                <CarouselContent
                    className={cn(
                        'flex',
                        pagination == 'bullet' && 'mx-0 items-center justify-center gap-1.5 sm:gap-2',
                        pagination == 'media' && 'ml-0 items-center justify-center gap-4',
                    )}
                >
                    {media.map((m, i) => (
                        <CarouselItem
                            v-for="(f, index) in files"
                            key={`thumbnail-${m.id}`}
                            onClick={() => handleThumbnailClick(i)}
                            className={cn(
                                'cursor-pointer pl-0',
                                pagination == 'bullet' && 'basis-1 sm:basis-2',
                                pagination == 'media' && 'basis-[10%]',
                            )}
                        >
                            {pagination == 'bullet' && media.length > 1 && (
                                <div
                                    className={cn(
                                        'aspect-square w-full rounded-full transition-all',

                                        i === selectedIndex ? 'bg-primary' : 'bg-secondary hover:bg-secondary',
                                    )}
                                ></div>
                            )}
                            {pagination == 'media' && (
                                <div
                                    className={cn(
                                        'aspect-square border-t pt-2 transition-all',

                                        i === selectedIndex ? 'border-primary' : 'border-muted hover:border-secondary opacity-50',
                                    )}
                                >
                                    <img
                                        src={m.url}
                                        className="h-full w-full object-contain"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
}
