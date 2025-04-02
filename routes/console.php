<?php

use App\Console\Commands\UpdateCurrencyRate;
use App\Console\Commands\UpdateUserRole;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Schedule;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(UpdateCurrencyRate::class)->cron('0 */12 * * *');


Artisan::command('ssr', function () {
    Process::forever()->run('php artisan inertia:start-ssr');
});
