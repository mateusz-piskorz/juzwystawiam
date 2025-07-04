<?php

namespace App\Http\Controllers\Api;

use App\Enums\MeasureUnit;
use App\Enums\VatRate;
use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Traits\AppliesQueryFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{
    use AppliesQueryFilters;

    // List all Products
    public function index(Request $request)
    {
        $query = $request->user()->products();

        $query = $this->applyQueryFilters(
            $request,
            $query,
            'name',
            sortable: ['price', 'measure_unit', 'vat_rate'],
            filterable: ['measure_unit', 'vat_rate']
        );

        return response()->json($query);
    }

    // Show a single Product
    public function show(Request $request, Product $product)
    {
        Gate::authorize('view', $product);
        return $product->toJson();
    }

    // Store new Product
    public function store(Request $request)
    {

        $validated = $request->validate([
            'name'         => 'required|string|max:255',
            'price'        => 'required|decimal:0,2',
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
            'price'        => 'required|decimal:0,2',
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
