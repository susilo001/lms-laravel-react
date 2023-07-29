<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Course;
use App\Models\Enrollment;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::role('student')->get();
        $courses = Course::all();

        $students->each(function ($student) use ($courses) {
            Enrollment::factory()
                ->count(3)
                ->for($courses->random())
                ->for($student)
                ->create();
        });
    }
}
