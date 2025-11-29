<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class SingleUserSeeder extends Seeder
{
    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'admin@admin.com'], // unique key
            [
                'name' => 'Admin',
                'password' => Hash::make('Admin@123'),
            ]
        );
    }
}
