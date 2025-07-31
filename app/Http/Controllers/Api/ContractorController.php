<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\UpsertContractorRequest;
use App\Models\Contractor;
use App\Traits\AppliesQueryFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ContractorController
{
    use AppliesQueryFilters;

    public function index(Request $request)
    {
        $query = $request->user()->contractors();
        $query = $this->applyQueryFilters(
            $request,
            $query,
            'company_name',
            sortable: ['company_name', 'is_own_company', 'type_of_business'],
            filterable: ['type_of_business', 'is_own_company']
        );

        return response()->json($query);
    }

    public function show(Contractor $contractor)
    {
        Gate::authorize('view', $contractor);
        return $contractor->toJson();
    }

    public function store(UpsertContractorRequest $request)
    {
        $validated = $request->validated();
        $companyName = $validated['company_name'] ?? $validated['first_name'] . ' ' . $validated['surname'];
        $contractor = Contractor::create([ ...$validated, 'company_name' => $companyName, 'user_id' => $request->user()->id]);

        return response()->json($contractor);
    }

    public function update(UpsertContractorRequest $request, Contractor $contractor)
    {
        Gate::authorize('update', $contractor);
        $validated = $request->validated();
        $companyName = $validated['company_name'] ?? $validated['first_name'] . ' ' . $validated['surname'];
        $contractor->update([ ...$validated, 'company_name' => $companyName, 'user_id' => $request->user()->id]);

        return response()->json($contractor);
    }

    public function destroy(Contractor $contractor)
    {
        Gate::authorize('delete', $contractor);
        $contractor->delete();

        return response()->json(['message' => 'Contractor deleted']);
    }

}
