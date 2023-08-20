<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Http\Request;

class AssignmentController extends Controller
{
    public function create()
    {
        return Inertia::render('Assignment/Create');
    }

    public function show(Assignment $assignment)
    {
        return Inertia::render('Assignment/Show', [
            'assignment' => $assignment
        ]);
    }

    public function edit()
    {
        return Inertia::render('Assignment/Edit');
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'due_date' => 'required',
            'total_marks' => 'required',
        ]);

        $assignment =  Assignment::create([
            'course_id' => $request->course_id,
            'name' => $request->name,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'total_marks' => $request->total_marks,
        ]);

        return to_route('courses.edit', $assignment->course->slug)->with([
            'message' => 'Assignment created successfully',
            'status' => 'Success',
        ]);
    }

    public function update(Request $request, Assignment $assignment)
    {
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'due_date' => 'required',
            'total_marks' => 'required',
        ]);

        $assignment->update([
            'name' => $request->name,
            'description' => $request->description,
            'due_date' => $request->due_date,
            'total_marks' => $request->total_marks,
        ]);

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
