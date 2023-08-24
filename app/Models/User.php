<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Models\Quiz;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Enrollment;
use App\Models\UserQuizAttempt;
use Laravel\Sanctum\HasApiTokens;
use Spatie\MediaLibrary\HasMedia;
use Spatie\Permission\Traits\HasRoles;
use App\Models\UserAssignmentSubmission;
use Illuminate\Notifications\Notifiable;
use Spatie\MediaLibrary\InteractsWithMedia;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable implements HasMedia
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, InteractsWithMedia;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function courses()
    {
        return $this->hasMany(Course::class);
    }

    public function assignments()
    {
        return $this->hasMany(Assignment::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function userQuizAttempts()
    {
        return $this->hasManyThrough(UserQuizAttempt::class, Quiz::class);
    }

    public function userAssignmentSubmissions()
    {
        return $this->hasMany(UserAssignmentSubmission::class);
    }

    public function notifications()
    {
        return $this->hasMany(Notification::class);
    }

    public function courseRatings()
    {
        return $this->hasMany(CourseRating::class);
    }

    public function announcements()
    {
        return $this->hasMany(Announcement::class);
    }

    public function getStudentCount()
    {
        $students = $this->with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'student')->toArray()
        )->count();

        return $students;
    }

    public function getTeacherCount()
    {
        $teachers = $this->with('roles')->get()->filter(
            fn ($user) => $user->roles->where('name', 'teacher')->toArray()
        )->count();

        return $teachers;
    }
}
