<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpsertProductRequest;
use App\Models\Product;
use App\Traits\AppliesQueryFilters;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    use AppliesQueryFilters;

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

    public function show(Product $product)
    {
        Gate::authorize('view', $product);
        return $product->toJson();
    }

    public function store(UpsertProductRequest $request)
    {
        $product = Product::create([ ...$request->validated(), 'user_id' => $request->user()->id]);
        return response()->json($product);
    }

    public function update(UpsertProductRequest $request, Product $product)
    {
        Gate::authorize('update', $product);
        $product->update([ ...$request->validated(), 'user_id' => $request->user()->id]);
        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }

}
