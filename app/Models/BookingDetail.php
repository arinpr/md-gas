<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BookingDetail extends Model
{
    protected $fillable = [
        'booking_id',
        'question_id',
        'frontend_key',
        'question_snapshot',
        'answer_text',
        'answer_json',
        'media',
        'amount',
    ];

    protected $casts = [
        'answer_json' => 'array',
        'media' => 'array',
        'amount' => 'decimal:2',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
