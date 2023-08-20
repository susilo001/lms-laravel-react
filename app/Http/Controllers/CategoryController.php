<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{

    public function index()
    {
        $categories = Category::orderBy('created_at', 'desc')->paginate(8);

        return inertia('Category/Index', [
            'categories' => $categories
        ]);
    }

    public function create()
    {
        return inertia('Category/Create');
    }

    public function edit(Category $category)
    {
        return inertia('Category/Edit', [
            'category' => $category
        ]);
    }

    public function show(Category $category)
    {
        return inertia('Category/Show', [
            'category' => $category
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:categories,slug'
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => $request->slug
        ]);

        return to_route('categories.index')->with([
            'message' => 'Category created successfully',
            'status' => 'Success',
        ]);
    }

    public function update(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required',
            'slug' => 'required|unique:categories,slug'
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => $request->slug
        ]);

        return to_route('categories.index')->with([
            'message' => 'Category updated successfully',
            'status' => 'Success',
        ]);
    }

    public function destroy(Category $category)
    {
        $category->delete();

        return to_route('categories.index')->with([
            'message' => 'Category deleted successfully',
            'status' => 'Success',
        ]);
    }
}
