<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('booking_details', function (Blueprint $table) {
            $table->id();

            // relation to bookings
            $table->foreignId('booking_id')
                  ->constrained('bookings')
                  ->cascadeOnDelete();

            // question info
            $table->string('frontend_key');
            $table->text('question');
            $table->text('answer')->nullable();

            // pricing effect (if any)
            $table->decimal('base_amount', 10, 2)->default(0);
            $table->decimal('pricing', 10, 2)->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('booking_details');
    }
};
