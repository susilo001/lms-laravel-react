<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'content', 'module_id'];

    public function module()
    {
        return $this->belongsTo(Module::class);
    }
}
