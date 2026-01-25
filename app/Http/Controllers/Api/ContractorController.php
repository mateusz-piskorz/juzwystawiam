<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Contractor\StoreContractorRequest;
use App\Http\Requests\Contractor\UpdateContractorRequest;
use App\Http\Requests\IndexContractorRequest;
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

        $query = $this->applyQueryFilters($query, $validated, 'company_name', ['is_own_company']);

        return ContractorResource::collection($query->paginate($limit));
    }

    public function store(StoreContractorRequest $request)
    {
        $validated = $request->validated();
        $contractor = Contractor::create([...$validated, 'user_id' => $request->user()->id]);

        return (new ContractorResource($contractor))->response();
    }

    public function update(UpdateContractorRequest $request, Contractor $contractor)
    {
        Gate::authorize('update', $contractor);
        $validated = $request->validated();
        $contractor->update([...$validated, 'user_id' => $request->user()->id]);

        return (new ContractorResource($contractor))->response();
    }

    public function destroy(Contractor $contractor)
    {
        Gate::authorize('delete', $contractor);
        $contractor->delete();

        return response()->json(['message' => 'Contractor deleted']);
    }
}
