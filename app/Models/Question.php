<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = [
        'type',
        'frontend_key',
        'question',
        'field_type',
        'options',
        'is_required',
        'sort_order',
        'price_adjustment',
    ];

    protected $casts = [
        'options' => 'array',
        'is_required' => 'boolean',
        'price_adjustment' => 'decimal:2',
    ];
}
