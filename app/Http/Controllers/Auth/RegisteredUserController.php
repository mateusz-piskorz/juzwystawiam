<?php

namespace App\Http\Controllers\Auth;

use App\Models\Contractor;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('root/auth/register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        Contractor::create(['is_own_company' => true, 'email' => $request->email, 'company_name' => "$request->name's company", 'user_id' => $user->id]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
