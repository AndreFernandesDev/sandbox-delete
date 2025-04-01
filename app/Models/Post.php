<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Post extends Model
{
    use HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    public static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Str::ulid();
        });
    }
    public function media()
    {
        return $this->hasMany(Media::class, 'item_id')->orderBy('order', 'asc');
    }

    public function rate()
    {
        return $this->hasOne(Rate::class, 'code', 'currency');
    }

    public function location()
    {
        return $this->hasOne(Location::class, 'item_id', 'id');
    }
}
