<?php

namespace Database\Seeders;

use App\Models\Quiz;
use App\Models\User;
use App\Models\Grade;
use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Database\Seeder;

class GradeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $assignments = Assignment::inRandomOrder()->limit(3)->get();
        $quizzes = Quiz::inRandomOrder()->limit(3)->get();
        $courses = Course::all();
        $users = User::all();

        foreach ($courses as $course) {
            foreach ($assignments as $assignment) {
                foreach ($users as $user) {
                    Grade::factory()
                        ->for($course)
                        ->for($assignment, 'gradeable')
                        ->for($user)
                        ->create();
                }
            }

            foreach ($quizzes as $quiz) {
                foreach ($users as $user) {
                    Grade::factory()
                        ->for($course)
                        ->for($quiz, 'gradeable')
                        ->for($user)
                        ->create();
                }
            }
        }
    }
}
