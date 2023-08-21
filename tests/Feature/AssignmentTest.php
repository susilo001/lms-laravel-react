<?php

namespace Tests\Feature;

use App\Models\Assignment;
use App\Models\Course;
use App\Models\User;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class AssignmentTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $course;

    protected $module;

    protected $assignment;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->user = User::factory()->create();

        $this->user->assignRole('teacher');

        $this->actingAs($this->user);

        $this->course = Course::factory()->create();

        $this->assignment = Assignment::factory()->create([
            'course_id' => $this->course->id,
        ]);
    }

    /**
     * Test if the user can view the assignment show page
     *
     * @return void
     */
    public function test_user_can_view_assignment_show_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('assignment.show', $this->assignment->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the assignment create page
     *
     * @return void
     */
    public function test_user_can_view_assignment_create_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('assignments.create', $this->course->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the assignment edit page
     *
     * @return void
     */
    public function test_user_can_view_assignment_edit_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('assignments.edit', $this->assignment->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can create a assignment
     *
     * @return void
     */
    public function test_user_can_create_a_assignment()
    {
        $this->withoutExceptionHandling();

        $response = $this->post(route('assignments.store'), [
            'course_id' => $this->course->id,
            'name' => 'Assignment 1',
            'description' => 'This is a test assignment',
            'due_date' => '2021-10-10',
            'total_marks' => '10',
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));

        $this->assertDatabaseHas('assignments', [
            'name' => 'Assignment 1',
            'course_id' => $this->course->id,
            'description' => 'This is a test assignment',
            'due_date' => '2021-10-10',
            'total_marks' => '10',
        ]);
    }

    /**
     * Test if the user can update a assignment
     *
     * @return void
     */
    public function test_user_can_update_a_assignment()
    {
        $this->withoutExceptionHandling();

        $response = $this->put(route('assignments.update', $this->assignment->id), [
            'name' => 'Assignment 1',
            'course_id' => $this->course->id,
            'description' => 'This is a test assignment',
            'due_date' => '2021-10-10',
            'total_marks' => '10',
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));

        $this->assertDatabaseHas('assignments', [
            'name' => 'Assignment 1',
            'course_id' => $this->course->id,
            'description' => 'This is a test assignment',
            'due_date' => '2021-10-10',
            'total_marks' => '10',
        ]);
    }

    /**
     * Test if the user can delete a assignment
     *
     * @return void
     */
    public function test_user_can_delete_a_assignment()
    {
        $this->withoutExceptionHandling();

        $response = $this->delete(route('assignments.destroy', $this->assignment->id));

        $response->assertRedirect(route('courses.edit', $this->course->slug));

        $this->assertDatabaseMissing('assignments', [
            'name' => $this->assignment->name,
            'course_id' => $this->course->id,
            'description' => $this->assignment->description,
            'due_date' => $this->assignment->due_date,
            'total_marks' => $this->assignment->total_marks,
        ]);
    }
}
