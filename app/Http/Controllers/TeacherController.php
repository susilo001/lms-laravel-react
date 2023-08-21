<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Course;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function courses()
    {
        $courses = Course::with(['user', 'category', 'modules', 'enrollments'])
            ->where('user_id', auth()->user()->id)
            ->withCount('enrollments')
            ->paginate(5);
        $categories = Category::all();

        return Inertia::render('Teacher/Course/Index', [
            'courses' => $courses,
            'categories' => $categories,
        ]);
    }
}
