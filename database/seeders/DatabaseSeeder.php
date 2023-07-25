<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use Illuminate\Database\Seeder;
use Database\Seeders\QuizSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\CourseSeeder;
use Database\Seeders\ModuleSeeder;
use Database\Seeders\QuestionSeeder;
use Database\Seeders\AssignmentSeeder;
use Database\Seeders\EnrollmentSeeder;
use Database\Seeders\UserQuizAttemptSeeder;
use Database\Seeders\RolesAndPermissionSeeder;
use Database\Seeders\UserAssignmentSubmissionSeeder;

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
            EnrollmentSeeder::class,
            ModuleSeeder::class,
            QuizSeeder::class,
            QuestionSeeder::class,
            UserQuizAttemptSeeder::class,
            AssignmentSeeder::class,
            UserAssignmentSubmissionSeeder::class,
        ]);
    }
}
