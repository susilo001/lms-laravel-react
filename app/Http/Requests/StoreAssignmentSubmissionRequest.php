<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAssignmentSubmissionRequest extends FormRequest
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
            'student_id' => 'required|exists:users,id',
            'submission_file' => 'required|file|mimes:pdf,doc,docx,zip,rar|max:10000',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'student_id.required' => 'Student is required',
            'submission_file.required' => 'Submission file is required',
            'submission_file.file' => 'Submission file must be a file',
            'submission_file.mimes' => 'Submission file must be a pdf, doc, docx, zip or rar',
            'submission_file.max' => 'Submission file must be less than 10MB',
        ];
    }
}
