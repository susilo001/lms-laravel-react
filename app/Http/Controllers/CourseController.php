<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Course;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateCourseRequest;

class CourseController extends Controller
{
    public function index()
    {
        $courses = Course::with(['user', 'category', 'modules'])
            ->orderBy('created_at', 'desc')
            ->paginate(8);

        return Inertia::render('Course/Index', [
            'courses' => $courses
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'slug' => 'required|unique:courses,slug',
            'description' => 'required',
            'category_id' => 'required',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ]);

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

    public function show(Course $course)
    {
        return Inertia::render('Course/Show', [
            'course' => $course->with(['modules', 'assignments', 'quizzes', 'category', 'user'])->first(),
        ]);
    }

    public function edit(Course $course)
    {
        return Inertia::render('Teacher/Course/Edit', [
            'course' => $course->with(['modules', 'assignments', 'quizzes'])->first(),
            'categories' => Category::all(['id', 'name']),
        ]);
    }

    public function update(UpdateCourseRequest $request, Course $course)
    {
        $request->validated();

        if ($request->file('image')) {
            $image = $request->file('image');
            $imageName = time() . '.' . $image->extension();
            $image->move(public_path('images/courses'), $imageName);
            $course->image = $imageName;
        }

        $course->update([
            'title' => $request->title,
            'slug' => $request->slug,
            'description' => $request->description,
            'category_id' => $request->category_id,
            'image' => $imageName,
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully'
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
