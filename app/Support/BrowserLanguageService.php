<?php

namespace App\Support;

use Illuminate\Http\Request;

class BrowserLanguageService
{
    public function detectLanguage(Request $request)
    {
        // todo: we need an enum of supported locales and default to en if locale is not supported

        $locale = $request->cookie('locale') ?? 'system';

        $languageCode = $locale === 'system' ? 'en' : $locale;

        if ($locale === 'system') {
            $browserLanguages = $request->getLanguages();
            if (preg_match('/^([a-z]+)/i', reset($browserLanguages), $matches)) {
                $languageCode = strtolower($matches[1]);
            }
        };

        return ['langCode' => $languageCode, 'selectedLocale' => $locale];
    }
}
