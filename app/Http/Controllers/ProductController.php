<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Render the product list page.
     */
    public function index(): Response
    {
        return Inertia::render('dashboard/products/page');
    }

}
