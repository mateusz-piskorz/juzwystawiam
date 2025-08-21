<?php

namespace App\Traits;

use Illuminate\Support\Arr;

trait AppliesQueryFilters
{
    public function applyQueryFilters(mixed $query, mixed $validated, string $searchColumn, array $filterable = []): mixed
    {
        [$arrays, $strings] = Arr::partition(Arr::only($validated, $filterable), fn($v) => is_array($v));

        // Apply filters
        $query->where($strings)->where(function ($q) use ($arrays) {
            foreach ($arrays as $key => $values) {
                $q->whereIn($key, $values);
            }
        });

        // Apply search
        if ($q = $validated['q'] ?? null) {
            $query->where($searchColumn, 'ilike', "%{$q}%");
        }

        // Apply sorting
        $sortDirection = $validated['sort_direction'] ?? 'desc';
        if ($sort = $validated['sort'] ?? null) {
            $query->orderBy($sort, $sortDirection);
        } else {
            $query->latest();
        }

        return $query;
    }
}
