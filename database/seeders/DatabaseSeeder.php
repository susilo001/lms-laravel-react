<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RolesAndPermissionSeeder::class,
            UserSeeder::class,
            CategorySeeder::class,
            CourseSeeder::class,
            ModuleSeeder::class,
            QuizSeeder::class,
            QuestionSeeder::class,
            AssignmentSeeder::class,
            EnrollmentSeeder::class,
            UserQuizAttemptSeeder::class,
            UserAssignmentSubmissionSeeder::class,
        ]);
    }
}
