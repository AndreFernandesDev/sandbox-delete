<?php

namespace App\Console\Commands;

use App\Models\Currency;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateCurrencyRate extends Command
{
    protected $signature = 'app:update-currency-rate';
    protected $description = 'Update currency rates using CryptoMarketAPI';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = 2781; // USD
        $convert = ['BTC', 'ETH', 'SOL', 'USDC'];
        $precision = 10;

        foreach ($convert as $symbol) {
            $data = Http::withHeaders(['X-CMC_PRO_API_KEY' => env('COINMARKET_KEY')])
                ->get("https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest?id={$id}&convert={$symbol}")
                ->json('data');

            $rate = number_format($data[$id]['quote'][$symbol]['price'], $precision);

            Currency::updateOrCreate(['code' => $symbol], ['rate' => $rate]);
        }

        $this->comment('Update completed.');

    }
}
