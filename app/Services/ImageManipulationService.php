<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\Laravel\Facades\Image;

class ImageManipulationService
{

    public function createThumbnailForX($file)
    {
        $template = Image::read(Storage::path('x_card_template.jpg'));
        $image = Image::read($file)->pad(280, 280);

        $output = $template->place($image, 'center-left', 40);

        return $output->encodeByExtension($file->extension());
    }
}