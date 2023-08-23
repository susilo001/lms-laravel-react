<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index()
    {
        $forums = Forum::all();

        return Inertia::render('Forum/Index', [
            'forums' => $forums
        ]);
    }

    public function show(Forum $forum)
    {
        return Inertia::render('Forum/Show', [
            'forum' => $forum
        ]);
    }

    public function create()
    {
        return Inertia::render('Forum/Create');
    }

    public function edit(Forum $forum)
    {
        return Inertia::render('Forum/Edit', [
            'forum' => $forum
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'course_id' => 'required',
        ]);

        Forum::create($request->all());

        return to_route('forums.index')->with(['status' => 'Success', 'message' => 'Forum created!']);
    }

    public function update(Request $request, Forum $forum)
    {
        $request->validate([
            'title' => 'required',
            'description' => 'required',
            'course_id' => 'required',
        ]);

        $forum->update($request->all());

        return to_route('forums.index')->with(['status' => 'Success', 'message' => 'Forum updated!']);
    }

    public function destroy(Forum $forum)
    {
        $forum->delete();

        return to_route('forums.index')->with(['status' => 'Success', 'message' => 'Forum deleted!']);
    }
}
