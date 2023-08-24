<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class RolesAndPermissionSeeder extends Seeder
{
    public function createRoles(): void
    {
        Role::firstOrCreate(['name' => 'admin']);
        Role::firstOrCreate(['name' => 'teacher']);
        Role::firstOrCreate(['name' => 'student']);
    }

    public function createPermissions(): void
    {
        $permissions = [
            ['name' => 'create user'],
            ['name' => 'edit user'],
            ['name' => 'delete user'],
            ['name' => 'view user'],
            ['name' => 'create course'],
            ['name' => 'edit course'],
            ['name' => 'delete course'],
            ['name' => 'view course'],
            ['name' => 'create quiz'],
            ['name' => 'edit quiz'],
            ['name' => 'delete quiz'],
            ['name' => 'view quiz'],
            ['name' => 'create question'],
            ['name' => 'edit question'],
            ['name' => 'delete question'],
            ['name' => 'view question'],
            ['name' => 'create answer'],
            ['name' => 'edit answer'],
            ['name' => 'delete answer'],
            ['name' => 'view answer'],
            ['name' => 'create assignment'],
            ['name' => 'edit assignment'],
            ['name' => 'delete assignment'],
            ['name' => 'view assignment'],
            ['name' => 'create category'],
            ['name' => 'edit category'],
            ['name' => 'delete category'],
            ['name' => 'view category'],
        ];

        foreach ($permissions as $permission) {
            Permission::create($permission);
        }
    }
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        $this->createRoles();
        $this->createPermissions();
    }
}
