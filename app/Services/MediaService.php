<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Support\Facades\Storage;

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
            'code' => $code,
        ]);

    }

    public function storeMany($files, string $itemId)
    {
        foreach ($files as $i => $file) {
            $this->storeOne($file["file"], $itemId, $i);
        }
    }

    public function update($uploads, $files, $itemId)
    {
        foreach ($uploads as $i => $upload) {
            $media = Media::find($upload["id"]);

            if (!$media) {
                foreach ($files as $file) {
                    if (!$file["file"]->getClientOriginalName() == $upload["id"]) {
                        continue;
                    }

                    $this->storeOne($file["file"], $itemId, $i);
                }
            } else {
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