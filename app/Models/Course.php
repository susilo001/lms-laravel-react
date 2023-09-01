<?php

namespace App\Models;

use Spatie\MediaLibrary\HasMedia;
use Illuminate\Database\Eloquent\Model;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model implements HasMedia
{
    use HasFactory, InteractsWithMedia;

    protected $guarded = [];

    protected $fillable = [
        'title',
        'slug',
        'description',
        'user_id',
        'category_id',
    ];

    protected $casts = [
        'created_at' => 'datetime:d M Y',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function modules()
    {
        return $this->hasMany(Module::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function ratings()
    {
        return $this->hasMany(CourseRating::class);
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function materials()
    {
        return $this->hasManyThrough(Material::class, Module::class);
    }

    public function grades()
    {
        return $this->hasMany(Grade::class);
    }

    public function forum()
    {
        return $this->hasOne(Forum::class);
    }
}
