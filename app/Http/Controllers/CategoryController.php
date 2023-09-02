<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::orderBy('created_at', 'desc')->paginate(8);

        return inertia('Category/Index', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function create()
    {
        return inertia('Category/Create');
    }

    public function edit(Category $category)
    {
        return inertia('Category/Edit', [
            'category' => new CategoryResource($category),
        ]);
    }

    public function show(Category $category)
    {
        return inertia('Category/Show', [
            'category' => new CategoryResource($category),
        ]);
    }

    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());

        return to_route('categories.index')->with([
            'message' => 'Category created successfully',
            'status' => 'Success',
        ]);
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

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
