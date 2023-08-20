<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Category;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;

    protected $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $this->actingAs($this->user);
    }

    /**
     * Test if the user can view the categories index page
     * 
     * @return void
     */
    public function test_user_can_view_categories_index_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('categories.index'));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the categories create page
     * 
     * @return void
     */
    public function test_user_can_view_categories_create_page()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('categories.create'));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the categories edit page
     * 
     * @return void
     */
    public function test_user_can_view_categories_edit_page()
    {
        $this->withoutExceptionHandling();

        $category = Category::factory()->create();

        $response = $this->get(route('categories.edit', $category->slug));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can view the categories show page
     * 
     * @return void
     */
    public function test_user_can_view_categories_show_page()
    {
        $this->withoutExceptionHandling();

        $category = Category::factory()->create();

        $response = $this->get(route('categories.show', $category->slug));

        $response->assertStatus(200);
    }

    /**
     * Test if the user can create a category
     * 
     * @return void
     */
    public function test_user_can_create_a_category()
    {
        $this->withoutExceptionHandling();

        $category = Category::factory()->make();

        $response = $this->post(route('categories.store'), [
            'name' => $category->name,
            'slug' => $category->slug,
        ]);

        $response->assertRedirect(route('categories.index'));

        $this->assertDatabaseHas('categories', [
            'name' => $category->name,
            'slug' => $category->slug,
        ]);
    }

    /**
     * Test if the user can update a category
     * 
     * @return void
     */
    public function test_user_can_update_a_category()
    {
        $this->withoutExceptionHandling();

        $category = Category::factory()->create();

        $response = $this->patch(route('categories.update', $category->slug), [
            'name' => 'New Category Name',
            'slug' => 'new-category-name',
        ]);

        $response->assertRedirect(route('categories.index'));

        $this->assertDatabaseHas('categories', [
            'name' => 'New Category Name',
            'slug' => 'new-category-name',
        ]);
    }

    /**
     * Test if the user can delete a category
     * 
     * @return void
     */
    public function test_user_can_delete_a_category()
    {
        $this->withoutExceptionHandling();

        $category = Category::factory()->create();

        $response = $this->delete(route('categories.destroy', $category->slug));

        $response->assertRedirect(route('categories.index'));

        $this->assertDatabaseMissing('categories', [
            'name' => $category->name,
            'slug' => $category->slug,
        ]);
    }
}
