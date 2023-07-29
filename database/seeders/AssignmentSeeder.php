<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Assignment;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

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
