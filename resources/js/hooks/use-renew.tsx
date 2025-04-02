import { formatTime } from '@/lib/utils';
import { useEffect, useState } from 'react';

export function useRenew(expires: string | Date) {
    const [renewTime, setRenewTime] = useState<{ time: string; isPast: boolean }>(handleRenewTime);
    const [isReadyToRenew, setIsReadyToRenew] = useState(handleIsReadyToRenew);

    function handleRenewTime() {
        const { time, isPast } = formatTime(new Date(expires), new Date());
        return { time: isPast ? 'Expired' : `Expires in ${time}`, isPast };
    }

    function handleIsReadyToRenew() {
        return new Date(expires) < new Date(new Date().getTime() + 60 * 60 * 24 * 7 * 1000);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (renewTime.isPast) return;
            setRenewTime(handleRenewTime);
            setIsReadyToRenew(handleIsReadyToRenew);
        }, 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    return { isReadyToRenew, ...renewTime };
}
