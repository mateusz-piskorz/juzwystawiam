<?php

namespace App\Traits;

use Illuminate\Http\Request;
use Illuminate\Support\Arr;

trait AppliesQueryFilters
{
    public function applyQueryFilters(Request $request, mixed $query, string $searchColumn, array $sortable = [], array $filterable = []): mixed
    {

        $validated = $request->validate([
            'limit'           => 'nullable|integer|min:1|max:100',
            'order_direction' => 'nullable|in:asc,desc'
        ]);

        $orderDirection = $validated['order_direction'] ?? 'desc';
        $limit = $validated['limit'] ?? 25;

        $stringOrArray = ['nullable', function ($attribute, $value, $fail) {
            if (!is_string($value) && !is_array($value)) {
                $fail("The $attribute field must be a string or an array.");
            }
        }];

        $validatedFilters = $request->validate(
            array_fill_keys($filterable, $stringOrArray)
        );

        [$arrays, $strings] = Arr::partition($validatedFilters, fn($v) => is_array($v));

        // Apply filters
        $query->where($strings)->where(function ($q) use ($arrays) {
            foreach ($arrays as $key => $values) {
                $q->whereIn($key, $values);
            }
        });

        // Apply search
        if ($search = $request->input('q')) {
            $query->where($searchColumn, 'ilike', "%{$search}%");
        }

        // Apply ordering
        $orderColumn = $request->input('order_column');

        if ($orderColumn && in_array($orderColumn, $sortable)) {
            $query->orderBy($orderColumn, $orderDirection);
        } else {
            $query->latest();
        }

        return $query->paginate($limit);
    }
}
