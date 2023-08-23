<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\Thread;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
            'user_id' => 'required|exists:users,id',
            'thread_id' => 'required|exists:threads,id',
        ]);

        $post = Post::create([
            'content' => $request->content,
            'user_id' => $request->user_id,
            'thread_id' => $request->thread_id,
        ]);

        return to_route('threads.show', $post->thread->id)->with(['status' => 'Success', 'message' => 'Post created!']);
    }

    public function update(Request $request, Post $post)
    {
        $request->validate([
            'content' => 'required',
        ]);

        $post->update([
            'content' => $request->content,
        ]);

        return to_route('threads.show', $post->thread->id)->with(['status' => 'Success', 'message' => 'Post updated!']);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return to_route('threads.show', $post->thread->id)->with(['status' => 'Success', 'message' => 'Post deleted!']);
    }
}
