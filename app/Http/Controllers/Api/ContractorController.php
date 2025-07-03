<?php

namespace App\Http\Controllers\Api;

use App\Enums\TypeOfBusiness;
use App\Http\Controllers\Controller;
use App\Models\Contractor;
use App\Traits\AppliesQueryFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class ContractorController extends Controller
{
    use AppliesQueryFilters;

    // List all Contractors
    public function index(Request $request)
    {
        // $query = $request->user()->contractors()->with(['contractors', 'products']);
        $query = $request->user()->contractors();

        $query = $this->applyQueryFilters(
            $request,
            $query,
            'company_name',
            sortable: ['company_name', 'is_own_company'],
            filterable: ['type_of_business', 'is_own_company']
        );

        return response()->json($query);
    }

    // Show a single contractor
    public function show(Request $request, Contractor $contractor)
    {
        Gate::authorize('view', $contractor);

        return $contractor->toJson();
    }

    // Store new Contractor
    public function store(Request $request)
    {

        // todo: check if nip is uniq in users scope
        $validated = $request->validate([
            'type_of_business' => ['required', Rule::enum(TypeOfBusiness::class)],
            'is_own_company'   => ['required', 'boolean'],
            'nip'              => [
                'nullable',
                'string',
                'size:10',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS'
            ],
            'postal_code'      => ['required', 'string', 'max:255'],
            'building_number'  => ['required', 'string', 'max:255'],
            'city'             => ['required', 'string', 'max:255'],
            'country'          => ['required', 'string', 'max:255'],
            'company_name'     => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS'
            ],
            'email'            => ['nullable', 'email'],
            'street_name'      => ['nullable', 'string', 'max:255'],
            'phone'            => ['nullable', 'string'],
            'bank_account'     => ['nullable', 'integer', 'digits_between:5,17'],
            'first_name'       => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED'
            ],
            'surname'          => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,PRIVATE_PERSON,SELF_EMPLOYED'
            ]
        ]);

        $companyName = $validated['company_name'] ?? $validated['first_name'] . ' ' . $validated['surname'];

        $contractor = Contractor::create([ ...$validated, 'company_name' => $companyName, 'user_id' => $request->user()->id]);

        return response()->json($contractor);
    }

    // Update a Contractor
    public function update(Request $request, Contractor $contractor)
    {
        Gate::authorize('update', $contractor);

        // todo: check if nip is uniq in users scope
        $validated = $request->validate([
            'type_of_business' => ['required', Rule::enum(TypeOfBusiness::class)],
            'is_own_company'   => ['required', 'boolean'],
            'nip'              => [
                'nullable',
                'string',
                'size:10',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS'
            ],
            'postal_code'      => ['required', 'string', 'max:255'],
            'building_number'  => ['required', 'string', 'max:255'],
            'city'             => ['required', 'string', 'max:255'],
            'country'          => ['required', 'string', 'max:255'],
            'company_name'     => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,SELF_EMPLOYED,OTHER_BUSINESS'
            ],
            'email'            => ['nullable', 'email'],
            'street_name'      => ['nullable', 'string', 'max:255'],
            'phone'            => ['nullable', 'string'],
            'bank_account'     => ['nullable', 'integer', 'digits_between:5,17'],
            'first_name'       => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,PRIVATE_PERSON,OTHER_BUSINESS'
            ],
            'surname'          => [
                'nullable',
                'string',
                'max:255',
                'required_if:type_of_business,PRIVATE_PERSON,OTHER_BUSINESS'
            ]
        ]);

        $companyName = $validated['company_name'] ?? $validated['first_name'] . ' ' . $validated['surname'];

        $contractor->update([ ...$validated, 'company_name' => $companyName, 'user_id' => $request->user()->id]);

        return response()->json($contractor);
    }

    // Delete a Contractor
    public function destroy(Contractor $contractor)
    {
        Gate::authorize('delete', $contractor);

        $contractor->delete();

        return response()->json(['message' => 'Contractor deleted']);
    }

}
