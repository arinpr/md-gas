<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    protected $fillable = [
        'full_name',
        'phone',
        'email',
        'postcode',
        'address_line1',
        'address_line2',
        'city',
        'county',
        'country',
        'address_full',
    ];

    public function appointments()
    {
        return $this->hasMany(Appointment::class);
    }

    // public function bookings()
    // {
    //     return $this->hasMany(App\Models\Booking::class);
    // }
}
