<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            "posts" => PostResource::collection(Post::latest()->get()),
        ]);
    }

    public function profile()
    {
        $posts = PostResource::collection(Post::whereRelation("user", "id", "=", Auth::id())->get());

        return Inertia::render('user/profile', [
            'posts' => $posts
        ]);
    }

    public function profileBookmark()
    {
        $posts = PostResource::collection(
            Post::whereRelation("user", "id", "=", Auth::id())
                ->whereRelation("status", "type", "=", "bookmark")
                ->get()
        );

        return Inertia::render('user/profile-bookmark', [
            'posts' => $posts
        ]);
    }
}
