<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\RateResource;
use App\Models\Media;
use App\Models\Post;
use App\Models\Rate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create()
    {
        return Inertia::render('post/create', [
            'currencies' => RateResource::collection(Rate::get())
        ]);
    }

    public function store()
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

        $uploads = request()->file('uploads');
        foreach ($uploads as $i => $upload) {
            Media::create([
                'type' => $upload["file"]->getMimeType(),
                'name' => $upload["file"]->hashName(),
                'item_id' => $post->id,
                'order' => $i,
            ]);
            Storage::disk('public')->put('uploads', $upload["file"]);
        }

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

    public function update(string $id)
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

        if (request()->input('deletes')) {
            foreach (request()->input('deletes') as $id) {
                $media = Media::find($id);
                if (!$media) {
                    continue;
                }

                Storage::disk('public')->delete('uploads/' . $media->name);
                $media->delete();

            }
        }

        foreach (request()->input('uploads') as $i => $upload) {
            $media = Media::find($upload["id"]);

            if (!$media) {
                foreach (request()->file('uploads') as $uploadFile) {
                    if (!$uploadFile["file"]->getClientOriginalName() == $upload["id"]) {
                        continue;
                    }

                    $media = Media::create([
                        'type' => $uploadFile["file"]->getMimeType(),
                        'name' => $uploadFile["file"]->hashName(),
                        'item_id' => $post->id,
                        'order' => $i,
                    ]);
                    Storage::disk('public')->put('uploads', $uploadFile["file"]);
                }

            } else {
                $media->update(["order" => $i]);
            }
        }

        return to_route('post.show', ["id" => $post->id]);
    }


    public function destroy(string $id)
    {
        $post = Post::findOrFail($id);

        foreach ($post->media as $media) {
            Storage::disk('public')->delete('uploads/' . $media->name);
            $media->delete();
        }

        $post->delete();

        return to_route('dashboard.post');
    }
}
