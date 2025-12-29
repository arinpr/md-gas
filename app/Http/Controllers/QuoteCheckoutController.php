<?php

namespace App\Http\Controllers;

use App\Http\Requests\QuoteCheckoutRequest;
use App\Models\{Booking, Transaction};
use App\Services\QuoteCheckoutService;
use Illuminate\Http\Request;
use Stripe\StripeClient;
use Inertia\Inertia;

class QuoteCheckoutController extends Controller
{
    public function store(QuoteCheckoutRequest $request, QuoteCheckoutService $svc)
    {
        $data = $svc->checkout($request->validated());

        return response()->json(['data' => $data], 201);
    }

    public function success(Request $request)
    {
        $bookingId = (int) $request->query('booking');
        $txId      = (int) $request->query('tx');
        $sessionId = (string) $request->query('session_id', '');

        if (!$bookingId || !$txId || !$sessionId) {
            throw ValidationException::withMessages([
                'payment' => ['Missing booking/tx/session details.'],
            ]);
        }

        $booking = Booking::findOrFail($bookingId);
        $tx = Transaction::where('id', $txId)
            ->where('booking_id', $bookingId)
            ->firstOrFail();

        $stripe = new StripeClient(config('services.stripe.secret'));
        $session = $stripe->checkout->sessions->retrieve($sessionId);

        // ✅ Trust but verify:
        // Ensure the session is for this booking
        $sessionBookingId = (int) ($session->client_reference_id ?? 0);
        $metaBookingId = (int) ($session->metadata['booking_id'] ?? 0);

        if ($sessionBookingId !== (int)$booking->id && $metaBookingId !== (int)$booking->id) {
            return redirect()->route('booking.failed', ['booking' => $booking->id]);
        }

        if ($session->payment_status === 'paid') {
            $tx->update([
                'status' => 'succeeded',
                'succeeded_at' => now(),
                'provider_payload' => array_merge($tx->provider_payload ?? [], [
                    'success_session' => $session->toArray(),
                ]),
            ]);

            $booking->update([
                'payment_status' => 'paid',
                'paid_at' => now(),
                'status' => 'confirmed',
            ]);

            if (method_exists($booking, 'appointment') && $booking->appointment) {
                $booking->appointment()->update(['status' => 'confirmed']);
            }

            return redirect()->route('booking.confirmed', ['booking' => $booking->id]);
        }

        return redirect()->route('booking.failed', ['booking' => $booking->id]);
    }

    public function cancel(Request $request)
    {
        $bookingId = (int) $request->query('booking');
        $txId      = (int) $request->query('tx');

        $booking = Booking::findOrFail($bookingId);

        $booking->update([
            'payment_status' => 'failed',
            'status' => 'submitted',
        ]);

        Transaction::where('id', $txId)
            ->where('booking_id', $bookingId)
            ->update(['status' => 'cancelled']);

        return redirect()->route('booking.cancelled', ['booking' => $booking->id]);
    }



    public function confirmed(Booking $booking)
    {
        return Inertia::render('Book/Payment/Confirmed', [
            'booking' => $booking->only([
                'id','status','payment_status','paid_at','total','currency'
            ]),
        ]);
    }

    public function failed(Booking $booking)
    {
        return Inertia::render('Book/Payment/Failed', [
            'booking' => $booking->only([
                'id','status','payment_status','total','currency'
            ]),
        ]);
    }

    public function cancelled(Booking $booking)
    {
        return Inertia::render('Book/Payment/Cancelled', [
            'booking' => $booking->only([
                'id','status','payment_status','total','currency'
            ]),
        ]);
    }
}
