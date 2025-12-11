<?php

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

    Route::get('/quote/{id}', [BookController::class, 'getQuote'])->name('quote.get');

    Route::get('/repair', function () {
        return Inertia::render('Book/RepairPage');
    })->name('repair');
    Route::get('/service', function () {
        return Inertia::render('Book/ServicePage', [
            'pageTitle' => 'Book a Service',
        ]);
    })->name('service');

    Route::get('/power-flush', function () {
        return Inertia::render('Book/PowerFlushPage', [
            'pageTitle' => 'Book Power Flush',
        ]);
    })->name('powerflush');
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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
