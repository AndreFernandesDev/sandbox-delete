import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useDebouncedCallback } from '@/hooks/use-debounce';
import { cn } from '@/lib/utils';
import { Location } from '@/types';
import axios from 'axios';
import { Navigation } from 'lucide-react';
import { useRef, useState } from 'react';

export type UploaderItem = {
    id: string;
    src?: string;
    file?: File;
};

export default function InputLocation({
    id,
    value,
    onChange,
}: {
    id?: string;
    name?: string;
    value?: Location;
    required?: boolean;
    onChange?: (location: Location) => void;
}) {
    const [openDialog, setOpenDialog] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [results, setResults] = useState<Location[]>([]);
    const [selected, setSelected] = useState<Location | null>(null);
    const searchWrapper = useRef<HTMLDivElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (!openSearch || !searchWrapper || !searchWrapper.current) {
            return;
        }

        if (!searchWrapper.current.contains(e.target as Node)) {
            setOpenSearch(false);
        }
    };

    const handleSearch = useDebouncedCallback(async (value: string) => {
        if (!value) {
            setOpenSearch(false);
            return;
        }

        try {
            const res = await axios.post(route('location.search', { search: value }));
            console.log(res);
            const locations = res.data.data as Location[];
            setResults(locations);
        } catch (error) {
            console.error('Error fetching mineral log data:', error);
        }
        setLoading(false);
        setOpenSearch(true);
    }, 500);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoading(true);
        setOpenSearch(true);
        setSearch(e.target.value);
        handleSearch(e.target.value);
    };

    const handleSelect = (location: Location) => {
        setSearch(location.label);
        setSelected(location);
        setOpenSearch(false);
    };

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!selected) {
            return;
        }

        setOpenDialog(false);
        setOpenSearch(false);
        setLoading(false);
        setSearch('');

        onChange?.(selected);
    };

    return (
        <div>
            <Dialog
                open={openDialog}
                onOpenChange={setOpenDialog}
            >
                <DialogTrigger asChild>
                    <Button
                        className="text-base"
                        size="inline"
                        variant="ghost"
                    >
                        <div>{value ? value.label : 'Please choose a location'}</div>
                        <Navigation />
                    </Button>
                </DialogTrigger>
                <DialogContent onClick={handleClick}>
                    <DialogHeader>
                        <DialogTitle>Location</DialogTitle>
                        <DialogDescription>Search the region that you need.</DialogDescription>
                    </DialogHeader>

                    <div
                        ref={searchWrapper}
                        className="grid gap-4"
                    >
                        <div className="group relative">
                            <div className="bg-background relative z-20 transition-opacity group-hover:opacity-30 hover:!opacity-100">
                                <Input
                                    id={id}
                                    placeholder="City"
                                    value={search}
                                    onChange={handleSearchChange}
                                    onClick={() => setOpenSearch(true)}
                                />
                            </div>

                            <div
                                className={cn(
                                    'bg-background pointer-events-none absolute inset-x-0 -bottom-2 z-10 translate-y-[75%] rounded border opacity-0 transition-all duration-500 ease-in-out',
                                    openSearch && 'pointer-events-auto translate-y-full opacity-100',
                                )}
                            >
                                {loading && <div className="text-muted-foreground grid h-12 place-items-center text-sm">Loading</div>}

                                {!results.length && !loading && (
                                    <div className="text-muted-foreground grid h-12 place-items-center text-sm">Empty results.</div>
                                )}

                                {!!results.length && !loading && (
                                    <div className="divide-secondary grid divide-y">
                                        {results.map((location) => (
                                            <div
                                                key={location.label}
                                                className="grid h-12 p-1"
                                            >
                                                <button
                                                    onClick={() => handleSelect(location)}
                                                    className="hover:bg-primary/10 flex items-center rounded px-4 text-sm transition-colors"
                                                >
                                                    {location.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        <Button
                            disabled={!selected}
                            onClick={handleSubmit}
                            variant="primary"
                        >
                            Apply
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
