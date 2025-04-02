import InputCurrency from '@/components/input-currency';
import InputError from '@/components/input-error';
import InputLabel from '@/components/input-label';
import InputLocation from '@/components/input-location';
import InputTags from '@/components/input-tags';
import InputUploader, { UploaderItem } from '@/components/input-uploader';
import InputWrapper from '@/components/input-wrapper';
import LinksCategories from '@/components/links-categories';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MainSimpleLayout from '@/layouts/main-simple-layout';
import { Currency, Location, Tag } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ArrowRight, LoaderCircle } from 'lucide-react';

type Form = {
    title: string;
    description: string;
    price?: number;
    currency: string;
    uploads: UploaderItem[];
    location?: Location;
    tags?: Tag[];
};

export default function CreatePost({ currencies, tags }: { currencies: { data: Currency[] }; tags: { data: Tag[] } }) {
    const { data, setData, post, processing, errors } = useForm<Form>({
        title: '',
        description: '',
        currency: 'BTC',
        uploads: [],
    });

    function submit(e: any) {
        e.preventDefault();
        post(route('post.store'));
    }

    return (
        <MainSimpleLayout title="Post">
            <Head title="Post" />
            <div className="container mx-auto max-w-screen-md">
                <form onSubmit={submit}>
                    <div className="grid gap-10 pt-10 pb-20">
                        <InputWrapper error={errors.uploads}>
                            <InputLabel
                                title="Categories"
                                description="Select a category for your post."
                            />
                            <LinksCategories type="post" />
                            <div className="mt-2 grid gap-4">
                                <div className="font-medium transition-colors">Choose relevant subcategories.</div>
                                <InputTags
                                    tags={tags.data}
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
                                description="Enter the amount you want to receive. The currency is based on USD dollars."
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

                        <Button
                            type="submit"
                            className="w-full justify-between"
                            variant="primary"
                            size="xl"
                            disabled={processing}
                        >
                            Post
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
                    </div>
                </form>
            </div>
        </MainSimpleLayout>
    );
}
