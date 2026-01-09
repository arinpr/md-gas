<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_order_products', function (Blueprint $table) {
            $table->id();

            // Link to booking
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();

            // Product snapshot (query-friendly)
            $table->string('boiler_id', 100)->index();     // e.g. ideal_atlantic_24
            $table->string('brand', 100)->nullable()->index();
            $table->string('model', 150)->nullable()->index();
            $table->unsignedSmallInteger('kw')->nullable()->index();
            $table->unsignedSmallInteger('warranty_years')->nullable();

            // Money (store in minor units OR major units — pick one convention)
            // If your "amount" is GBP and includes decimals, use decimal(10,2).
            // If amount is integer already, keep integer.
            $table->unsignedInteger('amount'); // e.g. 3509

            // Easy payload storage
            $table->json('includes')->nullable();
            $table->json('images')->nullable();

            // Optional: store full snapshot too (future-proof)
            $table->json('meta')->nullable();

            $table->timestamps();

            // Ensure a booking doesn't accidentally get the same boiler twice
            $table->unique(['booking_id', 'boiler_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_order_products');
    }
};
