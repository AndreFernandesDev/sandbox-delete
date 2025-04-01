<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationApiResource;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    public function search()
    {
        $res = Http::get('https://api.positionstack.com/v1/forward?query=' . request()->input('search') . '&limit=5&access_key=' . env('PSTACK_KEY'));
        $results = LocationApiResource::collection($res->object()->data);

        return $results;
    }
}
