<?php

use App\Console\Commands\UpdateCurrencyRate;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::command(UpdateCurrencyRate::class)->cron('0 */12 * * *');