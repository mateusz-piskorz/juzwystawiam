<?php

namespace App\Http\Controllers\Api;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    // Show a single Product
    public function show(Request $request, Product $product)
    {
        Gate::authorize('view', $product);
        return $product->toJson();
    }

    // List all Products
    public function index(Request $request)
    {
        // todo: support orWhereIn($key,$operator, $value); $operator: =,/,<,> etc
        // $stringOrArray = ['nullable', fn($attribute, $value, $fail) => (!is_string($value) && !is_array($value)) && $fail("The $attribute field must be a string or an array.")];

        // $validated = $request->validate([
        //     'limit'          => 'string|nullable',
        //     'page'           => 'string|nullable',
        //     'id'             => $stringOrArray,
        //     'nip'            => $stringOrArray,
        //     'name'           => $stringOrArray,
        //     'is_own_company' => $stringOrArray
        // ]);

        // [$itemsArray, $itemsString] = Arr::partition(Arr::except($validated, ['limit', 'page']), fn(string | array $i) => is_array($i));

        $limit = $request->limit ? $request->limit : 7;
        return $request->user()->products()->latest()->paginate($limit)->toJson();
    }

    // Store new Product
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'price'        => 'required|decimal:2',
            'measure_unit' => ['required', Rule::enum(MeasureUnit::class)],
            'vat_rate'     => ['required', Rule::enum(VatRate::class)],
            'description'  => 'string|nullable'
        ]);

        $product = Product::create([ ...$validated, 'user_id' => $request->user()->id]);

        return response()->json($product);
    }

    // Update a Contractor
    public function update(Request $request, Product $product)
    {
        Gate::authorize('update', $product);

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'price'        => 'required|decimal:2',
            'measure_unit' => ['required', Rule::enum(MeasureUnit::class)],
            'vat_rate'     => ['required', Rule::enum(VatRate::class)],
            'description'  => 'string|nullable'
        ]);

        $product->update([ ...$validated, 'user_id' => $request->user()->id]);

        return response()->json($product);
    }

    // Delete a Contractor
    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);

        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }

}
