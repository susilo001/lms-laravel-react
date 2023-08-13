<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use App\Models\UserAssignmentSubmission;
use Illuminate\Http\Request;

class UserAssignmentSubmissionController extends Controller
{
    public function store(Request $request, Assignment $assignment)
    {
        if ($request->hasFile('submission_file')) {
            $file = $request->file('submission_file')->store('assignments/submission', 'public');
        }

        UserAssignmentSubmission::create([
            'assignment_id' => $assignment->id,
            'user_id' => $request->user()->id,
            'submission_file' => $file,
            'submission_date' => now(),
        ]);

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Submission saved successfully',
        ]);
    }
}
