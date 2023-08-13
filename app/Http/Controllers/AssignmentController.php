<?php

namespace App\Http\Controllers;

use App\Models\Assignment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssignmentController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        dd($request->all());
    }

    public function show(Assignment $assignment)
    {
        return Inertia::render('Assignment', [
            'assignment' => $assignment
        ]);
    }

    public function edit()
    {
        //
    }

    public function destroy()
    {
        //
    }
}
