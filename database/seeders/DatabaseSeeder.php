<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;


use App\Models\Quiz;
use App\Models\User;
use App\Models\Course;
use App\Models\Category;
use App\Models\Assignment;
use App\Models\Enrollment;
use App\Models\UserQuizAttempt;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use App\Models\UserAssignmentSubmission;
use Spatie\Permission\PermissionRegistrar;

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
