<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Quiz;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $course = Course::all();

        $course->each(function ($course) {
            Quiz::factory()
                ->count(3)
                ->for($course)
                ->create();
        });
    }
}
