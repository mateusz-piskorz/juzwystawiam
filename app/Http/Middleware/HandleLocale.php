<?php

namespace App\Http\Middleware;

use App\Support\BrowserLanguageService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\View;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $browserLanguageService = new BrowserLanguageService();
        $langArr = $browserLanguageService->detectLanguage($request);

        View::share('langCode', $langArr['langCode']);
        App::setLocale($langArr['selectedLocale']);

        return $next($request);
    }
}
