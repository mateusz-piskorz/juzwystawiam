<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Expense\IndexExpenseRequest;
use App\Http\Requests\Expense\StoreExpenseRequest;
use App\Http\Requests\Expense\UpdateExpenseRequest;
use App\Http\Resources\ExpenseResource;
use App\Models\Expense;
use App\Traits\AppliesQueryFilters;
use Illuminate\Support\Facades\Gate;

class ExpenseController
{
    use AppliesQueryFilters;

    public function index(IndexExpenseRequest $request)
    {

        $query = $request->user()->expenses();
        $validated = $request->validated();
        $limit = $validated['limit'] ?? 25;
        $query = $this->applyQueryFilters($query, $validated, 'title', ['expense_type_id']);

        return ExpenseResource::collection($query->paginate($limit));
    }

    public function store(StoreExpenseRequest $request)
    {
        $validated = $request->validated();
        $expense = $request->user()->expenses()->create($validated);

        return (new ExpenseResource($expense))->response();
    }

    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        Gate::authorize('update', $expense);
        $expense->update($request->validated());

        return (new ExpenseResource($expense))->response();
    }

    public function destroy(Expense $expense)
    {
        Gate::authorize('delete', $expense);
        $expense->delete();

        return response()->json(['message' => 'Expense deleted']);
    }
}
