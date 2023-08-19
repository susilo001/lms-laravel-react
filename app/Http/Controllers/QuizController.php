<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Course;
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

    public function store(Request $request)
    {
        Quiz::create($request->all());

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Quiz created successfully'
        ]);
    }

    public function show(Quiz $quiz)
    {
        return Inertia::render('Quiz/Show', [
            'quiz' => $quiz->load('questions')
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Quiz/Edit', [
            'course' => $course
        ]);
    }

    public function update(Request $request, Quiz $quiz)
    {
        $quiz->update($request->all());

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Quiz updated successfully'
        ]);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Quiz deleted successfully'
        ]);
    }
}
