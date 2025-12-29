<?php

return [
    'start_hour' => 8,
    'end_hour'   => 18,

    'slot_minutes' => 60,

    'rules' => [
        'boiler_repair' => [
            'max_per_day' => 5,
            'gap_minutes' => 240, // 4 hours
        ],
        'boiler_service' => [
            'max_per_day' => 5,
            'gap_minutes' => 240,
        ],
        'power_flush' => [
            'max_per_day' => 5,
            'gap_minutes' => 240,
        ],
        'new_boiler_quote' => [
            'max_per_day' => 1,
            'gap_minutes' => 0,
        ],
    ],
];
