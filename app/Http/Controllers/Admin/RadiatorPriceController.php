<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RadiatorPrice;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RadiatorPriceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/RadiatorPrice', [
            'radiators' => RadiatorPrice::orderBy('id')->get(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'price' => ['required', 'numeric', 'min:0'],
        ]);

        RadiatorPrice::findOrFail($id)->update([
            'price' => $validated['price'],
        ]);

        return back()->with('success', 'Radiator price updated successfully.');
    }
}
