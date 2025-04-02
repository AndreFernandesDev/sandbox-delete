<?php

namespace App\Http\Controllers;

use App\Http\Resources\BannerResource;
use App\Models\Banner;
use App\Services\MediaService;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BannerController extends Controller
{
    public function create()
    {
        return Inertia::render('banner/create');
    }

    public function store(MediaService $mediaService)
    {
        request()->validate([
            'uploads' => 'required',
            'title' => 'required',
            'label' => 'required',
            'cta' => 'required',
            'url' => 'required',
            'background' => 'required',
            'foreground' => 'required',
        ]);


        $banner = Banner::create([
            'user_id' => Auth::id(),
            'title' => request()->input('title'),
            'label' => request()->input('label'),
            'cta' => request()->input('cta'),
            'url' => request()->input('url'),
            'background' => request()->input('background'),
            'foreground' => request()->input('foreground'),
            'is_active' => false,
        ]);

        $mediaService->storeOne(request()->file('uploads')[0]["file"], $banner->id, 999, 'banner-logo');

        return to_route('dashboard.banner');
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        $banner = new BannerResource(Banner::findOrFail($id));

        return Inertia::render('banner/edit', [
            'banner' => $banner,
        ]);
    }

    public function update(string $id, MediaService $mediaService)
    {
        request()->validate([
            'uploads' => 'required',
            'title' => 'required',
            'label' => 'required',
            'cta' => 'required',
            'url' => 'required',
            'background' => 'required',
            'foreground' => 'required',
        ]);

        $banner = new BannerResource(Banner::findOrFail($id));

        $banner->update([
            'title' => request()->input('title'),
            'label' => request()->input('label'),
            'cta' => request()->input('cta'),
            'url' => request()->input('url'),
            'background' => request()->input('background'),
            'foreground' => request()->input('foreground'),
        ]);


        if (request()->file('uploads')) {
            $logo = request()->file('uploads')[0]["file"];

            if ($banner->logo) {
                $mediaService->destroyOne($banner->logo);
            }

            $mediaService->storeOne($logo, $banner->id, 999, 'banner-logo');
        }

        return to_route('dashboard.banner');
    }

    public function active(string $id)
    {
        request()->validate([
            'state' => 'boolean',
        ]);

        $banner = new BannerResource(Banner::findOrFail($id));

        $banner->update([
            'is_active' => request()->input('state'),
        ]);

        return response()->json(["message" => "updated"]);
    }

    public function destroy(string $id, MediaService $mediaService)
    {
        $banner = new BannerResource(Banner::findOrFail($id));

        if ($banner->logo) {
            $mediaService->destroyOne($banner->logo);
        }

        $banner->delete();

        return to_route('dashboard.banner');
    }
}
