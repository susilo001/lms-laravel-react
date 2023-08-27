<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Http\Request;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;

class AssignmentController extends Controller
{
    public function create(Request $request)
    {
        return Inertia::render('Assignment/Create', ['course_id' => $request->course_id]);
    }

    public function show(Assignment $assignment)
    {
        return Inertia::render('Assignment/Show', [
            'assignment' => $assignment,
        ]);
    }

    public function edit()
    {
        return Inertia::render('Assignment/Edit');
    }

    public function store(StoreAssignmentRequest $request)
    {
        $assignment = Assignment::create($request->validated());

        return to_route('courses.edit', $assignment->course->slug)->with([
            'message' => 'Assignment created successfully',
            'status' => 'Success',
        ]);
    }

    public function update(UpdateAssignmentRequest $request, Assignment $assignment)
    {
        $assignment->update($request->validated());

        return to_route('courses.edit', $assignment->course->slug)->with([
            'message' => 'Assignment updated successfully',
            'status' => 'Success',
        ]);
    }

    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return to_route('courses.edit', $assignment->course->slug)->with([
            'message' => 'Assignment deleted successfully',
            'status' => 'Success',
        ]);
    }
}
