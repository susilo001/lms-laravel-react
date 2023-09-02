<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'avatar' => $this->getFirstMedia('avatar')->getFullUrl(),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'roles' => $this->whenLoaded('roles'),
            'courses' => CourseResource::collection($this->whenLoaded('courses')),
            'enrollments' => EnrollmentResource::collection($this->whenLoaded('enrollments')),
            'grades' => GradeResource::collection($this->whenLoaded('grades')),
            'submissions' => $this->whenLoaded('submissions'),
            'quiz_attempts' => $this->whenLoaded('attempts'),
        ];
    }
}
