<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Models\Post;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            "posts" => PostResource::collection(Post::latest()->get()),
        ]);
    }
}
