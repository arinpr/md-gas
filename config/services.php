<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Third Party Services
    |--------------------------------------------------------------------------
    |
    | This file is for storing the credentials for third party services such
    | as Mailgun, Postmark, AWS and more. This file provides the de facto
    | location for this type of information, allowing packages to have
    | a conventional file to locate the various service credentials.
    |
    */

    'postmark' => [
        'key' => env('POSTMARK_API_KEY'),
    ],

    'resend' => [
        'key' => env('RESEND_API_KEY'),
    ],

    'ses' => [
        'key' => env('AWS_ACCESS_KEY_ID'),
        'secret' => env('AWS_SECRET_ACCESS_KEY'),
        'region' => env('AWS_DEFAULT_REGION', 'us-east-1'),
    ],

    'slack' => [
        'notifications' => [
            'bot_user_oauth_token' => env('SLACK_BOT_USER_OAUTH_TOKEN'),
            'channel' => env('SLACK_BOT_USER_DEFAULT_CHANNEL'),
        ],
    ],
    'forms' => [
        [
            'key' => 'boiler_repair',
            'value' => 'Boiler Repair',
        ],
        [
            'key' => 'boiler_service',
            'value' => 'Boiler Service',
        ],
        [
            'key' => 'new_boiler_quote',
            'value' => 'New Boiler Quote',
        ],
        [
            'key' => 'power_flush',
            'value' => 'Power Flush',
        ]
    ],

    'currency' => [
        'code'   => env('PAYMENT_CURRENCY', 'GBP'),
        'symbol' => env('PAYMENT_CURRENCY_SYMBOL', '£'),
    ],
    'stripe' => [
        'secret' => env('STRIPE_SECRET','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'),
        'api'   => 'pk_test_51SiexA9FMtDui4Wvp6m5YMxU9kysY6fFlOALbAFYIr1TQUUMesY5wLLx0erHqEdfuDyMTXfUAaacUxub2z6quHCi00FMVxoBK1'
    ]


];
