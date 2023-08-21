<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;

class UserQuizAttemptController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'quiz_id' => 'required|exists:quizzes,id',
            'answer' => 'required|array',
            'answer.*.question_id' => 'required|exists:questions,id',
            'answer.*.value' => 'required',
        ]);

        $quiz = Quiz::with(['questions' => function ($query) use ($request) {
            $query->whereIn('id', collect($request->answer)->pluck('question_id'));
        }])->find($request->quiz_id);

        $questionLookup = $quiz->questions->pluck('correct_answer', 'id')->all();
        $score = 0;

        foreach ($request->answer as $answer) {
            if (isset($questionLookup[$answer['question_id']]) && $questionLookup[$answer['question_id']] === $answer['value']) {
                $score += $quiz->questions->find($answer['question_id'])->score;
            }
        }

        $quiz->grades()->create([
            'course_id' => $quiz->course_id,
            'user_id' => $request->user()->id,
            'gradeable_id' => $quiz->id,
            'gradeable_type' => Quiz::class,
            'score' => $score,
            'date' => now(),
        ]);

        $quiz->attempts()->create([
            'user_id' => $request->user()->id,
            'attempt_date' => now(),
        ]);

        return to_route('quiz.show', $quiz->id)->with([
            'status' => 'Success',
            'message' => 'Quiz Attempted Successfully'.'your score is '.$quiz->grades->where('user_id', $request->user()->id)->sum('score'),
        ]);
    }
}
