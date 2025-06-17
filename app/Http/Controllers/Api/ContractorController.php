<?php

namespace App\Http\Controllers\Api;

use App\Enums\TypeOfBusiness;
use App\Http\Controllers\Controller;
use App\Models\Contractor;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class ContractorController extends Controller
{
    // Show a single contractor
    public function show(Request $request, Contractor $contractor)
    {
        Gate::authorize('view', $contractor);
        return $contractor->toJson();
    }

    // List all Contractors
    public function index(Request $request)
    {
        $stringOrArray = ['nullable', fn($attribute, $value, $fail) => (!is_string($value) && !is_array($value)) && $fail("The $attribute field must be a string or an array.")];

        $validated = $request->validate([
            'limit'          => 'string|nullable',
            'page'           => 'string|nullable',
            'id'             => $stringOrArray,
            'nip'            => $stringOrArray,
            'company_name'   => $stringOrArray,
            'is_own_company' => $stringOrArray
        ]);

        [$itemsArray, $itemsString] = Arr::partition(Arr::except($validated, ['limit', 'page']), fn(string | array $i) => is_array($i));

        $limit = $request->limit ? $request->limit : 7;

        return $request->user()->contractors()->where($itemsString)->where(function ($query) use ($itemsArray) {
            foreach ($itemsArray as $key => $value) {
                $query->orWhereIn($key, $value);
            }
        })->latest()->paginate($limit)->toJson();

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

        $contractor = Contractor::create([ ...$validated, 'user_id' => $request->user()->id]);

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

        $contractor->update([ ...$validated, 'user_id' => $request->user()->id]);

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
