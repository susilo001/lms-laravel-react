<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assignment extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $fillable = [
        'course_id',
        'name',
        'description',
        'due_date',
        'total_marks',
    ];

    protected $casts = [
        'due_date' => 'datetime:d M Y',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class);
    }

    public function submissions()
    {
        return $this->hasMany(UserAssignmentSubmission::class);
    }

    public function grades()
    {
        return $this->morphMany(Grade::class, 'gradeable');
    }
}
