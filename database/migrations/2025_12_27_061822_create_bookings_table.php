<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            $table->foreignId('customer_id')
                ->constrained('customers')
                ->restrictOnDelete()
                ->cascadeOnUpdate();

            $table->foreignId('appointment_id')
                ->constrained('appointments')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            // Booking type is derived from appointment.type (single source of truth)
            // If you want snapshot, add enum here — but I recommend NOT storing it.

            // Pricing (keep even if you compute later)
            $table->decimal('subtotal', 10, 2)->default(0);
            $table->decimal('discount', 10, 2)->default(0);
            $table->decimal('tax', 10, 2)->default(0);
            $table->decimal('total', 10, 2)->default(0);

            $table->string('currency', 10)->default('GBP');

            // Commercial status (non-payment operational)
            $table->enum('status', [
                'draft',         // answers saved, not yet submitted
                'submitted',     // ready for payment/processing
                'confirmed',     // business-confirmed (optional)
                'cancelled',
            ])->default('draft')->index();

            // Payment status (this is the one you asked for)
            $table->enum('payment_status', [
                'unpaid',
                'pending',
                'paid',
                'failed',
                'refunded',
                'partial_refund',
            ])->default('unpaid')->index();

            $table->timestamp('paid_at')->nullable();

            $table->timestamps();

            // Ensure one booking per appointment
            $table->unique(['appointment_id'], 'uniq_booking_appointment');

            $table->index(['customer_id', 'created_at'], 'idx_booking_customer_created');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
