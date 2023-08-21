<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'avatar',
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
