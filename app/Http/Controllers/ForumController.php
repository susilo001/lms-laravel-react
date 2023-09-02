<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreForumRequest;
use App\Http\Requests\UpdateForumRequest;
use App\Http\Resources\ForumResource;
use App\Models\Forum;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index()
    {
        $forums = Forum::with(['course'])->withCount(['threads'])->paginate(8);

        return Inertia::render('Forum/Index', [
            'forums' => ForumResource::collection($forums),
        ]);
    }

    public function show(Forum $forum)
    {
        return Inertia::render('Forum/Show', [
            'forum' => new ForumResource($forum->load(['course', 'threads.user.media'])),
        ]);
    }

    public function create()
    {
        return Inertia::render('Forum/Create');
    }

    public function edit(Forum $forum)
    {
        return Inertia::render('Forum/Edit', [
            'forum' => new ForumResource($forum),
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
