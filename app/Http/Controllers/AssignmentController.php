<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;
use App\Models\Assignment;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function create()
    {
        return Inertia::render('Assignment/Create');
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
