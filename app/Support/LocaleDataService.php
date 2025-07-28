<?php

namespace App\Support;

use Illuminate\Support\Facades\App;

class LocaleDataService
{

    public static function getLocaleData()
    {
        $langCode = App::currentLocale();
        $localesPath = base_path('resources/lang');
        $languageFilePath = "{$localesPath}/{$langCode}.json";

        if (file_exists($languageFilePath)) {
            $data = json_decode(file_get_contents($languageFilePath), true);
        } else {
            $englishFilePath = "{$localesPath}/en.json";
            $data = json_decode(file_get_contents($englishFilePath), true);
        }

        return $data;

    }
}
