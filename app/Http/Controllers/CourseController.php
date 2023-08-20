<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCourseRequest;
use App\Http\Requests\UpdateCourseRequest;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();

        if ($user && $user->hasRole('teacher')) {
            $courses = Course::with(['user', 'category', 'modules'])
                ->where('user_id', $user->id)
                ->orderBy('created_at', 'desc')
                ->paginate(8);
        } else {
            $courses = Course::with(['user', 'category', 'modules'])
                ->orderBy('created_at', 'desc')
                ->paginate(8);
        }

        return Inertia::render('Course/Index', [
            'courses' => $courses
        ]);
    }

    public function store(StoreCourseRequest $request)
    {
        $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('images/courses', 'public');
        }

        Course::create([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'image' => $image,
            'user_id' => auth()->user()->id,
        ]);

        return redirect()->route('course.index')->with([
            'message' => 'Course created successfully',
            'status' => 'Success',
        ]);
    }

    public function create()
    {
        return Inertia::render('Course/Create', [
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function show(Course $course)
    {
        return Inertia::render('Course/Show', [
            'course' => $course->load(['modules', 'assignments', 'quizzes', 'category', 'user']),
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Course/Edit', [
            'course' => $course->load(['modules', 'assignments', 'quizzes']),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $request->validated();

        if ($request->hasFile('image')) {
            $image = $request->file('image')->store('images/courses', 'public');
        }

        $course->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'image' => $image,
        ]);

        return to_route('course.index')->with([
            'message' => 'Course updated successfully',
            'status' => 'Success',
        ]);
    }

    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('course.index')->with([
            'message' => 'Course deleted successfully',
            'status' => 'Success',
        ]);
    }
}
