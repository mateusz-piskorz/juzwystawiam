<?php

namespace App\Policies;

use App\Models\Contractor;
use App\Models\User;

class ContractorPolicy
{
    public function view(User $user, Contractor $contractor): bool
    {
        return $user->id === $contractor->user_id;
    }

    public function update(User $user, Contractor $contractor): bool
    {
        return $user->id === $contractor->user_id;
    }

    public function delete(User $user, Contractor $contractor): bool
    {
        return $user->id === $contractor->user_id;
    }

    public function forceDelete(User $user, Contractor $contractor): bool
    {
        return $user->id === $contractor->user_id;
    }
}
