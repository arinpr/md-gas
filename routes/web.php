<?php

use App\Http\Controllers\BasePriceController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\BookController;

Route::get('/health', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});



//Guest Routes

Route::get('/', function () {
    return Inertia::render('Home');
})->name('landing');

Route::prefix('book')->name('book.')->group(function () {
    Route::get('/', [BookController::class, 'index'])->name('home');
    Route::get('/quote', [BookController::class, 'quote'])->name('quote');
    Route::get('/quote/repair', [BookController::class, 'repairStepper'])->name('quote.repair');
    Route::get('/quote/new', [BookController::class, 'newStepper'])->name('quote.new');
    Route::get('/quote/powerflush', [BookController::class, 'powerflushStepper'])->name('quote.powerflush');
    Route::get('/quote/service', [BookController::class, 'serviceStepper'])->name('quote.service');
    Route::get('/quote/new/results', [BookController::class, 'serviceResults'])
    ->name('quote.new.results');

    Route::get('/install', [BookController::class, 'install'])
        ->name('install');
});


Route::get('/about', function () {
    return Inertia::render('About/AboutPage', [
        'pageTitle' => 'About Us',
    ]);
})->name('about');

Route::inertia('/privacy-policy', 'PrivacyPolicyPage', [
    'pageTitle' => 'Privacy Policy',
])->name('privacy.policy');

Route::inertia('/terms-conditions', 'TermsConditionsPage', [
    'pageTitle' => 'Terms & Conditions',
])->name('terms.conditions');




// Route::post('/repair/submit', [RepairController::class, 'store']);



//Authenticated Routes

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')
    ->prefix('pricing')
    ->name('pricing.')
    ->group(function () {
        Route::get('/base-price', [BasePriceController::class, 'index'])
            ->name('base');
            Route::post('/base-price/{id}/update', [BasePriceController::class, 'update'])
            ->name('update');

            Route::get('/quotation', [BasePriceController::class, 'quotation'])
            ->name('quotation');
    });


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
