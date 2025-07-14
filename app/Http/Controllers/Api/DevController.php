<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

class DevController
{

    public function dev1(Request $request)
    {
        $data = $request->user()->invoicesCreatedThisMonth();

        return response()->json(['data' => $data]);
    }

}
