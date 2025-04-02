<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\BannerController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\LocationController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\SessionController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminGate;
use Illuminate\Support\Facades\Route;

// App
Route::get('/', [AppController::class, 'index'])->name('home');

// Dashboard
Route::middleware(AdminGate::class)->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/dashboard/post', [DashboardController::class, 'postView'])->name('dashboard.post');
    Route::get('/dashboard/banners', [DashboardController::class, 'bannerView'])->name('dashboard.banner');

    Route::get('/banners/create', [BannerController::class, 'create'])->name('banner.create');
    Route::post('/banners/store', [BannerController::class, 'store'])->name('banner.store');
    Route::get('/banners/{id}/edit', [BannerController::class, 'edit'])->name('banner.edit');
    Route::post('/banners/{id}/update', [BannerController::class, 'update'])->name('banner.update');
    Route::post('/banners/{id}/active', [BannerController::class, 'active'])->name('banner.active');
    Route::delete('/banners/{id}', [BannerController::class, 'destroy'])->name('banner.destroy');
});

// Auth
Route::get('/auth/redirect', [UserController::class, 'redirect'])->name('auth.redirect');
Route::get('/auth/callback', [UserController::class, 'callback'])->name('auth.callback');
Route::post('/auth/logout', [UserController::class, 'logout'])->name('auth.logout');

// User
Route::get('/user/{id}', [UserController::class, 'show'])->name('user.show');

// Session
Route::middleware(['auth'])->group(function () {
    Route::post('/session/location', [SessionController::class, 'location'])->name('session.location');
});

// Profile
Route::middleware(['auth'])->group(function () {
    Route::get('/profile', [AppController::class, 'profile'])->name('profile');
    Route::get('/profile/bookmark', [AppController::class, 'profileBookmark'])->name('profile.bookmark');
});

// Posts
Route::middleware(['auth'])->group(function () {
    Route::get('/posts', [PostController::class, 'index'])->name('post.index');
    Route::get('/posts/create', [PostController::class, 'create'])->name('post.create');
    Route::post('/posts/store', [PostController::class, 'store'])->name('post.store');
    Route::get('/posts/{id}/edit', [PostController::class, 'edit'])->name('post.edit');
    Route::post('/posts/{id}/update', [PostController::class, 'update'])->name('post.update');
    Route::post('/posts/{id}/status', [PostController::class, 'status'])->name('post.status');
    Route::delete('/posts/{id}', [PostController::class, 'destroy'])->name('post.destroy');
});

Route::get('/posts/{id}', [PostController::class, 'show'])->name('post.show');

// Location
Route::post('/location', [LocationController::class, 'search'])->name('location.search');

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
