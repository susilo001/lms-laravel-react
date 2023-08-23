<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentSubmissionRequest;
use App\Models\Assignment;
use App\Models\UserAssignmentSubmission;
use Inertia\Inertia;

class UserAssignmentSubmissionController extends Controller
{
    public function show(UserAssignmentSubmission $userAssignmentSubmission)
    {
        return Inertia::render('Assignment/Submission', [
            'userAssignmentSubmission' => $userAssignmentSubmission,
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
            'submission_date' => now(),
        ]);

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Submission saved successfully',
        ]);
    }
}
