<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController
{

    public function index(): Response
    {
        return Inertia::render('dashboard/analytics/page');
    }

}
