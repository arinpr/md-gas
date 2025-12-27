// InstantQuoteModal.jsx
import { usePage } from "@inertiajs/react";
import { FiCheck, FiCreditCard } from "react-icons/fi";

export default function InstantQuoteModal({ open, price, onClose, answers }) {
    if (!open) return null;
    const { currencySymbol } = usePage().props;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4">
                    <FiCheck className="text-white w-7 h-7" />
                </div>

                <h2 className="text-2xl font-bold text-dark">
                    Instant quote ready
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Fixed price — no call needed
                </p>

                <div className="mt-6 text-4xl font-extrabold text-dark">
                    {currencySymbol}
                    {price}
                </div>

                <button
                    onClick={() => {
                        console.log("Booking with answers:", answers);
                    }}
                    className="mt-6 w-full rounded-2xl bg-primary py-4 text-white font-semibold flex items-center justify-center gap-2"
                >
                    <FiCreditCard /> Pay & book now
                </button>

                <button
                    onClick={onClose}
                    className="mt-4 text-sm text-muted-foreground hover:underline"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
