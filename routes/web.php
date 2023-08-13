<?php

use App\Models\Assignment;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\QuizController;
use App\Models\UserAssignmentSubmission;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\ModuleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\AssignmentController;
use App\Http\Controllers\UserQuizAttemptController;
use App\Http\Controllers\UserAssignmentSubmissionController;

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

/**
 * Public Routes
 */

Route::get('/', [HomeController::class, 'index'])->name('dashboard');
Route::get('/courses', [CourseController::class, 'index'])->name('course.index');
Route::get('/course/{course:slug}', [CourseController::class, 'show'])->name('course.show');

Route::get('/module/{module}', [ModuleController::class, 'show'])->name('modules.show');
Route::get('/quiz/{quiz}', [QuizController::class, 'show'])->name('quiz.show');


/**
 * Authenticated Routes
 */
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::post('/quiz-attempt', [UserQuizAttemptController::class, 'store'])->name('quiz-attempt.store');

    Route::get('/assignment/{assignment}', [AssignmentController::class, 'show'])->name('assignment.show');

    Route::post('/assignment/{assignment}/submit', [UserAssignmentSubmissionController::class, 'store'])->name('assignment.submit');

    /**
     * Teacher Routes
     */
    Route::group(['middleware' => ['role:teacher']], function () {
        Route::get('/course/{course:slug}/edit', [CourseController::class, 'edit'])->name('course.edit');
        Route::post('/course', [CourseController::class, 'store'])->name('course.store');
        Route::patch('/course/{course:slug}', [CourseController::class, 'update'])->name('course.update');
        Route::delete('/course/{course:slug}', [CourseController::class, 'destroy'])->name('course.destroy');

        Route::post('/module', [ModuleController::class, 'store'])->name('modules.store');
        Route::patch('/module/{module}', [ModuleController::class, 'update'])->name('modules.update');
        Route::delete('/module/{module}', [ModuleController::class, 'destroy'])->name('modules.destroy');

        Route::post('/assignment', [AssignmentController::class, 'store'])->name('assignments.store');
        Route::patch('/assignment/{assignment}', [AssignmentController::class, 'update'])->name('assignments.update');
        Route::delete('/assignment/{assignment}', [AssignmentController::class, 'destroy'])->name('assignments.destroy');

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
