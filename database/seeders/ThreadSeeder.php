<?php

namespace Database\Seeders;

use App\Models\Forum;
use App\Models\Thread;
use Illuminate\Database\Seeder;

class ThreadSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $forums = Forum::all();

        foreach ($forums as $forum) {
            Thread::factory()->count(3)->create([
                'forum_id' => $forum->id,
            ]);
        }
    }
}
