import InputCurrency from '@/components/input-currency';
import InputError from '@/components/input-error';
import InputLabel from '@/components/input-label';
import InputLocation from '@/components/input-location';
import InputUploader, { UploaderItem } from '@/components/input-uploader';
import InputWrapper from '@/components/input-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import MainSimpleLayout from '@/layouts/main-simple-layout';
import { Currency, Location } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

type Form = {
    title: string;
    description: string;
    price?: number;
    currency: string;
    uploads: UploaderItem[];
    location?: Location;
};

export default function CreatePost({ currencies }: { currencies: { data: Currency[] } }) {
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

                        <Button
                            type="submit"
                            className="mt-4 w-full"
                            tabIndex={4}
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                            Post
                        </Button>
                    </div>
                </form>
            </div>
        </MainSimpleLayout>
    );
}
