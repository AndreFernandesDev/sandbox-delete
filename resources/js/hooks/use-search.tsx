import { useForm } from '@inertiajs/react';
import { useEffect, useRef } from 'react';

type Form = {
    search: string;
    tags: string;
};

export function useSearch() {
    const init = useRef({ ok: false });

    const search = new URLSearchParams(window.location.search).get('search');
    const tags = new URLSearchParams(window.location.search).get('tags');

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
