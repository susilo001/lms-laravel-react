<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Bio',
            'email' => 'admin@gmail.com',
            'password' => bcrypt('password'),
        ])->assignRole('admin');

        $students = User::factory()->count(10)->create();
        $teachers = User::factory()->count(10)->create();

        $students->each(function ($student) {
            $student->assignRole('student');
        });

        $teachers->each(function ($teacher) {
            $teacher->assignRole('teacher');
        });
    }
}
