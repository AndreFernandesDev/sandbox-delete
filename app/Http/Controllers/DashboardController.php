<?php

namespace App\Http\Controllers;

use App\Http\Resources\BannerResource;
use App\Models\Banner;
use App\Models\Media;
use App\Models\Post;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard');
    }

    public function postView()
    {
        return Inertia::render('dashboard/post', [
            "posts" => Post::latest()->get(),
        ]);
    }

    public function bannerView()
    {
        return Inertia::render('dashboard/banner', [
            "banners" => BannerResource::collection(Banner::latest()->get()),
        ]);
    }

    public function destroy()
    {

        $id = request()->input('id');
        $media = Media::findOrFail($id);

        Storage::disk('public')->delete('uploads/' . $media->name);
        $media->delete();
    }
}
