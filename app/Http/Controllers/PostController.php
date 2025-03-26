<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\RateResource;
use App\Models\Post;
use App\Models\Rate;
use App\Services\MediaService;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create()
    {
        return Inertia::render('post/create', [
            'currencies' => RateResource::collection(Rate::get())
        ]);
    }

    public function store(MediaService $mediaService)
    {
        request()->validate([
            'uploads' => 'required',
            'title' => 'required|min:10',
            'description' => 'required|min:10',
            'currency' => 'required',
        ]);

        $post = Post::create([
            'title' => request()->input('title'),
            'description' => request()->input('description'),
            'currency' => request()->input('currency'),
        ]);

        $mediaService->storeMany(request()->file('uploads'), $post->id);

        return to_route('post.show', ["id" => $post->id]);
    }

    public function show(string $id)
    {
        $post = new PostResource(Post::findOrFail($id));

        return Inertia::render('post/show', [
            'post' => $post
        ]);
    }

    public function edit(string $id)
    {
        $post = new PostResource(Post::with('media')->findOrFail($id));
        $currencies = RateResource::collection(Rate::get());

        return Inertia::render('post/edit', [
            'post' => $post,
            'currencies' => $currencies,
        ]);
    }

    public function update(string $id, MediaService $mediaService)
    {
        request()->validate([
            'uploads' => 'required',
            'title' => 'required|min:10',
            'description' => 'required|min:10',
            'currency' => 'required',
        ]);

        $post = Post::findOrFail($id);

        $post->update([
            'title' => request()->input('title'),
            'description' => request()->input('description'),
            'currency' => request()->input('currency'),
        ]);

        $mediaService->findAndDestroy(request()->input('deletes'));
        $mediaService->update(request()->input('uploads'), request()->file('uploads'), $post->id);

        return to_route('post.show', ["id" => $post->id]);
    }


    public function destroy(string $id, MediaService $mediaService)
    {
        $post = Post::findOrFail($id);
        $mediaService->destroyMany($post->media);
        $post->delete();

        return to_route('dashboard.post');
    }
}
