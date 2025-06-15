<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Render the todos page.
     */
    public function index(Request $request): Response
    {
        $contractors = $request->user()->contractors()->latest()->paginate(7);
        return Inertia::render('dashboard/products/page', [
            'contractors' => $contractors
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        // return Inertia::render('invoices/create/page');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        // return Inertia::render('invoices/create/page');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

}
