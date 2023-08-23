<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssignmentRequest extends FormRequest
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
            'course_id' => 'required',
            'name' => 'required',
            'description' => 'required',
            'due_date' => 'required',
            'total_marks' => 'required',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'course_id.required' => 'Course is required',
            'name.required' => 'Name is required',
            'description.required' => 'Description is required',
            'due_date.required' => 'Due date is required',
            'total_marks.required' => 'Total marks is required',
        ];
    }
}
