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

    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'user_id' => 'required|exists:users,id',
            'gradeable_id' => 'required',
            'gradeable_type' => 'required',
            'score' => 'required|numeric|min:0',
        ]);

        Grade::create([
            'course_id' => $request->course_id,
            'user_id' => $request->user_id,
            'gradeable_id' => $request->gradeable_id,
            'gradeable_type' => $request->gradeable_type,
            'score' => $request->score,
        ]);

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Grade saved successfully',
        ]);
    }
}
