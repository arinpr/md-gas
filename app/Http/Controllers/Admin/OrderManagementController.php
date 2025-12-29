<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderManagementController extends Controller
{
    public function index(Request $request)
    {
        $perPage = (int) ($request->query('per_page', 10));
        $perPage = max(5, min(50, $perPage));

        $q = Booking::query()
            ->with([
                'customer:id,full_name,email,phone,postcode,address_full',
                'appointment:id,type,starts_at,appointment_date,status',
                'details:id,booking_id,frontend_key,question_snapshot,answer_text,answer_json,media,amount',
                'transactions:id,booking_id,provider,amount,currency,kind,status,provider_checkout_session_id,provider_payment_intent_id,provider_charge_id,provider_refund_id,created_at',
            ])
            ->latest('id');

        // Optional basic search (keep it simple)
        if ($search = trim((string) $request->query('q', ''))) {
            $q->whereHas('customer', function ($qq) use ($search) {
                $qq->where('email', 'like', "%{$search}%")
                   ->orWhere('full_name', 'like', "%{$search}%")
                   ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $bookings = $q->paginate($perPage)->withQueryString();
        // dd($bookings);

        return Inertia::render('Admin/Orders/Management', [
            'bookings' => $bookings,
            'filters' => [
                'q' => $request->query('q', ''),
                'per_page' => $perPage,
            ],
        ]);
    }
}
