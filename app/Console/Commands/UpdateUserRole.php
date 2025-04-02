<?php

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;

class UpdateUserRole extends Command
{
    protected $signature = 'app:update-user-role {nickname} {role}';
    protected $description = 'Update the user role.';

    private $roles = ['user', 'admin'];

    public function handle()
    {
        $nickname = $this->argument('nickname');
        $role = $this->argument('role');

        if (!in_array($role, $this->roles)) {
            return $this->comment("Role not available. Opts: " . implode(",", $this->roles));
        }

        $user = User::where(["nickname" => $nickname])->first();

        if (!$user) {
            return $this->comment("User not found.");
        }

        $user->update(["role" => $role]);

        $this->comment("User {$nickname} is now a {$role}.");
    }
}
