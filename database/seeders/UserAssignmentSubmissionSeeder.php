<?php

namespace Database\Seeders;

use App\Models\Assignment;
use App\Models\User;
use App\Models\UserAssignmentSubmission;
use Illuminate\Database\Seeder;

class UserAssignmentSubmissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $students = User::role('student')->get();
        $assignments = Assignment::all()->take(20);

        $students->each(function ($student) use ($assignments) {
            $assignments->each(function ($assignment) use ($student) {
                UserAssignmentSubmission::factory()
                    ->for($student)
                    ->for($assignment)
                    ->create();
            });
        });
    }
}
