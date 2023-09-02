<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Http\Resources\CourseCollection;

class HomeController extends Controller
{
    public function index()
    {
        $latestCourses = Course::with(['user', 'category', 'modules'])
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Home', [
            'courses' => new CourseCollection($latestCourses),
        ]);
    }
}
