<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('pricing_overrides', function (Blueprint $table) {
            $table->id();
            $table->string('group'); // rules | addons | products
            $table->string('key');   // e.g. TRV_MAX_QTY OR TRV.unitPrice OR ideal_atlantic_24.basePrice
            $table->json('value')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();

            $table->unique(['group', 'key']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pricing_overrides');
    }
};
