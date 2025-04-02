import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';
import useQueryParams from './use-query-params';

type Form = {
    search: string;
    tags: string;
};

export function useSearch() {
    const init = useRef({ ok: false });
    const params = useQueryParams();

    const search = params.search ?? '';
    const tags = params.tag ?? '';

    const form = useForm<Form>({
        search: search ?? '',
        tags: tags ?? '',
    });

    useEffect(() => {
        if (init.current.ok) {
            form.get('/', { preserveState: true });
        } else {
            init.current.ok = true;
        }
    }, [form.data]);

    return { ...form };
}
