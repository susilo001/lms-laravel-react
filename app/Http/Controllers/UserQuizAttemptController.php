<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\UserQuizAttempt;
use Illuminate\Http\Request;

class UserQuizAttemptController extends Controller
{
    public function store(Request $request)
    {
        $quiz = Quiz::with('questions')->find($request->quiz_id);

        $score = 0;

        foreach ($request->answer as $answer) {
            $question = $quiz->questions->find($answer['question_id']);
            if ($question->correct_answer == $answer['value']) {
                $score += $question->score;
            }
        }

        $userQuizAttempt = UserQuizAttempt::create([
            'user_id' => $request->user()->id,
            'quiz_id' => $request->quiz_id,
            'score' => $score,
            'attempt_date' => now(),
        ]);

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Quiz Attempted Successfully' . 'your score is ' . $userQuizAttempt->score
        ]);
    }
}
