<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreRatingRequest;
use App\Models\Rating;

class RatingController extends Controller
{
    public function store(StoreRatingRequest $request)
    {
        $rating = Rating::create($request->validated());

        return to_route('courses.show', $rating->course->slug)->with([
            'status' => 'Info',
            'message' => 'Thank you for your review!',
        ]);
    }
}
