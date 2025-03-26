<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Rate extends Model
{
    protected $keyType = 'string';
    public $primaryKey = 'code';
    public $incrementing = false;
    public $timestamps = false;
}
