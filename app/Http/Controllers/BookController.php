<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\BasePrice;
use App\Models\RadiatorPrice;

class BookController extends Controller
{
    //


    public function index(){
        return Inertia::render('Book/Home');
    }

    public function quote(){
        return Inertia::render('Book/QuotePage');
    }

 // GET /book/quote/repair
    public function repairStepper()
    {
        // renders resources/js/Pages/Book/RepairPage.jsx
        $basePrice = BasePrice::boilerRepair()->value('price');
        $symbol = config('services.currency.symbol');
        return Inertia::render('Book/RepairPage', compact('basePrice', 'symbol'));
    }

    // GET /book/quote/new
    public function newStepper()
    {
        // renders resources/js/Pages/Book/NewBoilerPage.jsx
        return Inertia::render('Book/NewBoilerPage');
    }

    // GET /book/quote/powerflush
    
    public function powerflushStepper()
{
    $basePrice = BasePrice::powerFlush()->value('price');
    $symbol = config('services.currency.symbol');

    $radiatorPrices = RadiatorPrice::orderBy('id')->get();

    return Inertia::render('Book/PowerFlushPage', [
        'basePrice' => $basePrice,
        'symbol' => $symbol,
        'radiatorPrices' => $radiatorPrices,
    ]);
}


    // GET /book/quote/service
    public function serviceStepper()
    {
        // renders resources/js/Pages/Book/ServicePage.jsx
        $basePrice = BasePrice::boilerService()->value('price');
        $symbol = config('services.currency.symbol');
        return Inertia::render('Book/ServicePage', compact('basePrice', 'symbol'));
    }

    public function serviceResults(Request $request)
    {
         return Inertia::render('Book/ServiceResults', [
        'answers' => $request->all(),]);
    }

    public function install(Request $request)
{
    return Inertia::render('Book/InstallPage', [
        'boilerId' => $request->boilerId,
        'power'    => $request->power,
    ]);
}

}
