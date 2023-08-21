<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\Course;
use App\Models\User;
use Database\Seeders\CategorySeeder;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;

class CourseTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    protected $course;

    protected $categories;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed([
            CategorySeeder::class,
            RolesAndPermissionSeeder::class,
        ]);

        $this->user = User::factory()->create();

        $this->user->assignRole('teacher');

        $this->actingAs($this->user);

        $this->categories = Category::all();

        $this->course = Course::factory()->for($this->categories->random())->create();
    }

    /**
     * Test if the user can view the courses index page
     *
     * @return void
     */
    public function test_user_can_view_courses_index_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('course.index'));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the courses create page
     *
     * @return void
     */
    public function test_user_can_view_courses_create_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('courses.create'));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the courses edit page
     *
     * @return void
     */
    public function test_user_can_view_courses_edit_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('courses.edit', $this->course->slug));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the courses show page
     *
     * @return void
     */
    public function test_user_can_view_courses_show_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('course.show', $this->course->slug));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can create a course
     *
     * @return void
     */
    public function test_user_can_create_a_course()
    {
        $this->withoutExceptionHandling();

        $response = $this->post(route('courses.store'), [
            'title' => 'Test Course',
            'slug' => 'test-course',
            'description' => 'This is a test course',
            'category_id' => $this->categories->random()->id,
            'image' => UploadedFile::fake()->image('test.jpg'),
        ]);

        $response->assertRedirect(route('course.index'));
    }

    /**
     * Test if the user can update a course
     *
     * @return void
     */
    public function test_user_can_update_a_course()
    {
        $this->withoutExceptionHandling();

        $response = $this->patch(route('courses.update', $this->course->slug), [
            'title' => 'Test Course',
            'slug' => 'test-course',
            'description' => 'This is a test course',
            'category_id' => $this->categories->random()->id,
            'image' => UploadedFile::fake()->image('test.jpg'),
        ]);

        $response->assertRedirect(route('course.index'));
    }

    /**
     * Test if the user can delete a course
     *
     * @return void
     */
    public function test_user_can_delete_a_course()
    {
        $this->withoutExceptionHandling();

        $response = $this->delete(route('courses.destroy', $this->course->slug));

        $response->assertRedirect(route('course.index'));
    }
}
