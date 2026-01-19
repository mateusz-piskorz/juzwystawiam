<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('ziggy', function () {

    $exitCode = Artisan::call('ziggy:generate', [
        '--types-only' => true,
    ]);

    if ($exitCode === 0) {

        $source = base_path('resources/js/ziggy.d.ts');
        $destination = base_path('resources/js/lib/types/ziggy.d.ts');
        if (file_exists($source)) {

            $ziggyTypes = file_get_contents($source);

            $ziggyTypes = preg_replace(
                "/(declare module 'ziggy-js' {)/",
                "$1\n    interface TypeConfig {\n        strictRouteNames: true;\n    }\n",
                $ziggyTypes
            );

            file_put_contents($destination, $ziggyTypes);

            unlink($source);

            $this->info('resources/js/lib/types/ziggy.d.ts - generated successfully');
        } else {
            $this->error('ziggy.d.ts not found after generation.');
        }
    } else {
        $this->error('ziggy:generate command failed.');
    }
});
