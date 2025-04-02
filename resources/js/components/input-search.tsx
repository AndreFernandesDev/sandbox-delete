import { useDebouncedCallback } from '@/hooks/use-debounce';
import { useSearch } from '@/hooks/use-search';
import { cn } from '@/lib/utils';
import { Location, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { LucideSearch, RotateCcw, X } from 'lucide-react';
import { useState } from 'react';
import AuthGateDialog from './auth-gate-dialog';
import InputLocation from './input-location';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function InputSearch() {
    const { auth } = usePage<SharedData>().props;

    const [search, setSearch] = useState('');
    const { data, setData, get } = useSearch();

    const handleLocation = async (location?: Location) => {
        await axios.post(route('session.location'), { location });
        get('/', { preserveState: true });
    };

    const handleSearch = useDebouncedCallback(async (value: string) => {
        try {
            setData('search', value);
        } catch {}
    }, 250);

    return (
        <div className="relative order-last col-span-2 grid items-center gap-4 md:order-none md:col-span-1 xl:max-w-2xl">
            <div className="relative">
                <Input
                    placeholder="Search"
                    className="border-secondary h-14 py-3 pr-12 pl-12 md:pr-36"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        handleSearch(e.target.value);
                    }}
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
                        onClick={() => {
                            setSearch('');
                            setData('search', '');
                        }}
                        className={cn(
                            'rounded-full',
                            !!data.search.length ? 'hover:text-primary opacity-100 hover:bg-transparent' : 'pointer-events-none opacity-0',
                        )}
                    >
                        <X className="size-4" />
                    </Button>
                </div>

                <AuthGateDialog>
                    <InputLocation
                        value={auth.session?.location}
                        onChange={handleLocation}
                    />
                </AuthGateDialog>

                {auth.session?.location && (
                    <Button
                        size="inline"
                        variant="ghost"
                        className="text-muted-foreground"
                        onClick={() => handleLocation()}
                    >
                        <RotateCcw />
                    </Button>
                )}
            </div>
        </div>
    );
}
