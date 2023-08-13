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
        return view('teacher.quiz.create');
    }

    public function store(Request $request)
    {
        Quiz::create($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully'
        ]);
    }

    public function show(Quiz $quiz)
    {
        return Inertia::render('Quiz', [
            'quiz' => $quiz->load('questions')
        ]);
    }

    public function edit(Course $course)
    {
        return view('teacher.course.edit', compact('course'));
    }

    public function update(Request $request, Quiz $quiz)
    {
        $quiz->update($request->all());

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully'
        ]);
    }

    public function destroy(Quiz $quiz)
    {
        $quiz->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully'
        ]);
    }
}
