<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\BookingDetail;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
       
        $booking = Booking::create([
            // 'user_id'      => auth()->id(),
            'service_type' => $request->service_type,
            'base_amount'  => $request->base_amount,
            'pricing'      => $request->base_amount,
        ]);

        
        foreach ($request->answers as $item) {
            BookingDetail::create([
                'booking_id'   => $booking->id, // ✅ ALWAYS VALID
                'frontend_key' => $item['frontend_key'],
                'question'     => $item['question'],
                'answer'       => $item['answer'] ?? null,
                'base_amount'  => 0,
                'pricing'      => 0,
            ]);
        }

        return response()->json([
            'success' => true,
            'booking_id' => $booking->id,
        ]);
    }
}
