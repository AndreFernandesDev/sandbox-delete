import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { X } from 'lucide-react';
import { useState } from 'react';

export default function AuthGateDialog({ children }: { children: React.ReactNode }) {
    const { auth } = usePage<SharedData>().props;
    const [open, setOpen] = useState(false);

    if (auth.user) return <>{children}</>;

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >
            <DialogTrigger asChild>
                <span className="cursor-default *:pointer-events-none">{children}</span>
            </DialogTrigger>
            <DialogContent>
                <div className="mt-8 grid place-items-center md:mt-0">
                    <DialogTitle className="text-primary mb-4 text-center text-3xl font-normal">Join our community</DialogTitle>
                    <div>
                        <Button
                            className="w-48"
                            asChild
                        >
                            <a href="/auth/redirect">
                                Connect
                                <X />
                            </a>
                        </Button>
                    </div>
                    <DialogDescription className="text-primary mt-5 w-full max-w-64 text-center text-xs text-balance">
                        By connecting, you agree and accept the For Crypto Terms & Policies
                    </DialogDescription>
                </div>
            </DialogContent>
        </Dialog>
    );
}
