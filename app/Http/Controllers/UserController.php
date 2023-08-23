<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('User/Index', [
            'users' => $users,
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('User/Show', [
            'user' => $user,
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(StoreUserRequest $request)
    {
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return to_route('users.index')->with(['status' => 'Success', 'message' => 'User created successfully.']);
    }

    public function edit(User $user)
    {
        $roles = Role::all();

        return Inertia::render('User/Edit', [
            'user' => $user,
            'roles' => $roles,
        ]);
    }

    public function update(UpdateUserRequest $request, User $user)
    {
        if ($request->name || $request->email) {
            $user->update([
                'name' => $request->name,
                'email' => $request->email,
            ]);
        }

        if ($request->role) {
            $user->removeRole($user->roles->first()->name);
            $user->assignRole($request->role);
        }

        if ($request->password) {
            $user->update([
                'password' => bcrypt($request->password),
            ]);
        }

        return to_route('users.index')->with(['status' => 'Success', 'message' => 'User updated successfully.']);
    }

    public function destroy(User $user)
    {
        $user->delete();

        return to_route('users.index')->with(['status' => 'Success', 'message' => 'User deleted successfully.']);
    }
}
