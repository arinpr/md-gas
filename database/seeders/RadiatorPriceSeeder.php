<?php

namespace Database\Seeders;

use App\Models\RadiatorPrice;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RadiatorPriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
   public function run(): void
    {
        RadiatorPrice::insert([
            ['label' => 'Up to 5 radiators', 'price' => 75],
            ['label' => '6-8 radiators', 'price' => 125],
            ['label' => '9-12 radiators', 'price' => 75],
            ['label' => '13-15 radiators',  'price' => 100],
            ['label' => '16-20 radiators', 'price' => 75],
            ['label' => '21+ radiators', 'price' => 125],
        ]);
    }
}
