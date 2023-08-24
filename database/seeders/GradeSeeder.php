<?php

namespace Database\Seeders;

use App\Models\Quiz;
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
        $assignments = Assignment::all();
        $quizzes = Quiz::all();
        $courses = Course::all();

        foreach ($courses as $course) {
            $randomAssignments = $assignments->random(3);
            $randomQuizzes = $quizzes->random(3);

            foreach ($randomAssignments as $assignment) {
                Grade::factory()
                    ->for($course)
                    ->for($assignment, 'gradeable')
                    ->create();
            }

            foreach ($randomQuizzes as $quiz) {
                Grade::factory()
                    ->for($course)
                    ->for($quiz, 'gradeable')
                    ->create();
            }
        }
    }
}
