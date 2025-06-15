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
            'is_own_company'   => 'boolean',
            'nip'              => 'required|string', // todo: validate for 10 digits
            'postal_code'      => 'string|max:255',
            'building_number'  => 'string|max:255',
            'city'             => 'string|max:255',
            'company_name'     => 'string|max:255|nullable',
            'email'            => 'email|nullable',
            'street_name'      => 'string|max:255|nullable',
            'country'          => 'string|max:255|nullable',
            'first_name'       => 'string|max:255|nullable',
            'surname'          => 'string|max:255|nullable'
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
            'is_own_company'   => 'boolean',
            'nip'              => 'required|string', // todo: validate for 10 digits
            'postal_code'      => 'string|max:255',
            'building_number'  => 'string|max:255',
            'city'             => 'string|max:255',
            'company_name'     => 'string|max:255|nullable',
            'email'            => 'email|nullable',
            'street_name'      => 'string|max:255|nullable',
            'country'          => 'string|max:255|nullable',
            'first_name'       => 'string|max:255|nullable',
            'surname'          => 'string|max:255|nullable'
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
