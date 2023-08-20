<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Quiz;
use App\Models\User;
use App\Models\Course;
use App\Models\Module;
use Illuminate\Foundation\Testing\WithFaker;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;

class QuizTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $course;
    protected $module;
    protected $quiz;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->user = User::factory()->create();

        $this->user->assignRole('teacher');

        $this->actingAs($this->user);

        $this->course = Course::factory()->create();

        $this->quiz = Quiz::factory()->create([
            'course_id' => $this->course->id,
        ]);
    }

    /**
     * Test if the user can view the quiz show page
     * 
     * @return void
     */
    public function test_user_can_view_quiz_show_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('quiz.show',  $this->quiz->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the quiz create page
     * 
     * @return void
     */
    public function test_user_can_view_quiz_create_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('quizzes.create', $this->course->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the quiz edit page
     * 
     * @return void
     */
    public function test_user_can_view_quiz_edit_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('quizzes.edit', $this->quiz->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can create a quiz
     * 
     * @return void
     */
    public function test_user_can_create_a_quiz()
    {
        $this->withoutExceptionHandling();

        $response = $this->post(route('quizzes.store'), [
            'name' => 'Quiz 1',
            'course_id' => $this->course->id,
            'total_marks' => 10,
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));
    }

    /**
     * Test if the user can update a quiz
     * 
     * @return void
     */
    public function test_user_can_update_a_quiz()
    {
        $this->withoutExceptionHandling();

        $response = $this->patch(route('quizzes.update', $this->quiz->id), [
            'name' => 'Quiz 1',
            'course_id' => $this->course->id,
            'total_marks' => 10,
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));
    }

    /**
     * Test if the user can delete a quiz
     * 
     * @return void
     */
    public function test_user_can_delete_a_quiz()
    {
        $this->withoutExceptionHandling();

        $response = $this->delete(route('quizzes.destroy', $this->quiz->id));

        $response->assertRedirect(route('courses.edit', $this->course->slug));
    }
}
