<?php

namespace App\Support;

use Illuminate\Http\Request;

class BrowserLanguageService
{
    public function detectLanguage(Request $request)
    {
        // todo: include cookie preference
        $preferredLanguages = $request->getLanguages();

        $browserLanguage = reset($preferredLanguages);

        if (preg_match('/^([a-z]+)/i', $browserLanguage, $matches)) {
            $languageCode = strtolower($matches[1]);

            return $languageCode;
        }
    }
}
