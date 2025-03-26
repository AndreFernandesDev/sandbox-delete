<?php

namespace App\Console\Commands;

use App\Models\Rate;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class UpdateCurrencyRate extends Command
{
    protected $signature = 'app:update-rates';
    protected $description = 'Update rates using CryptoMarketAPI';

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

            Rate::updateOrCreate(['code' => $symbol], ['rate' => $rate]);
        }

        $this->comment('Update completed.');

    }
}
