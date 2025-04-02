<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationApiResource;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    public function search()
    {
        $res = Http::get('https://maps.googleapis.com/maps/api/geocode/json?address=' . request()->input('search') . '&key=' . env('GOOGLE_KEY'));

        return LocationApiResource::collection($res->object()->results);
    }
}
