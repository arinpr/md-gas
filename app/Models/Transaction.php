<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    protected $fillable = [
        'booking_id',
        'provider',
        'provider_payment_intent_id',
        'provider_checkout_session_id',
        'provider_charge_id',
        'provider_refund_id',
        'amount',
        'currency',
        'kind',
        'status',
        'provider_payload',
        'idempotency_key',
        'failure_reason',
        'succeeded_at',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'provider_payload' => 'array',
        'succeeded_at' => 'datetime',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
