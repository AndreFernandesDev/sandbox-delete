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

        $crypto = number_format($rate['rate'] * $this->price, 6);

        $media = MediaResource::collection($this->media->filter(function ($media) {
            return $media->code === 'display';
        }));

        $thumbnail = new MediaResource(
            $this->media->firstWhere('code', 'x_thumbnail')
        );

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'currency' => $this->currency,
            'status' => $this->status?->type,
            'crypto' => $crypto,
            'media' => $media,
            'thumbnail' => $thumbnail,
            'tags' => $tags,
            'location' => $location,
            'rate' => $rate['rate'],
            'user' => $user,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'expires_at' => $this->expires_at,

            'created_at_diff' => $this->created_at->diffForHumans(),
            'created_at_humans' => Carbon::parse($this->created_at)->format('F Y'),
            'updated_at_diff' => $this->updated_at->diffForHumans(),
        ];
    }
}
