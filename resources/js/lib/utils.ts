import { type ClassValue, clsx } from 'clsx';
import { addSeconds, formatDistance, formatDuration, intervalToDuration, isPast } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatTime(expiresAt: Date, now: Date, opts?: { average?: boolean }) {
    let start = new Date();
    let end = new Date();

    const output = {
        isPast: false,
        time: '',
    };

    if (isPast(expiresAt)) {
        output.isPast = true;

        start = addSeconds(expiresAt, -1);
        end = now;
    } else {
        end = addSeconds(expiresAt, 1);
        start = now;
    }

    if (opts?.average) {
        output.time = formatDistance(expiresAt, now, {
            addSuffix: true,
            includeSeconds: true,
        })
            .replace('about', '')
            .trim();
    } else {
        const duration = intervalToDuration({ start, end });
        output.time = formatDuration(duration, { delimiter: ', ' });
    }

    return output;
}
