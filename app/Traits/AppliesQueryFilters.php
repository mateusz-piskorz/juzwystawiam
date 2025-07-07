<?php

namespace App\Traits;

use Illuminate\Http\Request;

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

        // Apply filters
        foreach ($validatedFilters as $key => $value) {
            if (is_null($value)) {
                continue;
            }

            if (str_contains($key, '.')) {
                [$relation, $column] = explode('.', $key, 2);
                if (is_array($value)) {
                    $query->whereHas($relation, function ($q) use ($column, $value) {
                        $q->whereIn($column, $value);
                    });
                } else {
                    $query->whereHas($relation, function ($q) use ($column, $value) {
                        $q->where($column, $value);
                    });
                }
            } else {
                if (is_array($value)) {
                    $query->whereIn($key, $value);
                } else {
                    $query->where($key, $value);
                }
            }
        }

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
