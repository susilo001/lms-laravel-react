<?php

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Forum;
use Illuminate\Database\Seeder;

class ForumSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $courses = Course::all();

        foreach ($courses as $course) {
            Forum::factory()->create([
                'course_id' => $course->id,
            ]);
        }
    }
}
