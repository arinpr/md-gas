<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;

class PricingOverrideService
{
    public static function groupedActive(): array
    {
        return Cache::remember('pricing_overrides:active', 3600, function () {
            $rows = DB::table('pricing_overrides')
                ->where('is_active', true)
                ->get(['group', 'key', 'value']);

            $out = [];
            foreach ($rows as $r) {
                $out[$r->group] ??= [];
                $out[$r->group][$r->key] = json_decode($r->value, true);
            }
            return $out;
        });
    }

    public static function upsert(string $group, string $key, $value, bool $active = true): void
    {
        DB::table('pricing_overrides')->updateOrInsert(
            ['group' => $group, 'key' => $key],
            [
                'value' => json_encode($value),
                'is_active' => $active,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        Cache::forget('pricing_overrides:active');
    }

    public static function resetToDefault(string $group, string $key): void
    {
        DB::table('pricing_overrides')
            ->where('group', $group)
            ->where('key', $key)
            ->update(['is_active' => false, 'updated_at' => now()]);

        Cache::forget('pricing_overrides:active');
    }
}
