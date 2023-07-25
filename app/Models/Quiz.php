<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'course_id',
        'name',
        'total_marks',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function questions()
    {
        return $this->hasMany(QuizQuestion::class);
    }

    public function attempts()
    {
        return $this->hasMany(UserQuizAttempt::class);
    }
}
