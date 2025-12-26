<?php

namespace App\Http\Controllers;

use App\Models\BasePrice;
use Illuminate\Http\Request;   
use Inertia\Inertia;

class BasePriceController extends Controller
{
    public function index()
    {
        return Inertia::render('BasePrice', [
            'prices' => BasePrice::all(),
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'price' => 'required|numeric|min:0',
        ]);

        BasePrice::findOrFail($id)->update([
            'price' => $request->price,
        ]);

        return redirect()->back();
    }

    public function quotation()
{
    return Inertia::render('Quotation');
}
}
