<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $latestCourses = Course::with(['user', 'category', 'modules'])
            ->orderBy('created_at', 'desc')
            ->paginate(5);

        return Inertia::render('Home', [
            'latestCourses' => $latestCourses
        ]);
    }
}
