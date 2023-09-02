<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Resources\CourseCollection;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Http\Resources\CategoryResource;
use App\Http\Resources\CourseResource;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user && $user->hasRole('teacher')) {
            $courses = Course::with(['user.media', 'category', 'modules', 'media'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(6);
        } else {
            $courses = Course::with(['user.media', 'category', 'modules', 'media'])
                ->orderBy('created_at', 'desc')
                ->paginate(6);
        }

        return Inertia::render('Course/Index', [
            'courses' => new CourseCollection($courses),
        ]);
    }

    public function show(Course $course)
    {
        $data = $course->load(['modules', 'assignments', 'quizzes', 'category', 'user', 'media', 'forum.threads.user', 'forum.threads.posts.user']);

        return Inertia::render('Course/Show', [
            'course' => new CourseResource($data),
        ]);
    }

    public function create()
    {
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Course/Create', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function edit(Course $course)
    {
        $categories = Category::all(['id', 'name']);

        return Inertia::render('Course/Edit', [
            'course' => new CourseResource($course->load(['modules', 'assignments', 'quizzes'])),
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function store(StoreCourseRequest $request)
    {
        $course = Course::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'user_id' => $request->user()->id,
        ]);

        if ($request->hasFile('image')) {
            $course->addMediaFromRequest('image')->toMediaCollection('images');
        }

        return redirect()->route('courses.index')->with([
            'message' => 'Course created successfully',
            'status' => 'Success',
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        if ($request->hasFile('image')) {
            $mediaId = $course->getFirstMedia('images')->id;
            $course->deleteMedia($mediaId);
            $course->addMediaFromRequest('image')->toMediaCollection('images');
        }

        $course->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category_id' => $request->category_id,
        ]);

        return redirect()->route('courses.index')->with([
            'message' => 'Course updated successfully',
            'status' => 'Success',
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')->with([
            'message' => 'Course deleted successfully',
            'status' => 'Success',
        ]);
    }
}
