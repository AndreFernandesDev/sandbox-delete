<?php

namespace App\Http\Controllers;

class SessionController extends Controller
{
    public function location()
    {
        $location = request()->input('location');

        if ($location) {
            request()->session()->put('location', $location);
        } else {
            request()->session()->forget('location');
        }

        return response()->json(["location" => request()->session()->get('location')]);
    }
}
