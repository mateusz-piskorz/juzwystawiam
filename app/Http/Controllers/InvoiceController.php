<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InvoiceController extends Controller
{
    /**
     * Render the todos page.
     */
    public function index(Request $request): Response
    {
        $invoices = $request->user()->invoices()->with(['items', 'contractors'])->latest()->paginate(7);
        return Inertia::render('dashboard/invoices/page', [
            'invoices' => $invoices,
        ]);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('dashboard/invoices/create/page');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        return Inertia::render('dashboard/invoices/create/page');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }




}
