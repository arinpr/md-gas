<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BasePrice;

class BasePriceSeeder extends Seeder
{
    public function run(): void
    {
        BasePrice::insert([
            [
                'service' => 'Boiler Installation',
                'price' => 1200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service' => 'Boiler Repair',
                'price' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service' => 'Annual Servicing',
                'price' => 90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service' => 'New Quote',
                'price' => 90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
