<?php

namespace App\Traits;

use Illuminate\Support\Facades\App;

trait Locale
{

    protected $locale;

    public function __construct()
    {
        $langCode = App::currentLocale();
        $localesPath = base_path('resources/lang');
        $languageFilePath = "{$localesPath}/{$langCode}.json";

        if (file_exists($languageFilePath)) {
            $this->locale = json_decode(file_get_contents($languageFilePath), true);
        } else {
            $englishFilePath = "{$localesPath}/en.json";
            $this->locale = json_decode(file_get_contents($englishFilePath), true);
        }
    }

}
