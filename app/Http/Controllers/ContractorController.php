<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ContractorController
{

    public function index(): Response
    {
        return Inertia::render('dashboard/contractors/page');
    }

}
