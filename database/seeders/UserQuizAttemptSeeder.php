<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\User;
use App\Models\UserQuizAttempt;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserQuizAttemptSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $quizzes = Quiz::all();
        $students = User::role('student')->get();

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
