<?php

namespace App\Http\Middleware;

use App\Support\LocaleDataService;
use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\App;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        return [
             ...parent::share($request),
            'name'        => config('app.name'),
            'quote'       => ['message' => trim($message), 'author' => trim($author)],
            'auth'        => [
                'user' => $request->user()
                // 'permissions' => [
                //     'post' => [
                //         'create' => $request->user()->can('create', Post::class),
                //     ],
                // ],
            ],
            'ziggy'       => fn(): array      => [
                 ...(new Ziggy())->toArray(),
                'location' => $request->url(),
                'query'    => $request->query()
            ],
            'sidebarOpen' => !$request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locale'      => [
                'languageCode' => App::currentLocale(),
                // todo: Consider injecting only the necessary locale data into specific pages instead of sharing all locale data globally. This can help reduce unnecessary data transfer.
                'data'         => LocaleDataService::getLocaleData()
            ]
        ];
    }
}
