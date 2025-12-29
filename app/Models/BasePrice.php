<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;


class BasePrice extends Model
{
    protected $fillable = ['service','service_key', 'price'];


    public function scopeBoilerRepair(Builder $query): Builder
    {
        return $query->where('service_key', 'boiler_repair');
    }

    public function scopeBoilerService(Builder $query): Builder
    {
        return $query->where('service_key', 'boiler_service');
    }

    public function scopePowerFlush(Builder $query): Builder
    {
        return $query->where('service_key', 'power_flush');
    }

    /*
    |--------------------------------------------------------------------------
    | Generic scope (recommended for future growth)
    |--------------------------------------------------------------------------
    */

    public function scopeForService(Builder $query, string $serviceKey): Builder
    {
        return $query->where('service_key', $serviceKey);
    }


}
