<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('customers', function (Blueprint $table) {
            $table->id();

            $table->string('full_name')->index();
            $table->string('phone', 30)->nullable()->index();
            $table->string('email')->nullable()->index();

            $table->string('postcode', 20)->nullable()->index();

            // Address fields (keep both: structured + full)
            $table->string('address_line1')->nullable();
            $table->string('address_line2')->nullable();
            $table->string('city')->nullable();
            $table->string('county')->nullable();
            $table->string('country', 2)->default('GB'); // ISO2

            $table->text('address_full')->nullable(); // optional: raw full address

            $table->timestamps();

            // Optional constraints (UK-friendly):
            // - email can repeat if null; unique only if present
            $table->unique(['email'], 'uniq_customer_email');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('customers');
    }
};
