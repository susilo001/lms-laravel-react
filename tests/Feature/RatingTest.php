<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\User;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class RatingTest extends TestCase
{
    use RefreshDatabase;

    protected $student;

    protected $course;

    protected function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->student = User::factory()->create();
        $this->course = Course::factory()->create();

        $this->student->assignRole('student');

        $this->actingAs($this->student);
    }

    /**
     * Test if a student can rate a course.
     *
     * @return void
     */
    public function test_student_can_rate_a_course()
    {
        $this->withoutExceptionHandling();

        $this->post(route('ratings.store'), [
            'user_id' => $this->student->id,
            'course_id' => $this->course->id,
            'rating' => 5,
            'review' => 'This is a review.',
            'date' => now(),
        ])->assertRedirect(route('courses.show', $this->course->slug));

        $this->assertDatabaseHas('ratings', [
            'user_id' => $this->student->id,
            'course_id' => $this->course->id,
            'rating' => 5,
            'review' => 'This is a review.',
        ]);
    }
}
