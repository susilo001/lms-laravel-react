<?php

namespace Tests\Feature;

use App\Models\Question;
use App\Models\Quiz;
use App\Models\User;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserQuizAttemptTest extends TestCase
{
    use RefreshDatabase;

    protected $student;

    protected $quiz;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->student = User::factory()->create();

        $this->student->assignRole('student');

        $this->actingAs($this->student);

        $this->quiz = Quiz::factory()->create();

        Question::factory()->for($this->quiz)->count(5)->create();
    }

    /**
     * Test if the user can attempt a quiz
     *
     * @return void
     */
    public function test_user_can_attempt_quiz()
    {
        $this->withoutExceptionHandling();

        $response = $this->post(route('quiz.attempt', $this->quiz->id), [
            'quiz_id' => $this->quiz->id,
            'answer' => [
                [
                    'question_id' => $this->quiz->questions[0]->id,
                    'value' => $this->quiz->questions[0]->correct_answer,
                ],
                [
                    'question_id' => $this->quiz->questions[1]->id,
                    'value' => $this->quiz->questions[1]->correct_answer,
                ],
                [
                    'question_id' => $this->quiz->questions[2]->id,
                    'value' => $this->quiz->questions[2]->correct_answer,
                ],
                [
                    'question_id' => $this->quiz->questions[3]->id,
                    'value' => $this->quiz->questions[3]->correct_answer,
                ],
                [
                    'question_id' => $this->quiz->questions[4]->id,
                    'value' => $this->quiz->questions[4]->correct_answer,
                ],
            ],
        ]);

        $response->assertRedirect(route('quiz.show', $this->quiz->id));

        $this->assertDatabaseHas('user_quiz_attempts', [
            'quiz_id' => $this->quiz->id,
            'user_id' => $this->student->id,
        ]);
    }
}
