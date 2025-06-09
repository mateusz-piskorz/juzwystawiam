<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Contractor;
use function Pest\Laravel\json;
use Illuminate\Http\Request;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;

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
            'name'           => $stringOrArray,
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

    // Store a new Contractor
    public function store(Request $request)
    {
        // todo: check if nip is uniq in users scope
        $validated = $request->validate([
            'is_own_company'  => 'boolean',
            'name'            => 'required|string',
            'nip'             => 'required|string', // todo: validate for 10 digits
            'postal_code'     => 'string',
            'building_number' => 'string',
            'city'            => 'string',
            'street_name'     => 'string|nullable',
            'email'           => 'email|nullable',
            'country'         => 'string|nullable',
            'phone'           => 'string|nullable'
        ]);

        $contractor = Contractor::create([ ...$validated, 'user_id' => $request->user()->id]);

        return response()->json($contractor);
    }

    // Update a Contractor
    public function update(Request $request, Contractor $contractor)
    {
        Gate::authorize('update', $contractor);

        $validated = $request->validate([
            'name'           => 'required|string',
            'is_own_company' => 'boolean',
            'nip'            => 'required|string', // todo: validate for 10 digits
            'address'        => 'string|nullable',
            'city'           => 'string|nullable',
            'postal_code'    => 'string|nullable',
            'country'        => 'string|nullable',
            'email'          => 'string|nullable',
            'phone'          => 'string|nullable'
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
