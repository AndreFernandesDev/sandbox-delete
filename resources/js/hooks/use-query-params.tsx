import { usePage } from '@inertiajs/react';

const useQueryParams = (): Record<string, string> => {
    const { url } = usePage();
    const search = url.split('?')[1] || ''; // Extract query string if present
    const queryParams: Record<string, string> = {};

    if (search) {
        search.split('&').forEach((param) => {
            const [key, value] = param.split('=');
            queryParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
        });
    }

    return queryParams;
};

export default useQueryParams;
