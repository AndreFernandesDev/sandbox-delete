<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LocationResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'latitude' => $this->cords->getLatitude(),
            'longitude' => $this->cords->getLongitude(),
            'label' => $this->label,
        ];
    }
}
