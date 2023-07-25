<?php

namespace Database\Factories;

use App\Models\Course;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Module>
 */
class ModuleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'course_id' => Course::factory(),
            'name' => $this->faker->name,
            'description' => $this->faker->text,
            'content' => $this->faker->text,
            'order_number' => $this->faker->numberBetween(1, 10),
        ];
    }
}
