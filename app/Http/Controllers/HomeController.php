<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $latestCourses = Course::with(['user', 'category', 'modules'])
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Home', [
            'latestCourses' => $latestCourses,
        ]);
    }
}
