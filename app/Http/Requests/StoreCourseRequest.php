<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreCourseRequest extends FormRequest
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
            'title' => 'required',
            'slug' => 'required|unique:courses,slug',
            'description' => 'required',
            'category_id' => 'required',
            'image' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
        ];
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'title.required' => 'The title field is required.',
            'slug.required' => 'The slug field is required.',
            'description.required' => 'The description field is required.',
            'category_id.required' => 'The category field is required.',
            'image.image' => 'The image must be an image.',
            'image.mimes' => 'The image must be a file of type: jpg, png, jpeg.',
            'image.max' => 'The image may not be greater than 2048 kilobytes.',
        ];
    }
}
