<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseResource extends JsonResource
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
            'title' => $this->title,
            'slug' => $this->slug,
            'description' => $this->description,
            'image' => $this->getFirstMedia('images')->getFullUrl(),
            'user' => new UserResource($this->whenLoaded('user')),
            'category' => new CategoryResource($this->whenLoaded('category')),
            'modules' => ModuleResource::collection($this->whenLoaded('modules')),
            'assignments' => AssignmentResource::collection($this->whenLoaded('assignments')),
            'quizzes' => QuizResource::collection($this->whenLoaded('quizzes')),
            'enrollments' => EnrollmentResource::collection($this->whenLoaded('enrollments')),
            'forum' => new ForumResource($this->whenLoaded('forum')),
            'grades' => GradeResource::collection($this->whenLoaded('grades')),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
