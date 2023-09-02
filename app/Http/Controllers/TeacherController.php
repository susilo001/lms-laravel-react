<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseCollection;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\Grade;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $courses = Course::with(['user.media', 'category', 'modules', 'media'])
            ->orderBy('created_at', 'desc')
            ->paginate(6);

        return new CourseCollection($courses);
    }
}
