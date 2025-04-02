<?php

namespace App\Http\Controllers;

use App\Http\Resources\PostResource;
use App\Http\Resources\TagResource;
use App\Models\Post;
use App\Models\Tag;
use Clickbar\Magellan\Data\Geometries\Point;
use Clickbar\Magellan\Database\PostgisFunctions\ST;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppController extends Controller
{
    public function index()
    {
        $search = request()->query('search');
        $tags = array_filter(explode(',', request()->query('tags')));
        $location = request()->session()?->get('location');

        $posts = Post::latest();

        if ($search) {
            $posts = $posts->where('title', 'ilike', "%$search%");
        }

        if (count($tags) > 0) {
            $posts = $posts->where(function ($query) use ($tags) {
                foreach ($tags as $tag) {
                    $query->orWhereRelation("tags", "tag_id", "=", $tag);
                }
            });
        }

        if ($location) {
            $pos = Point::makeGeodetic($location["latitude"], $location["longitude"]);
            $km = 10;
            $distance = $km * 10000;

            $posts = $posts->whereRelation("location", ST::distanceSphere($pos, 'cords'), '<=', $distance);
        }

        $posts = $posts->get();


        return Inertia::render('welcome', [
            "tags" => TagResource::collection(Tag::where("type", "=", "post")->get()),
            "posts" => PostResource::collection($posts),
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
