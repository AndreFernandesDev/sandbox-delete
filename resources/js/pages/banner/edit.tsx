import BannerThumbnailPreview from '@/components/banner-thumbnail-preview';
import { DeleteBanner } from '@/components/delete-banner';
import InputError from '@/components/input-error';
import InputLabel from '@/components/input-label';
import InputUploader, { UploaderItem } from '@/components/input-uploader';
import InputWrapper from '@/components/input-wrapper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MainSimpleLayout from '@/layouts/main-simple-layout';
import { Banner, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, LucideEye } from 'lucide-react';

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
    label: string;
    cta: string;
    url: string;
    background: string;
    foreground: string;
    uploads: UploaderItem[];
    deletes: string[];
};

export default function BannerEdit({ banner }: { banner: Banner }) {
    const { data, setData, processing, errors, ...form } = useForm<Form>({
        title: banner.title,
        label: banner.label,
        cta: banner.cta,
        url: banner.url,
        background: banner.background,
        foreground: banner.foreground,
        uploads: [banner.logo],
        deletes: [],
    });

    const logo = data.uploads[0]?.url ? data.uploads[0].url : data.uploads[0]?.file ? URL.createObjectURL(data.uploads[0]?.file) : '';
    const previewData = {
        id: '#',
        is_active: true,
        ...data,
        logo: { id: '', url: logo, type: '', code: '', order: 999 },
    };

    function submit(e: any) {
        e.preventDefault();

        form.post(route('banner.update', [banner.id]));
    }

    return (
        <MainSimpleLayout
            title="Banner"
            backLink="/dashboard/banners"
            cancelLink="/dashboard/banners"
            actions={
                <DeleteBanner id={banner.id}>
                    <Button variant="inline-destructive">Delete</Button>
                </DeleteBanner>
            }
        >
            <Head title="Post" />
            <div className="container mx-auto max-w-screen-md">
                <form onSubmit={submit}>
                    <div className="grid gap-10 pt-10 pb-20">
                        <InputWrapper error={errors.uploads}>
                            <InputLabel
                                title="Add Logo"
                                description="Upload a logo image."
                            />
                            <InputUploader
                                name="uploads"
                                value={data.uploads}
                                maxFiles={1}
                                onChange={(uploads) => setData('uploads', uploads)}
                            />
                            <InputError message={errors.uploads} />
                        </InputWrapper>

                        <InputWrapper error={errors.title}>
                            <InputLabel
                                title="Title"
                                description="Create a clear and concise title for your banner."
                            />
                            <Input
                                id="title"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Write title here."
                            />
                            <InputError message={errors.title} />
                        </InputWrapper>

                        <InputWrapper error={errors.label}>
                            <InputLabel
                                title="Label"
                                description="Create a clear and concise label for your banner."
                            />
                            <Input
                                id="label"
                                value={data.label}
                                onChange={(e) => setData('label', e.target.value)}
                                placeholder="Write label here."
                            />
                            <InputError message={errors.label} />
                        </InputWrapper>

                        <InputWrapper error={errors.cta}>
                            <InputLabel
                                title="Call to action"
                                description="The text for the call to action button."
                            />
                            <Input
                                id="cta"
                                value={data.cta}
                                onChange={(e) => setData('cta', e.target.value)}
                                placeholder="Buy now"
                            />
                            <InputError message={errors.cta} />
                        </InputWrapper>

                        <InputWrapper error={errors.url}>
                            <InputLabel
                                title="Link"
                                description="The link to know more about the banner."
                            />
                            <Input
                                id="url"
                                value={data.url}
                                onChange={(e) => setData('url', e.target.value)}
                                placeholder="https://company.com"
                            />
                            <InputError message={errors.url} />
                        </InputWrapper>

                        <InputWrapper error={errors.background}>
                            <InputLabel
                                title="Background"
                                description="RGB, HSL, HEX"
                            />
                            <Input
                                id="background"
                                value={data.background}
                                onChange={(e) => setData('background', e.target.value)}
                                placeholder="#000000"
                            />
                            <InputError message={errors.background} />
                        </InputWrapper>

                        <InputWrapper error={errors.foreground}>
                            <InputLabel
                                title="Foreground"
                                description="RGB, HSL, HEX"
                            />
                            <Input
                                id="foreground"
                                value={data.foreground}
                                onChange={(e) => setData('foreground', e.target.value)}
                                placeholder="#FFFFFF"
                            />
                            <InputError message={errors.foreground} />
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

            <BannerThumbnailPreview banner={previewData}>
                <div className="fixed right-10 bottom-10">
                    <Button
                        className="rounded-full"
                        size="icon-xl"
                        variant="secondary"
                    >
                        <LucideEye className="!size-6" />
                    </Button>
                </div>
            </BannerThumbnailPreview>
        </MainSimpleLayout>
    );
}
