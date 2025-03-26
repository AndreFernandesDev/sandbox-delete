import { Button } from '@/components/ui/button';
import imageCompression from 'browser-image-compression';
import { Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ReactSortable } from 'react-sortablejs';

export type UploaderItem = {
    id: string;
    src?: string;
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
            <div {...getRootProps({ className: 'dropzone bg-muted p-10' })}>
                <input {...getInputProps()} />
                <InnerDropzone>
                    <ReactSortable list={uploads} setList={setUploads}>
                        {uploads.map((u) => (
                            <div
                                key={u.id}
                                onClick={(e) => e.stopPropagation()}
                                className="bg-background my-4 flex items-center justify-between gap-6 rounded-md border p-2"
                            >
                                <div className="bg-muted size-10">
                                    {u.file && <img className="h-full w-full rounded-sm object-cover" src={URL.createObjectURL(u.file)} />}
                                    {u.src && <img className="h-full w-full rounded-sm object-cover" src={u.src} />}
                                </div>
                                <Button variant="ghost" onClick={() => handleDelete(u.id)}>
                                    <Trash />
                                </Button>
                            </div>
                        ))}
                    </ReactSortable>
                </InnerDropzone>

                {!uploads.length && (
                    <>{isDragActive ? <p>Drop the files here ...</p> : <p>Drag 'n' drop some files here, or click to select files</p>}</>
                )}
            </div>
        </div>
    );
}

function InnerDropzone({ children }: { children: React.ReactNode }) {
    const { getRootProps } = useDropzone({ noDragEventsBubbling: true });

    return <div {...getRootProps({ className: 'dropzone' })}>{children}</div>;
}
