<?php

namespace App\Services;

use App\Models\Media;
use Illuminate\Support\Facades\Storage;

class MediaService
{
    public function storeOne($file, $itemId, $order)
    {
        Media::create([
            'type' => $file->getMimeType(),
            'name' => $file->hashName(),
            'item_id' => $itemId,
            'order' => $order,
        ]);
        Storage::put('uploads', $file);

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
        Storage::delete('uploads/' . $media->name);
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