<?php

namespace App\Services;

use App\Http\Resources\MediaResource;
use App\Models\Media;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Intervention\Image\Laravel\Facades\Image;

class MediaService
{
    private $folder = "uploads";

    public function storeOne($file, $itemId, $order, $code = "display")
    {
        $name = $file->hashName();

        Storage::put($this->folder, $file);

        Media::create([
            'type' => $file->getMimeType(),
            'name' => "{$this->folder}/{$name}",
            'url' => Storage::url("{$this->folder}/{$name}"),
            'item_id' => $itemId,
            'order' => $order,
            'code' => $code
        ]);
    }

    public function storeThumbnailForX($file, $mime, $itemId)
    {
        $thumbnail = Media::where("item_id", "=", $itemId)->where("code", "=", "x_thumbnail")->get();
        if ($thumbnail) {
            $this->destroyMany($thumbnail);
        }

        $name = Str::random();
        $extension = substr($mime, strrpos($mime, '/') + 1);
        $path = "{$this->folder}/{$name}.{$extension}";

        $output = Image::read(Storage::path('x_card_template.jpg'))
            ->place(Image::read($file)->pad(280, 280), 'center-left', 40);

        Storage::put($path, $output->encodeByExtension($extension));

        Media::create([
            'type' => $mime,
            'name' => $path,
            'url' => Storage::url($path),
            'item_id' => $itemId,
            'order' => 999,
            'code' => 'x_thumbnail'
        ]);
    }

    public function storeMany($files, string $itemId, $opts = [])
    {
        foreach ($files as $i => $file) {
            if ($i == 0 && $opts["thumbnail"]) {
                $this->storeThumbnailForX($file["file"], $file["file"]->getMimeType(), $itemId);
            }

            $this->storeOne($file["file"], $itemId, $i);
        }
    }

    public function update($uploads, $files, $itemId)
    {
        foreach ($uploads as $i => $upload) {
            $media = Media::find($upload["id"]);

            if (!$media) {
                $file = current($files)["file"];
                if ($i == 0) {
                    $this->storeThumbnailForX($file, $file->getMimeType(), $itemId);
                }

                $this->storeOne($file, $itemId, $i);
                array_shift($files);
            } else {
                if ($i == 0) {
                    $this->storeThumbnailForX(Storage::get($media->name), $media->type, $itemId);
                }

                $media->update(["order" => $i]);
            }

        }
    }

    public function destroyOne($media)
    {
        Storage::disk('public')->delete($media->name);
        $media->delete();
    }

    public function destroyMany($media)
    {
        foreach ($media as $m) {
            $this->destroyOne($m);
        }
    }

    public function destroyManyByItem($id)
    {
        $media = Media::where("item_id", "=", $id)->get();

        foreach ($media as $m) {
            $this->destroyOne($m);
        }
    }

    public function findAndDestroy($ids)
    {
        if (!$ids) {
            return;
        }

        foreach ($ids as $id) {
            $media = Media::find($id);
            if (!$media) {
                continue;
            }

            $this->destroyOne($media);
        }
    }
}