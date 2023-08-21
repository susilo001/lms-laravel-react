<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index(Request $request)
    {
        return Quiz::where('course_id', $request->course_id)->get();
    }

    public function create()
    {
        return Inertia::render('Quiz/Create');
    }

    public function show(Quiz $quiz)
    {
        return Inertia::render('Quiz/Show', [
            'quiz' => $quiz->load('questions'),
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Quiz/Edit', [
            'course' => $course,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required',
            'name' => 'required',
            'total_marks' => 'required',
        ]);

        $quiz = Quiz::create($request->all());

        return to_route('courses.edit', $quiz->course->slug)->with([
            'status' => 'Success',
            'message' => 'Quiz created successfully',
        ]);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $request->validate([
            'course_id' => 'required',
            'name' => 'required',
            'total_marks' => 'required',
        ]);

        $quiz->update($request->all());

        return to_route('courses.edit', $quiz->course->slug)->with([
            'status' => 'Success',
            'message' => 'Quiz updated successfully',
        ]);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return to_route('courses.edit', $quiz->course->slug)->with([
            'status' => 'Success',
            'message' => 'Quiz deleted successfully',
        ]);
    }
}
