<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreThreadRequest;
use App\Http\Requests\UpdateThreadRequest;
use App\Http\Resources\ThreadResource;
use App\Models\Thread;
use Inertia\Inertia;

class ThreadController extends Controller
{
    public function show(Thread $thread)
    {
        return Inertia::render('Thread/Show', [
            'thread' => new ThreadResource($thread->load(['user.media', 'posts.user.media'])),
        ]);
    }

    public function store(StoreThreadRequest $request)
    {
        $thread = Thread::create($request->validated());

        return to_route('forums.show', $thread->forum->id)
            ->with(['status' => 'Success', 'message' => 'Thread created!']);
    }

    public function update(UpdateThreadRequest $request, Thread $thread)
    {
        $thread->update($request->validated());

        return to_route('forums.show', $thread->forum->id)
            ->with(['status' => 'Success', 'message' => 'Thread updated!']);
    }

    public function destroy(Thread $thread)
    {
        $thread->delete();

        return to_route('forums.show', $thread->forum)
            ->with(['status' => 'Success', 'message' => 'Thread deleted!']);
    }
}
