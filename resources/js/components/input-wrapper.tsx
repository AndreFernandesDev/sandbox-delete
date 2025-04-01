import { cn } from '@/lib/utils';

export default function InputWrapper({ children, error }: { children: React.ReactNode; error?: string }) {
    return <div className={cn('group grid gap-5', error && 'err')}>{children}</div>;
}
