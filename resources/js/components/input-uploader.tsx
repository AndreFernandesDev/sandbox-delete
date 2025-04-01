import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import imageCompression from 'browser-image-compression';
import { GalleryVerticalEnd, Star, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactSortable } from 'react-sortablejs';

export type UploaderItem = {
    id: string;
    url?: string;
    file?: File;
};

export default function InputUploader({
    value,
    onChange,
    onDelete,
    onStatus,
    maxFiles = 1,
}: {
    name: string;
    onChange?: (uploads: UploaderItem[]) => void;
    onDelete?: (deletes: string[]) => void;
    onStatus?: (status: string) => void;
    value?: UploaderItem[];
    required?: boolean;
    maxFiles?: number;
}) {
    const [status, setStatus] = useState<string>('ok');
    const [deletes, setDeletes] = useState<string[]>([]);
    const [uploads, setUploads] = useState<UploaderItem[]>(value ?? []);

    useEffect(() => {
        handleChange();
    }, [uploads]);

    useEffect(() => {
        onStatus?.(status);
    }, [status]);

    useEffect(() => {
        onDelete?.(deletes);
    }, [deletes]);

    const handleDelete = (id: string) => {
        setUploads(uploads.filter((f) => f.id !== id));
        setDeletes([...deletes, id]);
    };

    const handleChange = async () => {
        setStatus('processing');
        for (let upload of uploads) {
            if (!upload.file) continue;

            const data = await imageCompression(upload.file, { maxSizeMB: 0.5, maxWidthOrHeight: 1080, useWebWorker: true });
            upload.file = data;
        }
        setStatus('ok');
        onChange?.(uploads);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDropAccepted(files) {
            const updated = [...uploads, ...files.map((f) => ({ id: f.name, file: f })).filter((f) => !uploads.find((u) => u.id === f.id))];
            setUploads(updated);
        },
        maxFiles,
        accept: { 'image/*': ['.jpeg', '.png'] },
    });

    return (
        <div className="relative">
            <div {...getRootProps({ className: 'dropzone bg-muted group-[.err]:bg-destructive/10 p-10 rounded cursor-pointer' })}>
                <input {...getInputProps()} />
                <InnerDropzone>
                    <ReactSortable
                        list={uploads}
                        setList={setUploads}
                        className="grid grid-cols-4 gap-4"
                        group="uploads"
                        swapThreshold={1}
                        animation={150}
                    >
                        {uploads.map((u, i) => (
                            <div
                                key={u.id}
                                onClick={(e) => e.stopPropagation()}
                                className={cn(
                                    'bg-background focus-visible:border-foreground hover:border-secondary relative flex cursor-pointer flex-col items-center justify-between rounded border p-2 transition-colors focus:outline-none',
                                    i == 0 && 'text-primary border-primary cursor-default',
                                )}
                            >
                                {i == 0 && (
                                    <div className="bg-primary absolute top-0 left-0 grid size-5 -translate-x-1/3 -translate-y-1/3 place-items-center rounded-full text-white">
                                        <Star className="size-3" />
                                    </div>
                                )}

                                <div className="aspect-square w-full overflow-hidden rounded-t">
                                    {u.file && (
                                        <img
                                            className="h-full w-full rounded-sm object-cover"
                                            src={URL.createObjectURL(u.file)}
                                        />
                                    )}
                                    {u.url && (
                                        <img
                                            className="h-full w-full rounded-sm object-cover"
                                            src={u.url}
                                        />
                                    )}
                                </div>

                                <div className="flex h-8 w-full items-center justify-between pt-2">
                                    <div>
                                        {i == 0 && (
                                            <div className="bg-background text-primary flex h-6 items-center justify-between gap-1 rounded border px-2 text-xs font-medium">
                                                Cover
                                            </div>
                                        )}
                                    </div>

                                    <Button
                                        size="inline"
                                        variant="ghost"
                                        onClick={() => handleDelete(u.id)}
                                        className="p-1"
                                    >
                                        <Trash className="size-3.5" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </InnerDropzone>

                {!uploads.length && (
                    <div className="text-primary group-[.err]:text-destructive pointer-events-none flex items-center justify-center gap-3 text-center font-medium">
                        <GalleryVerticalEnd className="size-4" />
                        {isDragActive ? <>Drop the files here ...</> : <>Drag & Drop your files or Browse</>}
                    </div>
                )}
            </div>
        </div>
    );
}

function InnerDropzone({ children }: { children: React.ReactNode }) {
    const { getRootProps } = useDropzone({ noDragEventsBubbling: true });

    return <div {...getRootProps({ className: 'dropzone' })}>{children}</div>;
}
