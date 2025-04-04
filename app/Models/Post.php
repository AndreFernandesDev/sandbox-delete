<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
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

    public function tags()
    {
        return $this->hasMany(TagItem::class, 'item_id');
    }

    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }

    public function rate()
    {
        return $this->hasOne(Rate::class, 'code', 'currency');
    }

    public function location()
    {
        return $this->hasOne(Location::class, 'item_id', 'id');
    }

    public function status()
    {
        return $this->hasOne(Status::class, 'item_id', 'id')->where(['user_id' => Auth::id()]);
    }
}
