<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tags', function (Blueprint $table) {
            $table->ulid('id')->primary();
            $table->string('type');
            $table->string('name');
            $table->unique(['type', 'name']);
        });

        Schema::create('tags_items', function (Blueprint $table) {
            $table->ulid('tag_id');
            $table->ulid('item_id');
            $table->primary(['tag_id', 'item_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tags');
        Schema::dropIfExists('tags_items');
    }
};
