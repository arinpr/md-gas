<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('radiator_prices', function (Blueprint $table) {
            $table->id();
            $table->string('label');           // e.g. "6–8 radiators"
            $table->decimal('price', 8, 2);    // e.g. 125.00
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('radiator_prices');
    }
};
