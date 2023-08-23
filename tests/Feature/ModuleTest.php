<?php

namespace Tests\Feature;

use App\Models\Course;
use App\Models\Module;
use App\Models\User;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class ModuleTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $course;

    protected $module;

    protected $mockFile;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->user = User::factory()->create();

        $this->user->assignRole('teacher');

        $this->actingAs($this->user);

        $this->course = Course::factory()->create();

        $this->module = Module::factory()->create([
            'course_id' => $this->course->id,
        ]);

        $this->mockFile = UploadedFile::fake()->create('document.pdf', 1000, 'application/pdf');
    }

    /**
     * Test if the user can view the module show page
     *
     * @return void
     */
    public function test_user_can_view_module_show_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('module.show', $this->module->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the module create page
     *
     * @return void
     */
    public function test_user_can_view_module_create_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('modules.create', $this->course->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the module edit page
     *
     * @return void
     */
    public function test_user_can_view_module_edit_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('modules.edit', $this->module->id));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can create a module
     *
     * @return void
     */
    public function test_user_can_create_a_module()
    {
        $this->withoutExceptionHandling();

        $response = $this->post(route('modules.store', $this->course->id), [
            'name' => 'Module 1',
            'description' => 'This is the description for module 1',
            'course_id' => $this->course->id,
            'content' => $this->mockFile,
        ]);

        $this->assertDatabaseHas('modules', [
            'name' => 'Module 1',
            'description' => 'This is the description for module 1',
            'course_id' => $this->course->id,
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));
    }

    /**
     * Test if the user can update a module
     *
     * @return void
     */
    public function test_user_can_update_a_module()
    {
        $this->withoutExceptionHandling();

        $response = $this->patch(route('modules.update', $this->module->id), [
            'name' => 'Module 1',
            'description' => 'This is the description for module 1',
            'course_id' => $this->course->id,
            'content' => $this->mockFile,
        ]);

        $this->assertDatabaseHas('modules', [
            'name' => 'Module 1',
            'description' => 'This is the description for module 1',
            'course_id' => $this->course->id,
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));
    }

    /**
     * Test if the user can delete a module
     *
     * @return void
     */
    public function test_user_can_delete_a_module()
    {
        $this->withoutExceptionHandling();

        $response = $this->delete(route('modules.destroy', $this->module->id));

        $this->assertDatabaseMissing('modules', [
            'name' => $this->module->name,
            'description' => $this->module->description,
            'course_id' => $this->course->id,
        ]);

        $response->assertRedirect(route('courses.edit', $this->course->slug));
    }
}
