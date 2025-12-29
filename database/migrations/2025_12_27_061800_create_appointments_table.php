<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')
                ->constrained('customers')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->enum('type', [
                'boiler_repair',
                'boiler_service',
                'new_boiler_quote',
                'power_flush',
            ])->index();

            $table->dateTime('starts_at')->index();

            // Daily rules rely on this
            $table->date('appointment_date')->index();

            $table->enum('status', ['pending', 'confirmed', 'cancelled', 'completed'])
                ->default('confirmed')
                ->index();

            $table->timestamps();

            // ✅ Prevent duplicate start times on the SAME day
            $table->unique(['appointment_date', 'starts_at'], 'uniq_appointment_day_start');

            // ✅ Fast lookups for customer history / daily schedules
            $table->index(['customer_id', 'appointment_date'], 'idx_customer_day');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
