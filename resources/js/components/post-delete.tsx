import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';
import { useState } from 'react';

export default function PostDelete({ id, children }: { id: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <span>{children}</span>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete your post?</DialogTitle>
                <DialogDescription>Once your post is deleted, all of its resources and data will also be permanently deleted.</DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            size="sm"
                        >
                            Cancel
                        </Button>
                    </DialogClose>

                    <Button
                        variant="destructive"
                        size="sm"
                        asChild
                    >
                        <Link
                            className="block"
                            method="delete"
                            href={route('post.destroy', [id])}
                            as="button"
                        >
                            Delete this post permanently
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
