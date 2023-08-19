<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class CourseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();
        $teachers = User::role('teacher')->get();

        $teachers->each(function ($teacher) use ($categories) {
            Course::factory()
                ->count(10)
                ->for($teacher)
                ->for($categories->random())
                ->create();
        });
    }
}
