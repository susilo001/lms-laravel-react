<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Assignment;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Http\Resources\AssignmentResource;
use App\Http\Resources\EnrollmentResource;
use App\Http\Requests\StoreAssignmentRequest;
use App\Http\Requests\UpdateAssignmentRequest;

class AssignmentController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $enrollment = Enrollment::where('user_id', $userId)
            ->with(['course.assignments.submissions' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])->paginate(10);

        return Inertia::render('Assignment/Index', [
            'enrollments' => EnrollmentResource::collection($enrollment),
        ]);
    }

    public function create(Request $request)
    {
        return Inertia::render('Assignment/Create', ['course_id' => $request->course_id]);
    }

    public function show(Assignment $assignment)
    {
        return Inertia::render('Assignment/Show', [
            'assignment' => new AssignmentResource($assignment),
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
