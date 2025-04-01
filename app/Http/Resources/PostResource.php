<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $user = new UserResource($this->user);
        $rate = new RateResource($this->rate);
        $location = new LocationResource($this->location);
        $tags = [];

        foreach ($this->tags as $tag) {
            $t = new TagResource($tag->tag);
            array_push($tags, $t);
        }

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'media' => MediaResource::collection($this->media),
            'tags' => $tags,
            'location' => $location,
            'currency' => $this->currency,
            'rate' => $rate['rate'],
            'crypto' => number_format($rate['rate'] * $this->price, 6),
            'user' => $user,
            'created_at' => $this->created_at,
            'created_at_diff' => $this->created_at->diffForHumans(),
            'created_at_humans' => Carbon::parse($this->created_at)->format('F Y'),
            'updated_at' => $this->updated_at,
            'updated_at_diff' => $this->updated_at->diffForHumans(),

        ];
    }
}
