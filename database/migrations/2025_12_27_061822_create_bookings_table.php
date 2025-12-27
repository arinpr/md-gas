<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();

            // optional: user reference
            $table->foreignId('user_id')->nullable()->constrained()->nullOnDelete();

            // shared question data
            $table->string('frontend_key');
            $table->text('question');
            $table->text('answer')->nullable();

            // pricing
            $table->decimal('base_amount', 10, 2)->default(0);
            $table->decimal('pricing', 10, 2)->default(0);

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};

