<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'user_id',
        'frontend_key',
        'question',
        'answer',
        'base_amount',
        'pricing',
    ];

    public function details()
    {
        return $this->hasMany(BookingDetail::class);
    }
}

