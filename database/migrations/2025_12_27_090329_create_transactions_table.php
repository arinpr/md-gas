<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();

            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            // Payment gateway
            $table->string('provider', 30)->default('stripe'); // stripe, razorpay, etc.

            // Stripe identifiers
            $table->string('provider_payment_intent_id')->nullable()->index();
            $table->string('provider_checkout_session_id')->nullable()->index();
            $table->string('provider_charge_id')->nullable()->index();
            $table->string('provider_refund_id')->nullable()->index();

            // Money
            $table->decimal('amount', 10, 2)->default(0);
            $table->string('currency', 10)->default('GBP');

            // Transaction intent type
            $table->enum('kind', ['payment', 'refund'])->default('payment')->index();

            // Transaction status
            $table->enum('status', [
                'initiated',     // created in your system
                'requires_action',
                'processing',
                'succeeded',
                'failed',
                'cancelled',
                'refunded',
            ])->default('initiated')->index();

            // Webhook / raw payloads for audit + debugging
            $table->json('provider_payload')->nullable();

            // Idempotency (avoid duplicates in retries)
            $table->string('idempotency_key')->nullable()->unique();

            $table->string('failure_reason')->nullable();
            $table->timestamp('succeeded_at')->nullable();

            $table->timestamps();

            // Useful composite indexes
            $table->index(['booking_id', 'status'], 'idx_tx_booking_status');
            $table->index(['provider', 'status'], 'idx_tx_provider_status');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
