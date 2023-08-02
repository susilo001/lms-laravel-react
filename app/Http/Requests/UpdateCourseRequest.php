<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateCourseRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'string|required',
            'slug' => 'string|required|unique:courses,slug',
            'description' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'title.required' => 'Title is required',
            'title.string' => 'Title must be a string',
            'slug.string' => 'Slug must be a string',
            'slug.unique' => 'Slug must be unique',
            'slug.required' => 'Slug is required',
            'description.string' => 'Description must be a string',
            'description.required' => 'Description is required',
            'category_id.required' => 'Category is required',
            'image.image' => 'Image must be an image',
            'image.mimes' => 'Image must be a jpg, png, or jpeg',
            'image.max' => 'Image must be less than 2MB',
        ];
    }
}
