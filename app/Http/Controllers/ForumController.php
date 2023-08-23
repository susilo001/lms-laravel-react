<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreForumRequest;
use App\Http\Requests\UpdateForumRequest;
use App\Models\Forum;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index()
    {
        $forums = Forum::all();

        return Inertia::render('Forum/Index', [
            'forums' => $forums,
        ]);
    }

    public function show(Forum $forum)
    {
        return Inertia::render('Forum/Show', [
            'forum' => $forum,
        ]);
    }

    public function create()
    {
        return Inertia::render('Forum/Create');
    }

    public function edit(Forum $forum)
    {
        return Inertia::render('Forum/Edit', [
            'forum' => $forum,
        ]);
    }

    public function store(StoreForumRequest $request)
    {
        Forum::create($request->validated());

        return to_route('forums.index')->with(['status' => 'Success', 'message' => 'Forum created!']);
    }

    public function update(UpdateForumRequest $request, Forum $forum)
    {
        $forum->update($request->validated());

        return to_route('forums.index')->with(['status' => 'Success', 'message' => 'Forum updated!']);
    }

    public function destroy(Forum $forum)
    {
        $forum->delete();

        return to_route('forums.index')->with(['status' => 'Success', 'message' => 'Forum deleted!']);
    }
}
