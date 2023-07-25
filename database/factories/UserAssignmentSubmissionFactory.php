<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\UserAssignmentSubmission>
 */
class UserAssignmentSubmissionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'assignment_id' => \App\Models\Assignment::factory(),
            'user_id' => \App\Models\User::factory(),
            'submission_date' => $this->faker->date(),
            'submission_file' => $this->faker->text,
            'submission_text' => $this->faker->text,
        ];
    }
}
