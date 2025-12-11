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


    public function getQuote($id){
        return Inertia::render('Book/DynamicQuote', compact('id'));
    }

}
