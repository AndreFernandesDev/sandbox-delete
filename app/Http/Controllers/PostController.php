<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\RateResource;
use App\Http\Resources\TagResource;
use App\Models\Location;
use App\Models\Post;
use App\Models\Rate;
use App\Models\Status;
use App\Models\Tag;
use App\Models\TagItem;
use App\Services\MediaService;
use Carbon\Carbon;
use Clickbar\Magellan\Data\Geometries\Point;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class PostController extends Controller
{
    public function create()
    {
        return Inertia::render('post/create', [
            'currencies' => RateResource::collection(Rate::get()),
            'tags' => TagResource::collection(Tag::where('type', '=', 'post')->get()),
        ]);
    }

    public function store(MediaService $mediaService)
    {
        request()->validate([
            'uploads' => 'required',
            'title' => 'required|min:1|max:60',
            'description' => 'required|min:1|max:5000',
            'currency' => 'required',
            'location' => 'required',
            'tags' => 'required',
            'price' => 'required|numeric|gt:0'
        ]);

        $post = Post::create([
            'user_id' => Auth::id(),
            'title' => request()->input('title'),
            'description' => request()->input('description'),
            'currency' => request()->input('currency'),
            'price' => request()->input('price'),
            'expires_at' => Carbon::now()->addDays(30),
        ]);

        Location::create([
            'item_id' => $post->id,
            'label' => request()->input('location')['label'],
            'cords' => Point::makeGeodetic(request()->input('location')['latitude'], request()->input('location')['longitude']),
        ]);

        foreach (request()->input('tags') as $tag) {
            TagItem::create([
                'item_id' => $post->id,
                'tag_id' => $tag['id'],
            ]);
        }

        $mediaService->storeMany(request()->file('uploads'), $post->id);

        return to_route('post.show', ['id' => $post->id]);
    }

    public function show(string $id)
    {
        $post = new PostResource(Post::findOrFail($id));

        return Inertia::render('post/show', [
            'post' => $post,
        ]);
    }

    public function edit(string $id)
    {
        $post = new PostResource(Post::with('media')->findOrFail($id));
        $currencies = RateResource::collection(Rate::get());

        return Inertia::render('post/edit', [
            'post' => $post,
            'currencies' => $currencies,
            'tags' => TagResource::collection(Tag::where('type', '=', 'post')->get()),
        ]);
    }

    public function update(string $id, MediaService $mediaService)
    {
        request()->validate([
            'uploads' => 'required',
            'title' => 'required|min:1|max:60',
            'description' => 'required|min:1|max:5000',
            'currency' => 'required',
            'location' => 'required',
            'tags' => 'required',
            'price' => 'required|numeric|gt:0'
        ]);

        $post = Post::findOrFail($id);
        $location = Location::where('item_id', '=', $id)->firstOrFail();

        $isReadyToRenew = request()->input('renew') && $post->expires_at < Carbon::now()->addDays(7);

        $post->update([
            'title' => request()->input('title'),
            'description' => request()->input('description'),
            'currency' => request()->input('currency'),
            'price' => request()->input('price'),
            'expires_at' => $isReadyToRenew ? Carbon::now()->addDays(30) : $post->expires_at,
        ]);

        $location->update([
            'label' => request()->input('location')['label'],
            'cords' => Point::makeGeodetic(request()->input('location')['latitude'], request()->input('location')['longitude']),
        ]);

        // Remove old tags
        foreach ($post->tags as $tag) {
            $isRequired = false;

            foreach (request()->input('tags') as $t) {
                if ($tag['id'] === $t['id']) {
                    $isRequired = true;
                    break;
                }
            }

            if (!$isRequired || !request()->input('tags')) {
                TagItem::where('item_id', '=', $tag->item_id)->where('tag_id', '=', $tag->tag_id)->delete();
            }
        }

        // Add new tags
        foreach (request()->input('tags') as $tag) {
            TagItem::createOrFirst([
                'item_id' => $post->id,
                'tag_id' => $tag['id'],
            ]);
        }

        $mediaService->findAndDestroy(request()->input('deletes'));
        $mediaService->update(request()->input('uploads'), request()->file('uploads'), $post->id);

        return to_route('post.show', ['id' => $post->id]);
    }

    public function status(string $id)
    {
        request()->validate([
            'type' => 'required',
        ]);

        $type = request()->input('type');
        $item = Post::findOrFail($id);
        $status = Status::where("user_id", "=", Auth::id())->where("item_id", "=", $item->id)->first();

        if (!$status) {
            Status::create([
                "user_id" => Auth::id(),
                "item_id" => $item->id,
                "type" => $type
            ]);

            return response()->json(["status" => $type]);
        } else if ($status->type === $type) {
            Status::where("user_id", "=", Auth::id())->where("item_id", "=", $item->id)->delete();

            return response()->json(["status" => ""]);
        } else {
            Status::where("user_id", "=", Auth::id())->where("item_id", "=", $item->id)->update(["type" => $type]);

            return response()->json(["status" => $type]);
        }
    }

    public function destroy(string $id, MediaService $mediaService)
    {
        $post = Post::findOrFail($id);
        $location = Location::where('item_id', '=', $id)->firstOrFail();

        $mediaService->destroyMany($post->media);
        $post->delete();
        $location->delete();

        foreach ($post->tags as $tag) {
            TagItem::where('item_id', '=', $tag->item_id)->where('tag_id', '=', $tag->tag_id)->delete();
        }

        return to_route('dashboard.post');
    }
}
