<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuizAttemptRequest extends FormRequest
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
            'quiz_id' => 'required|exists:quizzes,id',
            'answer' => 'required|array',
            'answer.*.question_id' => 'required|exists:questions,id',
            'answer.*.value' => 'required',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'quiz_id.required' => 'Quiz is required',
            'answer.required' => 'Answer is required',
            'answer.*.question_id.required' => 'Question is required',
            'answer.*.value.required' => 'Value is required',
        ];
    }
}
