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
    private function createRoles()
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'teacher']);
        Role::firstOrCreate(['name' => 'student']);
    }

    private function createAdmin()
    {
        User::factory()->create([
            'name' => 'Bio',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ])->assignRole('admin');
    }

    private function createTeacher()
    {
        User::factory()
            ->has(Course::factory()->count(3))
            ->create([
                'name' => 'Bionda',
                'email' => 'teacher@gmail.com',
                'password' => bcrypt('password'),
            ])->assignRole('teacher');

        $teachers = User::factory()
            ->has(Course::factory()
                ->for(Category::factory())
                ->has(Quiz::factory()
                    ->hasQuestions(3)
                    ->count(3))
                ->hasAssignments(3)
                ->hasModules(3)
                ->count(3))
            ->count(10)
            ->create();

        $teachers->each(function ($teacher) {
            $teacher->assignRole('teacher');
        });
    }

    private function createStudent()
    {
        User::factory()->create([
            'name' => 'O-Bio',
            'email' => 'student@gmail.com',
            'password' => bcrypt('password'),
        ])->assignRole('student');

        $students = User::factory()
            ->has(Enrollment::factory()
                ->for(Course::factory())
                ->count(3))
            ->has(UserAssignmentSubmission::factory()
                ->for(Assignment::factory())
                ->count(3))
            ->has(UserQuizAttempt::factory()
                ->for(Quiz::factory())
                ->count(3))
            ->count(10)
            ->create();

        $students->each(function ($student) {
            $student->assignRole('student');
        });
    }

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->createRoles();
        $this->createAdmin();
        $this->createTeacher();
        $this->createStudent();
    }
}
