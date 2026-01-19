<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\IndexContractorRequest;
use App\Http\Requests\UpsertContractorRequest;
use App\Http\Resources\ContractorResource;
use App\Models\Contractor;
use App\Traits\AppliesQueryFilters;
use Illuminate\Support\Facades\Gate;

class ContractorController
{
    use AppliesQueryFilters;

    public function index(IndexContractorRequest $request)
    {

        $query = $request->user()->contractors();
        $validated = $request->validated();
        $limit = $validated['limit'] ?? 25;

        $query = $this->applyQueryFilters($query, $validated, 'company_name', ['type_of_business', 'is_own_company']);

        return ContractorResource::collection($query->paginate($limit));
    }

    public function store(UpsertContractorRequest $request)
    {
        $validated = $request->validated();
        $companyName = $validated['company_name'] ?? $validated['first_name'].' '.$validated['surname'];
        $contractor = Contractor::create([...$validated, 'company_name' => $companyName, 'user_id' => $request->user()->id]);

        return (new ContractorResource($contractor))->response()->setStatusCode(201);
    }

    public function update(UpsertContractorRequest $request, Contractor $contractor)
    {
        Gate::authorize('update', $contractor);
        $validated = $request->validated();
        $companyName = $validated['company_name'] ?? $validated['first_name'].' '.$validated['surname'];
        $contractor->update([...$validated, 'company_name' => $companyName, 'user_id' => $request->user()->id]);

        return (new ContractorResource($contractor))->response()->setStatusCode(201);
    }

    public function destroy(Contractor $contractor)
    {
        Gate::authorize('delete', $contractor);
        $contractor->delete();

        return response()->json(['message' => 'Contractor deleted']);
    }
}
