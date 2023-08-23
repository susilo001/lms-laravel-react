<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Assignment;
use Illuminate\Http\Request;
use App\Models\UserAssignmentSubmission;

class UserAssignmentSubmissionController extends Controller
{
    public function show(UserAssignmentSubmission $userAssignmentSubmission)
    {
        return Inertia::render('Assignment/Submission', [
            'userAssignmentSubmission' => $userAssignmentSubmission,
        ]);
    }

    public function store(Request $request, Assignment $assignment)
    {
        $request->validate([
            'student_id' => 'required|exists:users,id',
            'submission_file' => 'required|file|mimes:pdf,doc,docx,zip,rar|max:10000'
        ]);

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
