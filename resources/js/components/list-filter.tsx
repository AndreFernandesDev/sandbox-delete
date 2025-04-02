import { useSearch } from '@/hooks/use-search';
import { Tag } from '@/types';
import { Link } from '@inertiajs/react';
import { Button } from './ui/button';

const links = [
    { type: 'post', label: 'Item', href: '/', disabled: false },
    { type: 'service', label: 'Service', href: '/services/create', disabled: true },
    { type: 'job', label: 'Job', href: '/jobs/create', disabled: true },
];

export default function ListFilter({ tags, type }: { tags: Tag[]; type: string }) {
    const { data, setData } = useSearch();

    const queryTags = data.tags.split(',');

    const handleTagChange = (t: Tag) => {
        const isStored = queryTags.find((name) => name === t.id);

        if (!isStored) {
            setData('tags', [...queryTags, t.id].join(','));
            return;
        }

        const newTags = queryTags.filter((n) => n !== t.id).join(',');
        setData('tags', newTags);
    };

    return (
        <div className="border-secondary flex border-b px-5 py-6 md:px-10">
            <div></div>
            <div className="flex flex-1 flex-col justify-center gap-4 md:items-center">
                <div className="flex gap-2">
                    {links.map((l) => (
                        <Button
                            key={l.label}
                            size="inline"
                            variant={type === l.type ? 'ghost-neutral' : 'ghost'}
                            disabled={l.disabled}
                            asChild={!l.disabled && type !== l.type}
                        >
                            {type !== l.type && <Link href={l.href}>#{l.label}</Link>}
                            {type === l.type && <span>#{l.label}</span>}
                        </Button>
                    ))}
                </div>

                <div className="flex max-w-screen-lg flex-wrap gap-2 md:justify-center">
                    {tags.map((tag) => (
                        <Button
                            key={tag.id}
                            size="xs"
                            variant={queryTags.find((name) => name === tag.id) ? 'outline-muted-primary' : 'outline-muted'}
                            onClick={() => handleTagChange(tag)}
                        >
                            {tag.name}
                        </Button>
                    ))}
                </div>
            </div>
            <div></div>
        </div>
    );
}
