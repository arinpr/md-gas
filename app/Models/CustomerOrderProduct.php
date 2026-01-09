<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerOrderProduct extends Model
{
    protected $fillable = [
        'booking_id',
        'boiler_id',
        'brand',
        'model',
        'kw',
        'warranty_years',
        'amount',
        'includes',
        'images',
        'meta',
    ];

    protected $casts = [
        'includes' => 'array',
        'images' => 'array',
        'meta' => 'array',
        'kw' => 'integer',
        'warranty_years' => 'integer',
        'amount' => 'integer',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function addOns()
    {
        return $this->hasMany(CustomerOrderProductAddOn::class, 'customer_order_product_id');
    }
}
