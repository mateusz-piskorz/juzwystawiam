<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProductController
{

    public function index(): Response
    {
        return Inertia::render('dashboard/products/page');
    }

}
