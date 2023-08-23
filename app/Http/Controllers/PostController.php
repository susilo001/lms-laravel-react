<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use App\Models\Post;

class PostController extends Controller
{
    public function store(StorePostRequest $request)
    {
        $post = Post::create($request->validated());

        return to_route('threads.show', $post->thread->id)->with(['status' => 'Success', 'message' => 'Post created!']);
    }

    public function update(UpdatePostRequest $request, Post $post)
    {
        $post->update($request->validated());

        return to_route('threads.show', $post->thread->id)->with(['status' => 'Success', 'message' => 'Post updated!']);
    }

    public function destroy(Post $post)
    {
        $post->delete();

        return to_route('threads.show', $post->thread->id)->with(['status' => 'Success', 'message' => 'Post deleted!']);
    }
}
