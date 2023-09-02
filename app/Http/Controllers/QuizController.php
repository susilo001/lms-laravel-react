<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Inertia\Inertia;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Http\Request;
use App\Http\Resources\QuizResource;
use App\Http\Requests\StoreQuizRequest;
use App\Http\Requests\UpdateQuizRequest;
use App\Http\Resources\EnrollmentResource;

class QuizController extends Controller
{
    public function index(Request $request)
    {
        $userId = $request->user()->id;

        $enrollments = Enrollment::where('user_id', $userId)
            ->with(['course.quizzes.attempts' => function ($query) use ($userId) {
                $query->where('user_id', $userId);
            }])->paginate(10);

        return Inertia::render('Quiz/Index', [
            'enrollments' => EnrollmentResource::collection($enrollments),
        ]);
    }

    public function create()
    {
        return Inertia::render('Quiz/Create');
    }

    public function show(Quiz $quiz)
    {
        return Inertia::render('Quiz/Show', [
            'quiz' => new QuizResource($quiz->load('questions')),
        ]);
    }

    public function edit(Quiz $quiz)
    {
        return Inertia::render('Quiz/Edit', [
            'quiz' => new QuizResource($quiz->load('questions')),
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
