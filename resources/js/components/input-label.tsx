export default function InputLabel({ title, description }: { title: string; description?: string }) {
    return (
        <div className="grid gap-0.5">
            <div className="text-primary group-[.err]:text-destructive text-2xl font-medium transition-colors">{title}</div>
            {description && <div className="font-medium transition-colors">{description}</div>}
        </div>
    );
}
