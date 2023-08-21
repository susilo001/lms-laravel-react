<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Database\Seeder;

class EnrollmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::role('student')->get();
        $courses = Course::all();

        foreach ($courses as $course) {
            $randomStudents = $students->random(3);

            foreach ($randomStudents as $student) {
                Enrollment::factory()
                    ->for($course)
                    ->for($student)
                    ->create();
            }
        }
    }
}
