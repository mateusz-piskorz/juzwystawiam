<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\IndexProductRequest;
use App\Http\Requests\Product\StoreProductRequest;
use App\Http\Requests\Product\UpdateProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\AppliesQueryFilters;
use Illuminate\Support\Facades\Gate;

class ProductController
{
    use AppliesQueryFilters;

    public function index(IndexProductRequest $request)
    {
        $query = $request->user()->products();
        $validated = $request->validated();
        $limit = $validated['limit'] ?? 25;
        $query = $this->applyQueryFilters($query, $validated, 'name', ['measure_unit', 'vat_rate']);

        return ProductResource::collection($query->paginate($limit));
    }

    public function store(StoreProductRequest $request)
    {
        $product = Product::query()->create([ ...$request->validated(), 'user_id' => $request->user()->id]);

        return (new ProductResource($product))->response();
    }

    public function update(UpdateProductRequest $request, Product $product)
    {
        Gate::authorize('update', $product);
        $product->update([ ...$request->validated(), 'user_id' => $request->user()->id]);

        return (new ProductResource($product))->response();
    }

    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);
        $product->delete();

        return response()->json(['message' => 'Product deleted']);
    }
}
