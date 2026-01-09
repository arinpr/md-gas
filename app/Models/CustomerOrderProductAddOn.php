<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerOrderProductAddOn extends Model
{
    protected $fillable = [
        'booking_id',
        'customer_order_product_id',
        'key',
        'label',
        'qty',
        'unit_price',
        'total',
        'derived',
    ];

    protected $casts = [
        'qty' => 'integer',
        'unit_price' => 'integer',
        'total' => 'integer',
        'derived' => 'array',
    ];

    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    public function product()
    {
        return $this->belongsTo(CustomerOrderProduct::class, 'customer_order_product_id');
    }
}
