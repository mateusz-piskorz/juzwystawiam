<?php

namespace App\Policies;

use App\Models\ExpenseType;
use App\Models\User;

class ExpenseTypePolicy
{
    public function view(User $user, ExpenseType $expenseType): bool
    {
        return $user->id === $expenseType->user_id;
    }

    public function update(User $user, ExpenseType $expenseType): bool
    {
        return $user->id === $expenseType->user_id;
    }

    public function delete(User $user, ExpenseType $expenseType): bool
    {
        return $user->id === $expenseType->user_id;
    }

    public function forceDelete(User $user, ExpenseType $expenseType): bool
    {
        return $user->id === $expenseType->user_id;
    }
}
