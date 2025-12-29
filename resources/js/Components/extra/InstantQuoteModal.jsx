// InstantQuoteModal.jsx
import React, { useEffect, useRef, useState } from "react";
import { usePage } from "@inertiajs/react";
import { FiCheck, FiCreditCard, FiLoader } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function InstantQuoteModal({ open, price, onClose, answers, serviceKey }) {
  const { symbol } = usePage().props;

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur">
      <div className="bg-white rounded-3xl max-w-md w-full p-8 text-center">
        <div className="w-14 h-14 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-4">
          <FiCheck className="text-white w-7 h-7" />
        </div>

        <h2 className="text-2xl font-bold text-dark">Instant quote ready</h2>
        <p className="mt-2 text-sm text-muted-foreground">Fixed price — no call needed</p>

        <div className="mt-6 text-4xl font-extrabold text-dark">
          {symbol}
          {price}
        </div>

        <PayAndBookButton serviceKey={serviceKey} answers={answers} price={price} />

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

function PayAndBookButton({ serviceKey, answers, price }) {
  const [processing, setProcessing] = useState(false);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const showValidationErrors = (errorsObj) => {
    if (!errorsObj || typeof errorsObj !== "object") return;

    // Laravel typically returns: { field: [msg1, msg2], ... }
    const messages = Object.values(errorsObj).flat().filter(Boolean);

    if (!messages.length) return;

    // show first, or loop — here we loop, but keep it clean
    messages.slice(0, 4).forEach((m) => toast.error(m, { duration: 5000, position: "top-center" }));
    if (messages.length > 4) toast.error("Please review the highlighted fields and try again.", { duration: 5000 });
  };

  const handleCheckout = async () => {
    if (processing) return;

    setProcessing(true);
    console.log("Payloaad", { service: serviceKey, form: answers, amount: price })
    try {
      const res = await axios.post(
        "/quote/checkout",
        { service: serviceKey, form: answers, amount: price },
        { timeout: 15000 }
      );

      const checkoutUrl = res?.data?.data?.checkout_url;
      if (!checkoutUrl) throw new Error("Checkout URL missing from response.");

      // Redirect (don’t reset processing - user is leaving)
      window.location.assign(checkoutUrl);
    } catch (err) {
      const status = err?.response?.status;

      // 422 validation
      if (status === 422) {
        showValidationErrors(err?.response?.data?.errors);
      } else if (status >= 500) {
        toast.error("Payment service is temporarily unavailable. Please try again shortly.", {
          duration: 5000,
          position: "top-center",
        });
      } else if (err?.code === "ECONNABORTED") {
        toast.error("Request timed out. Please check your connection and try again.", {
          duration: 5000,
          position: "top-center",
        });
      } else {
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Unable to initiate payment. Please try again.";
        toast.error(message, { duration: 5000, position: "top-center" });
      }

      if (mounted.current) setProcessing(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      disabled={processing}
      aria-busy={processing}
      className={[
        "mt-6 w-full rounded-2xl py-4 font-semibold flex items-center justify-center gap-2 transition",
        processing
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-primary text-white hover:opacity-90",
      ].join(" ")}
    >
      {processing ? (
        <>
          <FiLoader className="animate-spin" />
          Processing…
        </>
      ) : (
        <>
          <FiCreditCard />
          Pay & Book Now
        </>
      )}
    </button>
  );
}
