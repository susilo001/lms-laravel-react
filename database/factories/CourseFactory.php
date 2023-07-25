<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Category;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Course>
 */
class CourseFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $title = $this->faker->realText(10);
        $slug = Str::slug($title);

        return [
            'title' => $title,
            'slug' => $slug,
            'description' => $this->faker->realText(100),
            'user_id' => User::factory(),
            'category_id' => Category::factory(),
            'image' => 'https://source.unsplash.com/random/800x600',
        ];
    }
}
