<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    public static $wrap = null;

    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'nickname' => $this->nickname,
            'description' => $this->description,
            'profile_image_url' => $this->profile_image_url,
            'role' => $this->role,

            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,

            'created_at_humans' => Carbon::parse($this->created_at)->format('F Y'),
        ];
    }
}