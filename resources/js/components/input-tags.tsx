import { Tag } from '@/types';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export type UploaderItem = {
    id: string;
    src?: string;
    file?: File;
};

export default function InputTags({
    value,
    tags,
    onChange,
    max = 3,
}: {
    name?: string;
    value?: Tag[];
    tags: Tag[];
    max?: number;
    required?: boolean;
    onChange?: (tags: Tag[]) => void;
}) {
    const [selected, setSelected] = useState<Tag[]>(value ?? []);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>, tag: Tag) => {
        e.preventDefault();

        const hasTag = selected.find((t) => t.name === tag.name);

        if (hasTag) {
            setSelected(selected.filter((t) => t.name !== tag.name));
            return;
        }

        if (selected.length >= max) {
            toast.warning(`Maximum reached`);
            return;
        }

        setSelected([...selected, tag]);
        return;
    };

    useEffect(() => {
        onChange?.(selected);
    }, [selected]);

    return (
        <div className="flex flex-col flex-wrap gap-2 sm:flex-row">
            {tags.map((tag) => (
                <div
                    key={tag.name}
                    className="flex items-center space-x-2"
                >
                    <Button
                        variant={selected?.find((v) => v.name === tag.name) ? 'outline-muted-primary' : 'outline-muted'}
                        onClick={(e) => handleClick(e, tag)}
                        size="xs"
                    >
                        {tag.name}
                    </Button>
                </div>
            ))}
        </div>
    );
}
