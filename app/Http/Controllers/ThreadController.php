<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ThreadController extends Controller
{
    public function show(Thread $thread)
    {
        return Inertia::render('Thread/Show', [
            'thread' => $thread,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
            'forum_id' => 'required|exists:forums,id',
        ]);

        $thread = Thread::create([
            'title' => $request->title,
            'content' => $request->content,
            'user_id' => $request->user_id,
            'forum_id' => $request->forum_id,
        ]);

        return to_route('forums.show', $thread->forum->id)->with(['status' => 'Success', 'message' => 'Thread created!']);
    }

    public function update(Request $request, Thread $thread)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        $thread->update([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return to_route('forums.show', $thread->forum->id)->with(['status' => 'Success', 'message' => 'Thread updated!']);
    }

    public function destroy(Thread $thread)
    {
        $thread->delete();

        return to_route('forums.show', $thread->forum)->with(['status' => 'Success', 'message' => 'Thread deleted!']);
    }
}
