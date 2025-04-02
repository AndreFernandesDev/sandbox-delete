<?php

namespace App\Http\Middleware;

use App\Http\Resources\BannerResource;
use App\Http\Resources\SessionResource;
use App\Http\Resources\UserResource;
use App\Models\Banner;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user() ? new UserResource($request->user()) : null;
        $session = $request->session() ? new SessionResource($request->session()) : null;

        $banner = Banner::inRandomOrder()->where("is_active", "=", "true")->first();
        $banner = $banner ? new BannerResource($banner) : null;

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'banner' => $banner,
            'auth' => [
                'user' => $user,
                'session' => $session,
            ],
            'ziggy' => fn(): array => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ]
        ];
    }
}
