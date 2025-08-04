<?php

namespace App\Http\Middleware;

use App\Support\BrowserLanguageService;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Symfony\Component\HttpFoundation\Response;

class HandleLocale
{
    public function handle(Request $request, Closure $next): Response
    {
        $browserLanguageService = new BrowserLanguageService();
        $langArr = $browserLanguageService->detectLanguage($request);

        App::setLocale($langArr['langCode']);

        return $next($request);
    }
}
