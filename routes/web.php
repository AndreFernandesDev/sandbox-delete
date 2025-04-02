<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/', [AppController::class, 'index'])->name('home');

Route::get('/auth/redirect', [UserController::class, 'redirect'])->name('auth.redirect');
Route::get('/auth/callback', [UserController::class, 'callback'])->name('auth.callback');
Route::post('/auth/logout', [UserController::class, 'logout'])->name('auth.logout');

Route::post('/location', [LocationController::class, 'search'])->name('location.search');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/post', [DashboardController::class, 'postView'])->name('dashboard.post');
    Route::post('/dashboard/post', [DashboardController::class, 'store'])->name('dashboard.store');

    Route::get('/profile', [AppController::class, 'profile'])->name('profile');
    Route::get('/profile/bookmark', [AppController::class, 'profileBookmark'])->name('profile.bookmark');


    Route::get('/posts', [PostController::class, 'index'])->name('post.index');
    Route::get('/posts/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/posts/store', [PostController::class, 'store'])->name('post.store');
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/posts/{id}/update', [PostController::class, 'update'])->name('post.update');
    Route::post('/posts/{id}/status', [PostController::class, 'status'])->name('post.status');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('post.destroy');
});

Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');
Route::get('/posts/{id}', [PostController::class, 'show'])->name('post.show');



require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
