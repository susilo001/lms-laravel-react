<?php

namespace App\Http\Controllers;

use App\Models\Rating;
use Illuminate\Http\Request;

class RatingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required',
            'course_id' => 'required',
            'rating' => 'required',
            'review' => 'required',
            'date' => 'required',
        ]);

        $rating = Rating::create($request->all());

        return to_route('courses.show', $rating->course->slug)->with([
            'status' => 'Info',
            'message' => 'Thank you for your review!',
        ]);
    }
}
