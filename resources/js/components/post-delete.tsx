import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Link } from '@inertiajs/react';
import { Trash } from 'lucide-react';
import { useState } from 'react';

export default function PostDelete({ id, children }: { id: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <span>{children}</span>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Are you sure you want to delete your account?</DialogTitle>
                <DialogDescription>
                    Once your account is deleted, all of its resources and data will also be permanently deleted. Please enter your password to
                    confirm you would like to permanently delete your account.
                </DialogDescription>
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DialogClose>

                    <Button variant="destructive" asChild>
                        <Link className="block" method="delete" href={route('post.destroy', [id])} as="button">
                            <Trash />
                            Delete this post permanently
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
