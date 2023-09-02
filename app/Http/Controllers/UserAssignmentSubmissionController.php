<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentSubmissionRequest;
use App\Http\Resources\CourseResource;
use App\Models\Assignment;
use App\Models\Course;
use App\Models\UserAssignmentSubmission;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserAssignmentSubmissionController extends Controller
{

    public function index(Request $request)
    {
        $teacher = $request->user();

        $courses = Course::where('user_id', $teacher->id)
            ->with(['assignments.grades', 'assignments.submissions.user'])
            ->paginate(4);


        return Inertia::render('Submission/Index', [
            'courses' => CourseResource::collection($courses),
        ]);
    }

    public function show(UserAssignmentSubmission $userAssignmentSubmission)
    {
        return Inertia::render('Submission/Show', [
            'submission' => $userAssignmentSubmission,
        ]);
    }

    public function store(StoreAssignmentSubmissionRequest $request, Assignment $assignment)
    {
        if ($request->hasFile('submission_file')) {
            $file = $request->file('submission_file')->store('assignments/submission', 'public');
        }

        UserAssignmentSubmission::create([
            'assignment_id' => $assignment->id,
            'user_id' => $request->student_id,
            'submission_file' => $file,
        ]);

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Submission saved successfully',
        ]);
    }
}
