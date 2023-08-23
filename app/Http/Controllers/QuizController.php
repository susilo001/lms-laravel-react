<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
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

    public function store(StoreQuizRequest $request)
    {
        $quiz = Quiz::create($request->validated());

        return to_route('courses.edit', $quiz->course->slug)->with([
            'status' => 'Success',
            'message' => 'Quiz created successfully',
        ]);
    }

    public function update(UpdateQuizRequest $request, Quiz $quiz)
    {
        $quiz->update($request->validated());

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
