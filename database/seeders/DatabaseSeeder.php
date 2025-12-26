<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Database\Seeders\BasePriceSeeder; // ✅ THIS WAS MISSING

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        $this->call([
            SingleUserSeeder::class,
            BasePriceSeeder::class,
        ]);
    }
}
