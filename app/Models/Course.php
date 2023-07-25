<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'title',
        'slug',
        'description',
        'user_id',
        'category_id',
        'image',
    ];

    protected $casts = [
        'created_at' => 'datetime:d M Y',
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function userQuizAttempts()
    {
        return $this->hasManyThrough(UserQuizAttempt::class, Quiz::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }
}
