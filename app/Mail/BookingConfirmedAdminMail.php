<?php

namespace App\Mail;

use App\Models\Booking;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class BookingConfirmedAdminMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Booking $booking) {}

    public function build()
    {
        return $this->subject("New paid booking — #{$this->booking->id}")
            ->markdown('emails.booking.confirmed_admin', [
                'booking' => $this->booking,
            ]);
    }
}
