<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id();

            $table->enum('type', [
                'boiler_repair',
                'boiler_service',
                'new_boiler_quote',
                'power_flush',
            ])->index();

            // Stable frontend key (your form field key)
            $table->string('frontend_key', 100);

            $table->text('question');

            // UI hints (admin + future form renderer)
            $table->enum('field_type', [
                'short_text',
                'long_text',
                'number',
                'date',
                'yes_no',
                'select',
                'multi_select',
                'file',
            ])->default('short_text');

            $table->json('options')->nullable();     // for select/multi_select
            $table->boolean('is_required')->default(false);
            $table->unsignedInteger('sort_order')->default(0);

            // optional: if a question impacts pricing
            $table->decimal('price_adjustment', 10, 2)->nullable();

            $table->timestamps();

            // Unique key per type (same key can exist across types)
            $table->unique(['type', 'frontend_key'], 'uniq_question_type_key');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('questions');
    }
};
