<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\User;
use App\Models\UserQuizAttempt;
use Illuminate\Database\Seeder;

class UserQuizAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::role('student')->get();
        $quizzes = Quiz::all()->take(20);

        $students->each(function ($student) use ($quizzes) {
            $quizzes->each(function ($quiz) use ($student) {
                UserQuizAttempt::factory()
                    ->for($student)
                    ->for($quiz)
                    ->create();
            });
        });
    }
}
