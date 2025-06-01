<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        return  $user->todos()->latest()->paginate(7)->toJson();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $userId = $request->user()->id;

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
        ]);

        $todo = Todo::create([
            'user_id' => $userId,
            ...$validated
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Todo $todo)
    {
        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }
        return response()->json(['id' => 'here'], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Todo $todo)
    {
        $userId = $request->user()->id;

        if ($todo->user_id !== $userId) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'completed' => 'nullable|boolean',
        ]);

        $todo->update([
            'user_id' => $userId,
            ...$validated
        ]);

        return response()->json($todo, 201);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Todo $todo)
    {

        if ($todo->user_id !== $request->user()->id) {
            abort(403);
        }

        $todo->delete();

        return response()->json(['message' => 'Todo deleted successfully.'], 200);
    }
}
