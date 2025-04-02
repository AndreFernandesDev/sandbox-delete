import axios from 'axios';

export default function StatusButton({
    id,
    children,
    type,
    onChange,
}: {
    id: string;
    type: string;
    children: React.ReactNode;
    onChange?: (status: string) => void;
}) {
    const handleClick = async (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();

        try {
            const res = await axios.post(route('post.status', { id, type }));
            onChange?.(res.data.status as string);
        } catch {}
    };

    return <span onClick={handleClick}>{children}</span>;
}
