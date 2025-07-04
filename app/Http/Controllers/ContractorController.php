<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ContractorController extends Controller
{
    /**
     * Render the contractor list page.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/contractors/page');
    }

}
