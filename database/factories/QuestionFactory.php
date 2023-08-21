<?php

namespace Database\Factories;

use App\Models\Quiz;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $options = [
            ['key' => 'A', 'value' => fake()->sentence()],
            ['key' => 'B', 'value' => fake()->sentence()],
            ['key' => 'C', 'value' => fake()->sentence()],
            ['key' => 'D', 'value' => fake()->sentence()],
            ['key' => 'E', 'value' => fake()->sentence()],
        ];

        return [
            'quiz_id' => Quiz::factory(),
            'question' => $this->faker->realText(100),
            'options' => $options,
            'correct_answer' => fake()->randomElement(['A', 'B', 'C', 'D', 'E']),
            'score' => fake()->numberBetween(1, 25),
        ];
    }
}
