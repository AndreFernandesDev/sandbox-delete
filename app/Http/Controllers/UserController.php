<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;
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

        return to_route('dashboard');
    }

    public function logout()
    {
        Auth::logout();

        request()->session()->invalidate();
        request()->session()->regenerateToken();

        return redirect('/');
    }
}
