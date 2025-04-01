<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TagItem extends Model
{
    public $table = 'tags_items';
    public $incrementing = false;
    public $timestamps = false;

    public function tag()
    {
        return $this->hasOne(Tag::class, 'id', 'tag_id');
    }
}
