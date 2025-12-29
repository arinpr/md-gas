<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Appointment extends Model
{
    protected $fillable = [
        'type',
        'starts_at',
        'appointment_date',
        'status',
        'customer_id'
    ];

    protected $casts = [
        'starts_at' => 'datetime',
        'appointment_date' => 'date',
    ];

    protected $appends = ['service'];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }
    public function booking() {
        return $this->hasOne(Booking::class);
    }

    public function basePrice()
    {
        // appointments.service_key -> base_prices.service_key
        return $this->belongsTo(BasePrice::class, 'service_key', 'service_key');
    }

    /**
     * Service relationship (BasePrice is acting as Service master)
     */
    public function serviceRelation()
    {
        return $this->belongsTo(
            BasePrice::class,
            'type',   // appointments.service_key
            'service_key'    // base_prices.service_key
        );
    }

    /**
     * Appended attribute exposed to frontend
     */
    public function getServiceAttribute()
    {
        return $this->relationLoaded('serviceRelation')
            ? $this->serviceRelation
            : $this->serviceRelation()->first();
    }
}
