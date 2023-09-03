<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use App\Models\Course;
use App\Http\Resources\CourseCollection;
use App\Http\Resources\EnrollmentResource;
use App\Models\Enrollment;

class HomeController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $coursesCount = Course::count();
        $studentsCount = User::role('student')->count();
        $teachersCount = User::role('teacher')->count();

        if ($user) {
            $enrollments = Enrollment::with(['course.category', 'course.user', 'course.assignments.submissions' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])
                ->where('user_id', $user->id)
                ->get()->take(10);
        } else {
            $enrollments = [];
        }

        return Inertia::render('Home', [
            'coursesCount' => $coursesCount,
            'studentsCount' => $studentsCount,
            'teachersCount' => $teachersCount,
            'enrollments' => EnrollmentResource::collection($enrollments),
        ]);
    }
}
