<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PostResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $rate = new RateResource($this->rate);
        $location = new LocationResource($this->location);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'description' => $this->description,
            'price' => $this->price,
            'media' => MediaResource::collection($this->media),
            'location' => $location,
            'currency' => $this->currency,
            'rate' => $rate['rate'],
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
