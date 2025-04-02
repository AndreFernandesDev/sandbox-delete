import InputCurrency from '@/components/input-currency';
import InputError from '@/components/input-error';
import InputLabel from '@/components/input-label';
import InputLocation from '@/components/input-location';
import InputTags from '@/components/input-tags';
import InputUploader, { UploaderItem } from '@/components/input-uploader';
import InputWrapper from '@/components/input-wrapper';
import LinksCategories from '@/components/links-categories';
import PostDelete from '@/components/post-delete';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import useQueryParams from '@/hooks/use-query-params';
import MainSimpleLayout from '@/layouts/main-simple-layout';
import { Currency, Location, Post, Tag, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, LoaderCircle } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post',
        href: '/dashboard/post',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

type Form = {
    title: string;
    description: string;
    currency: string;
    price: number;
    uploads: UploaderItem[];
    deletes: string[];
    location: Location;
    tags?: Tag[];
    renew?: boolean;
};

export default function PostEdit({ post, currencies, tags }: { post: Post; currencies: { data: Currency[] }; tags: { data: Tag[] } }) {
    const params = useQueryParams();
    const renew = params.renew ?? '';

    const { data, setData, processing, errors, ...form } = useForm<Form>({
        title: post.title,
        description: post.description,
        currency: post.currency,
        price: post.price,
        location: post.location,
        uploads: [],
        deletes: [],
        tags: post.tags,
        renew: !!renew,
    });

    function submit(e: any) {
        e.preventDefault();

        form.post(route('post.update', [post.id]));
    }

    return (
        <MainSimpleLayout
            title="Post"
            backLink={`/posts/${post.id}`}
            cancelLink={`/posts/${post.id}`}
            actions={
                <PostDelete id={post.id}>
                    <Button variant="inline-destructive">Delete</Button>
                </PostDelete>
            }
        >
            <Head title="Post" />
            <div className="container mx-auto max-w-screen-md">
                <form onSubmit={submit}>
                    <div className="grid gap-10 pt-10 pb-20">
                        <InputWrapper error={errors.uploads}>
                            <InputLabel
                                title="Categories"
                                description="Select a category for your post."
                            />
                            <LinksCategories
                                type="post"
                                disabled
                            />
                            <div className="mt-2 grid gap-4">
                                <div className="font-medium transition-colors">Choose relevant subcategories.</div>
                                <InputTags
                                    tags={tags.data}
                                    value={data.tags}
                                    name="tags"
                                    onChange={(tags) => setData('tags', tags)}
                                />
                            </div>
                            <InputError message={errors.tags} />
                        </InputWrapper>

                        <InputWrapper error={errors.uploads}>
                            <InputLabel
                                title="Add Photos"
                                description="Upload up to 10 photos, starting with a cover image."
                            />
                            <InputUploader
                                name="uploads"
                                maxFiles={10}
                                value={post.media}
                                onChange={(uploads) => setData('uploads', uploads)}
                            />
                            <InputError message={errors.uploads} />
                        </InputWrapper>

                        <InputWrapper error={errors.uploads}>
                            <InputLabel
                                title="Location"
                                description="Set your location. Only the general area will be shown on your post, not your exact address."
                            />
                            <InputLocation
                                id="description"
                                value={data.location}
                                onChange={(location) => setData('location', location)}
                            />
                            <InputError message={errors.location} />
                        </InputWrapper>

                        <InputWrapper error={errors.title}>
                            <InputLabel
                                title="Title"
                                description="Create a clear and concise title for your post."
                            />
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Write title here."
                            />
                            <InputError message={errors.title} />
                        </InputWrapper>

                        <InputWrapper error={errors.price}>
                            <InputLabel
                                title="Price"
                                description="Enter the amount you want to receive. The currency is based on your selected location.."
                            />
                            <Input
                                id="price"
                                type="number"
                                value={data.price ? data.price : ''}
                                onChange={(e) => setData('price', parseInt(e.target.value))}
                                placeholder="0"
                                min="0"
                            />
                            <InputError message={errors.price} />
                        </InputWrapper>

                        <InputWrapper error={errors.currency}>
                            <InputLabel
                                title="Payment Accepted"
                                description="Choose which cryptocurrency to accept."
                            />
                            <InputCurrency
                                id="currency"
                                required
                                currencies={currencies.data}
                                value={data.currency}
                                onChange={(val) => setData('currency', val)}
                            />
                            <InputError message={errors.currency} />
                        </InputWrapper>

                        <InputWrapper error={errors.description}>
                            <InputLabel
                                title="Description"
                                description="Provide details about your post."
                            />
                            <Textarea
                                id="title"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Write description here."
                            />
                            <InputError message={errors.description} />
                        </InputWrapper>
                        <div className="grid gap-4">
                            <Button
                                type="submit"
                                className="w-full justify-between"
                                variant="primary"
                                size="xl"
                                disabled={processing}
                            >
                                {renew ? 'Renew' : 'Update'}
                                <div>
                                    {processing ? (
                                        <LoaderCircle className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            Free
                                            <ArrowRight />
                                        </div>
                                    )}
                                </div>
                            </Button>
                            <p className="text-muted-foreground bg-muted rounded px-6 py-4">Your post will expire in 30 days unless renewed.</p>
                        </div>
                    </div>
                </form>
            </div>
        </MainSimpleLayout>
    );
}
