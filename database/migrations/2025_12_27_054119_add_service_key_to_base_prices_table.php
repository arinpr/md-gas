<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('base_prices', function (Blueprint $table) {
            $table->string('service_key')->after('service');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('base_prices', function (Blueprint $table) {
            if (Schema::hasColumn('base_prices', 'service_key')) {
                $table->dropColumn('service_key');
            }
        });
    }
};
