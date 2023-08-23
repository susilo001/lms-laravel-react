<?php

namespace Tests\Feature\Admin;

use App\Models\User;
use Database\Seeders\RolesAndPermissionSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Spatie\Permission\Models\Role;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    protected $admin;

    protected $students;

    protected $teachers;

    public function setUp(): void
    {
        parent::setUp();

        $this->seed(RolesAndPermissionSeeder::class);

        $this->admin = User::factory()->create();

        $this->admin->assignRole('admin');

        $this->actingAs($this->admin);

        $this->students = User::factory()->count(10)->create();

        $this->students->each(function ($student) {
            $student->assignRole('student');
        });

        $this->teachers = User::factory()->count(10)->create();

        $this->teachers->each(function ($teacher) {
            $teacher->assignRole('teacher');
        });
    }

    public function test_admin_can_view_users()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('users.index'));

        $response->assertStatus(200);
    }

    public function test_admin_can_view_user()
    {
        $this->withoutExceptionHandling();

        $user = $this->students->first();

        $response = $this->get(route('users.show', $user));

        $response->assertStatus(200);
    }

    public function test_admin_can_create_user()
    {
        $this->withoutExceptionHandling();

        $response = $this->get(route('users.create'));

        $response->assertStatus(200);

        $response = $this->post(route('users.store'), [
            'name' => 'John Doe',
            'email' => 'test@test.com',
            'password' => 'password',
        ]);

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'test@test.com',
        ]);
    }

    public function test_admin_can_edit_user()
    {
        $this->withoutExceptionHandling();

        $user = $this->students->first();

        $response = $this->get(route('users.edit', $user->id));

        $response->assertStatus(200);

        $response = $this->patch(route('users.update', $user->id), [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
            'password' => 'password',
        ]);

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('users', [
            'name' => 'John Doe',
            'email' => 'john@doe.com',
        ]);

        $this->assertDatabaseMissing('users', [
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function test_admin_can_delete_user()
    {
        $this->withoutExceptionHandling();

        $user = $this->students->first();

        $response = $this->delete(route('users.destroy', $user->id));

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseMissing('users', [
            'name' => $user->name,
            'email' => $user->email,
        ]);
    }

    public function test_admin_can_assign_role_to_user()
    {
        $this->withoutExceptionHandling();

        $user = $this->students->first();

        $response = $this->patch(route('users.update', $user->id), [
            'role' => 'teacher',
        ]);

        $response->assertRedirect(route('users.index'));

        $this->assertDatabaseHas('model_has_roles', [
            'role_id' => Role::where('name', 'teacher')->first()->id,
            'model_id' => $user->id,
            'model_type' => 'App\Models\User',
        ]);
    }
}
