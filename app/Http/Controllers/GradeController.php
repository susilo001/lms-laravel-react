<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Grade;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class GradeController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        $enrollmentsWithGrades = Enrollment::where('user_id', $user->id)
            ->with(['course.grades' => function ($query) use ($user) {
                $query->where('user_id', $user->id);
            }])->paginate(10);

        return Inertia::render('Grade/Index', [
            'enrollments' => $enrollmentsWithGrades,
        ]);
    }
}