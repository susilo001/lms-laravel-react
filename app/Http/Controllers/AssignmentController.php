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
        return Inertia::render('Assignment/Create');
    }

    public function store(Request $request)
    {
        dd($request->all());

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Assignment created successfully'
        ]);
    }

    public function show(Assignment $assignment)
    {
        return Inertia::render('Assignment/Show', [
            'assignment' => $assignment
        ]);
    }

    public function edit()
    {
        return Inertia::render('Assignment/Edit');
    }

    public function destroy(Assignment $assignment)
    {
        $assignment->delete();

        return redirect()->back()->with([
            'status' => 'Success',
            'message' => 'Assignment deleted successfully'
        ]);
    }
}
