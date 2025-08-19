<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\IndexProductRequest;
use App\Http\Requests\UpsertProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\AppliesQueryFilters;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Gate;

class ProductController
{
    use AppliesQueryFilters;

    public function index(IndexProductRequest $request)
    {
        $query = $request->user()->products();

        $validated = $request->validated();

        $limit = $validated['limit'] ?? 25;

        [$arrays, $strings] = Arr::partition(Arr::only($validated, ['measure_unit', 'vat_rate']), fn($v) => is_array($v));

        // Apply filters
        $query->where($strings)->where(function ($q) use ($arrays) {
            foreach ($arrays as $key => $values) {
                $q->whereIn($key, $values);
            }
        });
        // Apply search
        if ($q = $validated['q'] ?? null) {
            $query->where('name', 'ilike', "%{$q}%");
        }

        // Apply sorting
        $sortDirection = $validated['sort_direction'] ?? 'desc';
        if ($sort = $validated['sort'] ?? null) {
            $query->orderBy($sort, $sortDirection);
        } else {
            $query->latest();
        }

        return ProductResource::collection($query->paginate($limit));
    }

    public function store(UpsertProductRequest $request)
    {
        $product = Product::query()->create([ ...$request->validated(), 'user_id' => $request->user()->id]);
        return (new ProductResource($product))->response()->setStatusCode(201);
    }

    public function update(UpsertProductRequest $request, Product $product)
    {
        Gate::authorize('update', $product);
        $product->update([ ...$request->validated(), 'user_id' => $request->user()->id]);
        return (new ProductResource($product))->response()->setStatusCode(201);
    }

    public function destroy(Product $product)
    {
        Gate::authorize('delete', $product);
        $product->delete();
        return response()->json(['message' => 'Product deleted']);
    }
}
