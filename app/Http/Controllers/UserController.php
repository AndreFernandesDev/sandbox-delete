<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\UserResource;
use App\Models\Post;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
use Inertia\Inertia;
use Laravel\Socialite\Facades\Socialite;

class UserController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('x')->redirect();
    }

    public function callback()
    {
        $oauth = Socialite::driver('x')->user();
        $oauthUser = Http::withToken($oauth->token)->get('https://api.twitter.com/2/users/me?user.fields=profile_image_url,description,username')->object()->data;

        $user = User::updateOrCreate([
            'provider_id' => $oauthUser->id,
        ], [
            'provider_id' => $oauthUser->id,
            'provider' => 'x',
            'name' => $oauthUser->name,
            'nickname' => $oauthUser->username,
            'description' => $oauthUser->description,
            'profile_image_url' => str_replace('_normal', '', $oauthUser->profile_image_url),
        ]);

        Auth::login($user);

        return to_route('home');
    }

    public function logout()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }

    public function show(string $id)
    {
        $user = new UserResource(User::findOrFail($id));
        $posts = PostResource::collection(Post::whereRelation("user", "id", "=", $id)->get());

        return Inertia::render('user/show', [
            'user' => $user,
            'posts' => $posts
        ]);
    }
}
