<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\ProfileController;
use App\Models\Book;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    $books = Book::all();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'books' => $books,
    ]);
});

Route::get('/dashboard', function () {
    $user = Auth::user();
    $books = $user->books;
    return Inertia::render('Dashboard', [
        'books' => $books,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::get('/book', [BookController::class, 'show'])->name('book');
    Route::get('/book/{id}', [BookController::class, 'index'])->name('book.index');
    Route::post('/book', [BookController::class, 'store'])->name('book.store');
    Route::patch('/book/{id}', [BookController::class, 'update'])->name('book.update');
    Route::delete('/book/{id}', [BookController::class, 'destroy'])->name('book.destroy');
});

require __DIR__.'/auth.php';
