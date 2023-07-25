<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $latestCourses = Course::with('user')->orderBy('created_at', 'desc')->paginate(5);

        return Inertia::render('Dashboard', [
            'latestCourses' => $latestCourses
        ]);
    }
}
