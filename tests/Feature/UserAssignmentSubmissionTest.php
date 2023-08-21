<?php

namespace Tests\Feature;

use App\Models\Assignment;
use App\Models\User;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class UserAssignmentSubmissionTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $assignment;

    protected $uploadedFile;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->user = User::factory()->create();

        $this->user->assignRole('student');

        $this->actingAs($this->user);

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

        $response = $this->post(route('assignment.submit', $this->assignment->id), [
            'assignment_id' => $this->assignment->id,
            'submission_file' => $this->uploadedFile,
            'submission_date' => now(),
        ]);

        $response->assertRedirect();

        $this->assertDatabaseHas('user_assignment_submissions', [
            'assignment_id' => $this->assignment->id,
            'user_id' => $this->user->id,
        ]);
    }
}
