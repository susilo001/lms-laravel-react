<?php

namespace Database\Factories;

use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->unique()->randomElement([
            'Web Development',
            'Mobile Development',
            'Game Development',
            'Data Science',
            'Machine Learning',
            'Artificial Intelligence',
            'Business',
            'Finance & Accounting',
            'Marketing',
            'Personal Development',
            'Health & Fitness',
            'Music',
            'Teaching & Academics',
        ]);

        $slug = Str::slug($name);

        return [
            'name' => $name,
            'slug' => $slug,
        ];
    }
}
