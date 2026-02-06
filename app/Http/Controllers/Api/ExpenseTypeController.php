<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\ExpenseType\IndexExpenseTypeRequest;
use App\Http\Requests\ExpenseType\StoreExpenseTypeRequest;
use App\Http\Requests\ExpenseType\UpdateExpenseTypeRequest;
use App\Http\Resources\ExpenseTypeResource;
use App\Models\ExpenseType;
use App\Traits\AppliesQueryFilters;
use Illuminate\Support\Facades\Gate;

class ExpenseTypeController
{
    use AppliesQueryFilters;

    public function index(IndexExpenseTypeRequest $request)
    {
        $query = $request->user()->expenseTypes();
        $validated = $request->validated();
        $limit = $validated['limit'] ?? 25;
        $query = $this->applyQueryFilters($query, $validated, 'name', []);

        return ExpenseTypeResource::collection($query->paginate($limit));
    }

    public function store(StoreExpenseTypeRequest $request)
    {
        $validated = $request->validated();
        $expenseType = $request->user()->expenseTypes()->create($validated);

        return new ExpenseTypeResource($expenseType);
    }

    public function update(UpdateExpenseTypeRequest $request, ExpenseType $expenseType)
    {
        Gate::authorize('update', $expenseType);
        $expenseType->update($request->validated());

        return new ExpenseTypeResource($expenseType);
    }

    public function destroy(ExpenseType $expenseType)
    {
        Gate::authorize('delete', $expenseType);
        $expenseType->delete();

        return response()->json(['message' => 'Expense Type deleted']);
    }
}
