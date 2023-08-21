<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\Course;
use Illuminate\Database\Seeder;

class AssignmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        $courses->each(function ($course) {
            Assignment::factory()
                ->count(3)
                ->for($course)
                ->create();
        });
    }
}
