import { cn } from '@/lib/utils';
import { type HTMLAttributes } from 'react';

export default function InputError({ message, className = '' }: HTMLAttributes<HTMLDivElement> & { message?: string }) {
    return (
        <div className={cn('expander', message && 'expanded', className)}>
            <div className="expander-content">
                <div
                    role="alert"
                    className="text-destructive h-5 text-sm font-medium transition-opacity"
                >
                    {message}
                </div>
            </div>
        </div>
    );
}

//return message ? (
//    <p {...props} className={cn('text-sm text-red-600 dark:text-red-400', className)}>
//        {message}
//    </p>
//
//) : null;
