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
                'service' => 'Boiler Repair',
                'service_key' => 'boiler_repair',
                'price' => 1200,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service' => 'Boiler Service',
                'service_key' => 'boiler_service',
                'price' => 150,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service' => 'New Boiler Quote',
                'service_key' => 'new_boiler_quote',
                'price' => 90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'service' => 'Power Flush',
                'service_key' => 'power_flush',
                'price' => 90,
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
