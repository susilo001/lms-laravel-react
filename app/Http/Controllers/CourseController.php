<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;
use App\Models\Category;
use App\Models\Course;
use Illuminate\Http\Request;
use Inertia\Inertia;

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
            'courses' => $courses,
        ]);
    }

    public function show(Course $course)
    {
        return Inertia::render('Course/Show', [
            'course' => $course->load(['modules', 'assignments', 'quizzes', 'category', 'user', 'media']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Course/Create', [
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Course/Edit', [
            'course' => $course->load(['modules', 'assignments', 'quizzes']),
            'categories' => Category::all(['id', 'name']),
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
