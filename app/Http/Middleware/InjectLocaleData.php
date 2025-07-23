<?php

namespace App\Http\Middleware;

use App\Support\BrowserLanguageService as SupportBrowserLanguageService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InjectLocaleData
{
    public function handle(Request $request, Closure $next): Response
    {
        $browserLanguageService = new SupportBrowserLanguageService();
        $languageCode = $browserLanguageService->detectLanguage($request);

        $localesPath = base_path('lang');
        $languageFilePath = "{$localesPath}/{$languageCode}.json";

        if (file_exists($languageFilePath)) {
            $data = json_decode(file_get_contents($languageFilePath), true);
        } else {

            $englishFilePath = "{$localesPath}/en.json";
            $data = json_decode(file_get_contents($englishFilePath), true);
            $languageCode = 'en';
        }

        inertia()->share('localeData', [
            'data'         => $data,
            'languageCode' => $languageCode
        ]);

        return $next($request);
    }
}
