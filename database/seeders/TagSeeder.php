<?php

namespace Database\Seeders;

use App\Models\Tag;
use Illuminate\Database\Seeder;

class TagSeeder extends Seeder
{
    private $post = ['Electronics', 'Vehicles', 'Home & Garden', 'Fashion & Accessories', 'Collectibles', 'Health & Fitness', 'Toys & Games', 'Miscellaneous'];

    public function run(): void
    {
        foreach ($this->post as $tag) {
            Tag::createOrFirst([
                'type' => 'post',
                'name' => $tag,
            ]);
        }
    }
}
