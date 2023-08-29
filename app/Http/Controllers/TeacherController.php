<?php

namespace App\Http\Controllers;

use App\Models\Grade;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function grading(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'student_id' => 'required|exists:users,id',
            'gradeable_id' => 'required',
            'gradeable_type' => 'required',
            'score' => 'required|numeric|min:0',
        ]);

        Grade::create([
            'course_id' => $request->course_id,
            'user_id' => $request->student_id,
            'gradeable_id' => $request->gradeable_id,
            'gradeable_type' => $request->gradeable_type,
            'score' => $request->score,
        ]);

        return to_route('teacher.grading')->with([
            'status' => 'Success',
            'message' => 'Student graded successfully',
        ]);
    }
}
