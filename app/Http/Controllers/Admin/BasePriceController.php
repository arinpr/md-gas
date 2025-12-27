<?php

namespace App\Http\Controllers\Admin;

use App\Models\BasePrice;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;


class BasePriceController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/BasePrice', [
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
