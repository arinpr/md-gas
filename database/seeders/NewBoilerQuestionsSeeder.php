<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class NewBoilerQuestionsSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [];
        $type = 'new_boiler_quote';

        $rows = array_merge($rows, $this->set($type, [
            ['mains_gas', 'Does your boiler run on mains gas?', 'yes_no', true, 10, null],
            ['boiler_fuel', 'What fuel does your boiler run on?', 'yes_no', true, 20, null],
            // ['fuel_help', 'Thanks — this setup needs a specialist review. One of our experts will help you.', 'info', false, 30, null],
            ['boiler_type_known', 'Do you know the type of boiler currently installed?', 'yes_no', true, 40, null],
            ['current_boiler_type', 'What kind of boiler do you have right now?', 'yes_no', true, 50, null],
            ['has_water_tank', 'Does your home have a water tank or hot water cylinder?', 'yes_no', true, 60, null],
            ['pressure_gauge', 'Can you see a pressure gauge on your boiler?', 'yes_no', true, 70, null],
            ['move_to_combi', 'Are you thinking about moving to a combi boiler?', 'yes_no', true, 80, null],
            ['boiler_move_location', 'Are you planning to move the boiler to a different location?', 'yes_no', true, 90, null],
            ['preferred_location', 'What is the preferred location for the boiler?', 'yes_no', true, 100, null],
            ['property_type', 'What type of property do you live in?', 'yes_no', true, 110, null],
            ['flat_upper_floor', 'Is the property on the second floor or higher?', 'yes_no', true, 120, null],
            ['flue_reachable', 'Can the flue be reached from outside?', 'yes_no', true, 130, null],
            // ['flue_help', 'Thanks — this setup requires a specialist assessment. Our team will help you.', 'info', false, 140, null],
            ['bathrooms', 'How many bathrooms are in your property?', 'select', true, 150, null],
            ['bedrooms', 'How many bedrooms are in your property?', 'select', true, 160, null],
            ['radiators', 'How many radiators are in your home?', 'select', true, 170, null],
            ['flue_wall', 'Does the flue come out the wall?', 'yes_no', true, 180, null],
            ['thermostat_type', 'Thermostat choice', 'select', true, 190, null],
            ['trv_required', 'Do you require new/additional TRVs?', 'select', true, 200, null],
            ['trv_qty', 'How many TRVs?', 'select', true, 210, null],
            ['water_meter', 'Is your property fitted with a water meter?', 'yes_no', true, 220, null],
        ]));

        foreach ($rows as $r) {
            Question::updateOrCreate(
                ['type' => $r['type'], 'frontend_key' => $r['frontend_key']],
                $r
            );
        }
    }

    private function set(string $type, array $items): array
    {
        $out = [];

        foreach ($items as $i) {
            [$key, $q, $fieldType, $required, $order, $priceAdj] = $i;

            $out[] = [
                'type'             => $type,
                'frontend_key'     => $key,
                'question'         => $q,
                'field_type'       => $fieldType,
                'options'          => null, // ✅ always null
                'is_required'      => (bool) $required,
                'sort_order'       => (int) $order,
                'price_adjustment' => $priceAdj,
            ];
        }

        return $out;
    }
}
