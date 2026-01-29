<?php

namespace App\Http\Controllers\Api\Settings;

use App\Enums\Currency;
use App\Enums\PaymentMethod;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class ProfileController
{
    public function updateDefaults(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'default_seller_id' => [
                'nullable',
                'integer',
                Rule::exists('contractors', 'id')->where(function ($query) use ($user) {
                    $query->where('user_id', $user->id);
                }),
            ],
            'default_currency' => ['nullable', Rule::enum(Currency::class)],
            'default_payment_method' => ['nullable', Rule::enum(PaymentMethod::class)],
        ]);

        $user->update($validated);

        return response()->json(['success' => true, $validated]);
    }

    public function updateProfile(Request $request)
    {

        $validated = $request->validate([
            'name' => ['nullable', 'string', 'max:255'],
            'email' => [
                'nullable',
                'string',
                'lowercase',
                'email',
                'max:255',
                Rule::unique(User::class)->ignore($request->user()->id),
            ],
        ]);

        $request->user()->update($validated);

        return response()->json(['success' => true]);
    }

    public function updatePassword(Request $request)
    {
        $validated = $request->validate([
            'current_password' => ['required', 'current_password'],
            'password' => ['required', Password::defaults(), 'confirmed'],
        ]);

        $request->user()->update([
            'password' => Hash::make($validated['password']),
        ]);

        return response()->json(['success' => true]);
    }

    public function deleteAccount(Request $request)
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::guard('web')->logout();

        $user->delete();

        if ($request->hasSession()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        return response()->json(['success' => true]);
    }
}
