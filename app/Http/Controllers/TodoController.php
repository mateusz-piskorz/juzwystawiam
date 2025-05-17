<?php


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
    /**
     * Render the todos page.
     */
    public function index(Request $request): Response
    {
        $todos = $request->user()->todos()->latest()->paginate(7);
        return Inertia::render('todos/page', [
            'todos' => $todos,
        ]);
    }
}
