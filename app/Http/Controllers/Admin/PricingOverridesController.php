<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\PricingOverrideService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingOverridesController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PricingOverrides', [
            'overrides' => PricingOverrideService::groupedActive(),
        ]);
    }

    public function save(Request $request)
    {
        $data = $request->validate([
            'group' => ['required', 'in:rules,addons,products'],
            'key' => ['required', 'string', 'max:190'],
            'value' => ['nullable'],
        ]);

        // Guardrails to prevent breaking production
        if ($data['group'] === 'rules' && $data['key'] === 'TRV_MAX_QTY') {
            $v = (int) $data['value'];
            abort_unless($v >= 0 && $v <= 13, 422, 'TRV_MAX_QTY must be 0-13');
            $data['value'] = $v;
        }

        if ($data['value'] === '') $data['value'] = null;

        if (in_array($data['group'], ['addons', 'products'], true) && $data['value'] !== null) {
            $v = (float) $data['value'];
            abort_unless($v >= 0, 422, 'Value must be >= 0');
            $data['value'] = $v;
        }

        if ($data['group'] === 'rules' && $data['key'] === 'MIN_MARGIN_SYSTEM_HEAT') {
            $v = (float) $data['value'];
            abort_unless($v >= 0, 422, 'MIN_MARGIN_SYSTEM_HEAT must be >= 0');
            $data['value'] = $v;
        }

        PricingOverrideService::upsert($data['group'], $data['key'], $data['value'], true);

        return back()->with('success', 'Saved');
    }

    public function reset(Request $request)
    {
        $data = $request->validate([
            'group' => ['required', 'in:rules,addons,products'],
            'key' => ['required', 'string', 'max:190'],
        ]);

        PricingOverrideService::resetToDefault($data['group'], $data['key']);

        return back()->with('success', 'Reset to default');
    }
}
