<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('customer_order_product_add_ons', function (Blueprint $table) {
            $table->id();

            // Link to booking (primary fetch path)
            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete();

            // Link to the booked product (boiler row)
            $table->foreignId('customer_order_product_id')
                ->constrained('customer_order_products')
                ->cascadeOnDelete();

            // Add-on identity
            $table->string('key', 80)->index();      // e.g. smart_stat, convert_to_combi
            $table->string('label', 180);            // e.g. Smart thermostat upgrade

            // Commercials
            $table->unsignedSmallInteger('qty')->default(1);
            $table->unsignedInteger('unit_price')->default(0);
            $table->unsignedInteger('total')->default(0);

            // Optional: store derived context (flueType etc.)
            $table->json('derived')->nullable();

            $table->timestamps();

            // Avoid duplicates for same booking+product+addon key
            $table->unique(['booking_id', 'customer_order_product_id', 'key'], 'booking_product_addon_unique');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customer_order_product_add_ons');
    }
};
