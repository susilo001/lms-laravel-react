<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Grade>
 */
class GradeFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'course_id' => Course::factory(),
            'gradeable_id' => function (array $attributes) {
                $type = $attributes['gradable_type'];
                return $type::factory()->create()->id;
            },
            'gradeable_type' => $this->faker->randomElement(['App\Models\Quiz', 'App\Models\Assignment']),
            'score' => $this->faker->numberBetween(0, 100),
        ];
    }
}
