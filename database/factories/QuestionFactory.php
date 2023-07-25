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
            'option1' => $this->faker->text,
            'option2' => $this->faker->text,
            'option3' => $this->faker->text,
            'option4' => $this->faker->text,
        ];

        return [
            'quiz_id' => Quiz::factory(),
            'question' => $this->faker->text,
            'options' =>  $options,
            'correct_answer' => $this->faker->numberBetween(1, 4),
        ];
    }
}
