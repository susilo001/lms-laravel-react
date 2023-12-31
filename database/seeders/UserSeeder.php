<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
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
            ->create([
                'name' => 'Bionda',
                'email' => 'teacher@gmail.com',
                'password' => bcrypt('password'),
            ])->assignRole('teacher');

        $teachers = User::factory()
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
            ->count(10)
            ->create();

        $students->each(function ($student) {
            $student->assignRole('student');
        });
    }

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->createAdmin();
        $this->createTeacher();
        $this->createStudent();
    }
}
