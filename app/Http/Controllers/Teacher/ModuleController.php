<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    public function index()
    {
        return inertia('Teacher/Modules/Index');
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request)
    {
        //
    }

    public function destroy(Request $request)
    {
        //
    }
}
