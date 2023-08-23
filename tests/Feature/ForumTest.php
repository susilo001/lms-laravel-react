<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Post;
use App\Models\User;
use App\Models\Forum;
use App\Models\Course;
use App\Models\Thread;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ForumTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $course;
    protected $forum;
    protected $thread;
    protected $post;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);

        $this->course = Course::factory()->create();

        $this->forum = Forum::factory()->create();

        $this->thread = Thread::factory()->create([
            'forum_id' => $this->forum->id,
            'user_id' => $this->user->id,
        ]);

        $this->post = Post::factory()->create([
            'thread_id' => $this->thread->id,
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Test if the forum index page loads.
     * 
     * @return void
     */
    public function test_forum_index_page_loads()
    {
        $response = $this->get(route('forums.index'));

        $response->assertStatus(200);
    }

    /**
     * Test if the forum show page loads.
     * 
     * @return void
     */
    public function test_forum_show_page_loads()
    {
        $response = $this->get(route('forums.show', $this->forum));

        $response->assertStatus(200);
    }

    /**
     * Test if user can create a forum.
     * 
     * @return void
     */
    public function test_user_can_create_a_forum()
    {
        $response = $this->post(route('forums.store'), [
            'title' => 'Test',
            'description' => 'This is just testing',
            'course_id' => $this->course->id,
        ]);

        $response->assertRedirect(route('forums.index'));

        $this->assertDatabaseHas('forums', [
            'title' => 'Test',
            'description' => 'This is just testing',
            'course_id' => $this->course->id,
        ]);
    }

    /**
     * Test if the user can update a forum.
     * 
     * @return void
     */
    public function test_user_can_update_a_forum()
    {
        $response = $this->patch(route('forums.update', $this->forum), [
            'title' => 'Test',
            'description' => 'This is just testing',
            'course_id' => $this->course->id,
        ]);

        $response->assertRedirect(route('forums.index'));

        $this->assertDatabaseHas('forums', [
            'title' => 'Test',
            'description' => 'This is just testing',
            'course_id' => $this->course->id,
        ]);
    }

    /**
     * Test if the user can delete a forum.
     * 
     * @return void
     */
    public function test_user_can_delete_a_forum()
    {
        $response = $this->delete(route('forums.destroy', $this->forum));

        $response->assertRedirect(route('forums.index'));

        $this->assertDatabaseMissing('forums', [
            'id' => $this->forum->id,
        ]);
    }

    /**
     * Test if the user can create a thread.
     * 
     * @return void
     */
    public function test_user_can_create_a_thread()
    {
        $response = $this->post(route('threads.store'), [
            'title' => 'Test',
            'content' => 'This is just testing',
            'user_id' => $this->user->id,
            'forum_id' => $this->forum->id,
        ]);

        $response->assertRedirect(route('forums.show', $this->forum->id));

        $this->assertDatabaseHas('threads', [
            'title' => 'Test',
            'content' => 'This is just testing',
            'user_id' => $this->user->id,
        ]);
    }

    /**
     * Test if the user can update a thread.
     * 
     * @return void
     */
    public function test_user_can_update_a_thread()
    {
        $response = $this->patch(route('threads.update', $this->thread), [
            'title' => 'Test',
            'content' => 'This is just testing',
        ]);

        $response->assertRedirect(route('forums.show', $this->forum->id));

        $this->assertDatabaseHas('threads', [
            'title' => 'Test',
            'content' => 'This is just testing',
        ]);
    }

    /**
     * Test if the user can delete a thread.
     * 
     * @return void
     */
    public function test_user_can_delete_a_thread()
    {
        $response = $this->delete(route('threads.destroy', $this->thread));

        $response->assertRedirect(route('forums.show', $this->forum->id));

        $this->assertDatabaseMissing('threads', [
            'id' => $this->thread->id,
        ]);
    }

    /**
     * Test if the user can create a post.
     * 
     * @return void
     */
    public function test_user_can_create_a_post()
    {
        $response = $this->post(route('posts.store'), [
            'content' => 'This is just testing',
            'user_id' => $this->user->id,
            'thread_id' => $this->thread->id,
        ]);

        $response->assertRedirect(route('threads.show', $this->thread->id));

        $this->assertDatabaseHas('posts', [
            'content' => 'This is just testing',
            'user_id' => $this->user->id,
            'thread_id' => $this->thread->id,
        ]);
    }

    /**
     * Test if the user can update a post.
     * 
     * @return void
     */
    public function test_user_can_update_a_post()
    {
        $response = $this->patch(route('posts.update', $this->post), [
            'content' => 'This is just testing',
        ]);

        $response->assertRedirect(route('threads.show', $this->post->thread->id));

        $this->assertDatabaseHas('posts', [
            'content' => 'This is just testing',
        ]);
    }

    /**
     * Test if the user can delete a post.
     * 
     * @return void
     */
    public function test_user_can_delete_a_post()
    {
        $response = $this->delete(route('posts.destroy', $this->post));

        $response->assertRedirect(route('threads.show', $this->post->thread->id));

        $this->assertDatabaseMissing('posts', [
            'id' => $this->post->id,
        ]);
    }
}
