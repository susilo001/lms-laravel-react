<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        return Inertia::render('Teacher/Course/Index', [
            'courses' => Course::where('user_id', auth()->user()->id)->get()
        ]);
    }

    public function create()
    {
        return view('teacher.course.create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required|unique:courses',
            'credit' => 'required',
            'description' => 'required',
        ]);

        Course::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully'
        ]);
    }

    public function show(Course $course)
    {
        return view('teacher.course.show', compact('course'));
    }

    public function edit(Course $course)
    {
        return view('teacher.course.edit', compact('course'));
    }

    public function update(Request $request, Course $course)
    {
        $request->validate([
            'name' => 'required',
            'code' => 'required|unique:courses,code,' . $course->id,
            'credit' => 'required',
            'description' => 'required',
        ]);

        $course->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully'
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }
}
