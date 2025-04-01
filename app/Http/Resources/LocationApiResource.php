<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationApiResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'latitude' => $this->latitude,
            'longitude' => $this->longitude,
            'label' => $this->label,
        ];
    }
}
