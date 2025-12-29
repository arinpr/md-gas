<?php

namespace Database\Seeders;

use App\Models\Question;
use Illuminate\Database\Seeder;

class QuestionsSeeder extends Seeder
{
    public function run(): void
    {
        $rows = [];

        // ---------------------------
        // Boiler Repair
        // ---------------------------
        $rows = array_merge($rows, $this->set('boiler_repair', [
            ['fixed_price', 'Typical Fixed Part Prices?', 'select', false, 10, null], // keep options empty for now
            ['boiler_type', 'What type of boiler do you have?', 'select', true, 20, null],
            ['boiler_model', 'What is the boiler brand & model?', 'short_text', true, 30, null],
            ['boiler_age', 'How old is your boiler?', 'short_text', false, 40, null],
            ['fault_type', 'What issue are you experiencing?', 'select', true, 50, null],
            ['issue_start', 'When did the issue start?', 'select', false, 60, null],
            ['previous_work', 'Has anyone worked on it recently?', 'yes_no', false, 70, null],
            ['previous_work_extraText', 'Please provide details', 'long_text', false, 80, null],
            ['media', 'Photos', 'file', false, 90, null],
            ['access', 'Where is your boiler located?', 'select', true, 100, null],
            ['access_extraText', 'Please provide details (Other)', 'long_text', false, 110, null],
        ]));

        // ---------------------------
        // Boiler Service
        // ---------------------------
        $rows = array_merge($rows, $this->set('boiler_service', [
            ['boiler_type', 'What type of boiler do you have?', 'select', true, 10, null],
            ['boiler_model', 'What is the boiler brand & model?', 'short_text', true, 20, null],
            ['boiler_age', 'How old is your boiler?', 'short_text', false, 30, null],
            ['access', 'Where is your boiler located?', 'select', true, 40, null],
            ['access_extraText', 'Please provide details (Other)', 'long_text', false, 50, null],
            ['any_issue', 'Any known issues?', 'yes_no', false, 60, null],
            ['any_issue_extraText', 'Any known issues (details)', 'long_text', false, 70, null],
        ]));

        // ---------------------------
        // Power Flush
        // ---------------------------
        $rows = array_merge($rows, $this->set('power_flush', [
            ['radiators', 'How many radiators are in your property?', 'number', true, 10, null],
            ['boiler_flush_type', 'What type of boiler system do you have?', 'select', true, 20, null],
            ['any_cold_spots', 'Any cold spots?', 'yes_no', false, 30, null],
            ['any_sludge', 'Any sludge/dirty water?', 'yes_no', false, 40, null],
            ['flush_before', 'Has system ever been flushed before?', 'yes_no', false, 50, null],
            ['leaking_radiators', 'Any leaking radiators or valves?', 'yes_no', false, 60, null],
            ['access_flush', 'Access type', 'select', false, 70, null],
        ]));

        // Upsert by unique key (type + frontend_key)
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
                'type' => $type,
                'frontend_key' => $key,
                'question' => $q,
                'field_type' => $fieldType,
                'options' => null, // fill later per key if you want
                'is_required' => $required,
                'sort_order' => $order,
                'price_adjustment' => $priceAdj,
            ];
        }
        return $out;
    }
}
