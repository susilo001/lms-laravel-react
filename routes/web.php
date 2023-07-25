<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\Teacher\QuizController;
use App\Http\Controllers\Teacher\CourseController;
use SebastianBergmann\CodeCoverage\Report\Html\Dashboard;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::middleware('auth')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * Teacher Routes
     */
    Route::group(['middleware' => ['role:teacher']], function () {
        Route::get('/courses', [CourseController::class, 'index'])->name('courses.index');
        Route::post('/course', [CourseController::class, 'store'])->name('courses.store');
        Route::patch('/course/{course:slug}', [CourseController::class, 'update'])->name('courses.update');
        Route::delete('/course/{course:slug}', [CourseController::class, 'destroy'])->name('courses.destroy');

        Route::get('/quizzes', [QuizController::class, 'index'])->name('quizzes.index');
        Route::post('/quiz', [QuizController::class, 'store'])->name('quizzes.store');
        Route::patch('/quiz/{quiz}', [QuizController::class, 'update'])->name('quizzes.update');
        Route::delete('/quiz/{quiz}', [QuizController::class, 'destroy'])->name('quizzes.destroy');
    });

    /**
     * Student Routes
     */
    Route::group(['middleware' => ['role:student']], function () {
        // 
    });

    /**
     * Admin Routes
     */
    Route::group(['middleware' => ['role:admin']], function () {
        //
    });
});

require __DIR__ . '/auth.php';
