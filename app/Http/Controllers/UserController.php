<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();

        return Inertia::render('User/Index', [
            'users' => $users
        ]);
    }

    public function show(User $user)
    {
        return Inertia::render('User/Show', [
            'user' => $user
        ]);
    }

    public function create()
    {
        return Inertia::render('User/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8',
        ]);

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
            'roles' => $roles
        ]);
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'name' => 'nullable|string',
            'email' => 'nullable|email|unique:users,email,' . $user->id,
            'password' => 'nullable|min:8',
            'role' => 'nullable|string'
        ]);

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
