<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;
use Inertia\Inertia;


class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (request()->header('X-Forwarded-Proto') === 'https') {
            URL::forceScheme('https');
        }
        // Inertia::setRootView('app');

        // // Enable SSR:
        // Inertia::ssr(function ($page) {
        //     // This will call the built SSR bundle using Node
        //     return app('inertia.ssr')->render($page);
        // });
        Vite::prefetch(concurrency: 3);
    }
}
