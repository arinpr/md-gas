<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

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
        return Inertia::render('Book/RepairPage');
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
        // renders resources/js/Pages/Book/PowerFlushPage.jsx
        return Inertia::render('Book/PowerFlushPage');
    }

    // GET /book/quote/service
    public function serviceStepper()
    {
        // renders resources/js/Pages/Book/ServicePage.jsx
        return Inertia::render('Book/ServicePage');
    }
}
