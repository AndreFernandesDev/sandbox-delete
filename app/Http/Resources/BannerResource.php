<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BannerResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        $logo = new MediaResource($this->logo);

        return [
            'id' => $this->id,
            'title' => $this->title,
            'label' => $this->label,
            'cta' => $this->cta,
            'url' => $this->url,
            'background' => $this->background,
            'foreground' => $this->foreground,
            'is_active' => $this->is_active,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'logo' => $logo,
        ];
    }
}
