<?php

namespace Tests\Feature;

use App\Models\Assignment;
use App\Models\User;
use App\Models\UserAssignmentSubmission;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class UserAssignmentSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected $student;

    protected $assignment;

    protected $uploadedFile;

    protected $teacher;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->student = User::factory()->create();
        $this->teacher = User::factory()->create();

        $this->student->assignRole('student');

        $this->teacher->assignRole('teacher');

        $this->assignment = Assignment::factory()->create();

        $this->uploadedFile = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');
    }

    /**
     * Test if the user can submit an assignment
     *
     * @return void
     */
    public function test_user_can_submit_assignment()
    {
        $this->withoutExceptionHandling();

        $this->actingAs($this->student);

        $response = $this->post(route('assignment.submit', $this->assignment->id), [
            'student_id' => $this->student->id,
            'submission_file' => $this->uploadedFile,
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('user_assignment_submissions', [
            'assignment_id' => $this->assignment->id,
            'user_id' => $this->student->id,
        ]);
    }

    /**
     * Test if the teacher can view the submission
     *
     * @return void
     */
    public function test_teacher_can_view_submission()
    {
        $this->withoutExceptionHandling();

        $this->actingAs($this->teacher);

        UserAssignmentSubmission::factory()->create([
            'assignment_id' => $this->assignment->id,
            'user_id' => $this->student->id,
        ]);

        $response = $this->get(route('submission.show', $this->student->name));

        $response->assertStatus(200);

        $response = $this->post(route('teacher.grading'), [
            'course_id' => $this->assignment->course_id,
            'student_id' => $this->student->id,
            'gradeable_id' => $this->assignment->id,
            'gradeable_type' => 'App\Models\Assignment',
            'score' => 100,
        ]);

        $this->assertDatabaseHas('grades', [
            'course_id' => $this->assignment->course_id,
            'user_id' => $this->student->id,
            'gradeable_id' => $this->assignment->id,
            'gradeable_type' => 'App\Models\Assignment',
            'score' => 100,
        ]);
    }
}
