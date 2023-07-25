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
        $name = $this->faker->randomElement(['Ips', 'Mipa', 'Ips Terpadu', 'Bahasa', 'Agama', 'Olahraga']);
        $slug = Str::slug($name);

        return [
            'name' => $name,
            'slug' => $slug,
        ];
    }
}
