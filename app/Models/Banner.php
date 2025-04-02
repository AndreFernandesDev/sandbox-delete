<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Banner extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::ulid();
        });
    }

    public function logo()
    {
        return $this->hasOne(Media::class, 'item_id')->where('code', '=', 'banner-logo');
    }
}
