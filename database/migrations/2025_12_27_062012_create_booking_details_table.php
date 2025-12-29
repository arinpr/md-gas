<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('booking_details', function (Blueprint $table) {
            $table->id();

            $table->foreignId('booking_id')
                ->constrained('bookings')
                ->cascadeOnDelete()
                ->cascadeOnUpdate();

            // Link to master question (nullable to keep history if question gets removed later)
            $table->foreignId('question_id')
                ->nullable()
                ->constrained('questions')
                ->nullOnDelete()
                ->cascadeOnUpdate();

            // Snapshot fields (admin panel never breaks even if questions change)
            $table->string('frontend_key', 100)->index();
            $table->text('question_snapshot');

            // Answer storage (flexible)
            $table->text('answer_text')->nullable();     // for text/yes_no/etc
            $table->json('answer_json')->nullable();     // for selects/multi-select, structured values
            $table->json('media')->nullable();           // store image URLs/paths later

            // optional price impact per answer
            $table->decimal('amount', 10, 2)->nullable();

            $table->timestamps();

            $table->index(['booking_id', 'frontend_key'], 'idx_booking_key');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_details');
    }
};
