import { Link } from '@inertiajs/react';
import { Dialog } from '@radix-ui/react-dialog';
import { Button } from './ui/button';
import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';

export function DeleteBanner({ id, children }: { id: string; children: React.ReactNode }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <span>{children}</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete this item and remove all data from our servers.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
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
                            href={route('banner.destroy', [id])}
                            as="button"
                        >
                            Delete permanently
                        </Link>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
