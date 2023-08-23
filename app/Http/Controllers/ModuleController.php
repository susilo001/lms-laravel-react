<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreModuleRequest;
use App\Http\Requests\UpdateModuleRequest;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function index()
    {
        return inertia('Teacher/Modules/Index');
    }

    public function create(Request $request)
    {
        return Inertia::render('Module/Create', [
            'course_id' => $request->course_id,
        ]);
    }

    public function show(Module $module)
    {
        return Inertia::render('Module/Show', [
            'module' => $module,
        ]);
    }

    public function edit(Module $module)
    {
        return Inertia::render('Module/Edit', [
            'module' => $module,
        ]);
    }

    public function store(StoreModuleRequest $request)
    {
        if ($request->hasFile('content')) {
            $content = $request->file('content')->store('content', 'public');
        }

        $module = Module::create([
            'name' => $request->name,
            'course_id' => $request->course_id,
            'description' => $request->description,
            'content' => $content,
            'order_number' => rand(1, 10),
        ]);

        return to_route('courses.edit', $module->course->slug)->with([
            'message' => 'Module created successfully',
            'status' => 'Success',
        ]);
    }

    public function update(UpdateModuleRequest $request, Module $module)
    {
        if ($request->hasFile('content')) {
            $content = $request->file('content')->store('content', 'public');
        }

        $module->update($request->all() + ['content' => $content]);

        return to_route('courses.edit', $module->course->slug)->with([
            'message' => 'Module updated successfully',
            'status' => 'Success',
        ]);
    }

    public function destroy(Module $module)
    {
        $module->delete();

        return to_route('courses.edit', $module->course->slug)->with([
            'message' => 'Module deleted successfully',
            'status' => 'Success',
        ]);
    }
}
